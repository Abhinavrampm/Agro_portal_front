import React from "react";
import "../styles/Service.css"; // CSS file for styling
import sampleImage from "../components/images/card.png"; // Replace with your main image path

const Service = () => {
  return (
    <div className="image-container">
      <div className="image-overlay">
        
      </div>
      <img src={sampleImage} alt="Centered" className="centered-image" />
      
      <div className="small-container">
        <div className="small-box box-1">
          <div className="weather-forecast">Weather Forecast</div>
        </div>
        <div className="small-box box-2">
          <div className="agricultural-news">Agricultural News</div>
        </div>
        <div className="small-box box-3">
          <div className="expense-track">Expense Tracker</div>
        </div>
        <div className="small-box box-4">
          <div className="crop-sale">Direct Crop Sale</div>
        </div>
      </div>
      
      {/* Content sections can go here */}
      <div className="content-section">
        <h2>Service Provided</h2>
        <p>These are the services offered by Agrotech, carefully designed to support and empower farmers at every stage of the agricultural process. From real-time weather forecasts and crop health advice to financial tools and direct communication with experts, our goal is to provide a platform that fosters growth, efficiency, and sustainability. We're here to help you achieve success in every season.</p>
      </div>
      <div className="content-section">
      <footer class="footer">
  <div class="footer-section">
    <h3>About</h3>
    <p>Agrotech supports farmers with tools for weather updates, crop health,</p>
    <p> financial management, and expert advice, promoting efficient, sustainable agriculture.</p>
  </div>
  <div class="footer-section">
    <h3>Links</h3>
    <ul>
      <li>About Us</li>
      <li>Services</li>
      <li>Case</li>
      <li>Request Pickup</li>
      <li>Contact Us</li>
    </ul>
  </div>
  
  <div class="footer-section">
    <h3>Get In Touch</h3>
   
    <p><i class="fas fa-envelope"></i> Email: example@info.com</p>
    <p><i class="fas fa-phone"></i> Phone: 333 686 0000</p>
    
  </div>
</footer>

      </div>
      {/* Add more content sections as necessary */}
    </div>
  );
};

export default Service;
