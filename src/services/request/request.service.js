import Request from "../../models/request/request.model.js";

// Create a new Request
export const createRequest = async (data) => {
  const {Month} = data;
  const exists = await Request.findOne({Month});
  if (exists) throw new Error("A similar request already exists");
  const request = await Request.create(data);
  return request;
};

// Get all Requests for a user
export const getAllRequest = async (userId) => {
  if (!userId) throw new Error("User ID is required");
  const requests = await Request.find({ userId }).sort({ createdAt: -1 });
  return requests;
};

// Get a Request by ID
export const getRequestById = async (id, userId) => {
  if (!userId) throw new Error("User ID is required");
  const request = await Request.findOne({ _id: id, userId });
  if (!request) throw new Error("Request not found");
  return request;
};

// Update a Request by ID
export const updateRequest = async (id, data, userId) => {
  if (!userId) throw new Error("User ID is required");

  const request = await Request.findOneAndUpdate(
    { _id: id, userId },
    data,
    { new: true }
  );

  if (!request) throw new Error("Failed to update request or not authorized");
  return request;
};

// Delete a Request by ID
export const deleteRequest = async (id, userId) => {
  if (!userId) throw new Error("User ID is required");

  const request = await Request.findOneAndDelete({ _id: id, userId });
  if (!request) throw new Error("Failed to delete request or not authorized");

  return { message: "Request deleted successfully" };
};
