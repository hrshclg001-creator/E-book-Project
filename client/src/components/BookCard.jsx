import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book, onQuickPreview }) => {
  return (
    <div className="group flex flex-col bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-book-gray/30">
      {/* Book Cover Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-book-gray/30">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick Preview & Wishlist Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => onQuickPreview(book)}
            className="bg-white/90 text-book-text font-sans text-xs px-3 py-2 rounded-sm shadow-md hover:bg-book-teal hover:text-white transition-colors"
          >
            Quick Preview
          </button>
        </div>

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-book-rust text-white text-[10px] font-sans font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm">
          {book.category}
        </span>
      </div>

      {/* Book Info */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/books/${book.id}`}>
          <h3 className="font-serif text-lg font-bold text-book-text leading-tight mb-1 group-hover:text-book-teal transition-colors truncate">
            {book.title}
          </h3>
        </Link>
        <p className="text-xs font-sans text-book-text/60 mb-2 truncate">
          {book.author}
        </p>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-amber-500 text-xs">
            {"★".repeat(Math.floor(book.rating))}
            {"☆".repeat(5 - Math.floor(book.rating))}
          </div>
          <span className="text-[11px] font-sans text-book-text/60">
            ({book.rating})
          </span>
        </div>

        {/* Price and Cart */}
        <div className="mt-auto flex items-center justify-between border-t border-book-gray/40 pt-3">
          <span className="font-sans font-bold text-book-text">
            ₹{book.price}
          </span>
          <button className="text-xs font-sans font-medium text-book-teal hover:bg-book-teal hover:text-white border border-book-teal px-3 py-1.5 rounded-full transition-all duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
