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
        default: 0
    },
    productQuantity:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref: 'user'
    },
    socialMedia:[socialMedia]

});

module.exports = model('product',ProductSchema);