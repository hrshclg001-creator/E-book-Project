import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  // Mock User Data
  const user = {
    name: "Harsh Mera",
    email: "harsh@example.com",
    joined: "August 2025",
  };

  const handleLogout = () => {
    // 1. Yahan backend API ko call karenge to clear HTTP-only cookies
    // await axios.post('/api/auth/logout');

    // 2. Clear frontend state (Redux/Context API)
    // dispatch(logoutUser());

    console.log("User logged out successfully");

    // 3. Redirect to Home or Login
    navigate("/login");
  };

  return (
    <div className="w-full bg-book-cream min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 pb-6 border-b border-book-gray">
          <div>
            <h1 className="text-4xl font-serif font-bold text-book-text mb-2">
              My Account
            </h1>
            <p className="text-book-text/70 font-sans">
              Manage your personal information and library.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 px-6 py-2 border border-book-rust text-book-rust hover:bg-book-rust hover:text-white font-sans font-medium rounded-sm transition-colors duration-300 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Sidebar / User Info */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-book-gray/30">
              <div className="w-20 h-20 bg-book-teal text-white rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-4">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-xl font-serif font-bold text-book-text mb-1">
                {user.name}
              </h2>
              <p className="font-sans text-sm text-book-text/60 mb-6">
                {user.email}
              </p>

              <div className="pt-6 border-t border-book-gray space-y-4">
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-book-text/70">Member Since</span>
                  <span className="font-medium text-book-text">
                    {user.joined}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-book-text/70">Total Books</span>
                  <span className="font-medium text-book-text">3</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content / Recent Activity */}
          <main className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-book-gray/30">
              <h3 className="text-2xl font-serif font-bold text-book-text mb-6">
                My Library
              </h3>

              {/* Mock Order Item */}
              <div className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-book-gray last:border-0">
                <div className="w-24 h-36 bg-book-gray/30 rounded-sm overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
                    alt="Book Cover"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs font-sans font-bold tracking-widest text-book-teal uppercase mb-1 block">
                    Purchased
                  </span>
                  <h4 className="font-serif text-lg font-bold text-book-text mb-1">
                    The Great Gatsby
                  </h4>
                  <p className="text-sm font-sans text-book-text/60 mb-4">
                    F. Scott Fitzgerald
                  </p>
                  <button className="text-sm font-sans font-medium text-white bg-book-text hover:bg-book-teal px-5 py-2 rounded-sm transition-colors duration-300">
                    Download PDF
                  </button>
                </div>
              </div>

              {/* Mock Order Item 2 */}
              <div className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-book-gray last:border-0">
                <div className="w-24 h-36 bg-book-gray/30 rounded-sm overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop"
                    alt="Book Cover"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs font-sans font-bold tracking-widest text-book-teal uppercase mb-1 block">
                    Purchased
                  </span>
                  <h4 className="font-serif text-lg font-bold text-book-text mb-1">
                    Deep Learning
                  </h4>
                  <p className="text-sm font-sans text-book-text/60 mb-4">
                    Ian Goodfellow
                  </p>
                  <button className="text-sm font-sans font-medium text-white bg-book-text hover:bg-book-teal px-5 py-2 rounded-sm transition-colors duration-300">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
