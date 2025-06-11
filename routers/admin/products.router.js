const express=require("express");
const router=express.Router();
const controller=require("../../controller/admin/products_controller");
const multer=require('multer');
const storageMulter=require('../../helpers/storageMulter');
const upload=multer({storage: storageMulter()});// thư mục lưu ảnh khi upload lên, multer thì phải thêm cả public

router.get("/",controller.index)
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/change-multi",controller.changeMulti)
router.delete("/delete/:id",controller.delete);
router.get("/create",controller.create); //render ra giao diện
router.post("/create",upload.single('thumbnail'),controller.createPost);
module.exports=router;