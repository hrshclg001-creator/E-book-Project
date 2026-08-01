import React from "react";

const BookSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-sm overflow-hidden shadow-sm border border-book-gray/30 animate-pulse">
      {/* Image Placeholder */}
      <div className="aspect-[2/3] w-full bg-gray-200"></div>

      {/* Content Placeholder */}
      <div className="p-4 flex flex-col flex-grow space-y-3">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded-sm w-3/4"></div>
        {/* Author */}
        <div className="h-3 bg-gray-200 rounded-sm w-1/2"></div>

        {/* Rating */}
        <div className="h-3 bg-gray-200 rounded-sm w-1/4 mt-2"></div>

        {/* Footer (Price & Button) */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded-sm w-16"></div>
          <div className="h-8 bg-gray-200 rounded-full w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default BookSkeleton;
//Implementation Note: Jab API call pending ho, tab mapping function mein <BookCard/> ki jagah 6-8 <BookSkeleton/> render karein.