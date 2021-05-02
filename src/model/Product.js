import mongoose from 'mongoose'

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
    productCategory:{
        type:[Schema.Types.ObjectId],
        ref: 'categories'
    },
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
        ref: 'users'
    },
    socialMedia:[socialMedia]

});

export default model('product',ProductSchema);