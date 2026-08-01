import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} BookVerse. All rights reserved.
        </p>
        <p className="text-sm">Built with highly secure MERN architecture.</p>
      </div>
    </footer>
  );
};

export default Footer;
