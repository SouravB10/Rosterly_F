import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedbackModal from "../Component/FeedbackModal";

const NotificationPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [notifications, setNotifications] = useState([]);
  const [notificationId, setNotificationId] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [showConfirmButtons, setShowConfirmButtons] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [removingId, setRemovingId] = useState(null);

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
        const fetchId = fetchedNotification.map((notID) => notID.id);
        setNotificationId(fetchId);
        setNotifications(fetchedNotification);
        console.log("Fetched notifications:", fetchedNotification);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleActions = (id, actionType) => {
    setNotificationId(id);
    setFeedbackMessage(
      `Are you sure you want to ${actionType == 1 ? "approve" : "deny"
      } this request?`
    );
    setShowConfirmButtons(true);
    setFeedbackModalOpen(true);
    setActionType(actionType);
  };

  const handleNotificationAction = async () => {
    // setConfirmDeleteId(id);
    if (!notificationId && !actionType) return;
    console.log("Notification ID:", notificationId);
    console.log("Action:", actionType);

    try {
      const response = await axios.post(
        `${baseURL}/notifications`,
        {
          notification_id: notificationId,
          action: actionType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setShowConfirmButtons(false);
        setFeedbackModalOpen(false);
        setRemovingId(notificationId);

        setTimeout(() => {
          setNotifications((prev) =>
            prev.filter((note) => note.id !== notificationId)
          );
          setRemovingId(null);
        }, 300);
      }

    } catch (error) {
      console.error("Error handling notification:", error);
    }
  };

  return (
    <div className="p-2 rounded-md  mt-2">
      <div className="flex justify-between items-center mb-4">
        {/* <h2 className="heading">Notifications</h2> */}
        {/* <button className="buttonGrey">Clear All</button> */}
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications found.</p>
      ) : (
        notifications.map((note) => {
          const { id, data } = note;
          const innerData = data;

          return (
            // <div
            //   key={id}
            //   className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-start"
            // >
            <div
              key={id}
              className={`bg-white shadow-sm border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-start transition-all duration-300 ease-in-out ${removingId === id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
            >

              <div>
                <p className="paragraphBold">
                  {innerData.message || "User"}{" "}
                  {innerData.fromDT ? (
                    <strong className="notClass">{innerData.fromDT}</strong>
                  ) : null}
                  {innerData.toDT ? (
                    <strong className="notClass">to {innerData.toDT}</strong>
                  ) : null}{" "}
                  {innerData.day ? (
                    <strong className="notClass">{innerData.day}</strong>
                  ) : null}{" "}
                </p>
                <p className="paragraphThin">
                  {innerData.reason ? (
                    <span>Reason: {innerData.reason}</span>
                  ) : null}
                  {/* Reason: {innerData.reason || "No reason provided"} */}

                </p>
              </div>
              {innerData.status != null ? null : (
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    className="buttonSuccess"
                    onClick={() => handleActions(id, 1)}
                  >
                    Approve
                  </button>
                  <button
                    className="buttonDanger"
                    onClick={() => handleActions(id, 2)}
                  >
                    Deny
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        message={feedbackMessage}
        onConfirm={handleNotificationAction}
        showConfirmButtons={showConfirmButtons}
      />
    </div>
  );
};

export default NotificationPage;
