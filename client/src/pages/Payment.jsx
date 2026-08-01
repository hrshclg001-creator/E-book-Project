import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Mocking API delay
    setTimeout(() => {
      // Logic: 90% chance of success for mock purposes
      const isSuccess = Math.random() > 0.1;
      setIsProcessing(false);

      if (isSuccess) {
        navigate("/payment-success");
      } else {
        navigate("/payment-failed");
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-book-cream flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full p-8 sm:p-10 rounded-sm shadow-xl border border-book-gray/30">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-book-text mb-2">
            Secure Payment
          </h1>
          <p className="text-sm font-sans text-book-text/60">
            Amount to pay:{" "}
            <span className="font-bold text-book-text">₹1058.00</span>
          </p>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          {/* Card Mock UI */}
          <div>
            <label className="block text-sm font-sans font-bold text-book-text/80 mb-2">
              Card Number
            </label>
            <input
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              required
              maxLength="19"
              className="w-full bg-book-gray/10 border border-book-gray/50 rounded-sm px-4 py-3 outline-none focus:border-book-teal font-mono tracking-widest"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-sans font-bold text-book-text/80 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                required
                maxLength="5"
                className="w-full bg-book-gray/10 border border-book-gray/50 rounded-sm px-4 py-3 outline-none focus:border-book-teal font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-bold text-book-text/80 mb-2">
                CVV
              </label>
              <input
                type="password"
                placeholder="•••"
                required
                maxLength="3"
                className="w-full bg-book-gray/10 border border-book-gray/50 rounded-sm px-4 py-3 outline-none focus:border-book-teal font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-sans font-bold text-book-text/80 mb-2">
              Name on Card
            </label>
            <input
              type="text"
              placeholder="John Doe"
              required
              className="w-full bg-book-gray/10 border border-book-gray/50 rounded-sm px-4 py-3 outline-none focus:border-book-teal"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-book-text hover:bg-book-teal text-white font-sans font-medium py-4 rounded-sm transition-colors duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              "Pay ₹1058.00"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-book-text/40 font-sans mt-6">
          🔒 Payments are securely encrypted and processed.
        </p>
      </div>
    </div>
  );
};

export default Payment;
