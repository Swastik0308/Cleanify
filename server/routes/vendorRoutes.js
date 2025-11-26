// routes/vendorRoutes.js
import express from "express";
import Vendor from "../models/vendorModel.js";
import WasteRequest from "../models/WasteRequest.js";
import User from "../models/userModel.js"; // import User model for notifications
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { protectVendor } from "../middleware/vendorAuth.js";

const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ===============================
// Vendor Auth Routes
// ===============================

// Register Vendor
router.post("/register", async (req, res) => {
  try {
    const { name, serviceType, phone, address, email, password } = req.body;

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Vendor already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = await Vendor.create({
      name,
      serviceType,
      phone,
      address,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Vendor registered successfully",
      vendor: {
        _id: newVendor._id,
        name: newVendor.name,
        email: newVendor.email,
        serviceType: newVendor.serviceType,
      },
      token: generateToken(newVendor._id),
    });
  } catch (error) {
    console.error("Vendor registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Vendor Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(400).json({ message: "Vendor not found" });

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      vendor: {
        _id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        serviceType: vendor.serviceType,
      },
      token: generateToken(vendor._id),
    });
  } catch (error) {
    console.error("Vendor login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ===============================
// Vendor Dashboard APIs
// ===============================

// Get all available/assigned requests for the logged-in vendor
router.get("/requests", protectVendor, async (req, res) => {
  try {
    const requests = await WasteRequest.find({
      $or: [{ vendor: null }, { vendor: req.vendor._id }],
    })
      .populate("user", "name email") // include user info
      .sort({ createdAt: -1 });

    res.json(requests); // return array directly
  } catch (error) {
    console.error("Get requests error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Accept a request
router.put("/requests/:id/accept", protectVendor, async (req, res) => {
  try {
    const request = await WasteRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (
      request.vendor &&
      request.vendor.toString() !== req.vendor._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Already assigned to another vendor" });
    }

    request.vendor = req.vendor._id;
    request.status = "accepted";
    await request.save();

    // ===== Notify user =====
    const user = await User.findById(request.user);
    if (user) {
      user.notifications.push({
        type: "request_accepted",
        message: `Your request for ${request.wasteType} has been accepted by ${req.vendor.name}.`,
      });
      await user.save();
    }

    res.json({ message: "Request accepted" });
  } catch (error) {
    console.error("Accept request error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Complete a request
router.put("/requests/:id/complete", protectVendor, async (req, res) => {
  try {
    const request = await WasteRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.vendor?.toString() !== req.vendor._id.toString()) {
      return res
        .status(403)
        .json({ message: "You cannot complete others' requests" });
    }

    request.status = "completed";
    await request.save();

    // ===== Notify user =====
    const user = await User.findById(request.user);
    if (user) {
      user.notifications.push({
        type: "request_completed",
        message: `Your request for ${request.wasteType} has been completed by ${req.vendor.name}.`,
      });
      await user.save();
    }

    res.json({ message: "Request marked completed" });
  } catch (error) {
    console.error("Complete request error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
