import { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import socket from './SocketShare';

const defaultAvatar = 'https://i.pravatar.cc/150';

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notCount, setnotCount] = useState(0);
    const [AllNotifications, setAllNotifications] = useState([]);

    const notificationRef = useRef(null);

    const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleBellClick = async() => {
        await getAllNotifications();
        setIsOpen(!isOpen);
    };

    const getAllNotifications = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5500/api/notification/getallnotifications`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`,
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setAllNotifications(data.data);
                const unreadCount = data.data.length;
                setnotCount(unreadCount);
            }
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    };

    useEffect(() => {
        socket.on("sendNotification", (data) => {
            setAllNotifications(data?.data);
            setnotCount(prev => prev + 1);
        });

        return () => { socket.off("sendNotification") };
    }, []);

    useEffect(() => {
        getAllNotifications();
    }, []);

    useEffect(() => {
    }, [notCount]);

    return (
        <div className="notification-container" ref={notificationRef}>
            <button className="notification-icon-button" onClick={handleBellClick}>
                <FaBell size={24} />
                {notCount > 0 && (
                    <span className="notification-badge">{notCount}</span>
                )}
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <h3>Notifications</h3>
                    </div>
                    <ul className="notification-list">
                        {AllNotifications.length > 0 ? (
                            AllNotifications.map((notification, ind) => (
                                <li 
                                    key={ind}
                                    className={`notification-item`}
                                >
                                    <img 
                                        src={notification?.sender?.profilepic} 
                                        alt={`User profilepic`} 
                                        className="notification-avatar"
                                    />
                                    <div className="notification-message">
                                        {notification.message}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="notification-item no-notifications">
                                You have no new notifications.
                            </li>
                        )}
                    </ul>
                    <div className="notification-footer">
                        <a href="/notifications">View all notifications</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;