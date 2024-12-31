import { jwtDecode } from 'jwt-decode';

// Function to save the token to localStorage
export const saveToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Function to get the token from localStorage
export const getToken = () => {
  return localStorage.getItem('authToken');
};

// Function to remove the token from localStorage
export const removeToken = () => {
  localStorage.removeItem('authToken');
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return !!token; // Returns true if token exists, false otherwise
};

// Function to decode the token (if using JWT)
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};