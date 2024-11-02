// AddEquipment.js
import React, { useState } from 'react';
import axios from 'axios';
import MyUploads from '../components/MyUploads'
const AddEquipment = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [rateType, setRateType] = useState('day'); // Default to 'day'
    const [condition, setCondition] = useState('Good'); // Default to 'Good'
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('rateType', rateType); // Add rateType to formData
        formData.append('condition', condition); // Add condition to formData
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
                {/* Rate Type Dropdown */}
                <label>
                    Rent Rate Type:
                    <select value={rateType} onChange={(e) => setRateType(e.target.value)}>
                        <option value="day">Per Day</option>
                        <option value="week">Per Week</option>
                    </select>
                </label>
                
                {/* Condition Dropdown */}
                <label>
                    Condition:
                    <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                        <option value="New">New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
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
