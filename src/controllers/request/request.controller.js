import {
  createRequest,
  updateRequest,
  deleteRequest,
  getAllRequest,
  getRequestById,
} from "../../services/request/request.service.js";

// Helper to get userId from verified token
const getUserId = (req) => req.user?.id;

// CREATE
export const newRequest = async (req, res) => {
  try {
    const userId = getUserId(req);
    const request = await createRequest({ ...req.body, userId });
    res.status(200).json({
      message: "Request created successfully",
      data: request
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// UPDATE
export const editRequest = async (req, res) => {
  try {
    const userId = getUserId(req);
    const request = await updateRequest(req.params.id, req.body, userId);

    res.status(200).json({
      message: "Request updated successfully",
      data: request,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE
export const removeRequest = async (req, res) => {
  try {
    const userId = getUserId(req);
    await deleteRequest(req.params.id, userId);

    res.status(200).json({
      success: true,
      message: "Request deleted successfully",
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// GET ALL
export const getRequests = async (req, res) => {
  try {
    const userId = getUserId(req);
    const requests = await getAllRequest(userId);

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET BY ID
export const getRequest = async (req, res) => {
  try {
    const userId = getUserId(req);
    const request = await getRequestById(req.params.id, userId);

    res.status(200).json({ success: true, data: request });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};
