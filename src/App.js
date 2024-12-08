// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import for Routes
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import Chatbot from './components/Chatbot';
import Signup from './pages/Signup'
import Login from './pages/Login'
import Workersignup from './pages/Workersignup';
import RentalSystem from './pages/RentalSystem';
import AddEquipment from './pages/AddEquipment';
import ViewEquipment from './pages/ViewEquipment';
import Notifications from './pages/Notifications';
import Service from './pages/Service';
import Choose from './pages/Choose';
import ViewJobs from './pages/ViewJobs';
const App = ({setIsLoggedIn}) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path='/services' element = {<Service />} />
                <Route path='/choose' element = {<Choose />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/Workersignup" element={<Workersignup />} />
                <Route path="/rentalPage" element={<RentalSystem />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/addEquipment" element={<AddEquipment />} />
                <Route path="/viewEquipment" element={<ViewEquipment />} />
                <Route path="/viewJobs" element={<ViewJobs />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
