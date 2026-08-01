import React from "react";
import { Link } from "react-router-dom";

const categoriesData = [
  {
    id: 1,
    name: "Academic & Tech",
    count: 124,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Classic Literature",
    count: 86,
    image:
      "https://images.unsplash.com/photo-1474932430478-367d16b99031?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Science Fiction",
    count: 92,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Self-Development",
    count: 145,
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Thrillers & Mystery",
    count: 67,
    image:
      "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Philosophy",
    count: 43,
    image:
      "https://images.unsplash.com/photo-1505664159854-23261827d040?q=80&w=800&auto=format&fit=crop",
  },
];

const Categories = () => {
  return (
    <div className="w-full bg-book-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-sans font-bold tracking-widest text-book-rust uppercase mb-4">
            Curated Collections
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-book-text mb-4">
            Browse by Category
          </h1>
          <p className="text-book-text/70 font-sans">
            Dive into our carefully organized library. From deep technical
            resources to timeless classics, find exactly what you are looking
            for.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((category) => (
            <Link
              to={`/books?category=${category.name}`}
              key={category.id}
              className="group relative h-80 overflow-hidden rounded-sm shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-serif font-medium text-white mb-1 group-hover:text-book-teal transition-colors">
                    {category.name}
                  </h3>
                  <p className="font-sans text-white/70 text-sm">
                    {category.count} Books
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-book-teal text-white flex items-center justify-center opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
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
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
