const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: String,
    description: String,
    category :String,
    price:Number,
    discountPercentage:Number,
    stock: Number,
    brand: String,
    thumbnail :String,
    position:Number,
    deleted:Boolean,
    status:String,
    deletedTime:Date
})
const Product = mongoose.model('Product', schema, "products")

module.exports = Product;