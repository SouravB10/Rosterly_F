import React, { useState } from 'react';

const RosterSettingsPage = () => {
  const [approval, setApproval] = useState(true);
  const [sameLocationManagers, setSameLocationManagers] = useState(true);
  const [emailNotification, setEmailNotification] = useState(false);

  return (
    <div className="min-h-screen bg-white p-10">
  <div className="max-w-6xl mx-auto space-y-6">

    {/* TIMEZONE */}
    <div className="flex justify-between items-center">
      <div className="w-[60%]">
        <h6 className="font-bold">Timezone</h6>
        <p className="text-sm text-gray-600">Which Timezone Do Your Locations Belong To?</p>
        <p className="text-sm text-gray-500 mt-1">1:31:31 PM</p>
      </div>
      <div className="w-[35%] text-right">
        <select className="w-1/2 p-2 border border-gray-300 rounded">
          <option>(UTC+05:30) Asia/Kolkata</option>
        </select>
      </div>
    </div>

    {/* DEFAULT EMPLOYEE TYPE */}
    <div className="flex justify-between items-center">
      <div className="w-[60%]">
        <h6 className="font-bold">Default Employee Type</h6>
        <p className="text-sm text-gray-600">When Adding A New Employee, By Default What Should Their Employment Type Be?</p>
      </div>
      <div className="w-[35%] text-right">
        <select className="w-1/2 p-2 border border-gray-300 rounded">
          <option>Full</option>
        </select>
      </div>
    </div>

    {/* AVAILABILITY CHANGES REQUIRE APPROVAL */}
    <div className="flex justify-between items-center">
      <div className="w-[60%]">
        <h6 className="font-bold">Availability Changes Require Approval</h6>
        <p className="text-sm text-gray-600">Check To Require Management Approval Before Implementing And Using Employee Initiated Unavailability Updates.</p>
      </div>
      <div className="w-[35%] text-right">
        <input
          type="checkbox"
          checked={approval}
          onChange={() => setApproval(!approval)}
          className="w-5 h-5 text-purple-700 border-2 border-gray-300 rounded focus:ring-purple-500"
        />
      </div>
    </div>

    {/* ONLY SHOW SAME LOCATION MANAGERS */}
    <div className="flex justify-between items-center">
      <div className="w-[60%]">
        <h6 className="font-bold">Only Show Same Location Managers</h6>
        <p className="text-sm text-gray-600">Check To Only Display Managers Within The Same Location(S) As The Employee When The Employee Is Selecting Who Should Approve Their Availability Change Request.</p>
      </div>
      <div className="w-[35%] text-right">
        <input
          type="checkbox"
          checked={sameLocationManagers}
          onChange={() => setSameLocationManagers(!sameLocationManagers)}
          className="w-5 h-5 text-purple-700 border-2 border-gray-300 rounded focus:ring-purple-500"
        />
      </div>
    </div>

    {/* EMAIL NOTIFICATION */}
    <div className="flex justify-between items-center">
      <div className="w-[60%]">
        <h6 className="font-bold">Send All Unavailability Request Notifications By Email To Manager</h6>
        <p className="text-sm text-gray-600">Check To Notify Selected Manager By Email Of All Unavailability Or Leave Requests/Updates As They Occur.</p>
      </div>
      <div className="w-[35%] text-right">
        <input
          type="checkbox"
          checked={emailNotification}
          onChange={() => setEmailNotification(!emailNotification)}
          className="w-5 h-5 text-purple-700 border-2 border-gray-300 rounded focus:ring-purple-500"
        />
      </div>
    </div>

    {/* SAVE BUTTON */}
    <div className="flex justify-end pt-6">
      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded">
        Save
      </button>
    </div>
  </div>
</div>

  );
};

export default RosterSettingsPage;
