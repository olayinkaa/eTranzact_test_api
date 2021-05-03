import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator'
const {Schema,model} = mongoose;

const CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
})

// CategorySchema.plugin(uniqueValidator,{
//     type: 'mongoose-unique-validator',
//     message: 'Error, expected {PATH} to be unique.'
// })
export default model('category',CategorySchema)

// "type": "module",
