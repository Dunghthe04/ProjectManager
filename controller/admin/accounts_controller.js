const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system.js");
var md5 = require('md5');

module.exports.index = async(req, res) => {
    const find={
        deleted:false
    }
    const accounts=await Account.find(find).select("-password -token");

    //duyệt qua từng accounts và gán role vào  account có role_id tương ứng với id của role
    for (const item of accounts) {
        const role=await Role.findOne({
            _id: item.role_id,
            deleted: false
        });
        item.role=role;
    } 

    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Trang quản lý tài khoản",
        accounts:accounts
    });
}

module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    }
    const record = await Role.find(find);
    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Tạo tài khoản",
        record: record
    });
}

module.exports.createAccount = async (req, res) => {
    //gửi lại dữ liệu nếu sai
    const find = {
        deleted: false
    }
    const record = await Role.find(find);
    // mã hóa mật khẩu
    req.body.password = md5(req.body.password);
    //Kiểm tra email đã tồn tại chưa
    const emailExist = await Account.findOne({
        deleted: false,
        email: req.body.email
    })
    //nếu đã tồn tại -> báo lỗi + gửi lại dl
    if (emailExist) {
        req.flash("error","Email đã được sử dụng")
        res.render("admin/pages/accounts/create.pug",{
            oldValue:req.body,// dữ liệu cũ
            record:record//dữ liệu cũ (role)
        })
    } else {
        const account = new Account(req.body);
        req.flash("success","Thêm tài khoản thành công")
        await account.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
    

}