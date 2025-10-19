import express from "express";
import {newRequest,editRequest,removeRequest,getRequests,getRequest} from "../controllers/request/request.controller.js";
import { verifyToken } from "../middleware/auth.js";
 
const router = express.Router();
router.post("/newRequest",verifyToken,newRequest);
router.put("/updateRequest/:id",verifyToken, editRequest);
router.delete("/deleteRequest/:id", verifyToken,removeRequest);
router.get("/getAllRequests",verifyToken, getRequests);
router.get("/getRequest/:id",verifyToken,getRequest);

export default router;

















