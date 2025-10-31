import express from "express";
import { getAllReports } from "../controllers/report/report.controller.js";

const router=express.Router();
router.get('/overallReport',getAllReports);

export default router;