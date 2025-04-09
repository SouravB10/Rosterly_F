import React, { useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaUserClock } from "react-icons/fa6";
import General from './General';
import RosterSettingsPage from './RosterSetting';
import Permission from './RosterSetting';

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
        <div className='bg-white-200 p-5 rounded-md w-45 cursor-pointer' onClick={() => setSelectedSetting('General')}>        <IoSettingsOutline size={50} />
          <div className='flex justify-between mt-4 items-center'>
            <h2 className='font-weight-700 font18 '>General</h2>
            <MdOutlineArrowOutward />
          </div>
        </div>
        <div className='bg-white-200 p-5 rounded-md w-45 cursor-pointer' onClick={() => setSelectedSetting('Roster')}>
          <FaUserClock size={50} />
          <div className='flex justify-between mt-4 items-center'>
            <h2 className='font-weight-700 font18 '>Roster</h2>
            <MdOutlineArrowOutward />
          </div>
        </div>
        <div className='bg-white-200 p-5 rounded-md w-45'>
          <IoSettingsOutline size={50} />
          <div className='flex justify-between mt-4 items-center'>
            <h2 className='font-weight-700 font18 '>Time Sheet</h2>
            <MdOutlineArrowOutward />
          </div>
        </div>
        <div className='bg-white-200 p-5 rounded-md w-45'>
          <IoSettingsOutline size={50} />
          <div className='flex justify-between mt-4 items-center'>
            <h2 className='font-weight-700 font18 '>Integrations</h2>
            <MdOutlineArrowOutward />
          </div>
        </div>
        <div className='bg-white-200 p-5 rounded-md w-45 cursor-pointer' onClick={() => setSelectedSetting('Permission')}>
          <IoSettingsOutline size={50} />
          <div className='flex justify-between mt-4 items-center'>
            <h2 className='font-weight-700 font18 '>Permissions</h2>
            <MdOutlineArrowOutward />
          </div>
        </div>
      </div>
      <div className="mt-5">
        {renderComponent()}
      </div>
    </div>
  )
}

export default SystemSettings