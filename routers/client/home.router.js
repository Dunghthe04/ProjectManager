const express=require("express");
const router=express.Router();// tạo ra router riêng giúp quản lý đường dẫn, ko cần thao tác trực tiếp vs app(ko cần truyền sang)
const controller=require("../../controller/client/home_controller")
// //mọi đường dẫn bắt đầu /product sẽ được xử lý bởi route  trong đây

// (/), khi truy cập router này ==> hàm controller tương ứng gọi
router.get('/',controller.index);


// module.exports=router;
module.exports=router;