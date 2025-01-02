import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import Card from '../components/Card';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages
    try {
      const response = await login({ email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <Card>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button className="login-button" type="submit">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p><a href="/register">Register</a></p>
      </Card>
    </div>
  );
};

export default Login;
