import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReviewsSection from "../components/ReviewsSection";
import { useEffect } from "react";
import { getBookById } from "../api/books.api";

// Wahi same mock data jo Books.jsx mein use kiya tha
// const mockBooks = [
//   {
//     id: 1,
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     price: 299,
//     category: "Classic",
//     cover:
//       "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
//     description:
//       "A true classic of twentieth-century literature, this edition has been updated by Fitzgerald scholar James L.W. West III to include the author’s final revisions and features a note on the composition and text, a personal history of the novel.",
//   },
//   {
//     id: 2,
//     title: "Deep Learning",
//     author: "Ian Goodfellow",
//     price: 899,
//     category: "Academic",
//     cover:
//       "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
//     description:
//       "An introduction to a broad range of topics in deep learning, covering mathematical and conceptual background, deep learning techniques used in industry, and research perspectives.",
//   },
//   {
//     id: 3,
//     title: "Atomic Habits",
//     author: "James Clear",
//     price: 450,
//     category: "Self-Help",
//     cover:
//       "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
//     description:
//       "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits.",
//   },
//   {
//     id: 4,
//     title: "Dune",
//     author: "Frank Herbert",
//     price: 599,
//     category: "Sci-Fi",
//     cover:
//       "https://images.unsplash.com/photo-1614213193960-e4b9d0dc6a06?q=80&w=800&auto=format&fit=crop",
//     description:
//       "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange.",
//   },
// ];

const BookDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);

        const data = await getBookById(id);

        setBook(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load book");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h2 className="text-xl font-semibold">Loading book...</h2>
    </div>
  );
}

if (error) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h2 className="text-red-500 text-xl">{error}</h2>
    </div>
  );
}
if (!book) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h2>Book not found.</h2>
    </div>
  );
}

  const handleAddToCart = () => {
    // Yahan Redux/Context API ka logic aayega
    console.log(`Added ${quantity} of ${book.title} to cart.`);
    alert(`Successfully added to cart!`);
  };

  return (
    <div className="w-full bg-book-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex text-sm font-sans text-book-text/60 mb-10">
          <Link to="/" className="hover:text-book-teal transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/books" className="hover:text-book-teal transition-colors">
            Books
          </Link>
          <span className="mx-2">/</span>
          <span className="text-book-text font-medium">{book.title}</span>
        </nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Book Cover */}
          <div className="flex justify-center lg:justify-end items-start">
            <div className="w-full max-w-md bg-white p-4 shadow-2xl rounded-sm">
              <div className="relative aspect-[2/3] overflow-hidden bg-book-gray/20">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Book Info */}
          <div className="flex flex-col justify-start pt-4">
            <span className="text-xs font-sans font-bold tracking-widest text-book-rust uppercase mb-3">
              {book.category?.name}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-book-text leading-tight mb-2">
              {book.title}
            </h1>
            <p className="text-xl font-sans text-book-text/70 mb-6">
              by{" "}
              <span className="font-medium text-book-text hover:underline cursor-pointer">
                {book.author}
              </span>
            </p>

            <div className="text-3xl font-sans font-bold text-book-text mb-8">
              ₹{book.price}
            </div>

            <p className="font-sans text-book-text/80 leading-relaxed mb-8">
              {book.description}
            </p>

            {/* Action Area */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 py-8 border-y border-book-gray/50">
              <div className="flex items-center border border-book-gray rounded-sm h-12 w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-book-text hover:text-book-teal transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 h-full text-center bg-transparent font-sans font-medium text-book-text outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-book-text hover:text-book-teal transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-book-teal hover:bg-book-text text-white font-sans font-medium h-12 px-8 rounded-sm transition-colors duration-300 flex items-center justify-center gap-2"
              >
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
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                Add to Cart
              </button>
            </div>

            {/* Additional Metadata / Tabs */}
            <div>
              <div className="flex gap-6 border-b border-book-gray mb-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-3 text-sm font-sans font-medium transition-colors relative ${activeTab === "details" ? "text-book-teal" : "text-book-text/60 hover:text-book-text"}`}
                >
                  Product Details
                  {activeTab === "details" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-book-teal"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-3 text-sm font-sans font-medium transition-colors relative ${activeTab === "shipping" ? "text-book-teal" : "text-book-text/60 hover:text-book-text"}`}
                >
                  Delivery & Formats
                  {activeTab === "shipping" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-book-teal"></span>
                  )}
                </button>
              </div>

              <div className="font-sans text-sm text-book-text/80 leading-relaxed min-h-[100px]">
                {activeTab === "details" && (
                  <ul className="space-y-2">
                    <li>
                      <span className="font-semibold w-24 inline-block">
                        Publisher:
                      </span>{" "}
                      BookVerse Press
                    </li>
                    <li>
                      <span className="font-semibold w-24 inline-block">
                        Language:
                      </span>{" "}
                      English
                    </li>
                    <li>
                      <span className="font-semibold w-24 inline-block">
                        Print Length:
                      </span>{" "}
                      350 pages
                    </li>
                    <li>
                      <span className="font-semibold w-24 inline-block">
                        ISBN-10:
                      </span>{" "}
                      1234567890
                    </li>
                  </ul>
                )}
                {activeTab === "shipping" && (
                  <p>
                    Instant access available for PDF and EPUB formats
                    post-purchase. Physical copies are dispatched within 24
                    hours. Free standard delivery on orders over ₹499. Secure
                    streaming available for premium academic materials.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <ReviewsSection />
      </div>
    </div>
  );
};

export default BookDetails;
