// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import for Routes
import Dashboard from './pages/Dashboard';
import Chatbot from './components/Chatbot';

const App = () => {
    return (
        <Router>
            <Routes> 
                <Route path="/" element={<Dashboard />} />
                <Route path="/chatbot" element={<Chatbot />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
