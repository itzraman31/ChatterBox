import React, { useEffect, useState } from 'react'

const AllNotifications = () => {
  const [Notifications, setNotifications] = useState([])

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
        setNotifications(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
  }, [Notifications]);

  useEffect(() => {
    getAllNotifications();
  }, []);

  return (
    <>
      <div className="allnotification-outer">
        <div className="allnotification-header">
          <h3>All Notifications</h3>
        </div>
        <ul className="allnotification-list">
          {Notifications.length > 0 ? (
            Notifications.map((notification, ind) => (
              <li key={ind} className="allnotification-item">
                {console.log(notification.isRead)}
                <img
                  src={notification?.sender?.profilepic}
                  alt="User profilepic"
                  className="allnotification-avatar"
                />
                <div className="allnotification-message">
                  {notification.message}
                </div>
                {
                  !notification.isRead && <img src="/images/reddot.png" className='isreaddot' alt="" />
                }
                
              </li>
            ))
          ) : (
            <li className="allnotification-item allnotification-empty">
              You have no new notifications.
            </li>
          )}
        </ul>
      </div>
    </>
  )
}

export default AllNotifications
