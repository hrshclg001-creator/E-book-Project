import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const { theme, toggleTheme } = useDarkMode();
  const { user } = useContext(AuthContext); // Global state se user fetch karein
  return (
    <nav className="bg-book-teal text-book-cream shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo & Left Links */}
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="text-2xl font-sans font-semibold tracking-wider text-white"
            >
              BOOKVERSE
            </Link>
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-book-cream/80">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/shop" className="hover:text-white transition-colors">
                Shop
              </Link>
              <Link
                to="/library"
                className="hover:text-white transition-colors"
              >
                Pages
              </Link>
              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right Icons (Search, Phone, User, Cart) */}
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center bg-book-teal-dark px-4 py-2 rounded-full border border-white/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-white/60 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/60 w-32"
              />
            </div>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme} //[cite: 2]
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? (
                // Sun Icon for Light Mode option
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              ) : (
                // Moon Icon for Dark Mode option
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              )}
            </button>
            {/* Dynamic User Account Link */}
            {user ? (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                <div className="w-7 h-7 rounded-full bg-book-rust text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:block">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span className="hidden md:block">Login</span>
              </Link>
            )}
            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center hover:text-book-rust transition-colors relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <span className="ml-1 text-sm font-medium">$0.00</span>
              {/* Notification Dot */}
              <span className="absolute -top-1 -right-2 bg-book-rust text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
