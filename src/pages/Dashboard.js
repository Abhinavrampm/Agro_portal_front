import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/Dashboard.css'; // Ensure you have the styles defined as mentioned previously

const Dashboard = () => {
    const navigate = useNavigate(); // Hook for navigation
    

    // Handle navigation to Chatbot
    const handleChatbotClick = () => {
        navigate('/chatbot'); // Navigate to the Chatbot route
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">Farmer Dashboard</h1>

            {/* Chatbot Feature */}
            <div className="card">
                <h3>Chatbot</h3>
                <p>Ask any queries to our new AI-assisted farmer here!</p>
                <button className="card-button" onClick={handleChatbotClick}>
                    Open Chatbot
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
