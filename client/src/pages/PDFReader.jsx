import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const PDFReader = () => {
  const { id } = useParams(); // Book ID

  // --- State Management ---
  const [numPages] = useState(350); // Mock total pages
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(null); // 'bookmarks', 'notes', or null

  // User Data States
  const [bookmarks, setBookmarks] = useState([10, 45]); // Mock saved bookmarks
  const [notes, setNotes] = useState([
    { page: 1, text: "Important introduction to the topic." },
  ]);
  const [newNote, setNewNote] = useState("");

  // --- Handlers ---
  const changePage = (offset) => {
    setPageNumber((prev) => Math.min(Math.max(1, prev + offset), numPages));
  };

  const handleZoom = (delta) => {
    setScale((prev) => Math.min(Math.max(0.5, prev + delta), 2.5));
  };

  const toggleBookmark = () => {
    setBookmarks((prev) =>
      prev.includes(pageNumber)
        ? prev.filter((p) => p !== pageNumber)
        : [...prev, pageNumber].sort((a, b) => a - b),
    );
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes((prev) => [...prev, { page: pageNumber, text: newNote }]);
    setNewNote("");
  };

  // Calculate Reading Progress
  const readingProgress = ((pageNumber / numPages) * 100).toFixed(1);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") changePage(1);
      if (e.key === "ArrowLeft") changePage(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pageNumber, numPages]);

  return (
    <div
      className={`h-screen w-full flex flex-col transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-gray-300" : "bg-book-gray/10 text-book-text"}`}
    >
      {/* Top Reading Toolbar */}
      <header
        className={`h-16 px-4 flex items-center justify-between shadow-sm z-20 ${isDarkMode ? "bg-gray-800 border-b border-gray-700" : "bg-white border-b border-book-gray/30"}`}
      >
        {/* Left: Back & Title */}
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="p-2 rounded-full hover:bg-book-gray/20 transition-colors"
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
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
          <div className="hidden sm:block">
            <h1 className="font-serif font-bold text-lg leading-none">
              The Great Gatsby
            </h1>
            <p
              className={`text-xs font-sans ${isDarkMode ? "text-gray-400" : "text-book-text/60"}`}
            >
              F. Scott Fitzgerald
            </p>
          </div>
        </div>

        {/* Center: Progress & Navigation */}
        <div className="flex flex-col items-center flex-1 max-w-md mx-4">
          <div className="flex items-center gap-4 mb-1">
            <button
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
              className="disabled:opacity-30 hover:text-book-teal"
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
                  d="15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <span className="text-sm font-sans font-medium">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={() => changePage(1)}
              disabled={pageNumber >= numPages}
              className="disabled:opacity-30 hover:text-book-teal"
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
                  d="8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
          {/* Progress Bar */}
          <div
            className={`w-full h-1 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700" : "bg-book-gray/50"}`}
          >
            <div
              className="h-full bg-book-teal transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Right: Tools (Zoom, Theme, Bookmark, Sidebar) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Zoom Controls */}
          <div
            className={`hidden md:flex items-center rounded-sm px-2 py-1 ${isDarkMode ? "bg-gray-700" : "bg-book-gray/20"}`}
          >
            <button
              onClick={() => handleZoom(-0.1)}
              className="p-1 hover:text-book-teal"
            >
              -
            </button>
            <span className="text-xs font-sans w-10 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => handleZoom(0.1)}
              className="p-1 hover:text-book-teal"
            >
              +
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-book-gray/20 transition-colors"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>

          {/* Bookmark Current Page */}
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-full transition-colors ${bookmarks.includes(pageNumber) ? "text-book-rust" : "hover:bg-book-gray/20"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={bookmarks.includes(pageNumber) ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          </button>

          {/* Notes Sidebar Toggle */}
          <button
            onClick={() =>
              setActiveSidebar(activeSidebar === "notes" ? null : "notes")
            }
            className={`p-2 rounded-full transition-colors ${activeSidebar === "notes" ? "bg-book-teal text-white" : "hover:bg-book-gray/20"}`}
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Document Viewer (Mock) */}
        <main
          className={`flex-1 overflow-auto flex items-start justify-center p-8 transition-all ${activeSidebar ? "mr-80" : ""}`}
        >
          <div
            className={`shadow-2xl transition-transform duration-300 origin-top ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-black"}`}
            style={{
              width: "800px",
              minHeight: "1130px",
              transform: `scale(${scale})`,
              padding: "60px 80px",
            }}
          >
            {/* Mock PDF Text Content rendering based on Page Number */}
            <div className="font-serif text-lg leading-relaxed text-justify">
              {pageNumber === 1 && (
                <div className="text-center mt-32">
                  <h1 className="text-5xl font-bold mb-4">The Great Gatsby</h1>
                  <h2 className="text-2xl text-gray-500">
                    F. Scott Fitzgerald
                  </h2>
                </div>
              )}
              {pageNumber > 1 && (
                <>
                  <p className="mb-6">
                    <span className="text-3xl float-left mr-2 font-bold">
                      I
                    </span>
                    n my younger and more vulnerable years my father gave me
                    some advice that I've been turning over in my mind ever
                    since. "Whenever you feel like criticizing any one," he told
                    me, "just remember that all the people in this world haven't
                    had the advantages that you've had."
                  </p>
                  <p className="mb-6">
                    He didn't say any more, but we've always been unusually
                    communicative in a reserved way, and I understood that he
                    meant a great deal more than that. In consequence, I'm
                    inclined to reserve all judgments, a habit that has opened
                    up many curious natures to me and also made me the victim of
                    not a few veteran bores.
                  </p>
                  {/* Highlight simulation */}
                  <p className="mb-6">
                    The abnormal mind is quick to detect and attach itself to
                    this quality when it appears in a normal person, and so it
                    came about that in college I was unjustly accused of being a
                    politician, because I was privy to the secret griefs of
                    wild, unknown men.{" "}
                    <mark
                      className={`${isDarkMode ? "bg-book-teal/40 text-white" : "bg-yellow-200"} px-1 rounded-sm`}
                    >
                      Most of the confidences were unsought—frequently I have
                      feigned sleep, preoccupation, or a hostile levity when I
                      realized by some unmistakable sign that an intimate
                      revelation was quivering on the horizon;
                    </mark>{" "}
                    for the intimate revelations of young men, or at least the
                    terms in which they express them, are usually plagiaristic
                    and marred by obvious suppressions.
                  </p>
                  <p className="text-center mt-20 text-sm text-gray-400">
                    - {pageNumber} -
                  </p>
                </>
              )}
            </div>
          </div>
        </main>

        {/* Sidebar (Notes & Bookmarks) */}
        {activeSidebar && (
          <aside
            className={`absolute right-0 top-0 h-full w-80 shadow-[-4px_0_15px_rgba(0,0,0,0.05)] border-l flex flex-col z-10 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-book-cream border-book-gray/30"}`}
          >
            <div
              className={`p-4 border-b font-sans font-bold flex justify-between items-center ${isDarkMode ? "border-gray-700" : "border-book-gray/30"}`}
            >
              <span>
                {activeSidebar === "notes" ? "My Notes" : "Bookmarks"}
              </span>
              <button
                onClick={() => setActiveSidebar(null)}
                className="text-gray-500 hover:text-book-rust"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm">
              {activeSidebar === "notes" && (
                <>
                  <form onSubmit={handleAddNote} className="mb-6">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder={`Add a note for page ${pageNumber}...`}
                      className={`w-full p-3 rounded-sm border outline-none resize-none h-24 mb-2 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white focus:border-book-teal" : "bg-white border-book-gray focus:border-book-teal"}`}
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-book-teal text-white py-2 rounded-sm font-medium hover:bg-book-teal-dark transition-colors"
                    >
                      Save Note
                    </button>
                  </form>

                  <div className="space-y-3">
                    {notes.map((note, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-sm border ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-book-gray/50"}`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-book-rust">
                            Page {note.page}
                          </span>
                          <button
                            onClick={() => setPageNumber(note.page)}
                            className="text-xs text-book-teal hover:underline"
                          >
                            Go to page
                          </button>
                        </div>
                        <p
                          className={`${isDarkMode ? "text-gray-300" : "text-book-text/80"}`}
                        >
                          {note.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default PDFReader;
