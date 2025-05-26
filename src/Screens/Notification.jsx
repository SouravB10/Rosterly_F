import React, { useEffect, useState } from "react";
import axios from "axios";



const NotificationPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${baseURL}/notifications`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        const fetchedNotification = response.data?.notifications || [];
        setNotifications(fetchedNotification);
        console.log("Fetched notifications:", fetchedNotification);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-4 rounded-md bg-gray-50 mt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="heading">Notifications</h2>
        <button className="buttonGrey">Clear All</button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications found.</p>
      ) : (
        notifications.map((note) => {
          const { id, data } = note;
          const innerData = data;

          return (
            <div
              key={id}
              className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-start"
            >
              <div>
                <p className="paragraphBold">
                  {innerData.message || "User"} requested off on{" "}
                  <strong>{innerData.fromDT == null ? "" : innerData.fromDT + ' to '}</strong>
                  <strong>{innerData.toDT == null ? "" : innerData.toDT + ' '}</strong>
                  <strong>{innerData.day == null ? "" : innerData.day}</strong>.
                </p>
                <p className="paragraphThin">Reason: {innerData.reason || 'No reason provided'}</p>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button className="buttonDanger">Deny</button>
                <button className="buttonSuccess">Approve</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default NotificationPage;
