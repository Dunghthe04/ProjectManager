const express=require("express");
const router=express.Router();
const controller=require("../../controller/admin/roles_controller.js");

router.get("/",controller.index);
router.get("/create",controller.create);
router.post("/create",controller.createRole);
router.delete("/delete/:id",controller.delete);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",controller.editPatch);
router.get("/detail/:id",controller.detail);
router.get("/permission",controller.permission);
router.patch("/permission",controller.permissionPatch)
module.exports=router;