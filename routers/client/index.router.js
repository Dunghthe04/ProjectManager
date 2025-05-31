const productRoutes=require("./product.router");
const homeRoutes=require("./home.router");

//route tổng(gom các routor con lại)
module.exports = (app) => {
    app.use('/',homeRoutes);//neu route mà bắt đầu bằng / sẽ được xử lý bởi các route con bên trong homeRoute 
    //moij route con trong productRoutes bat dau =/product 
    app.use('/product', productRoutes);//neu route mà bắt đầu bằng /product sẽ được xử lý bởi các route con bên trong productRoute vd /product/item ==> nó sẽ chạy route / item trong productRoute 
}



