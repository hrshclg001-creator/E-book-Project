import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Mock Cart Data
  const subtotal = 1198;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax - discount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "BOOKIX20") {
      setDiscount(200);
    } else {
      alert("Invalid Coupon Code");
      setDiscount(0);
    }
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    // Yahan order details state/context mein save karke payment page par bhejenge
    navigate("/payment");
  };

  return (
    <div className="w-full bg-book-cream min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
        {/* Billing Details Form */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-serif font-bold text-book-text mb-8 pb-4 border-b border-book-gray">
            Billing Details
          </h2>
          <form onSubmit={handleProceedToPayment} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-sans text-book-text/80 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-white border border-book-gray/50 rounded-sm px-4 py-3 outline-none focus:border-book-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-sans text-book-text/80 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-white border border-book-gray/50 rounded-sm px-4 py-3 outline-none focus:border-book-teal"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-sans text-book-text/80 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full bg-white border border-book-gray/50 rounded-sm px-4 py-3 outline-none focus:border-book-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-sans text-book-text/80 mb-2">
                Billing Address (Optional for Digital Goods)
              </label>
              <input
                type="text"
                className="w-full bg-white border border-book-gray/50 rounded-sm px-4 py-3 outline-none focus:border-book-teal"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-book-teal hover:bg-book-text text-white font-sans font-medium px-8 py-4 rounded-sm transition-colors duration-300 mt-8"
            >
              Continue to Payment
            </button>
          </form>
        </div>

        {/* Order Summary & Coupon */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-8 rounded-sm shadow-sm border border-book-gray/30 sticky top-24">
            <h3 className="font-serif text-2xl font-bold text-book-text mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6 border-b border-book-gray pb-6">
              <div className="flex justify-between font-sans text-sm">
                <span className="text-book-text/70">The Great Gatsby (x1)</span>
                <span className="font-medium text-book-text">₹299</span>
              </div>
              <div className="flex justify-between font-sans text-sm">
                <span className="text-book-text/70">Deep Learning (x1)</span>
                <span className="font-medium text-book-text">₹899</span>
              </div>
            </div>

            {/* Coupon Input */}
            <form onSubmit={handleApplyCoupon} className="mb-6 flex gap-2">
              <input
                type="text"
                placeholder="Coupon Code (e.g. BOOKIX20)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-book-cream border border-book-gray/50 rounded-sm px-3 py-2 text-sm outline-none focus:border-book-teal uppercase"
              />
              <button
                type="submit"
                className="bg-book-text text-white px-4 py-2 text-sm rounded-sm hover:bg-book-rust transition-colors"
              >
                Apply
              </button>
            </form>

            <div className="space-y-3 font-sans text-sm text-book-text mb-6 pb-6 border-b border-book-gray">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>₹{tax}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-book-teal font-bold">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between font-serif text-3xl font-bold text-book-text">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
