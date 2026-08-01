import React from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlistItems = [
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      price: 450,
      category: "Self-Help",
      cover:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Dune",
      author: "Frank Herbert",
      price: 599,
      category: "Sci-Fi",
      cover:
        "https://images.unsplash.com/photo-1614213193960-e4b9d0dc6a06?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="w-full bg-book-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-book-text mb-2">
          Your Wishlist
        </h1>
        <p className="text-book-text/60 font-sans mb-10 pb-6 border-b border-book-gray">
          {wishlistItems.length} items saved
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistItems.map((book) => (
            <div
              key={book.id}
              className="bg-white p-4 rounded-sm shadow-sm border border-book-gray/30 flex flex-col"
            >
              <div className="relative aspect-[2/3] overflow-hidden mb-4 bg-book-gray/20">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-book-rust shadow-sm hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col flex-grow">
                <Link to={`/books/${book.id}`}>
                  <h4 className="font-serif font-bold text-book-text mb-1 hover:text-book-teal truncate">
                    {book.title}
                  </h4>
                </Link>
                <p className="text-xs font-sans text-book-text/60 mb-3">
                  {book.author}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-sans font-bold text-book-text">
                    ₹{book.price}
                  </span>
                  <button className="text-xs font-sans font-medium bg-book-teal text-white px-3 py-1.5 rounded-sm hover:bg-book-text transition-colors">
                    Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
