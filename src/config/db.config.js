import mongoose from "mongoose";

const ConnectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected successfully');
    }catch(error){
        console.error('MongoDb connection error',error.message)
        process.exit(1)
    }
}

export default ConnectDB;