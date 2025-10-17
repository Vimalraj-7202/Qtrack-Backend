import mongoose from 'mongoose';

const fileSchema=new mongoose.Schema({
fileName:{
    type:String,
    required:true
},
filePath:{
    type:String,
    required:true
},
fileType:{
    type:String
},
fileSize:{
    type:Number
},
uploadedBy:{
    type:mongoose.Schema.Types.ObjectId,ref:"User"
}
},{
    timestamps:true
})

const File=mongoose.model("File",fileSchema);
export default File;