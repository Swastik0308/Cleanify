import React from "react";
import { Link } from "react-router-dom";

export default function VendorCard({ vendor }) {
  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{vendor.name}</h5>
        <p className="card-text flex-fill">
          {vendor.description || "No description"}
        </p>
        <p className="mb-1">
          <strong>Location:</strong> {vendor.location || "N/A"}
        </p>
        <p className="mb-3">
          <strong>Services:</strong> {vendor.services?.join(", ") || "General"}
        </p>
        <div className="mt-auto d-flex gap-2">
          <Link
            to={`/vendor/${vendor._id}`}
            className="btn btn-outline-primary btn-sm"
          >
            View
          </Link>
          <Link
            to={`/booking/${vendor._id}`}
            className="btn btn-primary btn-sm"
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}
