import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Notification.css';

const Notifications = () => {
    const [ourOffers, setOurOffers] = useState([]);
    const [ourRequests, setOurRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/notifications', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response.data);

                // Separate notifications based on type
                const offers = response.data.notifications.filter(
                    (notif) => notif.notificationType === 'offer'
                );
                const requests = response.data.notifications.filter(
                    (notif) => notif.notificationType === 'request'
                );

                setOurOffers(offers);
                console.log(offers);
                setOurRequests(requests);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    const handleAccept = async (equipmentId, offerId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/rentalSystem/accept-offer/${equipmentId}/${offerId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Offer accepted');
    
            // Remove the accepted offer notification from ourOffers
            setOurOffers(prev => prev.filter(notif => notif.offerId._id !== offerId));
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
            setOurOffers(prev => prev.filter(notif => notif.offerId !== offerId));
        } catch (error) {
            console.error(error);
            alert('Failed to reject offer');
        }
    };

    const handleCloseRequest = async (notificationId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/notifications/${notificationId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOurRequests(prev => prev.filter(notif => notif._id !== notificationId));
        } catch (error) {
            console.error(error);
            alert('Failed to close notification');
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
                                <p><strong>From:</strong> {notification.senderId?.name}</p>
                                <div className="notification-buttons">
                                    <button onClick={() => handleAccept(notification.equipmentId, notification.offerId._id)} className="accept-button">Accept</button>
                                    <button onClick={() => handleReject(notification.equipmentId, notification.offerId._id)} className="reject-button">Reject</button>
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
                                <button onClick={() => handleCloseRequest(notification._id)} className="close-button">Close</button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default Notifications;
