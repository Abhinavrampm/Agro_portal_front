import React from 'react';
import './Home.css'; 
const Home = () => {
  return (
    <div className="home-page">
      <header className="header">
        <h1>Agricultural Portal</h1>
      </header>

      <section className="quote-section">
        <p className="quote">
          Agriculture is the foundation of civilization.
        </p>
        <p className="quote">
          Agriculture can be a profitable business when done efficiently.
        </p>
      </section>

      <section className="button-section">
        <button className="register-button">Farmer Register</button>
        <button className="register-button">Worker Register</button>
      </section>
    </div>
  );
};

export default Home;