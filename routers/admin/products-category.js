const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/productsCategory_controller.js");
const multer = require('multer');
const validate = require('../../validate/admin/productsCategory.validate.js');
const upload = multer(); // thư mục lưu ảnh khi upload lên, multer thì phải thêm cả public
const uploadClound=require('../../middleware/admin/uploadsClound.middelware')


router.get("/",controller.index);
router.get("/create",controller.create);
router.post("/create",upload.single('thumbnail'),
    uploadClound.uploadClound,
    validate.createPost,
    controller.createPost)
router.get("/detail/:slug",controller.detail);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",
    upload.single('thumbnail'),
    uploadClound.uploadClound,
    // validate.createPost,
    controller.editPatch);
router.delete("/delete/:id",controller.delete);    
module.exports = router;