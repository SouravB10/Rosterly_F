import React, { useState } from 'react';

const Permission = () => {
  const roles = [
    'Owners Only',
    'Location Manager & Above',
    'Area Manager & Above',
    'All Staff'
  ];

  const initialPermissions = {
    rosterDesign: 'Area Manager & Above',
    publishRosters: 'Location Manager & Above',
    unpublishRosters: 'Location Manager & Above',
    timeclockAccess: 'Owners Only',
    approveShifts: 'Location Manager & Above',
    locations: 'Owners Only',
    employeeProfiles: 'Location Manager & Above',
  };

  const [permissions, setPermissions] = useState(initialPermissions);

  const handleChange = (key, value) => {
    setPermissions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="card">
      <div className="mx-auto space-y-6">
        {[
          {
            label: 'Roster Design',
            desc: 'Who Can Create And Edit Shifts On A Roster?',
            key: 'rosterDesign',
          },
          {
            label: 'Publish Rosters',
            desc: 'Who Can Publish Rosters?',
            key: 'publishRosters',
          },
          {
            label: 'Un-Publish Rosters',
            desc: 'Who Can Unpublish Rosters?',
            key: 'unpublishRosters',
          },
          {
            label: 'Timeclock Access',
            desc: 'Who Has Permission To Access The Timeclock From Their Employee Portal? Relevant Only To Timesheet/Timeclock Users.',
            key: 'timeclockAccess',
          },
          {
            label: 'Approve Timesheet Shifts',
            desc: 'Who Can Approve Timesheet Shifts?',
            key: 'approveShifts',
          },
          {
            label: 'Locations',
            desc: 'Who Can View, Edit And Update Roster Location Settings?',
            key: 'locations',
          },
          {
            label: 'Employee Profiles',
            desc: 'Who Can View, Edit And Update Employee Profiles? Only Profiles With A Lesser Access Level Will Be Viewable.',
            key: 'employeeProfiles',
          },
        ].map(item => (
          <div
            key={item.key}
            className="flex justify-between items-start gap-4"
          >
            {/* LEFT SIDE - 60% */}
            <div className="w-[60%]">
              <h3 className="subHeading">{item.label}</h3>
              <p className="paragraphThin">{item.desc}</p>
            </div>

            {/* RIGHT SIDE - 40% */}
            <div className="w-[40%] flex justify-end">
              <select
                className="input"
                value={permissions[item.key]}
                onChange={(e) => handleChange(item.key, e.target.value)}
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
        ))}

        {/* UPDATE BUTTON */}
        <div className="flex justify-end pt-6">
          <button
            className="buttonSuccess"
            onClick={() => console.log('Updated Permissions:', permissions)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Permission;
