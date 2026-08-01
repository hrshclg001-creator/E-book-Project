import React, { useState } from "react";
import { Link } from "react-router-dom";

// Wahi mock data for demonstration
const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 299,
    category: "Classic",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Deep Learning",
    author: "Ian Goodfellow",
    price: 899,
    category: "Academic",
    cover:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
  },
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

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Live filter logic based on title or author
  const filteredResults =
    searchQuery.trim() === ""
      ? []
      : mockBooks.filter(
          (book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  return (
    <div className="w-full bg-book-cream min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Input Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-book-text mb-8">
            What are you looking for?
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by book title or author..."
              className="w-full bg-white border-2 border-book-gray focus:border-book-teal text-lg font-sans text-book-text rounded-full px-8 py-5 pr-16 outline-none transition-colors shadow-sm"
              autoFocus
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-book-teal text-white rounded-full flex items-center justify-center hover:bg-book-text transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div>
          {searchQuery && (
            <p className="text-sm font-sans font-medium text-book-text/60 mb-6 border-b border-book-gray pb-4">
              Found {filteredResults.length} results for "{searchQuery}"
            </p>
          )}

          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredResults.map((book) => (
                <Link
                  to={`/books/${book.id}`}
                  key={book.id}
                  className="group bg-white p-3 rounded-sm shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[2/3] w-full overflow-hidden bg-book-gray/30 mb-4 relative">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-serif font-bold text-book-text text-sm truncate group-hover:text-book-teal transition-colors">
                    {book.title}
                  </h4>
                  <p className="text-xs font-sans text-book-text/60 mt-1 truncate">
                    {book.author}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            searchQuery && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-book-gray/30 rounded-full flex items-center justify-center mx-auto mb-4 text-book-text/40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-book-text/80 mb-2">
                  No results found
                </h3>
                <p className="font-sans text-sm text-book-text/60">
                  Try adjusting your search terms or check for typos.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
