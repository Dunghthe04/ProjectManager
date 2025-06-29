module.exports.createAccount = (req, res,next) => {
    if (!req.body.fullName) {
        req.flash("error", "Tên không thể để trống");
        res.redirect("req.get('referer')");
        return;
    }
     if (!req.body.password) {
        req.flash("error", "Mật khẩu không thể để trống");
        res.redirect(req.get('referer'));
        return;
    }
    next();// nếu dữ liệu ok => nextx sang controller để thêm 
}

//dành cho edit -> khi ngta k muốn nhập mk
module.exports.editPatch=(req,res,next)=>{
    if (!req.body.fullName) {
        req.flash("error", "Tên không thể để trống");
        res.redirect("req.get('referer')");
        return;
    }
     if (!req.body.email) {
        req.flash("error", "Email không thể để trống");
        res.redirect(req.get('referer'));
        return;
    }
    next();// nếu dữ liệu ok => nextx sang controller để thêm 
}
