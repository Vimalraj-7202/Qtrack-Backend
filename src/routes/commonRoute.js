import express from "express";
import authRoute from "../routes/user.route.js";

const router = express.Router();
router.use("/", authRoute);

export default router;
