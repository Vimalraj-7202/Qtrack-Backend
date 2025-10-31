import mongoose from "mongoose";
import { getPaginatedReports } from "../../services/report/report.service.js";
import { reportResponseDto } from "../../dto/report.dto.js";

const generateRandomUserId=()=>{
    return Math.floor(100000000+Math.random()*900000000).toString();
}
export const getAllReports = async (req, res) => {
  try {
    const pageNo = parseInt(req.query.pageNo);
    const pageSize = parseInt(req.query.pageSize);

    const filters = {
      ...(req.query.userId||generateRandomUserId),
      ...(req.query.reportName && { reportName: req.query.reportName }),
      ...(req.query.description && { description: req.query.description }),
    };

    // If no pagination params, return all
    if (!pageNo || !pageSize) {
      const { data, totalRecordCount } = await getPaginatedReports(1, 9999, filters);
      const response = reportResponseDto(data, totalRecordCount, 1, totalRecordCount);
      return res.status(200).json(response);
    }

    // Paginated fetch
    const { data, totalRecordCount } = await getPaginatedReports(pageNo, pageSize, filters);
    const response = reportResponseDto(data, totalRecordCount, pageNo, pageSize);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getAllReports:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
