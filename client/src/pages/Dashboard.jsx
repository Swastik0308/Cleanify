import React, { useEffect, useState } from "react";
import api from "../api/api";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api
      .get("/bookings/my")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h3>My Bookings</h3>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      <ul className="list-group">
        {bookings.map((b) => (
          <li
            key={b._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{b.vendorName}</strong>
              <div>
                <small>{new Date(b.date).toLocaleString()}</small>
              </div>
            </div>
            <span className="badge bg-primary">{b.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
