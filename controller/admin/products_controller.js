const Products = require('../../models/product.model');
const filterStatusHelper = require("../../helpers/filter_Status");
const objectHelper = require("../../helpers/searchForm.js")
const paginationHelper = require("../../helpers/pagination.js");
const Product = require('../../models/product.model');
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
    const objectSearch = objectHelper(req.query); // trả về hàm => gọi hàm => trả về object
    if (objectSearch.regrex) { // nếu có regrex
        find.title = objectSearch.regrex; // thêm lọc title=regrex
    }
    //phân trang
    const pagination = {
        currentPage: 1, // mặc định trang htai là 1 
        limit: 4 //giới hạn 4 ptu 1 trang
    }

    const countProducts = await Products.countDocuments(find); // đếm số lg sản phẩm theo bộ lọc
    //mục đích truyền vào object, tính toán rồi thêm các key totalPage vào obecjt rồi trả về
    const objectPagination = paginationHelper(
        pagination, req.query, countProducts
    );

    const Product = await Products.find(find).sort({position:"desc"}).limit(pagination.limit).skip(pagination.skip)
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: Product,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });


}

// [GET] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    //lấy được các router, biến động(status, id) 
    const status = req.params.status;
    const id = req.params.id;
    //    res.send(`${status}-${id}`);

    //gọi model.updateOne({id: idUpdate},{dataUpdate:data})
    await Products.updateOne({_id: id}, {status: status}) //cập nhập 1 document
    //    res.redirect("/admin/products"); // chuyển hướng đến url
    // console.log("Referer:", req.get('Referer')); 
    req.flash("success", "Đã cập nhập thành công");
    res.redirect(req.get('Referer')); // chuyển hướng về url trc đây
}

//[PATCH] /admin/products/change-multi
module.exports.changeMulti=async (req,res)=>{
    console.log(req.body);
    const status=req.body.type;
    const ids=(req.body.ids).split(", ");// tách ra thành mảng

    switch (status) {
        case "active":
            await Products.updateMany({_id: { $in: ids }},{status: status});
            req.flash('success', `Đã thay đổi ${ids.length} sản phẩm thành công`);
            break;
        
        case "inactive":
            await Products.updateMany({_id: { $in: ids }},{status: status});
            req.flash('success', `Đã thay đổi ${ids.length} sản phẩm thành công`);
            break;

        case "delete-multi":
            await Products.updateMany({_id: { $in: ids }},{deleted: true});
            req.flash('success', `Đã xóa ${ids.length} sản phẩm thành công`);
            break;  
        
        case "change-position":
            // h mảng ids kia là mảng ,
            for (const ele of ids) { //các otu là cặp string id-position 
                [id,position]=ele.split("-");// tách string đó thành mảng [id,posion]-> dùng distructuring
                await Products.updateOne({_id: id},{position: position});// cập nhập từng ptu , vì chúng k chung nhau position
                req.flash('success', `Đã thay đổi trạng thái ${ids.length} sản phẩm thành công`);
            }
            break;    

        default:
            break;
    }
    res.redirect(req.get('referer'));
}

//[DELETE]/admin/products/delete/:id
module.exports.delete=async(req,res)=>{
    //lấy ra id xóa
    const id=req.params.id;
    //xóa cứng
    // await Product.deleteOne({_id: id});
    //xóa mềm -> chỉ cần thay đổi deleted=true, ta có thể thêm trường vào db (bắt buộc phải có trường đó trong model)
    await Product.updateOne({_id: id},{deleted: true , deletedTime: new Date()})
    res.redirect(req.get('referer'));
}


