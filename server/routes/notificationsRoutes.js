import express from "express";
import User from "../models/userModel.js";
import { protect } from "../middleware/authMiddleware.js"; // user auth

const router = express.Router();

// Get all notifications for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.notifications.sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Mark a notification as read
router.put("/:id/read", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const notification = user.notifications.id(req.params.id);
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });

    notification.isRead = true;
    await user.save();

    res.json({ message: "Notification marked as read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
