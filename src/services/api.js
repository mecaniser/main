import axios from 'axios';

const API = axios.create({ baseURL: 'https://your-backend-url.com/api' });

// Set Authorization Header
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const login = (credentials) => API.post('/auth/login', credentials);
export const getParkingLots = () => API.get('/parking-lots');
export const bookParkingSpot = (lotId, bookingData) =>
  API.post(`/parking-lots/${lotId}/book`, bookingData);
