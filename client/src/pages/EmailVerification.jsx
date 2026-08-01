import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EmailVerification = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'

  useEffect(() => {
    // Yahan actual API call aayegi jo token verify karegi
    // Abhi ke liye hum timeout se mock kar rahe hain
    const verifyToken = setTimeout(() => {
      if (token) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 2000);

    return () => clearTimeout(verifyToken);
  }, [token]);

  return (
    <div className="min-h-screen bg-book-cream flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-8 sm:p-10 rounded-sm shadow-xl border border-book-gray/30 text-center">
        {status === "loading" && (
          <div>
            <div className="w-16 h-16 border-4 border-book-gray border-t-book-teal rounded-full animate-spin mx-auto mb-6"></div>
            <h1 className="text-2xl font-serif font-bold text-book-text mb-2">
              Verifying Email...
            </h1>
            <p className="text-sm font-sans text-book-text/60">
              Please wait while we confirm your email address.
            </p>
          </div>
        )}

        {status === "success" && (
          <div>
            <div className="w-16 h-16 bg-book-teal/10 text-book-teal rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-serif font-bold text-book-text mb-2">
              Email Verified!
            </h1>
            <p className="text-sm font-sans text-book-text/60 mb-8">
              Your account has been successfully verified. You can now access
              all features.
            </p>
            <Link
              to="/login"
              className="inline-block w-full bg-book-teal hover:bg-book-text text-white font-sans font-medium py-3.5 rounded-sm transition-colors duration-300"
            >
              Proceed to Login
            </Link>
          </div>
        )}

        {status === "error" && (
          <div>
            <div className="w-16 h-16 bg-book-rust/10 text-book-rust rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-serif font-bold text-book-text mb-2">
              Verification Failed
            </h1>
            <p className="text-sm font-sans text-book-text/60 mb-8">
              The verification link is invalid or has expired. Please request a
              new one.
            </p>
            <Link
              to="/login"
              className="inline-block w-full border border-book-text text-book-text hover:bg-book-text hover:text-white font-sans font-medium py-3.5 rounded-sm transition-colors duration-300"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
