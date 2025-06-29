module.exports.login = (req, res, next) => {
    if (!req.body.email) {
        req.flash("error", "Email không thể để trống");
        res.redirect(req.get('referer'));
        return;
    }
    if (!req.body.password) {
        req.flash("error", "Mật khẩu không thể để trống");
        res.redirect(req.get('referer'));
        return;
    }
    next();
}