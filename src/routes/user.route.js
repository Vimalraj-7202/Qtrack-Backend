import express from "express";
import {
  register,
  login,
  getProfile,
  adminRoute,
} from "../controllers/auth/user.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/getProfile", verifyToken, getProfile);
router.get("/admin", verifyToken, authorize("Admin"), adminRoute);

export default router;
