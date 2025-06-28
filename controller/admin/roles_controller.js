const {
    prefixAdmin
} = require('../../config/system.js');
const Role = require('../../models/role.model.js');


module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const records = await Role.find(find);
    res.render("admin/pages/roles/index.pug", {
        pageTitle: "Trang nhóm quyền",
        records: records
    })
}

module.exports.create = (req, res) => {
    res.render("admin/pages/roles/create.pug");
}

module.exports.createRole = async (req, res) => {
    const newRole = new Role(req.body);
    console.log(req.body);

    await newRole.save();
    res.redirect(`${prefixAdmin}/roles`);
}

module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await Role.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedTime: new Date()
        })
        res.redirect(req.get('referer'));
    } catch (error) {
        res.redirect(req.get('referer'));
    }
}

module.exports.edit = async (req, res) => {
    try {
        const roleId = req.params.id;
        const find = {
            _id: roleId,
            deleted: false
        }
        const record = await Role.findOne(find);
        res.render("admin/pages/roles/edit.pug", {
            pageTitle: "Trang cập nhập quyền",
            record: record
        })

    } catch (error) {
        res.redirect(`${prefixAdmin}/roles`)
    }
}
module.exports.editPatch = async (req, res) => {
    try {
        const roleId = req.params.id;
        await Role.updateOne({
            _id: roleId
        }, req.body)
        req.flash("success", "cập nhập thành công");
        res.redirect(`${prefixAdmin}/roles`);
    } catch (error) {
        req.flash("error", "cập nhập thất bại");
    }
}
module.exports.detail = async (req, res) => {
    try {
        const roleId = req.params.id;
        const record = await Role.findOne({
            _id: roleId,
            deleted: false
        })
        res.render("admin/pages/roles/detail.pug", {
            pageTitle: "Trang chi tiết",
            record: record
        })
    } catch (error) {
        req.flash("success", "Không tìm thấy role này");
        res.redirect(`${prefixAdmin}/roles`);
    }
}

module.exports.permission = async (req, res) => {
    const find = {
        deleted: false
    }

    const records = await Role.find(find);
    res.render("admin/pages/roles/permission.pug", {
        pageTitle: "Trang phân quyền",
        records: records
    });
}

module.exports.permissionPatch = async (req, res) => {
    try {
        //chuyển giá trị input về js( chứa các ptu quyền)
        const permission = JSON.parse(req.body.permissions)
        for (const item of permission) {
            //duyệt qua từng ptu và update
            await Role.updateOne({
                _id: item.id
            }, {
                permission: item.permission
            })
        }
        req.flash("success","Cập nhập quyền thành công");
        res.redirect(req.get('referer'));
    } catch (error) {
        req.flash("error","Cập nhập quyền thành công");
        res.redirect(req.get('referer'));
    }

}

