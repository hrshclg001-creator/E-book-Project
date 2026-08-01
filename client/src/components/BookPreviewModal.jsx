import React from "react";
import { Link } from "react-router-dom";

const BookPreviewModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white max-w-2xl w-full rounded-sm shadow-2xl overflow-hidden relative border border-book-gray/50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-book-text/60 hover:text-book-text text-xl font-bold z-10"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Left: Book Cover */}
          <div className="bg-book-gray/20 p-6 flex items-center justify-center">
            <img
              src={book.cover}
              alt={book.title}
              className="max-h-72 object-cover shadow-lg rounded-sm"
            />
          </div>

          {/* Right: Preview Details */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-sans font-bold tracking-widest text-book-rust uppercase">
                {book.category}
              </span>
              <h2 className="font-serif text-2xl font-bold text-book-text mt-1">
                {book.title}
              </h2>
              <p className="text-sm font-sans text-book-text/60 mb-3">
                by {book.author}
              </p>

              <div className="flex items-center gap-1 mb-4">
                <span className="text-amber-500 text-sm">★</span>
                <span className="text-xs font-sans text-book-text/80 font-medium">
                  {book.rating} / 5.0
                </span>
              </div>

              <p className="font-sans text-xs text-book-text/80 leading-relaxed line-clamp-4 mb-4">
                {book.description ||
                  "An extraordinary title from our curated selection. Read excerpt and explore deeper insights."}
              </p>
            </div>

            <div className="pt-4 border-t border-book-gray/40 flex items-center justify-between gap-3">
              <span className="font-sans font-bold text-xl text-book-text">
                ₹{book.price}
              </span>
              <Link
                to={`/books/${book.id}`}
                onClick={onClose}
                className="bg-book-teal hover:bg-book-text text-white font-sans text-xs px-4 py-2.5 rounded-sm transition-colors"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPreviewModal;
