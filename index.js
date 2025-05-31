const express = require("express")
const database=require("./config/database")

const systemConfig=require("./config/system")
//nhận đc hàm bên router(bên đó export ra 1 hàm)-Nhúng file route tổng
const route=require("./routers/client/index.router");
const routeAdmin=require("./routers/admin/index.router");
require('dotenv').config()

//nhúng file đó vào

//gọi hàm connect trong file đó
database.connect();

const app = express()
const port = process.env.PORT;

//Khai báo folder chứa các file view
app.set("views","./views");
//khai báo template engine
app.set("view engine","pug");

//applocal
app.locals.prefixAdmin=systemConfig.prefixAdmin;

//file tĩnh
app.use(express.static("public"));
//Route (gọi hàm ==> thực hiện 2 route trong hàm đó)
route(app);
routeAdmin(app);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})