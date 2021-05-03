const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const ContactSchema = new Schema({
    address:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    }
});

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contactInfo:[ContactSchema],
    date : {
        type: Date,
        default: Date.now
    }
});


module.exports = model('user',UserSchema);