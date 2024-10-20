import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Import your CSS

const Login = ({ setIsLoggedIn }) => { // Accept setIsLoggedIn as prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const token = response.data.token;

      // Store token in local storage
      localStorage.setItem('token', token);
      setIsLoggedIn(true); // Update logged in state
      setMessage('User logged in successfully!');
      
      setTimeout(() => {
        setMessage(''); // Clear message after 3 seconds
        navigate('/dashboard'); // Redirect to dashboard
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage('Invalid credentials'); // Show error message
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <div className="popup-message">{message}</div>} {/* Popup message */}
    </div>
  );
};

export default Login;
