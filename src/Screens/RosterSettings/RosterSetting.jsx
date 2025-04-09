import React, { useState } from 'react';

const SettingsPage = () => {
  const [timezone, setTimezone] = useState('(UTC+05:30) Asia/Kolkata');
  const [employeeType, setEmployeeType] = useState('Full');
  const [approvalRequired, setApprovalRequired] = useState(true);
  const [sameLocationOnly, setSameLocationOnly] = useState(true);
  const [emailNotify, setEmailNotify] = useState(false);

  const handleSave = () => {
    const settings = {
      timezone,
      employeeType,
      approvalRequired,
      sameLocationOnly,
      emailNotify,
    };
    console.log('Saved Settings:', settings);
    // Add your API call here if needed
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto bg-white">
        <div className="space-y-8">
          {/* Timezone */}
          <div>
            <h2 className="font-bold text-lg">Timezone</h2>
            <p className="text-sm text-gray-600 mb-2">
              Which Timezone Do Your Locations Belong To?
            </p>
            <select
              className="border rounded p-2 w-full max-w-md"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              <option value="(UTC+05:30) Asia/Kolkata">(UTC+05:30) Asia/Kolkata</option>
              <option value="(UTC+01:00) Europe/Paris">(UTC+01:00) Europe/Paris</option>
              <option value="(UTC-08:00) America/Los_Angeles">(UTC-08:00) America/Los_Angeles</option>
            </select>
          </div>

          {/* Employee Type */}
          <div>
            <h2 className="font-bold text-lg">Default Employee Type</h2>
            <p className="text-sm text-gray-600 mb-2">
              When Adding A New Employee, By Default What Should Their Employment Type Be?
            </p>
            <select
              className="border rounded p-2 w-full max-w-md"
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
            >
              <option value="Full">Full</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Approval Required */}
          <div className="flex items-start gap-4">
            <input
              type="checkbox"
              className="mt-1"
              checked={approvalRequired}
              onChange={() => setApprovalRequired(!approvalRequired)}
            />
            <div>
              <h2 className="font-bold text-lg">Availability Changes Require Approval</h2>
              <p className="text-sm text-gray-600">
                Check To Require Management Approval Before Implementing And Using Employee Initiated Unavailability Updates.
              </p>
            </div>
          </div>

          {/* Only Same Location Managers */}
          <div className="flex items-start gap-4">
            <input
              type="checkbox"
              className="mt-1"
              checked={sameLocationOnly}
              onChange={() => setSameLocationOnly(!sameLocationOnly)}
            />
            <div>
              <h2 className="font-bold text-lg">Only Show Same Location Managers</h2>
              <p className="text-sm text-gray-600">
                Check To Only Display Managers Within The Same Location(S) As The Employee When The Employee Is Selecting Who Should Approve Their Availability Change Request.
              </p>
            </div>
          </div>

          {/* Email Notify */}
          <div className="flex items-start gap-4">
            <input
              type="checkbox"
              className="mt-1"
              checked={emailNotify}
              onChange={() => setEmailNotify(!emailNotify)}
            />
            <div>
              <h2 className="font-bold text-lg">Send All Unavailability Request Notifications By Email To Manager</h2>
              <p className="text-sm text-gray-600">
                Check To Notify Selected Manager By Email Of All Unavailability Or Leave Requests/Updates As They Occur.
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
