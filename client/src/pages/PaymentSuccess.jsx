import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-book-cream flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-10 rounded-sm shadow-xl border border-book-gray/30 text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-serif font-bold text-book-text mb-2">
          Payment Successful!
        </h1>
        <p className="font-sans text-book-text/60 mb-8">
          Thank you for your purchase. Your digital books are now available in
          your library.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/invoice/ORD-12345"
            className="w-full bg-book-teal hover:bg-book-text text-white font-sans font-medium py-3 rounded-sm transition-colors"
          >
            View Invoice
          </Link>
          <Link
            to="/dashboard"
            className="w-full border border-book-text text-book-text hover:bg-book-gray/10 font-sans font-medium py-3 rounded-sm transition-colors"
          >
            Go to My Library
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
