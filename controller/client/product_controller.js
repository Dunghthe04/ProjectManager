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

//[GET]/product/detail/:slug
module.exports.detail=async(req,res)=>{
    try {
        const find={
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
        const product=await Product.findOne(find);
        res.render("client/pages/products/detail.pug",{
            pageTitle: product.title,
            product:product
        })
    } catch (error) {
        res.get(req.get('referer'));
        req.flash("error",`Không thể tìm thấy sản phẩm ${product.slug}`);
    }
}