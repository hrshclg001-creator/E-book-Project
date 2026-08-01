import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-9xl font-serif font-bold text-book-teal opacity-20">
        404
      </h1>
      <h2 className="text-4xl font-serif font-semibold text-book-text mt-4">
        Page Not Found
      </h2>
      <p className="text-book-text/70 mt-4 max-w-md mx-auto font-sans">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-8 bg-book-rust hover:bg-book-rust-hover text-white font-sans font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-lg shadow-book-rust/30"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
