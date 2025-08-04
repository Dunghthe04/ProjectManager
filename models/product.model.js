const mongoose = require("mongoose");
var slug=require('mongoose-slug-updater');
mongoose.plugin(slug);

const schema = new mongoose.Schema({
    title: String,
    category:{
        type: String,
        default: ""
    },
    description: String,
    category :String,
    price:Number,
    discountPercentage:Number,
    stock: Number,
    brand: String,
    thumbnail :String,
    position:Number,
    slug:{
        type: String,
        slug: "title",
        unique:true
    },
    createBy:{
       account_id: String,
       createAt:{
        type: Date,
        default: Date.now
       }
    },
    deleted:{
        type: Boolean,
        default: false
    },
    
    status:String,
    deletedTime:Date
},{ timestamps: true })
const Product = mongoose.model('Product', schema, "products")

module.exports = Product;