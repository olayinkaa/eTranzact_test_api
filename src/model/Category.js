import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
})

export default model('category',CategorySchema)