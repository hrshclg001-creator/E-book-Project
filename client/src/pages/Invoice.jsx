import React from "react";
import { useParams, Link } from "react-router-dom";

const Invoice = () => {
  const { orderId } = useParams();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-book-cream py-12 p-4 print:bg-white print:py-0">
      <div className="max-w-3xl mx-auto bg-white p-10 sm:p-16 rounded-sm shadow-md border border-book-gray/30 print:shadow-none print:border-none">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-book-text pb-8 mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-book-text tracking-tight">
              BOOKIX.
            </h1>
            <p className="font-sans text-sm text-book-text/60 mt-1">
              Digital Bookstore Ecosystem
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-serif text-book-teal font-bold mb-1">
              INVOICE
            </h2>
            <p className="font-sans font-bold text-book-text">
              Order: #{orderId}
            </p>
            <p className="font-sans text-sm text-book-text/60">
              Date: Oct 12, 2025
            </p>
          </div>
        </div>

        {/* Billing Info */}
        <div className="flex justify-between mb-12 font-sans">
          <div>
            <h3 className="text-xs font-bold text-book-text/50 uppercase tracking-widest mb-2">
              Billed To
            </h3>
            <p className="font-bold text-book-text text-lg">Harsh Mera</p>
            <p className="text-book-text/70 text-sm">harsh@example.com</p>
          </div>
          <div className="text-right">
            <h3 className="text-xs font-bold text-book-text/50 uppercase tracking-widest mb-2">
              Payment Method
            </h3>
            <p className="text-book-text font-medium">
              Credit Card ending in 4242
            </p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-10 font-sans text-left">
          <thead>
            <tr className="border-b-2 border-book-gray text-book-text/70 text-sm">
              <th className="py-3 font-medium">Description</th>
              <th className="py-3 font-medium text-center">Qty</th>
              <th className="py-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="text-book-text border-b border-book-gray">
            <tr>
              <td className="py-4 font-medium">The Great Gatsby (eBook PDF)</td>
              <td className="py-4 text-center">1</td>
              <td className="py-4 text-right">₹299.00</td>
            </tr>
            <tr>
              <td className="py-4 font-medium">Deep Learning (eBook PDF)</td>
              <td className="py-4 text-center">1</td>
              <td className="py-4 text-right">₹899.00</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="w-full flex justify-end">
          <div className="w-64 space-y-3 font-sans text-sm text-book-text">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹1198.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹60.00</span>
            </div>
            <div className="flex justify-between text-book-teal font-bold">
              <span>Discount (BOOKIX20)</span>
              <span>-₹200.00</span>
            </div>
            <div className="flex justify-between font-serif text-2xl font-bold pt-3 border-t-2 border-book-text">
              <span>Total</span>
              <span>₹1058.00</span>
            </div>
          </div>
        </div>

        {/* Actions (Hidden on Print) */}
        <div className="mt-16 pt-8 border-t border-book-gray/30 flex justify-between items-center print:hidden">
          <Link
            to="/dashboard"
            className="text-sm font-sans font-medium text-book-text/70 hover:text-book-teal transition-colors"
          >
            &larr; Back to Dashboard
          </Link>
          <button
            onClick={handlePrint}
            className="bg-book-text hover:bg-book-teal text-white px-6 py-2 rounded-sm font-sans font-medium transition-colors"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
