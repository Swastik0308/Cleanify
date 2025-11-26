import User from "../models/userModel.js";

// Get all vendors
export const getVendors = async (req, res) => {
  try {
    const vendors = await User.find({ role: "vendor" }).select("-password");
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get vendor by ID
export const getVendorById = async (req, res) => {
  try {
    const vendor = await User.findById(req.params.id).select("-password");
    if (!vendor || vendor.role !== "vendor")
      return res.status(404).json({ message: "Vendor not found" });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update vendor profile
export const updateVendorProfile = async (req, res) => {
  try {
    const updatedVendor = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    }).select("-password");
    res.json(updatedVendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
