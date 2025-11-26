import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    isVendor: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 500 }}>
      <h3>Register</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            className="form-control"
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            name="isVendor"
            checked={form.isVendor}
            onChange={handleChange}
            type="checkbox"
            className="form-check-input"
            id="isVendor"
          />
          <label className="form-check-label" htmlFor="isVendor">
            Register as a vendor
          </label>
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
