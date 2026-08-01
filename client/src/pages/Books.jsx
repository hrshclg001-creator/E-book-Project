import React, { useState, useMemo } from "react";
import BookCard from "../components/BookCard";
import BookPreviewModal from "../components/BookPreviewModal";

// Mock Book Dataset with Ratings & Categories
const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 299,
    rating: 4.8,
    category: "Classic",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    description:
      "A classic novel set in the Roaring Twenties, exploring themes of wealth, love, and the American Dream.",
  },
  {
    id: 2,
    title: "Deep Learning",
    author: "Ian Goodfellow",
    price: 899,
    rating: 4.9,
    category: "Academic",
    cover:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
    description:
      "An introductory textbook to deep learning concepts, neural network architectures, and practical applications.",
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    price: 450,
    rating: 4.7,
    category: "Self-Help",
    cover:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    description:
      "A practical framework for forming good habits, breaking bad ones, and mastering small behaviors.",
  },
  {
    id: 4,
    title: "Dune",
    author: "Frank Herbert",
    price: 599,
    rating: 4.6,
    category: "Sci-Fi",
    cover:
      "https://images.unsplash.com/photo-1614213193960-e4b9d0dc6a06?q=80&w=800&auto=format&fit=crop",
    description:
      "Set on the desert planet Arrakis, telling the epic story of young Paul Atreides and the battle for spice.",
  },
  {
    id: 5,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 750,
    rating: 4.5,
    category: "Academic",
    cover:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    description:
      "A handbook of agile software craftsmanship with best practices for writing maintainable code.",
  },
  {
    id: 6,
    title: "1984",
    author: "George Orwell",
    price: 350,
    rating: 4.9,
    category: "Classic",
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
    description:
      "A dystopian social science fiction novel that deals with totalitarianism and mass surveillance.",
  },
];

const categories = ["All", "Academic", "Classic", "Sci-Fi", "Self-Help"];

const Books = () => {
  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("latest");
  const [previewBook, setPreviewBook] = useState(null);

  // Filter & Sorting Logic
  const filteredAndSortedBooks = useMemo(() => {
    return mockBooks
      .filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || book.category === selectedCategory;
        const matchesPrice = book.price <= maxPrice;
        const matchesRating = book.rating >= minRating;

        return (
          matchesSearch && matchesCategory && matchesPrice && matchesRating
        );
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.id - a.id; // 'latest' default
      });
  }, [searchTerm, selectedCategory, maxPrice, minRating, sortBy]);

  return (
    <div className="w-full bg-book-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Search Bar */}
        <div className="mb-10 pb-6 border-b border-book-gray flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-book-text mb-1">
              Browse Catalog
            </h1>
            <p className="text-book-text/60 font-sans text-sm">
              Showing {filteredAndSortedBooks.length} books
            </p>
          </div>

          {/* Book Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or author..."
              className="w-full bg-white border border-book-gray/60 rounded-full px-4 py-2.5 pl-10 text-sm font-sans text-book-text outline-none focus:border-book-teal transition-colors"
            />
            <svg
              className="w-4 h-4 text-book-text/40 absolute left-3.5 top-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4 bg-white p-6 rounded-sm border border-book-gray/30 h-fit sticky top-24">
            <h3 className="font-serif text-xl font-bold text-book-text mb-6 pb-2 border-b border-book-gray/40">
              Filters
            </h3>

            {/* Category Filter */}
            <div className="mb-8">
              <label className="font-sans text-xs font-bold text-book-text/70 uppercase tracking-wider block mb-3">
                Categories
              </label>
              <div className="flex flex-col space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-sm font-sans px-3 py-1.5 rounded-sm transition-colors ${
                      selectedCategory === cat
                        ? "bg-book-teal text-white font-medium"
                        : "text-book-text/70 hover:bg-book-cream"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="font-sans text-xs font-bold text-book-text/70 uppercase tracking-wider">
                  Max Price
                </label>
                <span className="font-sans font-semibold text-xs text-book-teal">
                  ₹{maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-book-rust cursor-pointer"
              />
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <label className="font-sans text-xs font-bold text-book-text/70 uppercase tracking-wider block mb-3">
                Minimum Rating
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full bg-book-cream border border-book-gray/50 text-book-text text-sm rounded-sm px-3 py-2 outline-none focus:border-book-teal"
              >
                <option value={0}>All Ratings</option>
                <option value={4.5}>4.5 ★ & above</option>
                <option value={4.7}>4.7 ★ & above</option>
                <option value={4.8}>4.8 ★ & above</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setMaxPrice(1000);
                setMinRating(0);
                setSortBy("latest");
              }}
              className="w-full text-xs font-sans text-book-rust font-medium py-2 hover:underline text-center border-t border-book-gray/40 pt-4"
            >
              Reset All Filters
            </button>
          </aside>

          {/* Main Book Grid & Sorting */}
          <main className="w-full lg:w-3/4">
            {/* Top Toolbar (Sorting) */}
            <div className="flex justify-end items-center mb-6">
              <div className="flex items-center gap-2">
                <label className="font-sans text-xs font-medium text-book-text/70">
                  Sort By:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-book-gray/50 text-book-text text-xs rounded-sm px-3 py-2 outline-none focus:border-book-teal"
                >
                  <option value="latest">Latest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Books Grid */}
            {filteredAndSortedBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onQuickPreview={(selected) => setPreviewBook(selected)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-book-gray/30 rounded-sm">
                <h3 className="font-serif text-2xl text-book-text/60 mb-2">
                  No Books Found
                </h3>
                <p className="font-sans text-xs text-book-text/40">
                  Try adjusting your filters or search keywords.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Book Preview Modal */}
      <BookPreviewModal
        book={previewBook}
        onClose={() => setPreviewBook(null)}
      />
    </div>
  );
};

export default Books;
