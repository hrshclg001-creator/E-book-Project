import axios from "axios";


const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // Cookies handle karne ke liye (login ke time kaam aayega)
});

// Register API call karne ka function
export const registerUserAPI = async (userData) => {
  try {
    const response = await apiClient.post("/users/register", userData);
    return response.data;
  } catch (error) {
    // Backend se aane wale errors ko properly throw karna
    throw error.response?.data || error.message;
  }
};

// Login API call karne ka function
export const loginUserAPI = async(userData) => {
	try {
		const response = await apiClient.post("/users/login",userData);
	} catch (error) {
		throw error.response?.data || error.message;
	}
};

export default apiClient;
