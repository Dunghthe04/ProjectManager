const { prefixAdmin } = require("../../config/system");
const Account = require("../../models/account.model")
var md5 = require('md5');
module.exports.login = (req, res) => {
    res.render("admin/pages/auth/login.pug");
}

module.exports.loginPost = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    //ktra xem email tồn tại k
    const user = await Account.findOne({
        email: email,
        deleted: false
        
    })
    //nếu ko có user -> báo lỗi
    if (!user) {
        req.flash("error", "Email hoặc tên tài khoản chưa chính xác");
        res.redirect(req.get('referer'));
        return;
    }

    //nếu có user ->kiểm tra mật khẩu xem đúng k
    if (user.password != md5(password)) {
        req.flash("error", "Mật khẩu chưa chính xác");
        res.redirect(req.get('referer'));
        return;
    }
    //nếu đúng tài khoản + mật khẩu -> check xem tài khoản đó có bị khóa hay k
    if (user.status=="inactive") {
        req.flash("error", "Tài khoản của bạn bị khóa");
        res.redirect(req.get('referer'));
        return;
    }
    res.cookie("token",user.token);
    res.redirect(`${prefixAdmin}/dashboard`);

}

module.exports.logout=(req,res)=>{
    res.clearCookie("token")
    res.redirect(`${prefixAdmin}/auth/login`)
}