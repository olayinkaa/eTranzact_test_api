const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = model('category',CategorySchema)