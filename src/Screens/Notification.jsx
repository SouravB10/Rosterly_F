import React from 'react';

const notifications = [
  {
    id: 1,
    name: 'Vishal Kattera',
    days: 2,
    from: '04/04/25',
    to: '05/04/25',
    hours: '16.00hrs',
    type: 'Without Pay Leave',
    reason: 'Temple Visit',
    time: '03/04/25 2:56pm',
  },
  // Add more entries as needed
];

const NotificationPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Notifications</h2>
        <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
          Clear All
        </button>
      </div>

      {notifications.map((note) => (
        <div
          key={note.id}
          className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-start"
        >
          <div>
            <p className="text-gray-800 font-medium">
              {note.name} Has Requested {note.days} Days Off {note.from} To {note.to} As {note.hours} Of {note.type}. <span className="font-bold">(Reason: {note.reason})</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">{note.time}</p>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button className="border border-red-600 text-red-600 px-4 py-1 rounded hover:bg-red-100 transition">Deny</button>
            <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition">Approve</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;
