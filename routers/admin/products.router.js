const express=require("express");
const router=express.Router();
const controller=require("../../controller/admin/products_controller");

router.get("/",controller.index)
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/change-multi",controller.changeMulti)
router.delete("/delete/:id",controller.delete);
router.get("/create",controller.create); //render ra giao diện
router.post("/create",controller.createPost);
module.exports=router;