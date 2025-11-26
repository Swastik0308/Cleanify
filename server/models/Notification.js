import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "recipientModel", // can be either User or Vendor
    required: true,
  },
  recipientModel: {
    type: String,
    enum: ["User", "Vendor"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
