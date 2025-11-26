import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Booking() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ date: "", time: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/vendors/${vendorId}/book`, form); // backend endpoint
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 600 }}>
      <h3>Book Pickup</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            required
            name="date"
            value={form.date}
            onChange={handleChange}
            type="date"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            required
            name="time"
            value={form.time}
            onChange={handleChange}
            type="time"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Notes (optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="form-control"
            rows="3"
          ></textarea>
        </div>
        <button disabled={loading} className="btn btn-primary">
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
