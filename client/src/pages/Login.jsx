import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      // Context ka login function call karein[cite: 3]
      await login(formData.email, formData.password);

      toast.success("Welcome back to BookVerse!");
      navigate("/dashboard"); // Login ke baad seedha dashboard par bhej dein
    } catch (error) {
      // Agar backend 'isEmailVerified' false hone par 401 throw karta hai[cite: 4]
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Invalid email or password";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-book-cream">
      {/* Left Side - Image Showcase */}
      <div className="hidden lg:block lg:w-1/2 relative bg-book-gray">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop"
          alt="Library aesthetic"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-book-teal/20 mix-blend-multiply"></div>
        <div className="absolute bottom-12 left-12 text-white max-w-md">
          <h2 className="font-serif text-4xl font-bold mb-4">Welcome Back.</h2>
          <p className="font-sans text-white/80 text-lg">
            Continue your journey through our curated collection of timeless
            stories and technical masterpieces.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-serif font-bold text-book-text mb-2">
              Sign In
            </h1>
            <p className="text-book-text/60 font-sans">
              Enter your details to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-sans font-medium text-book-text/80 mb-2">
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-sans font-medium text-book-text/80">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-sans text-book-teal hover:text-book-rust transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
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

            <button
              type="submit"
              className="w-full bg-book-text hover:bg-book-teal text-white font-sans font-medium py-3.5 rounded-sm transition-colors duration-300 mt-8"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center font-sans text-sm text-book-text/70">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-book-teal font-medium hover:underline"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
