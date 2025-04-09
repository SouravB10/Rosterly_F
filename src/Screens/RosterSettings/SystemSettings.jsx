import React, { useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaUserClock } from "react-icons/fa6";
import General from './General';
import RosterSettingsPage from './RosterSetting';
import Permission from './Permission';


const SystemSettings = () => {
  const [selectedSetting, setSelectedSetting] = useState(null);

  const renderComponent = () => {
    switch (selectedSetting) {
      case 'General': return <General />;
      case 'Roster': return <RosterSettingsPage />;
      case 'Permission': return <Permission />;
      default: return null;
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between'>
        {[
          { name: 'General', icon: <IoSettingsOutline size={50} /> },
          { name: 'Roster', icon: <FaUserClock size={50} /> },
          { name: 'TimeSheet', icon: <IoSettingsOutline size={50} /> },
          { name: 'Integrations', icon: <IoSettingsOutline size={50} /> },
          { name: 'Permission', icon: <IoSettingsOutline size={50} /> },
        ].map((setting) => (
          <div
            key={setting.name}
            className={`p-5 rounded-md w-45 cursor-pointer transition-all duration-200
              ${selectedSetting === setting.name ? 'bg-indigo-900 text-white' : 'bg-gray-100'}
              hover:bg-indigo-300`}
            onClick={() => setSelectedSetting(setting.name)}
          >
            <div className={`transition-all duration-200 
              ${selectedSetting === setting.name ? 'text-white' : 'text-gray-600'} 
              hover:text-indigo-700`}>
              {setting.icon}
            </div>
            <div className='flex justify-between mt-4 items-center'>
              <div className={`font-semibold text-lg ${selectedSetting == setting.name?'text-white':'text-gray-700'}`}>{setting.name}</div>
              <MdOutlineArrowOutward />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        {renderComponent()}
      </div>
    </div>
  )
}

export default SystemSettings