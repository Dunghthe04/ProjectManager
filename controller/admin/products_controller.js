const Products = require('../../models/product.model');
const filterStatusHelper = require("../../helpers/filter_Status");
const objectHelper=require("../../helpers/searchForm.js")
// [GET] /admin/products
module.exports.index = async (req, res) => {

    //bộ lọc nút(File: mục đích xử lý để xanh nút- trả về các button)
    const filterStatus = filterStatusHelper(req.query);
    
    //nếu có query trên url -> thêm 1 điều kiện lọc
    
    let find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status;
    }
    //bọc lọc form(Mặc định trả về keyword để in, nếu có nhập -> trả về cả keyword và regex để lọc)
    const objectSearch=objectHelper(req.query);// trả về hàm => gọi hàm => trả về object
    if(objectSearch.regrex){// nếu có regrex
      find.title=objectSearch.regrex;// thêm lọc title=regrex
    }
    //phân trang
    const pagination={
        currentPage:1,// mặc định trang htai là 1 
        limit:4//giới hạn 4 ptu 1 trang
    }

    //nếu trên url có param page -> thêm 1 key current page vào, value là trang htai
   if(req.query.page){
     const currentPage=parseInt(req.query.page);
     pagination.currentPage=currentPage;
   }

   //tính toán số lượng skip(ptu bắt đầu lấy)
   pagination.skip=(pagination.currentPage-1)*pagination.limit;
   //tính xem cần có bnhiue trang
   const countProducts=await Products.countDocuments(find);// đếm số lg sản phẩm theo bộ lọc
   const totalPage=Math.ceil(countProducts/pagination.limit);
   pagination.totalPage=totalPage;

    const Product = await Products.find(find).limit(pagination.limit).skip(pagination.skip)
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: Product,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination:pagination
    });


}