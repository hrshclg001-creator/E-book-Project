import React, { useState } from "react";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("library");

  // MOCK DATA
  const libraryBooks = [
    {
      id: 1,
      title: "Clean Code",
      progress: 65,
      cover:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "The Great Gatsby",
      progress: 100,
      cover:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Deep Learning",
      progress: 12,
      cover:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=200&auto=format&fit=crop",
    },
  ];

  const purchaseHistory = [
    {
      orderId: "#ORD-8923",
      date: "Oct 12, 2025",
      items: 2,
      total: 1198,
      status: "Completed",
    },
    {
      orderId: "#ORD-7741",
      date: "Sep 05, 2025",
      items: 1,
      total: 299,
      status: "Completed",
    },
  ];

  const stats = {
    booksRead: 14,
    hoursSpent: 128,
    currentStreak: 5,
    favoriteGenre: "Academic",
  };

  return (
    <div className="w-full bg-book-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-sm border border-book-gray/30 shadow-sm sticky top-24">
              <div className="mb-8 border-b border-book-gray pb-6 text-center lg:text-left">
                <div className="w-16 h-16 bg-book-teal text-white rounded-full flex items-center justify-center text-2xl font-serif font-bold mx-auto lg:mx-0 mb-3">
                  H
                </div>
                <h2 className="text-xl font-serif font-bold text-book-text">
                  Harsh Mera
                </h2>
                <p className="font-sans text-sm text-book-text/60">
                  harsh@example.com
                </p>
              </div>

              <nav className="flex flex-col space-y-2 font-sans text-sm">
                {[
                  { id: "library", label: "My Library & Progress" },
                  { id: "history", label: "Purchase History" },
                  { id: "stats", label: "Reading Statistics" },
                  { id: "settings", label: "Account Settings" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-left px-4 py-3 rounded-sm transition-colors ${activeTab === tab.id ? "bg-book-teal text-white font-medium" : "text-book-text/70 hover:bg-book-gray/50 hover:text-book-text"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Dashboard Content Area */}
          <main className="w-full lg:w-3/4">
            {/* TAB: My Library & Reading Progress */}
            {activeTab === "library" && (
              <div className="bg-white p-8 rounded-sm border border-book-gray/30 shadow-sm animate-fade-in">
                <h3 className="text-3xl font-serif font-bold text-book-text mb-2">
                  My Library
                </h3>
                <p className="font-sans text-book-text/60 mb-8">
                  Pick up exactly where you left off.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {libraryBooks.map((book) => (
                    <div
                      key={book.id}
                      className="flex gap-4 p-4 border border-book-gray/50 rounded-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-20 h-28 object-cover rounded-sm shadow-sm"
                      />
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-serif font-bold text-book-text mb-1">
                          {book.title}
                        </h4>
                        <div className="mt-auto">
                          <div className="flex justify-between text-xs font-sans text-book-text/60 mb-1">
                            <span>{book.progress}% Completed</span>
                            {book.progress === 100 && (
                              <span className="text-book-teal font-medium">
                                Finished
                              </span>
                            )}
                          </div>
                          <div className="w-full bg-book-gray/50 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-book-teal h-full rounded-full transition-all duration-1000"
                              style={{ width: `${book.progress}%` }}
                            ></div>
                          </div>
                          <button className="mt-3 text-xs font-sans font-medium text-book-teal hover:text-book-rust transition-colors">
                            {book.progress === 100
                              ? "Read Again"
                              : "Continue Reading"}{" "}
                            &rarr;
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Purchase History */}
            {activeTab === "history" && (
              <div className="bg-white p-8 rounded-sm border border-book-gray/30 shadow-sm animate-fade-in">
                <h3 className="text-3xl font-serif font-bold text-book-text mb-8">
                  Purchase History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-sm">
                    <thead>
                      <tr className="border-b-2 border-book-gray text-book-text/70">
                        <th className="pb-4 font-medium">Order ID</th>
                        <th className="pb-4 font-medium">Date</th>
                        <th className="pb-4 font-medium">Items</th>
                        <th className="pb-4 font-medium">Total</th>
                        <th className="pb-4 font-medium">Status</th>
                        <th className="pb-4 font-medium">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="text-book-text">
                      {purchaseHistory.map((order, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-book-gray/50 hover:bg-book-gray/10 transition-colors"
                        >
                          <td className="py-4 font-medium">{order.orderId}</td>
                          <td className="py-4">{order.date}</td>
                          <td className="py-4">{order.items}</td>
                          <td className="py-4">₹{order.total}</td>
                          <td className="py-4">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-sm text-xs font-semibold">
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <button className="text-book-teal hover:underline">
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: Reading Statistics */}
            {activeTab === "stats" && (
              <div className="bg-white p-8 rounded-sm border border-book-gray/30 shadow-sm animate-fade-in">
                <h3 className="text-3xl font-serif font-bold text-book-text mb-8">
                  Reading Insights
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  <div className="p-6 bg-book-cream rounded-sm border border-book-gray/30 text-center">
                    <div className="text-4xl font-serif font-bold text-book-teal mb-2">
                      {stats.booksRead}
                    </div>
                    <div className="text-xs font-sans text-book-text/70 uppercase tracking-wide">
                      Total Books
                    </div>
                  </div>
                  <div className="p-6 bg-book-cream rounded-sm border border-book-gray/30 text-center">
                    <div className="text-4xl font-serif font-bold text-book-teal mb-2">
                      {stats.hoursSpent}
                    </div>
                    <div className="text-xs font-sans text-book-text/70 uppercase tracking-wide">
                      Hours Read
                    </div>
                  </div>
                  <div className="p-6 bg-book-cream rounded-sm border border-book-gray/30 text-center">
                    <div className="text-4xl font-serif font-bold text-book-rust mb-2">
                      {stats.currentStreak}{" "}
                      <span className="text-xl">Days</span>
                    </div>
                    <div className="text-xs font-sans text-book-text/70 uppercase tracking-wide">
                      Current Streak
                    </div>
                  </div>
                  <div className="p-6 bg-book-cream rounded-sm border border-book-gray/30 text-center flex flex-col justify-center">
                    <div className="text-lg font-serif font-bold text-book-text mb-2">
                      {stats.favoriteGenre}
                    </div>
                    <div className="text-xs font-sans text-book-text/70 uppercase tracking-wide">
                      Top Genre
                    </div>
                  </div>
                </div>

                {/* Conceptual Chart Placeholder for visual aesthetic */}
                <div className="w-full h-64 bg-book-gray/10 border border-book-gray/30 rounded-sm flex items-center justify-center border-dashed">
                  <p className="font-sans text-book-text/40">
                    Monthly Reading Activity Chart (Add Chart.js / Recharts
                    here)
                  </p>
                </div>
              </div>
            )}

            {/* Account Settings Tab could go here */}
            {activeTab === "settings" && (
              <div className="bg-white p-8 rounded-sm border border-book-gray/30 shadow-sm animate-fade-in">
                <h3 className="text-3xl font-serif font-bold text-book-text mb-2">
                  Account Settings
                </h3>
                <p className="font-sans text-book-text/60">
                  Update your personal details and preferences here.
                </p>
                {/* Form fields can be added here */}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
