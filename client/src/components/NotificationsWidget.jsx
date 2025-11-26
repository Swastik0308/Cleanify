import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import api from "../services/api";
// import websocketService from "../services/websocket";
import { toast } from "react-toastify";

const NotificationsWidget = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();

    // Listen for new notifications
    const handleNewNotification = (data) => {
      if (data.notification) {
        setNotifications((prev) => [data.notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
        toast.info(data.notification.message);
      }
    };

    // websocketService.on("user:notification:new", handleNewNotification);

    return () => {
      // websocketService.off("user:notification:new", handleNewNotification);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications");
      setNotifications(response.data);
      setUnreadCount(response.data.filter((n) => !n.isRead).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await api.put(`/notifications/${notificationId}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="notifications-widget" data-testid="notifications-widget">
      <button
        className="notifications-btn"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="notifications-bell-btn"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="badge" data-testid="unread-badge">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="notifications-dropdown"
          data-testid="notifications-dropdown"
        >
          <div className="notifications-header">
            <h4>Notifications</h4>
          </div>
          <div className="notifications-list">
            {notifications.length === 0 ? (
              <p className="no-notifications">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.isRead ? "unread" : ""}`}
                  onClick={() =>
                    !notification.isRead && markAsRead(notification.id)
                  }
                  data-testid={`notification-item-${notification.id}`}
                >
                  <h5>{notification.title}</h5>
                  <p>{notification.message}</p>
                  <span className="time">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsWidget;
