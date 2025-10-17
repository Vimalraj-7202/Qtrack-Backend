import File from "../../models/fileUpload/file.model.js";

//upload file
export const fileUpload=async(data)=>{
    const upload=new File(data);
    return await upload.save();
}

//getall file
export const getAllFiles=async()=>{
    return await File.find().sort({createdAt:-1})
}

//getFile ById
export const getFileById=async(id)=>{
    return await File.findById(id);
}

//delete file
export const deleteFile=async(id)=>{
    return await File.findByIdAndDelete(id);
}

//getUploadByName
export const getUploadByName = async (filename) => {
  return await File.findOne({ fileName: filename });
};
