// middleware/vendorAuth.js
import jwt from "jsonwebtoken";
import Vendor from "../models/vendorModel.js";

export const protectVendor = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach vendor to req object
      req.vendor = await Vendor.findById(decoded.id).select("-password");
      if (!req.vendor) {
        return res.status(401).json({ message: "Vendor not found" });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};
