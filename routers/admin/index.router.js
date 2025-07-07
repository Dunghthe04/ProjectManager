const dashboardRoutes=require("./dashboard.router");
const systemConfig=require("../../config/system");
const productRoutes=require("../admin/products.router")
const recycleRoutes=require("../admin/recycle.router")
const productsCategory=require("../admin/products-category.js")
const roles=require("../admin/role.router.js")
const accounts=require("../admin/account.route.js")
const auth=require("../admin/auth.router.js")
const requireAuth=require("../../middleware/admin/requireAuth.js");
module.exports=(app)=>{
    const PATH_ADMIN=systemConfig.prefixAdmin;
    app.use(PATH_ADMIN+"/dashboard",
        requireAuth.requireAuth,
        dashboardRoutes);
    app.use(PATH_ADMIN+"/products",requireAuth.requireAuth,productRoutes);
    app.use(PATH_ADMIN+"/recycle", requireAuth.requireAuth, recycleRoutes);
    app.use(PATH_ADMIN+"/products-category",requireAuth.requireAuth,productsCategory);
    app.use(PATH_ADMIN+"/roles",requireAuth.requireAuth,roles);
    app.use(PATH_ADMIN+"/accounts",requireAuth.requireAuth,accounts);
    app.use(PATH_ADMIN+"/auth",auth);
}