import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  // Mock Cart State
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 299,
      quantity: 1,
      cover:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Deep Learning",
      author: "Ian Goodfellow",
      price: 899,
      quantity: 1,
      cover:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=200&auto=format&fit=crop",
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = Math.round(subtotal * 0.05); // 5% GST mock
  const total = subtotal + tax;

  return (
    <div className="w-full bg-book-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-book-text mb-10 border-b border-book-gray pb-6">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-serif text-book-text/60 mb-6">
              Your cart is empty.
            </h2>
            <Link
              to="/books"
              className="bg-book-teal hover:bg-book-text text-white font-sans px-8 py-3 rounded-sm transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="lg:w-2/3 flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-sm border border-book-gray/30 shadow-sm"
                >
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-24 h-36 object-cover bg-book-gray/20 rounded-sm shadow-sm"
                  />

                  <div className="flex-1 flex flex-col sm:flex-row justify-between w-full">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="font-serif text-xl font-bold text-book-text">
                        {item.title}
                      </h3>
                      <p className="font-sans text-sm text-book-text/60 mb-2">
                        {item.author}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-book-rust hover:underline font-sans font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <span className="font-sans text-lg font-bold text-book-text">
                        ₹{item.price * item.quantity}
                      </span>
                      <div className="flex items-center border border-book-gray rounded-sm h-10 mt-4 sm:mt-0">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-full flex items-center justify-center hover:bg-book-gray/20 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-sans text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-full flex items-center justify-center hover:bg-book-gray/20 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-8 rounded-sm border border-book-gray/30 shadow-sm sticky top-24">
                <h3 className="font-serif text-2xl font-bold text-book-text mb-6">
                  Order Summary
                </h3>
                <div className="space-y-4 font-sans text-book-text/80 text-sm mb-6 pb-6 border-b border-book-gray">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                </div>
                <div className="flex justify-between font-serif text-2xl font-bold text-book-text mb-8">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <button className="w-full bg-book-teal hover:bg-book-text text-white font-sans font-medium py-4 rounded-sm transition-colors duration-300">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
