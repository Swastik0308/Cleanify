import express from "express";
import {
  createWasteRequest,
  getUserRequests,
  getVendorRequests,
  updateRequestStatus,
} from "../controllers/wasteRequestController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// User creates booking (waste pickup request)
router.post("/create", protect, authorize("user"), createWasteRequest);

// User views their bookings
router.get("/user", protect, authorize("user"), getUserRequests);

// Vendor views assigned or pending bookings
router.get("/vendor", protect, authorize("vendor"), getVendorRequests);

// Vendor updates booking status (accept/reject/complete)
router.put("/:id/status", protect, authorize("vendor"), updateRequestStatus);

export default router;
