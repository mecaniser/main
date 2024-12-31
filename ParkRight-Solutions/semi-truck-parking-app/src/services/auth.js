import axios from 'axios';

const API_URL = 'https://your-backend-api.com'; // Replace with your backend URL

export const register = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const login = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
