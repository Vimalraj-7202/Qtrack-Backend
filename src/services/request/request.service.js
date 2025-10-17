import Request from "../../models/request/request.model.js";

// CreateRequest
export const createRequest = async ({ year, period, amount, name, userId }) => {
  if (!userId) throw new Error("User ID is required");
  const exists = await Request.findOne({ name, userId });
  if (exists) throw new Error(`A Request with name '${name}' already exists`);
  const request = await Request.create({ year, period, amount, name, userId });
  return {
    _id: request._id,
    year: request.year,
    period: request.period,
    amount: request.amount,
    name: request.name,
  };
};

// GetAllRequest
export const getAllRequest = async (userId) => {
  if (!userId) throw new Error("User ID is required");
  const requests = await Request.find({ userId }).sort({ createdAt: -1 });
  if (!requests || requests.length === 0) throw new Error("No Requests found");
  return requests.map((r) => ({
    _id: r._id,
    year: r.year,
    period: r.period,
    amount: r.amount,
    name: r.name,
  }));
};

// GetRequestById
export const getRequestById = async (id, userId) => {
  if (!userId) throw new Error("User ID is required");
  const request = await Request.findOne({ _id: id, userId });
  if (!request) throw new Error("Request not found");
  return {
    _id: request._id,
    year: request.year,
    period: request.period,
    amount: request.amount,
    name: request.name,
  };
};

// UpdateRequest
export const updateRequest = async (id, data, userId) => {
  if (!userId) throw new Error("User ID is required");
  const request = await Request.findOneAndUpdate({ _id: id, userId }, data, {
    new: true,
  });
  if (!request) throw new Error("Failed to update request or not authorized");
  return {
    _id: request._id,
    year: request.year,
    period: request.period,
    amount: request.amount,
    name: request.name,
  };
};

// DeleteRequest
export const deleteRequest = async (id, userId) => {
  if (!userId) throw new Error("User ID is required");
  const request = await Request.findOneAndDelete({ _id: id, userId });
  if (!request) throw new Error("Failed to delete request or not authorized");
  return;
};
