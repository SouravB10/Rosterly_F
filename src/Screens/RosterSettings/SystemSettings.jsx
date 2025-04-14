import React, { useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaUserClock } from "react-icons/fa6";
import General from './General';
import RosterSettingsPage from './RosterSetting';
import Permission from './Permission';
import { GrDocumentTime } from "react-icons/gr";
import { RiListSettingsLine } from "react-icons/ri";
import { BsNewspaper } from "react-icons/bs";


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
      <h1 className='heading'>System Settings</h1>
      <div className='flex items-center justify-between mt-6'>
        {[
          { name: 'General', icon: <IoSettingsOutline size={40} /> },
          { name: 'Roster', icon: <FaUserClock size={40} /> },
          { name: 'TimeSheet', icon: <GrDocumentTime size={40} /> },
          { name: 'Integrations', icon: <RiListSettingsLine size={40} /> },
          { name: 'Permission', icon: <BsNewspaper size={40} /> },
        ].map((setting) => (
          <div
            key={setting.name}
            className={`p-5 rounded-md w-45 cursor-pointer transition-all duration-200
              ${selectedSetting === setting.name ? 'buttonSuccessActive  text-black' : 'bg-green-100'}
              hover:bg-green-200`}
            onClick={() => setSelectedSetting(setting.name)}
          >
            <div className={`transition-all duration-200 
              ${selectedSetting === setting.name ? 'text-black py-2' : 'text-gray-600'} 
              `}>
              {setting.icon}
            </div>
            <div className='flex justify-between mt-4 items-center'>
              <div className={`font-semibold text-lg ${selectedSetting == setting.name?'text-black':'text-gray-700'}`}>{setting.name}</div>
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