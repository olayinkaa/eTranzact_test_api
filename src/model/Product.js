const mongoose = require('mongoose');

const {Schema,model} = mongoose;

const socialMedia = new Schema({
    name:String,
    url:String
})

const ProductSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productImageUrl:{
        type:String,
        required:true
    },
    category:[
        {
            type: Schema.Types.ObjectId,
            ref: 'category'
        }
    ],
    bestSeller:{
        type:Boolean,
        default:false
    },
    hotSale:{
        type:Number,
        enum:[0,1],
        default: 0
    },
    productQuantity:Number,
    productPrice:{
        type:Number,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'user'
    },
    socialMedia:[socialMedia]

},{timestamps: true});

module.exports = model('product',ProductSchema);