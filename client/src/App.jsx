import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";

// ======================================================
// Global Loader
// ======================================================

const GlobalLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-book-cream">
    <div className="w-12 h-12 border-4 border-book-gray/30 border-t-book-teal rounded-full animate-spin"></div>
  </div>
);

// ======================================================
// Lazy Loaded Pages
// ======================================================

// Public Pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Books = lazy(() => import("./pages/Books"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
const Categories = lazy(() => import("./pages/Categories"));
const Search = lazy(() => import("./pages/Search"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Authentication Pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const EmailVerification = lazy(() => import("./pages/EmailVerification"));

// User Pages
const Profile = lazy(() => import("./pages/Profile"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));

// Reading
const PDFReader = lazy(() => import("./pages/PDFReader"));

// Checkout & Payment
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentFailed = lazy(() => import("./pages/PaymentFailed"));
const Invoice = lazy(() => import("./pages/Invoice"));

// Admin
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

// ======================================================
// App Component
// ======================================================

function App() {
  return (
    <BrowserRouter>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "Inter, sans-serif",
            borderRadius: "4px",
          },
        }}
      />

      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          {/* ==================================================
              Routes WITH Navbar & Footer
          ================================================== */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            {/* Public Pages */}
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />

            {/* Books */}
            <Route path="books" element={<Books />} />
            <Route path="books/:id" element={<BookDetails />} />

            {/* Categories */}
            <Route path="categories" element={<Categories />} />
            <Route path="search" element={<Search />} />

            {/* User */}
            <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="dashboard" element={<UserDashboard />} />

            {/* Checkout */}
            <Route path="checkout" element={<Checkout />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* ==================================================
              Authentication Routes
              WITHOUT Navbar & Footer
          ================================================== */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />

          {/* ==================================================
              Payment Routes
              WITHOUT Navbar & Footer
          ================================================== */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/invoice/:orderId" element={<Invoice />} />

          {/* PDF Reader */}
          <Route path="/read/:id" element={<PDFReader />} />

          {/* Admin */}
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
