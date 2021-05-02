import mongoose from 'mongoose'
import dotenv  from "dotenv"

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_LOCAL_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
        console.log("MongoDB connection successful")
    } catch (error) {
        // console.log(error)
        console.log("MongoDB connection Failed")
        process.exit(1)
    }
}

export default connectDB;