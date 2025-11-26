//wasteRequestController.js

import WasteRequest from "../models/WasteRequest.js";

export const createWasteRequest = async (req, res) => {
  try {
    // Required fields validation (extra safety)
    const { wasteType, quantity, address, pickupDate } = req.body;
    if (!wasteType || quantity === undefined || quantity === null || !address) {
      return res
        .status(400)
        .json({ message: "wasteType, quantity and address are required" });
    }

    // Create request: match model fields exactly
    const request = await WasteRequest.create({
      user: req.user._id,
      wasteType,
      quantity,
      address,
      pickupDate: pickupDate ? new Date(pickupDate) : undefined,
    });

    return res.status(201).json({ success: true, request });
  } catch (error) {
    console.error("createWasteRequest error:", error);
    // If it's a mongoose validation error, forward the useful message
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

// Get all requests of a user
export const getUserRequests = async (req, res) => {
  try {
    const requests = await WasteRequest.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching requests", error: error.message });
  }
};

// Get all requests for vendor (pending or assigned to them)
export const getVendorRequests = async (req, res) => {
  try {
    const requests = await WasteRequest.find({
      $or: [{ status: "pending" }, { vendor: req.user.id }],
    }).populate("user", "name email");
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching vendor requests",
      error: error.message,
    });
  }
};

// Update request status (accept, complete, reject)
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, pickupDate } = req.body;

    const request = await WasteRequest.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (status) request.status = status;
    if (pickupDate) request.pickupDate = pickupDate;
    if (status === "accepted" && !request.vendor) request.vendor = req.user.id;

    await request.save();
    res.status(200).json({ message: "Request updated successfully", request });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating request", error: error.message });
  }
};
