import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const vendorToken = localStorage.getItem("vendorToken");

  useEffect(() => {
    if (!vendorToken) {
      navigate("/vendor/login");
    } else {
      fetchRequests();
    }
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/vendor/requests", {
        headers: { Authorization: `Bearer ${vendorToken}` },
      });
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  const acceptRequest = async (id) => {
    await fetch(`http://localhost:5000/api/vendor/requests/${id}/accept`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${vendorToken}` },
    });
    fetchRequests();
  };

  const completeRequest = async (id) => {
    await fetch(`http://localhost:5000/api/vendor/requests/${id}/complete`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${vendorToken}` },
    });
    fetchRequests();
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-success">Vendor Dashboard</h2>
      <table className="table table-striped table-bordered">
        <thead className="bg-success text-white">
          <tr>
            <th>User Name</th>
            <th>Phone</th>
            <th>Scrap Type</th>
            <th>Quantity (kg)</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.user.name}</td>
              <td>{req.user.phone}</td>
              <td>{req.wasteType}</td>
              <td>{req.quantity}</td>
              <td>{req.address}</td>
              <td>{req.status}</td>
              <td>
                {req.status === "pending" && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => acceptRequest(req._id)}
                  >
                    Accept
                  </button>
                )}
                {req.status === "accepted" &&
                  req.vendor ===
                    JSON.parse(localStorage.getItem("vendorInfo"))._id && (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => completeRequest(req._id)}
                    >
                      Complete
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorDashboard;
