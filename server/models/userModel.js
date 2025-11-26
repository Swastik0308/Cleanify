import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // this prevents sending password by default
  },
  role: {
    type: String,
    enum: ["user", "vendor"],
    default: "user",
  },
  notifications: [
    {
      type: { type: String }, // e.g., "request_accepted", "request_completed"
      message: String,
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
