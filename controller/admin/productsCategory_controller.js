const ProductsCategory = require('../../models/product-category.js');
const systemConfig = require("../../config/system.js");

// [GET] /admin/products-category
module.exports.index=async (req,res)=>{
    const find ={
        deleted: false
    }

    const records=await ProductsCategory.find(find)
    res.render("admin/pages/products-category/index.pug",{
        pageTitle: "Danh mục sản phẩm",
        records: records
    })
}
// [GET] /admin/create
module.exports.create=(req,res)=>{
    res.render("admin/pages/products-category/create.pug")
}

// [POST] /admin/create
module.exports.createPost = async (req, res) => {
    if(req.body.position==""){
        const numberOfPoduct=await ProductsCategory.countDocuments();
        req.body.position=numberOfPoduct+1;
    }else{
        req.body.position=parseInt(req.body.position);
    }
    console.log(req.body);
    
    const records= new ProductsCategory(req.body);
    await records.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}
