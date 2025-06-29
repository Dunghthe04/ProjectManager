const dashboardRoutes=require("./dashboard.router");
const systemConfig=require("../../config/system");
const productRoutes=require("../admin/products.router")
const recycleRoutes=require("../admin/recycle.router")
const productsCategory=require("../admin/products-category.js")
const roles=require("../admin/role.router.js")
const accounts=require("../admin/accounts.router.js")
const auth=require("../../routers/admin/auth.router.js")
module.exports=(app)=>{
    const PATH_ADMIN=systemConfig.prefixAdmin;
    app.use(PATH_ADMIN+"/dashboard",dashboardRoutes);
    app.use(PATH_ADMIN+"/products",productRoutes);
    app.use(PATH_ADMIN+"/recycle",recycleRoutes);
    app.use(PATH_ADMIN+"/products-category",productsCategory);
    app.use(PATH_ADMIN+"/roles",roles);
    app.use(PATH_ADMIN+"/accounts",accounts);
    app.use(PATH_ADMIN+"/auth",auth);
}