import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  address: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ["scrap", "partyCleaning"],
    required: true,
  },
  scrapDetails: [
    {
      material: { type: String },
      approxKg: { type: Number },
      ratePerKg: { type: Number },
    },
  ],
  estimatedAmount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
