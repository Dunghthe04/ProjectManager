const Products = require('../../models/product.model');
const filterStatusHelper = require("../../helpers/filter_Status");
const objectHelper=require("../../helpers/searchForm.js")
// [GET] /admin/products
module.exports.index = async (req, res) => {

    //bộ lọc nút(File: mục đích xử lý để xanh nút- trả về các button)
    const filterStatus = filterStatusHelper(req.query);
    
    //nếu có query trên url -> thêm 1 điều kiện lọc
    if (req.query.status) {
        find.status = req.query.status;
    }
    //
    let find = {
        deleted: false
    }
    
    //bọc lọc form(Mặc định trả về keyword để in, nếu có nhập -> trả về cả keyword và regex để lọc)
    const objectSearch=objectHelper(req.query);// trả về hàm => gọi hàm => trả về object
    if(objectSearch.regrex){// nếu có regrex
      find.title=objectSearch.regrex;// thêm lọc title=regrex
    }

    

    const Product = await Products.find(find)
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: Product,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    });


}