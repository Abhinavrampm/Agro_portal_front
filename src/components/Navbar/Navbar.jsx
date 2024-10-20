import React from 'react';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        {/* Replace with your agriculture logo */}
      </div>
      <ul className="nav-links">
        {isLoggedIn ? (
          <>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="#" onClick={onLogout}>Logout</a></li> 
            <li><a href="/about">About</a></li>
          </>
        ) : (
          <>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
            <li><a href="/about">About</a></li>
          </>
        )}
        
      </ul>
    </nav>
  );
};

export default Navbar;
