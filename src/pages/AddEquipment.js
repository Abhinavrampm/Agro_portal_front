import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyUploads from '../components/MyUploads';

const AddEquipment = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [rateType, setRateType] = useState('day');
    const [condition, setCondition] = useState('Good');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [userName, setUserName] = useState(''); // New state for storing user name

    // Fetch user profile to get user name
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                setUserName(response.data.name);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        
        fetchUserProfile();
    }, []);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('rateType', rateType);
        formData.append('condition', condition);
        formData.append('location', location);
        formData.append('userName', userName); // Include userName in formData
        formData.append('image', image);
    
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                'http://localhost:5000/api/rentalSystem/add', 
                formData, 
                {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            alert('Equipment added successfully!');
        } catch (error) {
            console.log("Error in AddEquipment.js", error);
            alert('Failed to add equipment');
        }
    };

    return (
        <div>
            <h2>Add New Equipment</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Equipment Name"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    required
                />
                <label>
                    Rent Rate Type:
                    <select value={rateType} onChange={(e) => setRateType(e.target.value)}>
                        <option value="day">Per Day</option>
                        <option value="week">Per Week</option>
                    </select>
                </label>
                
                <label>
                    Condition:
                    <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                        <option value="New">New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                    </select>
                </label>

                <label>
                    Location:
                    <select value={location} onChange={(e) => setLocation(e.target.value)} required>
                        <option value="" disabled>Select District</option>
                        <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                        <option value="Kollam">Kollam</option>
                        <option value="Pathanamthitta">Pathanamthitta</option>
                        <option value="Alappuzha">Alappuzha</option>
                        <option value="Kottayam">Kottayam</option>
                        <option value="Idukki">Idukki</option>
                        <option value="Ernakulam">Ernakulam</option>
                        <option value="Thrissur">Thrissur</option>
                        <option value="Palakkad">Palakkad</option>
                        <option value="Malappuram">Malappuram</option>
                        <option value="Kozhikode">Kozhikode</option>
                        <option value="Wayanad">Wayanad</option>
                        <option value="Kannur">Kannur</option>
                        <option value="Kasaragod">Kasaragod</option>
                    </select>
                </label>

                <input type="file" onChange={handleImageChange} accept="image/*" required />
                <button type="submit">Add Equipment</button>
            </form>
            <MyUploads />
        </div>
    );
};

export default AddEquipment;
