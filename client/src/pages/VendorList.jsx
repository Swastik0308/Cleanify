import React, { useEffect, useState } from "react";
import api from "../api/api";
import VendorCard from "../components/VendorCard";
import Loader from "../components/Loader";

export default function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await api.get("/vendors"); // backend: GET /api/vendors
        setVendors(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load vendors.");
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2 className="mb-4">Local Vendors</h2>
      <div className="row g-3">
        {vendors.length === 0 && <p>No vendors found.</p>}
        {vendors.map((v) => (
          <div key={v._id} className="col-12 col-md-6 col-lg-4">
            <VendorCard vendor={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
