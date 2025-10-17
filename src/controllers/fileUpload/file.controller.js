import path from 'path';
import fs from 'fs';
import { fileUpload,getAllFiles,getFileById,deleteFile,getUploadByName } from '../../services/fileUpload/file.service.js';
 
//upload file
export const uploadFile=async(req,res)=>{
    try{
        if(!req.file) return res.status(400).json({message:'No file uploaded'});
        const {filename,path:filePath,mimetype,size}=req.file;
        const uploadData=await fileUpload({
            fileName:filename,
            filePath,
            fileType:mimetype,
            fileSize:size,
            uploadedBy:req.user?.id
        })
        res.status(200).json({message:'File uploaded successfully',data:uploadData});
    }catch(err){
        res.status(500).json({message:'upload failed',err})

    }
}

//getAll files
export const getAllFile=async(req,res)=>{
    try{
        const files=await getAllFiles();
        res.status(200).json(files)
    }catch(err){
        res.status(500).json({message:'Failed to get files',err})
    }
}

//getFileById
export const getFilesById=async(req,res)=>{
    try{
        const {id}=req.params;
         const file=await getFileById(id);
         if(!file) return res.status(400).json({message:'File not found'});
         res.status(200).json(file)
    }catch(err){
res.status(500).json({message:'Error in fetching file',err})
    }
}

//delete file
export const deleteFiles = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteFile(id);
    if (!deleted) return res.status(404).json({ message: "File not found" });
    // Remove file from disk
    if (fs.existsSync(deleted.filePath)) fs.unlinkSync(deleted.filePath);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting file", err });
  }
};

//preview file
export const previewFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const file = await getUploadByName(filename);
    if (!file) return res.status(404).json({ message: "File not found" });

    const filePath = path.resolve(file.filePath);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File missing on server" });

    const ext = path.extname(filename).toLowerCase();
    const contentTypes = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".pdf": "application/pdf",
      ".txt": "text/plain",
    };

    res.setHeader("Content-Type", contentTypes[ext] || "application/octet-stream");
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error previewing file", err });
  }
};

// Download file by filename
export const downloadFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const file = await getUploadByName(filename);
    if (!file) return res.status(404).json({ message: "File not found" });

    const filePath = path.resolve(file.filePath);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File missing on server" });

    res.download(filePath, filename);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error downloading file", err });
  }
};