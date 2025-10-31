export const reportResponseDto = (data, totalCount, pageNo, pageSize) => {
  const skip = (pageNo - 1) * pageSize;

  return {
    hasNext: skip + data.length < totalCount,
    hasPrevious: pageNo > 1,
    totalRecordCount: totalCount,
    data: data.map((report) => ({
      id: report._id,
      reportName: report.reportName,
      description: report.description,
      user: report.userId
        ? {
            id: report.userId._id,
            name: report.userId.name,
            email: report.userId.email,
          }
        : null,
    })),
  };
};
