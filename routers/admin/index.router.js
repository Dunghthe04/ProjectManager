const dashboardRoutes=require("./dashboard.router");
const systemConfig=require("../../config/system");
const productRoutes=require("../admin/products.router")
const recycleRoutes=require("../admin/recycle.router")
const productsCategory=require("../admin/products-category.js")
module.exports=(app)=>{
    const PATH_ADMIN=systemConfig.prefixAdmin;
    app.use(PATH_ADMIN+"/dashboard",dashboardRoutes);
    app.use(PATH_ADMIN+"/products",productRoutes);
    app.use(PATH_ADMIN+"/recycle",recycleRoutes);
    app.use(PATH_ADMIN+"/products-category",productsCategory);
}