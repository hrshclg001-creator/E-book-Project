import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    // API integration for registration will go here
    console.log("Register attempt:", formData);
  };

  return (
    <div className="flex min-h-screen bg-book-cream flex-row-reverse">
      {/* Right Side - Image Showcase */}
      <div className="hidden lg:block lg:w-1/2 relative bg-book-gray">
        <img
          src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop"
          alt="Vintage books aesthetic"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-book-rust/20 mix-blend-multiply"></div>
        <div className="absolute bottom-12 right-12 text-white max-w-md text-right">
          <h2 className="font-serif text-4xl font-bold mb-4">
            Join BookVerse.
          </h2>
          <p className="font-sans text-white/80 text-lg">
            Create an account to save your favorites, track your reading, and
            access premium digital formats.
          </p>
        </div>
      </div>

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-serif font-bold text-book-text mb-2">
              Create Account
            </h1>
            <p className="text-book-text/60 font-sans">
              Join our community of readers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-sans font-medium text-book-text/80 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-book-gray focus:border-book-teal py-2 text-book-text outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-sans font-medium text-book-text/80 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-book-gray focus:border-book-teal py-2 text-book-text outline-none transition-colors"
                placeholder="reader@bookverse.com"
              />
            </div>

            <div>
              <label className="block text-sm font-sans font-medium text-book-text/80 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-book-gray focus:border-book-teal py-2 text-book-text outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-sans font-medium text-book-text/80 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-book-gray focus:border-book-teal py-2 text-book-text outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-book-text hover:bg-book-teal text-white font-sans font-medium py-3.5 rounded-sm transition-colors duration-300 mt-6"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-center font-sans text-sm text-book-text/70">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-book-teal font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
