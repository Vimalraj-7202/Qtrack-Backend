import express from "express";
import multer from "multer";
import path from "path";
import {uploadFile,getAllFile,getFilesById,deleteFiles,previewFile,downloadFile} from "../controllers/fileUpload/file.controller.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    ),
});
const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/uploads", getAllFile);
router.get("/upload/:id", getFilesById);
 router.delete("/upload/:id", deleteFiles);
// Preview & download by filename
router.get("/view/:filename", previewFile);
router.get("/download/:filename", downloadFile);

export default router;
