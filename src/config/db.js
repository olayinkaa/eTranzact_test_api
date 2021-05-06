const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:true
        })
        console.log("MongoDB connection successful")
    } catch (error) {
        // console.log(error)
        console.log("MongoDB connection Failed")
        process.exit(1)
    }
}

module.exports = connectDB;