import React, { useState } from "react";

const ReviewsSection = () => {
  // Mock Logged-in User
  const currentUser = { id: "u1", name: "Harsh Mera" };

  // Mock Reviews State
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userId: "u2",
      name: "Priya Sharma",
      rating: 5,
      comment: "Absolutely brilliant! The concepts are explained very clearly.",
      date: "Oct 15, 2025",
    },
    {
      id: 2,
      userId: "u1", // Matches currentUser
      name: "Harsh Mera",
      rating: 4,
      comment:
        "Great read, highly recommended for developers building scalable apps.",
      date: "Oct 20, 2025",
    },
  ]);

  // Form States
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [editId, setEditId] = useState(null);

  // Calculations
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews === 0
      ? 0
      : (
          reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
        ).toFixed(1);

  // --- Handlers ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (editId) {
      // Edit Existing Review
      setReviews(
        reviews.map((r) =>
          r.id === editId
            ? { ...r, rating, comment, date: "Edited just now" }
            : r,
        ),
      );
      setEditId(null);
    } else {
      // Add New Review
      const newReview = {
        id: Date.now(),
        userId: currentUser.id,
        name: currentUser.name,
        rating,
        comment,
        date: "Just now",
      };
      setReviews([newReview, ...reviews]);
    }

    // Reset Form
    setComment("");
    setRating(5);
  };

  const handleEdit = (review) => {
    setEditId(review.id);
    setRating(review.rating);
    setComment(review.comment);
    // Scroll to form smoothly
    document
      .getElementById("review-form")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  // Helper to render stars
  const renderStars = (starCount, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : "button"}
            disabled={!interactive}
            onClick={() => interactive && setRating(star)}
            className={`text-xl focus:outline-none transition-colors ${
              star <= starCount ? "text-amber-500" : "text-book-gray"
            } ${interactive ? "hover:scale-110" : "cursor-default"}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-16 pt-10 border-t border-book-gray/40">
      {/* Header & Overall Ratings Display */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-serif font-bold text-book-text mb-2">
            Reader Reviews
          </h2>
          <p className="text-sm font-sans text-book-text/60">
            What others are saying about this book
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-4 bg-white px-6 py-4 rounded-sm border border-book-gray/30 shadow-sm">
          <div className="text-4xl font-serif font-bold text-book-teal">
            {averageRating}
          </div>
          <div>
            {renderStars(Math.round(averageRating))}
            <div className="text-xs font-sans text-book-text/60 mt-1">
              Based on {totalReviews} reviews
            </div>
          </div>
        </div>
      </div>

      {/* Write / Edit Review Form */}
      <div
        id="review-form"
        className="bg-book-cream p-6 sm:p-8 rounded-sm border border-book-gray/30 mb-10"
      >
        <h3 className="font-serif text-xl font-bold text-book-text mb-4">
          {editId ? "Edit Your Review" : "Write a Review"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-sans font-bold text-book-text/70 uppercase tracking-wider mb-2">
              Your Rating
            </label>
            {renderStars(rating, true)}
          </div>
          <div>
            <label className="block text-xs font-sans font-bold text-book-text/70 uppercase tracking-wider mb-2">
              Your Review
            </label>
            <textarea
              required
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about the book..."
              className="w-full bg-white border border-book-gray/50 rounded-sm px-4 py-3 outline-none focus:border-book-teal font-sans text-sm resize-none"
            ></textarea>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-book-teal hover:bg-book-text text-white font-sans font-medium px-6 py-2.5 rounded-sm transition-colors duration-300"
            >
              {editId ? "Update Review" : "Submit Review"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setComment("");
                  setRating(5);
                }}
                className="border border-book-text text-book-text hover:bg-book-gray/10 font-sans font-medium px-6 py-2.5 rounded-sm transition-colors duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-center font-sans text-book-text/50 py-10">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-sm border border-book-gray/30 shadow-sm flex flex-col sm:flex-row gap-4"
            >
              {/* User Avatar Placeholder */}
              <div className="w-12 h-12 shrink-0 bg-book-gray/20 rounded-full flex items-center justify-center font-serif font-bold text-book-text/60 text-lg">
                {review.name.charAt(0)}
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <div>
                    <h4 className="font-serif font-bold text-book-text">
                      {review.name}
                    </h4>
                    <p className="text-xs font-sans text-book-text/50">
                      {review.date}
                    </p>
                  </div>
                  <div className="mt-1 sm:mt-0">
                    {renderStars(review.rating)}
                  </div>
                </div>

                <p className="font-sans text-sm text-book-text/80 leading-relaxed mb-4">
                  {review.comment}
                </p>

                {/* Edit / Delete Actions (Only visible to the review author) */}
                {review.userId === currentUser.id && (
                  <div className="flex items-center gap-4 border-t border-book-gray/20 pt-3">
                    <button
                      onClick={() => handleEdit(review)}
                      className="text-xs font-sans font-medium text-book-teal hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="text-xs font-sans font-medium text-book-rust hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
