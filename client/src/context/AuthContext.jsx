import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hydrate state from localStorage on initial load
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Matches your backend POST /api/v1/users/login route[cite: 2]
  const login = async (email, password) => {
    const response = await api.post("/users/login", { email, password });

    // Extract token and user data from your ApiResponse structure[cite: 2]
    const { user, accessToken } = response.data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    return response.data;
  };

  // Matches your backend POST /api/v1/users/logout route[cite: 2]
  const logout = async () => {
    try {
      await api.post("/users/logout");
    } catch (error) {
      console.error("Logout failed on server", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
