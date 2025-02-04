import axios from "axios";

// const API_URL = "http://localhost:5000/api";
const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

// Fetch JSON message from `/api`
export const getServerMessage = async () => {
  try {
    const response = await axios.get(API_URL); // Automatically handles JSON response
    return response.data.message; // Extract 'message' field from JSON
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return "Error fetching message";
  }
};

// Helper function for API calls
const apiRequest = async (requestFunction) => {
  try {
    const response = await requestFunction();
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

// User API calls
export const createUser = async (userData) => apiRequest(() => axios.post(`${API_URL}/users`, userData));
export const getUsers = async () => apiRequest(() => axios.get(`${API_URL}/users`));


// Transaction API calls
export const createTransaction = async (transactionData) => apiRequest(() => axios.post(`${API_URL}/transactions`, transactionData));
export const getTransactions = async () => apiRequest(() => axios.get(`${API_URL}/transactions`));

// Account API calls
export const createAccount = async (accountData) => apiRequest(() => axios.post(`${API_URL}/accounts`, accountData));
export const getAccounts = async () => apiRequest(() => axios.get(`${API_URL}/accounts`));
