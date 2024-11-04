import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ViewEquipment.css';

const ViewEquipment = () => {
    const [equipmentList, setEquipmentList] = useState([]);
    const [showOfferForm, setShowOfferForm] = useState(false);
    const [offerDetails, setOfferDetails] = useState({
        equipmentId: '',
        rentalDuration: '', // Number of days requested
        message: '',
    });

    useEffect(() => {
        const fetchEquipment = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/rentalSystem', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEquipmentList(response.data);
            } catch (error) {
                console.error("Error fetching equipment:", error);
            }
        };
        fetchEquipment();
    }, []);

    const handleOfferClick = (equipmentId) => {
        setOfferDetails({ ...offerDetails, equipmentId });
        setShowOfferForm(true);
    };

    const handleOfferSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:5000/api/rentalSystem/offer/${offerDetails.equipmentId}`,
                {
                    rentalDays: offerDetails.rentalDuration,
                    message: offerDetails.message,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            alert('Offer sent successfully!');
            setShowOfferForm(false);
            // Refresh the equipment list to reflect the new offer
            const response = await axios.get('http://localhost:5000/api/rentalSystem', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEquipmentList(response.data);
        } catch (error) {
            console.error("Error in handleOfferSubmit:", error);
            alert('Failed to send offer');
        }
    };

    const renderButton = (item) => {
        if (!item.available) {
            return <button disabled>Not Available</button>;
        }
    
        // Check if there are any offers associated with this equipment
        const offers = item.offers || []; // Ensure offers is an array
        const activeOffer = offers.find(offer => 
            offer.status === 'requested' || 
            offer.status === 'accepted' || 
            offer.status === 'rejected' || 
            offer.status === 'pending'
        );
    
        if (activeOffer) {
            switch (activeOffer.status) {
                case 'requested':
                    return <button disabled>Offer Requested</button>;
                case 'accepted':
                    return <button disabled>Offer Accepted</button>;
                case 'rejected':
                    return <button disabled>Offer Rejected</button>;
                default:
                    break;
            }
        }
    
        return <button onClick={() => handleOfferClick(item._id)}>Make an Offer</button>;
    };
    return (
        <div className="equipment-list">
            {equipmentList.map((item) => (
                <div key={item._id} className="equipment-card">
                    <img src={`http://localhost:5000/${item.imagePath}`} alt={item.name} className="card-image" />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Condition: {item.condition}</p>
                    <p>Price: Rs{item.price} per {item.rateType}</p>
                    <p>Location: {item.location}</p>
                    <p>Owner: {item.userName}</p>
                    <p>Status: {item.available ? 'Available' : 'Not Available'}</p>
                    {item.returnDate && <p>Return Date: {new Date(item.returnDate).toLocaleDateString()}</p>}
                    { renderButton(item) }
                </div>
            ))}
            {showOfferForm && (
                <div className="offer-form">
                    <h3>Make an Offer</h3>
                    <form onSubmit={handleOfferSubmit}>
                        <input
                            type="number"
                            value={offerDetails.rentalDuration}
                            onChange={(e) => setOfferDetails({ ...offerDetails, rentalDuration: e.target.value })}
                            placeholder="Number of days"
                            required
                        />
                        <textarea
                            value={offerDetails.message}
                            onChange={(e) => setOfferDetails({ ...offerDetails, message: e.target.value })}
                            placeholder="Your message"
                            required
                        />
                        <button type="submit">Send Offer</button>
                        <button type="button" onClick={() => setShowOfferForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ViewEquipment;
