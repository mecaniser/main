import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
// import Dashboard from './pages/Dashboard';
// import BookingPage from './pages/BookingPage';

const AppWrapper = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/booking" element={<BookingPage />} /> */}
      </Routes>
      <Footer />
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;