const systemconfig=require("../../config/system");
const Account=require("../../models/account.model");
module.exports.requireAuth=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        res.redirect(`${systemconfig.prefixAdmin}/auth/login`);
    }else{
        //nếu có token -> check tiếp xem token có thỏa mãn không
        const user=await Account.find({
            token: req.cookies.token
        })
        if(!user){
           res.redirect(`${systemconfig.prefixAdmin}/auth/login`); 
        }else{
            next();
        }
    }
}