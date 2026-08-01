import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wrapper ke andar aane wale sabhi routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Aage chalkar hum yahan aur routes add karenge: 
          <Route path="login" element={<Login />} />
          <Route path="books" element={<Books />} />
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
