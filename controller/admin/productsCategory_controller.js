const ProductsCategory = require('../../models/product-category.js');
const systemConfig = require("../../config/system.js");
const createTreeHelper=require("../../helpers/create_Tree.js")

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    const records = await ProductsCategory.find(find)
    const newRecords = createTreeHelper.tree(records);
    
    res.render("admin/pages/products-category/index.pug", {
        pageTitle: "Danh mục sản phẩm",
        records: newRecords
    })
}
// [GET] /admin/create
module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    }

    const records = await ProductsCategory.find(find)
    const newRecords = createTreeHelper.tree(records);

    res.render("admin/pages/products-category/create.pug", {
        records: newRecords
    })
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
        const id=req.params.id;
        const find = {
            deleted: false,
            _id: id
        }
        const record = await ProductsCategory.findOne(find)

        const recordAll=await ProductsCategory.find({deleted: false});
        const recordTreeCategory= createTreeHelper.tree(recordAll);

        res.render("admin/pages/products-category/edit.pug", {
            pageTitle: "Cập nhập",
            record: record,
            recordTreeCategory: recordTreeCategory
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
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

//[DELETE] /admin/products-category/delete/id
module.exports.delete = async (req, res) => {
    const id = req.params.id;

    await ProductsCategory.updateOne({
        _id: id
    }, {
        deleted: true,
        deletedTime: new Date()
    })
    res.redirect(req.get('referer'));
}