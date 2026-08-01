import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // Extract reset token from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // API integration to submit new password using 'token'
    console.log("Resetting password with token:", token);
    alert(
      "Password successfully reset! Please login with your new credentials.",
    );
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-book-cream flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-8 sm:p-10 rounded-sm shadow-xl border border-book-gray/30">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-book-text mb-2">
            Set New Password
          </h1>
          <p className="text-sm font-sans text-book-text/60">
            Please enter your new password below. Make sure it's at least 8
            characters long.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-sans font-medium text-book-text/80 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
              className="w-full bg-transparent border-b border-book-gray focus:border-book-teal py-2 text-book-text outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-sans font-medium text-book-text/80 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="8"
              className="w-full bg-transparent border-b border-book-gray focus:border-book-teal py-2 text-book-text outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-book-teal hover:bg-book-text text-white font-sans font-medium py-3.5 rounded-sm transition-colors duration-300 mt-4"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
