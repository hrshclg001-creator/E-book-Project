import React from "react";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-book-cream flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-10 rounded-sm shadow-xl border border-book-gray/30 text-center animate-fade-in">
        <div className="w-20 h-20 bg-red-100 text-book-rust rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-serif font-bold text-book-text mb-2">
          Payment Failed
        </h1>
        <p className="font-sans text-book-text/60 mb-8">
          We couldn't process your payment. Please check your card details and
          try again.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/payment"
            className="w-full bg-book-rust hover:bg-red-800 text-white font-sans font-medium py-3 rounded-sm transition-colors"
          >
            Try Again
          </Link>
          <Link
            to="/cart"
            className="w-full border border-book-text text-book-text hover:bg-book-gray/10 font-sans font-medium py-3 rounded-sm transition-colors"
          >
            Return to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
