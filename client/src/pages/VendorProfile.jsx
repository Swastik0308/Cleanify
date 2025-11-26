import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import Loader from "../components/Loader";

export default function VendorProfile() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/vendors/${id}`)
      .then((res) => setVendor(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!vendor)
    return <div className="alert alert-warning">Vendor not found</div>;

  return (
    <div>
      <h2>{vendor.name}</h2>
      <p>{vendor.description}</p>
      <p>
        <strong>Contact:</strong> {vendor.contact || "-"}
      </p>
      <p>
        <strong>Location:</strong> {vendor.location}
      </p>
      <p>
        <strong>Services:</strong> {vendor.services?.join(", ")}
      </p>

      <Link className="btn btn-primary" to={`/booking/${vendor._id}`}>
        Book Pickup
      </Link>
    </div>
  );
}
