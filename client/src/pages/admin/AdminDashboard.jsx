import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // --- MOCK DATA FOR ADMIN ---
  const kpiStats = {
    revenue: "₹45,230",
    orders: 142,
    activeUsers: 89,
    totalBooks: 24,
  };

  const recentOrders = [
    {
      id: "#ORD-9982",
      user: "Priya Sharma",
      date: "Oct 22, 2025",
      total: 1198,
      status: "Completed",
    },
    {
      id: "#ORD-9981",
      user: "Rahul Verma",
      date: "Oct 21, 2025",
      total: 450,
      status: "Pending",
    },
    {
      id: "#ORD-9980",
      user: "Neha Gupta",
      date: "Oct 20, 2025",
      total: 899,
      status: "Completed",
    },
  ];

  const inventoryBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      category: "Classic",
      price: 299,
      sales: 45,
    },
    {
      id: 2,
      title: "Deep Learning",
      category: "Academic",
      price: 899,
      sales: 12,
    },
    {
      id: 3,
      title: "Atomic Habits",
      category: "Self-Help",
      price: 450,
      sales: 85,
    },
  ];

  const usersList = [
    {
      id: "U1",
      name: "Harsh Mera",
      email: "harsh@example.com",
      role: "Admin",
      joined: "Aug 2025",
    },
    {
      id: "U2",
      name: "Priya Sharma",
      email: "priya@example.com",
      role: "User",
      joined: "Oct 2025",
    },
  ];

  const coupons = [
    {
      code: "BOOKIX20",
      discount: "₹200 Flat",
      usageLimit: 100,
      used: 45,
      status: "Active",
    },
    {
      code: "WELCOME50",
      discount: "50% Off",
      usageLimit: 500,
      used: 500,
      status: "Expired",
    },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-book-gray/10 w-full overflow-hidden font-sans">
      {/* 1. ADMIN SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-800 bg-black">
          <Link
            to="/"
            className="text-2xl font-serif font-bold text-white tracking-widest"
          >
            BOOKIX<span className="text-book-teal">.</span>
          </Link>
          <span className="ml-2 text-xs bg-book-rust text-white px-2 py-0.5 rounded-sm uppercase tracking-wide">
            Admin
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 space-y-1 px-3">
          {[
            {
              id: "overview",
              label: "Dashboard & Analytics",
              icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
            },
            {
              id: "books",
              label: "Books Management",
              icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
            },
            {
              id: "categories",
              label: "Categories",
              icon: "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z",
            },
            {
              id: "orders",
              label: "Orders & Sales",
              icon: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z",
            },
            {
              id: "users",
              label: "Users Management",
              icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
            },
            {
              id: "coupons",
              label: "Coupons & Discounts",
              icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${activeTab === tab.id ? "bg-book-teal text-white" : "hover:bg-gray-800 hover:text-white"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d={tab.icon} />
              </svg>
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-book-rust text-white rounded-sm text-sm transition-colors"
          >
            Logout Admin
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <header className="h-16 bg-white border-b border-book-gray/30 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-serif font-bold text-book-text capitalize">
            {activeTab.replace("-", " ")}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-book-teal text-white rounded-full flex items-center justify-center font-serif font-bold">
              A
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* TAB: OVERVIEW & ANALYTICS */}
          {activeTab === "overview" && (
            <div className="animate-fade-in space-y-8">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: "Total Revenue",
                    value: kpiStats.revenue,
                    color: "text-book-teal",
                  },
                  {
                    label: "Total Orders",
                    value: kpiStats.orders,
                    color: "text-book-text",
                  },
                  {
                    label: "Active Users",
                    value: kpiStats.activeUsers,
                    color: "text-blue-600",
                  },
                  {
                    label: "Books in Store",
                    value: kpiStats.totalBooks,
                    color: "text-book-rust",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-sm shadow-sm border border-book-gray/30"
                  >
                    <p className="text-xs font-bold text-book-text/50 uppercase tracking-wider mb-2">
                      {stat.label}
                    </p>
                    <h3
                      className={`text-3xl font-serif font-bold ${stat.color}`}
                    >
                      {stat.value}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Revenue Chart Placeholder */}
              <div className="bg-white p-6 rounded-sm shadow-sm border border-book-gray/30">
                <h3 className="font-serif text-xl font-bold text-book-text mb-6">
                  Revenue Analytics (Last 30 Days)
                </h3>
                <div className="w-full h-80 bg-book-gray/5 border border-dashed border-book-gray/50 flex flex-col items-center justify-center rounded-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-16 h-16 text-book-teal/40 mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                  <p className="text-book-text/50 font-sans text-sm">
                    Chart.js / Recharts integration goes here
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: BOOKS MANAGEMENT */}
          {activeTab === "books" && (
            <div className="animate-fade-in bg-white rounded-sm shadow-sm border border-book-gray/30">
              <div className="p-6 border-b border-book-gray/30 flex justify-between items-center">
                <h3 className="font-serif text-xl font-bold text-book-text">
                  Inventory
                </h3>
                <button className="bg-book-teal text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-book-text transition-colors">
                  + Add New Book
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-book-text">
                  <thead className="bg-book-cream/50 text-book-text/70 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Sales</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryBooks.map((book) => (
                      <tr
                        key={book.id}
                        className="border-b border-book-gray/20 hover:bg-book-gray/5"
                      >
                        <td className="px-6 py-4 font-serif font-bold">
                          {book.title}
                        </td>
                        <td className="px-6 py-4">{book.category}</td>
                        <td className="px-6 py-4">₹{book.price}</td>
                        <td className="px-6 py-4">{book.sales} units</td>
                        <td className="px-6 py-4 text-right space-x-3">
                          <button className="text-blue-600 hover:underline">
                            Edit
                          </button>
                          <button className="text-book-rust hover:underline">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ORDERS MANAGEMENT */}
          {activeTab === "orders" && (
            <div className="animate-fade-in bg-white rounded-sm shadow-sm border border-book-gray/30">
              <div className="p-6 border-b border-book-gray/30">
                <h3 className="font-serif text-xl font-bold text-book-text">
                  Recent Transactions
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-book-text">
                  <thead className="bg-book-cream/50 text-book-text/70 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, i) => (
                      <tr
                        key={i}
                        className="border-b border-book-gray/20 hover:bg-book-gray/5"
                      >
                        <td className="px-6 py-4 font-medium">{order.id}</td>
                        <td className="px-6 py-4">{order.user}</td>
                        <td className="px-6 py-4">{order.date}</td>
                        <td className="px-6 py-4 font-bold">₹{order.total}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-sm ${order.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: USERS MANAGEMENT */}
          {activeTab === "users" && (
            <div className="animate-fade-in bg-white rounded-sm shadow-sm border border-book-gray/30">
              <div className="p-6 border-b border-book-gray/30">
                <h3 className="font-serif text-xl font-bold text-book-text">
                  Registered Users
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-book-text">
                  <thead className="bg-book-cream/50 text-book-text/70 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Joined</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((user, i) => (
                      <tr
                        key={i}
                        className="border-b border-book-gray/20 hover:bg-book-gray/5"
                      >
                        <td className="px-6 py-4 font-medium flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-book-teal text-white flex items-center justify-center font-bold text-xs">
                            {user.name.charAt(0)}
                          </div>
                          {user.name}
                        </td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-sm ${user.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">{user.joined}</td>
                        <td className="px-6 py-4 text-right space-x-3">
                          {user.role !== "Admin" && (
                            <button className="text-book-rust hover:underline">
                              Ban User
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: COUPONS MANAGEMENT */}
          {activeTab === "coupons" && (
            <div className="animate-fade-in bg-white rounded-sm shadow-sm border border-book-gray/30">
              <div className="p-6 border-b border-book-gray/30 flex justify-between items-center">
                <h3 className="font-serif text-xl font-bold text-book-text">
                  Discount Coupons
                </h3>
                <button className="bg-book-text text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-book-teal transition-colors">
                  + Create Coupon
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-book-text">
                  <thead className="bg-book-cream/50 text-book-text/70 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4">Code</th>
                      <th className="px-6 py-4">Discount</th>
                      <th className="px-6 py-4">Usage</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((coupon, i) => (
                      <tr
                        key={i}
                        className="border-b border-book-gray/20 hover:bg-book-gray/5"
                      >
                        <td className="px-6 py-4 font-mono font-bold">
                          {coupon.code}
                        </td>
                        <td className="px-6 py-4 text-book-teal font-bold">
                          {coupon.discount}
                        </td>
                        <td className="px-6 py-4">
                          {coupon.used} / {coupon.usageLimit}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-sm ${coupon.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            {coupon.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-book-rust hover:underline">
                            Deactivate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Placeholder for Categories (Simplified) */}
          {activeTab === "categories" && (
            <div className="animate-fade-in text-center py-20">
              <h3 className="text-2xl font-serif text-book-text/60">
                Categories Management Module
              </h3>
              <p className="font-sans text-sm text-book-text/40 mt-2">
                CRUD interface for book genres will be rendered here.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
