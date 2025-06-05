const express=require("express");
const router=express.Router();
const controller=require("../../controller/admin/recycle_controller");

router.get("/",controller.index)
router.patch("/:id",controller.recycle);
module.exports=router;