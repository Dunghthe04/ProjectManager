const express = require("express")
const database=require("./config/database")

const systemConfig=require("./config/system")
//nhận đc hàm bên router(bên đó export ra 1 hàm)-Nhúng file route tổng
const route=require("./routers/client/index.router");
const routeAdmin=require("./routers/admin/index.router");
var methodOverride = require('method-override')
require('dotenv').config()

//nhúng file đó vào

//gọi hàm connect trong file đó
database.connect();

const app = express()
const port = process.env.PORT;
app.use(methodOverride('_method'))
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash=require('express-flash')
app.use(bodyParser.urlencoded())
//Khai báo folder chứa các file view
app.set("views",`${__dirname}/views`);
//khai báo template engine
app.set("view engine","pug");

//flash
app.use(cookieParser('XYYDGDBSDS'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//applocal
app.locals.prefixAdmin=systemConfig.prefixAdmin;

//file tĩnh
app.use(express.static(`${__dirname}/public`));
//Route (gọi hàm ==> thực hiện 2 route trong hàm đó)
route(app);
routeAdmin(app);



// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

module.exports = app;