const Products = require('../../models/product.model');
// [GET] /admin/products
module.exports.index = async (req, res) => {
    let filterStatus = [{
            name: "Tất Cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Ngừng hoạt động",
            status: "deactive",
            class: ""
        }
    ];

    //xử lý backend, lấy querystatus trên url -> check xem nút nào có status giống => thêm class active(xanh nút), nếu ko có -> 
    if (req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(item => item.status == "");// nếu k mặc định thằng đầu xanh
        console.log(index);
        
        filterStatus[index].class = "active";
    }
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