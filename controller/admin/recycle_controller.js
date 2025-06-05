const Products = require('../../models/product.model');
const filterStatusHelper = require("../../helpers/filter_Status");
const objectHelper = require("../../helpers/searchForm.js")
const paginationHelper = require("../../helpers/pagination.js");


//[GET]/admin/recycle
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: true
    }
    if (req.query.status) {
        find.status = req.query.status;
    }
    const objectSearch = objectHelper(req.query); 
    if (objectSearch.regrex) { 
        find.title = objectSearch.regrex;
    }
    const pagination = {
        currentPage: 1,
        limit: 4 
    }

    const numberDocument = await Products.countDocuments();

    const objectPagination = paginationHelper(
        pagination, req.query, numberDocument
    );

    const product = await Products.find(find).limit(pagination.limit).skip(pagination.currentPage);
    res.render("admin/pages/recycle/index.pug", {
        products: product,
        pagination: objectPagination,
        filterStatus: filterStatus
    })
}

module.exports.recycle=async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    await Products.updateOne({_id: id},{deleted: false});
    res.redirect(req.get('referer'));
}