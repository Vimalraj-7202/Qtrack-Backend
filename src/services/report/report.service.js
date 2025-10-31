import mongoose from "mongoose";
import Report from "../../models/report/report.model.js";

// Optional: insert 100 mock reports if DB is empty (for testing)
const seedReports = async () => {
  const count = await Report.countDocuments();
  if (count === 0) {
    const mockReports = Array.from({ length: 100 }).map((_, i) => ({
      userId: new mongoose.Types.ObjectId(),
      reportName: `Report ${i + 1}`,
      description: `Description for Report ${i + 1}`,
    }));
    await Report.insertMany(mockReports);
    console.log("Inserted 100 mock reports for testing");
  }
};

export const getPaginatedReports = async (pageNo = 1, pageSize = 10, filters = {}) => {
  try {
    const skip = (pageNo - 1) * pageSize;
    const query = {};

    if (filters.userId) query.userId = filters.userId;
    if (filters.reportName) query.reportName = { $regex: filters.reportName, $options: "i" };
    if (filters.description) query.description = { $regex: filters.description, $options: "i" }
    await seedReports();

    const totalRecordCount = await Report.countDocuments(query);

    const data = await Report.find(query)
      .skip(skip < 0 ? 0 : skip)
      .limit(pageSize > totalRecordCount ? totalRecordCount : pageSize)
      .sort({ reportName: 1 })
      .populate("userId", "name email");

    return { data, totalRecordCount };
  } catch (error) {
    console.error("Error in getPaginatedReports:", error);
    throw error;
  }
};
