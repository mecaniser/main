import axios from 'axios';
import { saveToken, removeToken, getToken } from '../utils/authUtils';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your backend URL

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    const { token } = response.data;
    saveToken(token);
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { token } = response.data;
    saveToken(token);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = () => {
  removeToken();
};

export const getCurrentUser = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
