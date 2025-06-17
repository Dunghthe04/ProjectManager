const mongoose = require("mongoose");
var slug=require('mongoose-slug-updater');
mongoose.plugin(slug);

const schemaProductCategory= new mongoose.Schema({
       title: String,
       parrent_id:{
        type: String,
        default: ""
       },
       description: String,
       thumbnail :String,
       position:Number,
       slug:{
           type: String,
           slug: "title",
           unique:true
       },
       deleted:{
           type: Boolean,
           default: false
       },
       status:String,
       deletedTime:Date
},{ timestamps: true })
const ProductCategory = mongoose.model('ProductCategory', schemaProductCategory, "products-category")

module.exports = ProductCategory;