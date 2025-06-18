const ProductsCategory = require('../../models/product-category.js');
const systemConfig = require("../../config/system.js");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    const records = await ProductsCategory.find(find)
    res.render("admin/pages/products-category/index.pug", {
        pageTitle: "Danh mục sản phẩm",
        records: records
    })
}
// [GET] /admin/create
module.exports.create = (req, res) => {
    res.render("admin/pages/products-category/create.pug")
}

// [POST] /admin/create
module.exports.createPost = async (req, res) => {
    if (req.body.position == "") {
        const numberOfPoduct = await ProductsCategory.countDocuments();
        req.body.position = numberOfPoduct + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const records = new ProductsCategory(req.body);
    await records.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

//[GET] /admin/products-category/detail/id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug
        }
        const record = await ProductsCategory.findOne(find)

        res.render("admin/pages/products-category/detail.pug", {
            pageTitle: "Trang danh mục sản phẩm",
            record: record
        })
    } catch (error) {
        res.redirect(req.get('referer'));
        req.flash("error", `Không tìm thấy mục sản phẩm  ${req.params.slug}`)
    }
}
// [GET] /admin/products-category/edit/id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const record = await ProductsCategory.findOne(find)

        res.render("admin/pages/products-category/edit.pug", {
            pageTitle: "Cập nhập",
            record: record
        })
    } catch (error) {
        res.redirect(req.get('referer'));
        req.flash("error", `Không tìm thấy sản phẩm id= ${req.params.id}`);
    }
}


//[PATCH] /admin/products-category/edit/id
module.exports.editPatch = async (req, res) => {
    if (req.body.position == "") {
        const numberOfPoduct = await ProductsCategory.countDocuments();
        req.body.position = numberOfPoduct + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    try {
        await ProductsCategory.updateOne({
            _id: req.params.id
        }, req.body)
        req.flash("success", "Cập nhập thành công")
    } catch (error) {
        req.flash("success", "Cập nhập thất bại")
    }
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}