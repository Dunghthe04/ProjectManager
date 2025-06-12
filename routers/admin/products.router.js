const express=require("express");
const router=express.Router();
const controller=require("../../controller/admin/products_controller");
const multer=require('multer');
const storageMulter=require('../../helpers/storageMulter');
const validate=require('../../validate/createProduct');
const upload=multer({storage: storageMulter()});// thư mục lưu ảnh khi upload lên, multer thì phải thêm cả public


router.get("/",controller.index)
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/change-multi",controller.changeMulti)
router.delete("/delete/:id",controller.delete);
router.get("/create",controller.create); //render ra giao diện
router.post("/create",
            upload.single('thumbnail'),
            //ko cân dấu (), vì express sẽ xử lý
            validate.createPost// middelware, sẽ check xem dũ liệu gửi lên có ok không thì mới sang bước tiếp theo tạo đối tượng ở control
            ,controller.createPost);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPatch);  
router.get("/detail/:id",controller.detail);                
module.exports=router;