const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports = model('category',CategorySchema)