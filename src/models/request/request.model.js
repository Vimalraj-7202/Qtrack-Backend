import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);
export default Request;
