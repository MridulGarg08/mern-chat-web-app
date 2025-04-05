import mongoose from 'mongoose'

const connectMongo= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connected To MongoDB");
    } catch (error) {
        console.log("Error Connecting MongoDB:",error.message)
    }
}

export default connectMongo;

