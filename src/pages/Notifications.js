import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Notification.css'; // Ensure this file contains the CSS provided

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/notifications', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setNotifications(response.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    // Separate notifications into "Our Offers" and "Our Requests"
    const ourOffers = notifications.filter(notification => notification.offerId);
    const ourRequests = notifications.filter(notification => !notification.offerId);

    const handleAccept = async (equipmentId, offerId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/rentalSystem/accept-offer/${equipmentId}/${offerId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Offer accepted');
            setNotifications(prev => prev.filter(notif => notif.offerId !== offerId));
        } catch (error) {
            console.error(error);
            alert('Failed to accept offer');
        }
    };

    const handleReject = async (equipmentId, offerId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/rentalSystem/reject-offer/${equipmentId}/${offerId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Offer rejected');
            setNotifications(prev => prev.filter(notif => notif.offerId !== offerId));
        } catch (error) {
            console.error(error);
            alert('Failed to reject offer');
        }
    };

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="notifications-container">
            <h3>Notifications Center</h3>

            {/* Our Offers Section */}
            <section>
                <h4>Our Offers</h4>
                {ourOffers.length === 0 ? (
                    <p className="empty-section">No offers on our equipment</p>
                ) : (
                    <ul>
                        {ourOffers.map((notification) => (
                            <li key={notification._id} className="notification-item">
                                <p><strong>Message:</strong> {notification.message}</p>
                                <p><strong>Date:</strong> {new Date(notification.date).toLocaleDateString()}</p>
                                <p><strong>From:</strong> {notification.senderId?.name || 'Unknown'}</p>
                                <div className="notification-buttons">
                                    <button onClick={() => handleAccept(notification.equipmentId, notification.offerId)} className="accept-button">Accept</button>
                                    <button onClick={() => handleReject(notification.equipmentId, notification.offerId)} className="reject-button">Reject</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <div className="section-divider"></div>

            {/* Our Requests Section */}
            <section>
                <h4>Our Requests</h4>
                {ourRequests.length === 0 ? (
                    <p className="empty-section">No pending requests</p>
                ) : (
                    <ul>
                        {ourRequests.map((notification) => (
                            <li key={notification._id} className="notification-item">
                                <p><strong>Equipment:</strong> {notification.equipmentId ? notification.equipmentId.name : 'Unknown Equipment'}</p>
                                <p><strong>Status:</strong> {notification.message}</p>
                                <p><strong>Date:</strong> {new Date(notification.date).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default Notifications;
