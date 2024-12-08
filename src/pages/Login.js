import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ setIsLoggedIn }) => {
  const [identifier, setIdentifier] = useState(''); // Handles email/phoneNo
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine whether identifier is email or phoneNo
    const isEmail = /^\S+@\S+\.\S+$/.test(identifier);
    const isPhoneNo = /^\d{10}$/.test(identifier);

    if (!isEmail && !isPhoneNo) {
      alert('Invalid email or phone number format.');
      return;
    }

    try {
      let response;

      if (isEmail) {
        // Call user login API
        response = await axios.post('http://localhost:5000/api/auth/login', {
          email: identifier,
          password,
        });
      } else if (isPhoneNo) {
        console.log("Phone no is",identifier);
        // Call worker login API
        response = await axios.post('http://localhost:5000/api/auth/Workerlogin', {
          phoneNo: identifier,
          password,
        });
      }

      const token = response.data.token;

      // Store token in local storage
      localStorage.setItem('token', token);
      setIsLoggedIn(true); // Update logged-in state

      // Redirect based on user type
      if (isEmail) {
        alert('User Login Successful!');
        navigate('/dashboard'); // Redirect to user dashboard
      } else {
        alert('Worker Login Successful!');
        navigate('/viewJobs'); // Redirect to worker dashboard
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Invalid credentials'); // Show error message
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="identifier">Email/Phone No:</label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
      </div>
    </div>
  );
};

export default Login;
