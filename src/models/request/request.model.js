import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    Fyear: {
      type: String,
      required: true,
    },
    Month: {
      type: String,
      required: true,
    },
    QC: {
      type: String,
      required: true,
    },
    Plant: {
      type: String,
      required: true,
    },
    Division: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    QTCode: {
      type: String,
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);
export default Request;
