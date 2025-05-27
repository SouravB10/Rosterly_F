import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedbackModal from "../Component/FeedbackModal";

const NotificationPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [notifications, setNotifications] = useState([]);
  const [notificationId, setNotificationId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [showConfirmButtons, setShowConfirmButtons] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

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

  const handleNotificationAction = async (id, actionType) => {
    // setConfirmDeleteId(id);

    console.log("Notification ID:", id);
    console.log("Action:", actionType);
    setFeedbackMessage(
      `Are you sure you want to ${
        actionType == 1 ? "approve" : "deny"
      } this request?`
    );
    setShowConfirmButtons(true);
    setFeedbackModalOpen(true);
    try {
      const response = await axios.post(
        `${baseURL}/notifications`,
        {
          notification_id: id,
          action: actionType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFeedbackMessage(`Are you sure you want to ${
        actionType == 1 ? "approve" : "deny"
      } this request?`);
      setShowConfirmButtons(false);
      if (response.status === 200) {
        setNotifications((prev) =>
          prev.filter((note) => note.id !== notificationId)
        );
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
            <div
              key={id}
              className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-start"
            >
              <div>
                <p className="paragraphBold">
                  {innerData.message || "User"}{" "}
                  {innerData.fromDT ? (
                    <strong className="notClass">{innerData.fromDT}</strong>
                  ) : null}{" "}
                  {innerData.toDT ? (
                    <strong className="notClass">{innerData.toDT}</strong>
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
              {innerData.status == 1 || 2 ? null : (
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    className="buttonSuccess"
                    onClick={() => handleNotificationAction(id, 1)}
                  >
                    Approve
                  </button>
                  <button
                    className="buttonDanger"
                    onClick={() => handleNotificationAction(id, 2)}
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
        // onConfirm={confirmDelete}
        showConfirmButtons={showConfirmButtons}
      />
    </div>
  );
};

export default NotificationPage;
