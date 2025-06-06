//controller lấy data thông qua model==> nhúng model
const Product=require("../../models/product.model");
// [GET] /products
//chờ model lấy dữ liệu từ database
module.exports.index=async(req, res) => {
    const Products=await Product.find({
        deleted: false,
        status:'active'
    })
    .sort({position: "desc"})
    //tạo mảng mới và thêm key
    const newProducts=Products.map(item=>{
        item.priceNew=(item.price*(100-item.discountPercentage)/100).toFixed(0);// làm tròn chữ số phập thân 0
        return item;
    })
    res.render("client/pages/products/index",{
        pageTitle:"Trang danh sách sản phẩm",
        Products:newProducts
    })
}