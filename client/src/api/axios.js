import axios from "axios";

const api = axios.create({
  //  backend is set to run on port 8000 by default
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
  // Required to send and receive secure cookies from the backend
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept outgoing requests to attach the JWT token from localStorage as a fallback
// Your backend checks both cookies and the Authorization header[cite: 2]
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;

