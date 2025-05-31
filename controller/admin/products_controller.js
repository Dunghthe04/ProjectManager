const Products = require('../../models/product.model');
const filterStatusHelper=require("../../helpers/filter_Status");
// [GET] /admin/products
module.exports.index = async (req, res) => {
    
    //bộ lọc nút
    const filterStatus=filterStatusHelper(req.query);

    //
    let find = {
        deleted: false
    }
    //nếu có query trên url -> thêm 1 điều kiện lọc
    if (req.query.status) {
        find.status = req.query.status;
    }
    
    let keyword="";// mặc định nếu k tìm gì -> ko hiển thị gì ô input
    if(req.query.keyword){
        keyword=req.query.keyword;
        //tạo ra 1 regex tìm kiếm chứa chuỗi, và ko kp hoa thường
        const regrex=new RegExp(keyword,"i");
        //add regex vào bộ lọc/, lọc các pu có title chứa regex
        find.title=regrex;
    }
   
    const Product = await Products.find(find)
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: Product,
        filterStatus: filterStatus,
        keyword: keyword
    });


}