module.exports.createPost = (req, res,next) => {
    if (!req.body.title) {
        req.flash("error", "Title không thể để trống");
        res.redirect(req.get('referer'));
        return;
    }
    next();// nếu dữ liệu ok => nextx sang controller để thêm 
}