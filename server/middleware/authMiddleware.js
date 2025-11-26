import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Vendor from "../models/vendorModel.js";

// Middleware to protect routes (verify token)
export const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check in User collection
    let user = await User.findById(decoded.id).select("-password");
    if (!user) {
      // If not found in User, check in Vendor collection
      user = await Vendor.findById(decoded.id).select("-password");
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to check roles (user/vendor/admin)
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }
    next();
  };
};
