import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden bg-book-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <p className="text-sm font-sans font-bold tracking-widest text-book-text/60 uppercase mb-4">
                The BookVerse Editors'
              </p>
              <h1 className="text-5xl lg:text-7xl font-serif font-medium text-book-text leading-tight mb-6">
                Meet Your Next <br /> Favorite Book.
              </h1>
              <p className="text-lg text-book-text/80 font-sans mb-10 max-w-lg">
                Discover curated collections, from timeless classics to modern
                bestsellers. Elevate your reading experience with our premium
                selection.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/books"
                  className="bg-book-teal hover:bg-book-teal-dark text-white font-sans px-8 py-3.5 rounded-full transition-colors duration-300"
                >
                  Explore Books &rarr;
                </Link>
              </div>
            </div>

            {/* Right Content - Abstract Book Composition (Placeholder) */}
            <div className="relative h-[400px] lg:h-[500px] w-full flex items-center justify-center">
              {/* Decorative elements representing books/images from the reference */}
              <div className="absolute top-10 right-10 w-48 h-72 bg-book-teal rounded-sm shadow-2xl transform rotate-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-tr from-black/40 to-transparent absolute inset-0"></div>
                {/* Yahan actual book image aayegi aage */}
              </div>
              <div className="absolute top-32 left-10 w-56 h-80 bg-book-rust rounded-sm shadow-2xl transform -rotate-3 overflow-hidden z-10 flex items-center justify-center">
                <span className="font-serif text-white/50 text-2xl rotate-90">
                  Bestseller
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Banner */}
        <div className="border-y border-book-gray mt-24">
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-wrap justify-between gap-6 text-sm font-sans font-medium text-book-text/80">
            <div className="flex items-center gap-2">
              <span className="text-book-rust">✦</span> Free Shipping on orders
              over ₹499
            </div>
            <div className="flex items-center gap-2">
              <span className="text-book-rust">✦</span> Secure Payment Gateway
            </div>
            <div className="flex items-center gap-2">
              <span className="text-book-rust">✦</span> Instant PDF Delivery
            </div>
            <div className="flex items-center gap-2">
              <span className="text-book-rust">✦</span> 24/7 Premium Support
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
