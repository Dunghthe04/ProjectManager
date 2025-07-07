const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/accounts_controller");
const multer = require('multer');
const validate = require('../../validate/admin/accounts.validate');
const upload = multer(); // thư mục lưu ảnh khi upload lên, multer thì phải thêm cả public
const uploadClound = require('../../middleware/admin/uploadsClound.middelware')

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", upload.single('avatar'),
    uploadClound.uploadClound,
    validate.createAccount,
    controller.createAccount);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", upload.single('avatar'),
    uploadClound.uploadClound,
    validate.createAccount,
    controller.editPatch);
module.exports = router;