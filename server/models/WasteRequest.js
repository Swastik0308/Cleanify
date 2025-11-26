import mongoose from "mongoose";

const wasteRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    wasteType: {
      type: String,
      enum: [
        "paper",
        "plastic",
        "steel",
        "electronics",
        "aluminium",
        "copper",
        "glass",
        "organic",
        "ewaste",
        "partyCleaning",
        "scrap",
        "other",
      ],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "rejected"],
      default: "pending",
    },
    pickupDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const WasteRequest = mongoose.model("WasteRequest", wasteRequestSchema);
export default WasteRequest;
