import { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

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

  const getTimeAgo = (time) => {
    const now = dayjs();
    const created = dayjs(time);

    const seconds = now.diff(created, 'second');
    console.log(seconds);
    const minutes = now.diff(created, 'minute');
    const hours = now.diff(created, 'hour');
    const days = now.diff(created, 'day');

    if (seconds < 5) return 'just now';
    else if (seconds < 60) return `${seconds}s`;
    else if (minutes < 60) return `${minutes}m`;
    else if (hours < 24) return `${hours}h`;
    else return `${days}d`;
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
                <img
                  src={notification?.sender?.profilepic}
                  alt="User profilepic"
                  className="allnotification-avatar"
                />
                <div className="allnotification-message">
                  {notification.message}
                </div>
                {
                  !notification.isRead && <img src="/images/reddot.png" className='isreaddot2' alt="" />
                }
                <i>{getTimeAgo(notification.updatedAt)}</i>

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
