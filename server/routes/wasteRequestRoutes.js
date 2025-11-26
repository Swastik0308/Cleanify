import express from "express";
import WasteRequest from "../models/WasteRequest.js";
import { protect } from "../middleware/authMiddleware.js"; // user auth

const router = express.Router();

// CREATE NEW WASTE REQUEST
router.post("/create", protect, async (req, res) => {
  try {
    const { wasteType, quantity, address, pickupDate } = req.body;

    const newRequest = await WasteRequest.create({
      user: req.user._id, // take user from token
      vendor: null, // no vendor assigned yet
      wasteType,
      quantity,
      address,
      pickupDate,
      status: "pending",
    });

    res.status(201).json({ message: "Request created", request: newRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
