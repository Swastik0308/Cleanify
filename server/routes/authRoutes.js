import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get profile (protected)
router.get("/profile", protect, getProfile);

export default router;
