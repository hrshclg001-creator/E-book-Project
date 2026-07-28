import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {
          //for navbar
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            //Aage ke routes jaise /dashboard ya /upload yahan aayenge
          </Routes>
        }
      </div>
    </Router>
  );
}

export default App;
