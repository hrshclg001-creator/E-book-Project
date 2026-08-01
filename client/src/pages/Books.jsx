import React, { useState } from "react";
import { Link } from "react-router-dom";

// Temporary Mock Data for UI Development
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
  {
    id: 5,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 750,
    category: "Academic",
    cover:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "1984",
    author: "George Orwell",
    price: 350,
    category: "Classic",
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
  },
];

const categories = [
  "All",
  "Academic",
  "Classic",
  "Sci-Fi",
  "Self-Help",
  "Thriller",
];

const Books = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("latest");

  // Filter Logic
  const filteredBooks = mockBooks.filter(
    (book) => selectedCategory === "All" || book.category === selectedCategory,
  );

  return (
    <div className="w-full bg-book-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 pb-6 border-b border-book-gray flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-book-text mb-2">
              Explore Books
            </h1>
            <p className="text-book-text/70 font-sans text-sm">
              Showing {filteredBooks.length} results
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="sort"
              className="font-sans text-sm text-book-text/80 font-medium"
            >
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent border border-book-gray text-book-text text-sm rounded-sm px-3 py-2 outline-none focus:border-book-teal transition-colors"
            >
              <option value="latest">Latest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-24">
              <h3 className="font-serif text-xl font-semibold text-book-text mb-4">
                Categories
              </h3>
              <div className="flex flex-col space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-left font-sans text-sm px-3 py-2 rounded-sm transition-colors ${
                      selectedCategory === category
                        ? "bg-book-teal text-white"
                        : "text-book-text/70 hover:bg-book-gray/50 hover:text-book-text"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="font-serif text-xl font-semibold text-book-text mb-4">
                  Price Range
                </h3>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  className="w-full accent-book-rust"
                />
                <div className="flex justify-between text-xs font-sans text-book-text/60 mt-2">
                  <span>₹0</span>
                  <span>₹2000+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Book Grid */}
          <main className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="group flex flex-col bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Book Cover */}
                  <Link
                    to={`/books/${book.id}`}
                    className="relative h-72 w-full overflow-hidden bg-book-gray/30"
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>

                  {/* Book Details */}
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-[10px] font-sans font-bold tracking-widest text-book-rust uppercase mb-2">
                      {book.category}
                    </span>
                    <Link to={`/books/${book.id}`}>
                      <h4 className="font-serif text-lg font-bold text-book-text leading-tight mb-1 group-hover:text-book-teal transition-colors">
                        {book.title}
                      </h4>
                    </Link>
                    <p className="text-sm font-sans text-book-text/60 mb-4">
                      {book.author}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-sans font-semibold text-book-text">
                        ₹{book.price}
                      </span>
                      <button className="text-sm font-sans font-medium text-book-teal hover:text-white border border-book-teal hover:bg-book-teal px-4 py-1.5 rounded-full transition-all duration-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredBooks.length === 0 && (
              <div className="text-center py-20">
                <h3 className="font-serif text-2xl text-book-text/50">
                  No books found in this category.
                </h3>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Books;
