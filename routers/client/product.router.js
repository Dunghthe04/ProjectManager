//express cung cấp 1 hàm router
const express=require("express");
//đại diện cho all route trong file -> sang file khác chỉ cần nhúng router
const router=express.Router();// tạo ra router riêng giúp quản lý đường dẫn, ko cần thao tác trực tiếp vs app(ko cần truyền sang)
const controller=require("../../controller/client/product_controller");
//mọi đường dẫn bắt đầu /product sẽ được xử lý bởi route  trong đây

// (/product/=/product), nếu truy cập đúng đường dẫn ==> gọi hàm controller của product để xử lý
router.get('/',controller.index);
router.get('/detail/:slug',controller.detail);
module.exports=router;