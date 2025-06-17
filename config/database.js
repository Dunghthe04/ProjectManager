require('dotenv').config();
const mongoose = require("mongoose");


// Hàm ktra xem kết nối thành công hay thất bại
//chờ kết nối ==> dùng asyn await
module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect succes");

    } catch (error) {
        console.log("Connect fail");
    }
}