import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
// In pages ko hum aage banayenge
import About from "./pages/About";
import Contact from "./pages/Contact";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Categories from "./pages/Categories";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import EmailVerification from "./pages/EmailVerification";

import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import UserDashboard from "./pages/UserDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wrapper ke andar aane wale sabhi routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Future Routes (Abhi ke liye comment out kiye hain) */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="books" element={<Books />} />
          <Route path="books/:id" element={<BookDetails />} />
          <Route path="categories" element={<Categories />} />
          <Route path="search" element={<Search />} />

          {/* Catch-all route for 404 Page */}
          <Route path="*" element={<NotFound />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="dashboard" element={<UserDashboard />} />
          {/* Profile Route
          <Route path="profile" element={<Profile />} /> */}
          {/* Auth Pages WITHOUT Navbar and Footer (Independent Routes) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Email Verification Route */}
          <Route path="/verify-email/:token" element={<EmailVerification />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
