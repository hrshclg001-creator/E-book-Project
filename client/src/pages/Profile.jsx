import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Naye state variables actual library data aur loading status ke liye
  const [library, setLibrary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Safely redirect unauthenticated users without throwing render warnings
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Backend se actual library fetch karna

  useEffect(() => {
    const fetchLibrary = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        const response = await api.get("/library");
        const fetchedLibrary = response.data?.data || response.data || [];
        setLibrary(fetchedLibrary);
      } catch (error) {
        console.error("Error fetching library:", error);
        toast.error("Failed to load your library.");
      } finally {
        setIsLoading(false);
      }
    };
  }, [user]);
  if (!user) return null;
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  // Date ko readable format mein convert karna (e.g., August 2025)
  const joinDate = new Date(user.createdAt || Date.now()).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    },
  );

  // Secure PDF Download Handler
  const handleDownloadPDF = async (bookId, title) => {
    try {
      const toastId = toast.loading("Downloading PDF...");

      // Axios call with responseType 'blob' taaki stream handle ho sake
      const response = await api.get(`/library/${bookId}/access`, {
        responseType: "blob",
      });

      // Browser mein temporary URL banakar auto-click se download trigger karna
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title.replace(/"/g, "")}.pdf`);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Download complete!", { id: toastId });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download PDF. Ensure you have access.");
    }
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
                  <span className="font-medium text-book-text">{joinDate}</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-book-text/70 dark:text-gray-400">
                    Account Role
                  </span>
                  <span className="font-medium text-book-teal uppercase tracking-wider text-xs bg-book-teal/10 px-2 py-1 rounded-sm">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content / Real Library Activity */}
          <main className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-sm shadow-sm border border-book-gray/30 dark:border-gray-700">
              <h3 className="text-2xl font-serif font-bold text-book-text dark:text-white mb-6">
                My Library
              </h3>

              {/* Conditional Rendering basen on loading and data state */}
              {isLoading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="w-8 h-8 border-4 border-book-gray border-t-book-teal rounded-full animate-spin"></div>
                </div>
              ) : library.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-book-gray dark:border-gray-600 rounded-sm">
                  <p className="text-book-text/60 dark:text-gray-400 font-sans">
                    Your library is empty. Discover new books in the catalog!
                  </p>
                </div>
              ) : (
                library.map((item) => (
                  <div
                    key={item.book._id}
                    className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-book-gray dark:border-gray-700 last:border-0"
                  >
                    <div className="w-24 h-36 bg-book-gray/30 dark:bg-gray-700 rounded-sm overflow-hidden shrink-0">
                      <img
                        src={item.book.coverImage}
                        alt={item.book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <span className="text-xs font-sans font-bold tracking-widest text-book-teal uppercase mb-1 block">
                        Purchased
                      </span>
                      <h4 className="font-serif text-lg font-bold text-book-text dark:text-white mb-1">
                        {item.book.title}
                      </h4>
                      <p className="text-sm font-sans text-book-text/60 dark:text-gray-400 mb-4">
                        {item.book.author}
                      </p>
                      <button
                        onClick={() =>
                          handleDownloadPDF(item.book._id, item.book.title)
                        }
                        className="text-sm font-sans font-medium text-white bg-book-text dark:bg-gray-700 hover:bg-book-teal dark:hover:bg-book-teal px-5 py-2 rounded-sm transition-colors duration-300"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};;

export default Profile;
