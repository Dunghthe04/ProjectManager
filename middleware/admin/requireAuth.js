const systemconfig=require("../../config/system");
const Account=require("../../models/account.model");
const Role=require("../../models/role.model");
module.exports.requireAuth=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        res.redirect(`${systemconfig.prefixAdmin}/auth/login`);
    }else{
        //nếu có token -> check tiếp xem token có thỏa mãn không
        const user=await Account.findOne({
            token: req.cookies.token
        }).select("-password")
        if(!user){
           res.redirect(`${systemconfig.prefixAdmin}/auth/login`); 
        }else{
            //trả về user đó và quyền user đó, gán vào biến locals , mọi file pug sử dụng được 
            const role=await Role.findOne({
                _id: user.role_id
            }).select("title permission")
            res.locals.user=user;
            res.locals.role=role;// trả về role của tài khoản -> từ dó lấy được các quyền của tài khoản
            next();
        }
    }
}