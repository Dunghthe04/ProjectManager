const mongoose = require("mongoose");
const genarateToken=require("../helpers/genarate");
const schemaAccount= new mongoose.Schema({
       fullName:String,
       email: String,
       password: String,
       token:{
        type:String,
        default:genarateToken.genarateRandomString(20)
       },
       phone: String,
       avatar: String,
       role_id: String,
       status:String,
       deleted:{
           type: Boolean,
           default: false
       },
       deletedTime:Date
},{ timestamps: true })
const ProductCategory = mongoose.model('Account', schemaAccount, "account")

module.exports = ProductCategory;

