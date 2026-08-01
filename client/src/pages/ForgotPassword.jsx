import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API integration to send reset link
    console.log("Sending reset link to:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-book-cream flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-8 sm:p-10 rounded-sm shadow-xl border border-book-gray/30">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-book-teal/10 text-book-teal rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-serif font-bold text-book-text mb-2">
            Forgot Password?
          </h1>
          <p className="text-sm font-sans text-book-text/60">
            {isSubmitted
              ? "We've sent a password reset link to your email."
              : "Enter the email associated with your account and we'll send you a link to reset your password."}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-sans font-medium text-book-text/80 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b border-book-gray focus:border-book-teal py-2 text-book-text outline-none transition-colors"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-book-text hover:bg-book-teal text-white font-sans font-medium py-3.5 rounded-sm transition-colors duration-300"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full border border-book-text text-book-text hover:bg-book-text hover:text-white font-sans font-medium py-3.5 rounded-sm transition-colors duration-300"
          >
            Try another email
          </button>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="text-sm font-sans text-book-teal hover:text-book-rust transition-colors flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
