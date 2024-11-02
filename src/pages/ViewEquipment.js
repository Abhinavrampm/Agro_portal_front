// ViewEquipment.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ViewEquipment.css';

const ViewEquipment = () => {
    const [equipmentList, setEquipmentList] = useState([]);
    const [showNegotiationForm, setShowNegotiationForm] = useState(false);
    const [negotiationDetails, setNegotiationDetails] = useState({
        equipmentId: '',
        offerPrice: '',
        message: '',
    });

    useEffect(() => {
        const fetchEquipment = async () => {
            const token = localStorage.getItem('token'); 
            const response = await axios.get('http://localhost:5000/api/rentalSystem', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEquipmentList(response.data);
        };
        fetchEquipment();
    }, []);

    const handleNegotiateClick = (equipmentId) => {
        setNegotiationDetails({ ...negotiationDetails, equipmentId });
        setShowNegotiationForm(true);
    };

    const handleNegotiationSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/equipment/negotiate', negotiationDetails);
            alert('Negotiation request sent!');
            setShowNegotiationForm(false);
        } catch (error) {
            alert('Failed to send negotiation request');
        }
    };

    return (
        <div className="equipment-list">
            {equipmentList.map((item) => (
                <div key={item._id} className="equipment-card">
                    <img src={`http://localhost:5000/${item.imagePath}`} alt={item.name} className="card-image" />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Condition: {item.condition}</p>
                    <p>Price: ${item.price} per {item.rateType}</p>
                    <button onClick={() => handleNegotiateClick(item._id)}>Negotiate</button>
                </div>
            ))}
            {showNegotiationForm && (
                <div className="negotiation-form">
                    <h3>Make a Negotiation Offer</h3>
                    <form onSubmit={handleNegotiationSubmit}>
                        <input
                            type="number"
                            value={negotiationDetails.offerPrice}
                            onChange={(e) => setNegotiationDetails({ ...negotiationDetails, offerPrice: e.target.value })}
                            placeholder="Offer Price"
                            required
                        />
                        <textarea
                            value={negotiationDetails.message}
                            onChange={(e) => setNegotiationDetails({ ...negotiationDetails, message: e.target.value })}
                            placeholder="Your Message"
                            required
                        />
                        <button type="submit">Send Offer</button>
                        <button type="button" onClick={() => setShowNegotiationForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ViewEquipment;
