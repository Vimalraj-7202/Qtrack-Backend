import express from "express";
import authRoute from "../routes/user.route.js";
import requestRoute from "../routes/request.route.js";
import fileUploadRoute from "../routes/file.route.js";
const router = express.Router();
router.use("/", authRoute);
router.use("/",requestRoute);
router.use("/",fileUploadRoute);

export default router;
