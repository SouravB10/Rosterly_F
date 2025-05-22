import React, { useEffect, useState } from "react";
import axios from "axios";

const notifications = [
  {
    id: 1,
    name: "Vishal Kattera",
    days: 2,
    from: "04/04/25",
    to: "05/04/25",
    hours: "16.00hrs",
    type: "Without Pay Leave",
    reason: "Temple Visit",
    time: "03/04/25 2:56pm",
  },
  {
    id: 2,
    name: "Anita Seth",
    days: 2,
    from: "04/04/23",
    to: "05/04/25",
    hours: "16.00hrs",
    type: "Without Pay Leave",
    reason: "Home Visit",
    time: "03/04/25 2:56pm",
  },
  // Add more entries as needed
];

const NotificationPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  useEffect( () => {
    const fetchNotifications = async () => {
      const response = await axios.get(`${baseURL}/notifications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    
    }
    fetchNotifications();
  },[]);
  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="heading">Notifications</h2>
        <button className="buttonGrey">Clear All</button>
      </div>

      {notifications.map((note) => (
        <div
          key={note.id}
          className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-start"
        >
          <div>
            <p className="paragraphBold">
              {note.name} Has Requested {note.days} Days Off {note.from} To{" "}
              {note.to} As {note.hours} Of {note.type}.{" "}
              <span className="font-bold">(Reason: {note.reason})</span>
            </p>
            <p className="paragraphThin">{note.time}</p>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button className="buttonDanger">Deny</button>
            <button className="buttonSuccess">Approve</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;
