// src/pages/Vendor/VendorDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api"; // your axios instance

const VendorDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/vendor/requests");
      setRequests(res.data || []); // fix: use res.data directly
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (id) => {
    try {
      await api.put(`/vendor/requests/${id}/accept`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async (id) => {
    try {
      await api.put(`/vendor/requests/${id}/complete`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6 mt-5">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Vendor Dashboard
      </h1>

      <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-green-200 text-green-900">
              <th className="p-3">Waste Type</th>
              <th className="p-3">Approx Weight</th>
              <th className="p-3">Address</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  No requests yet.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr
                  key={req._id}
                  className={`border-b transition ${
                    req.status === "accepted" ? "bg-green-50" : ""
                  } ${req.status === "completed" ? "bg-gray-100 text-gray-500" : ""} hover:bg-green-100`}
                >
                  <td className="p-3">{req.wasteType}</td>
                  <td className="p-3">{req.quantity} kg</td>
                  <td className="p-3">
                    {req.address} <br />
                    {req.user?.phone && (
                      <span className="text-sm text-gray-600">
                        {req.user.phone}
                      </span>
                    )}
                  </td>
                  <td className="p-3 capitalize">{req.status}</td>

                  <td className="p-3 flex gap-2">
                    {req.status === "pending" && (
                      <button
                        onClick={() => handleAccept(req._id)}
                        className="px-3 py-1"
                        style={{ color: "black", backgroundColor: "green" }}
                      >
                        Accept
                      </button>
                    )}

                    {req.status === "accepted" && (
                      <button
                        onClick={() => handleComplete(req._id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Complete
                      </button>
                    )}

                    {req.status === "completed" && (
                      <span className="px-3 py-1 bg-gray-300 text-gray-700 rounded">
                        Done
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorDashboard;
