const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system.js");
var md5 = require('md5');

module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const accounts = await Account.find(find).select("-password -token");

    //duyệt qua từng accounts và gán role vào  account có role_id tương ứng với id của role
    for (const item of accounts) {
        const role = await Role.findOne({
            _id: item.role_id,
            deleted: false
        });
        item.role = role;
    }

    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Trang quản lý tài khoản",
        accounts: accounts
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
        req.flash("error", "Email đã được sử dụng")
        res.render("admin/pages/accounts/create.pug", {
            oldValue: req.body, // dữ liệu cũ
            record: record //dữ liệu cũ (role)
        })
    } else {
        const account = new Account(req.body);
        req.flash("success", "Thêm tài khoản thành công")
        await account.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }


}


module.exports.edit = async (req, res) => {
    const find = {
        _id: req.params.id,
        deleted: false
    }
    try {
        const account = await Account.findOne(find);
        const role = await Role.find({
            deleted: false
        })
        res.render("admin/pages/accounts/edit.pug", {
            pageTitle: "Chỉnh sửa tài khoản",
            account: account,
            roles: role
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}

module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    //duyệt từng tài khoản ngoại trừ khoản có id đang xét,check xem email tồn tại chưa
    const account = await Account.findOne({
        _id: {
            $ne: id
        },
        email: req.body.email,
        deleted: false
    });
    if (account) {
        req.flash("error", "Email đã tồn tại vui lòng sử dụng email khác");
        res.redirect(req.get('referer'));
    } else {
        //nếu ng dùng nhập pass mới -> update, còn ko nhập -> ko cập nhập pass(xóa key khỏi object)
        if (req.body.password) {
            req.body.password = md5(req.body.password);
        } else {
            delete req.body.password;
        }
        await Account.updateOne({
            _id: id
        }, req.body)
        req.flash("success", "Cập nhập thành công");
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
    
}
