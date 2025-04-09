import React, { useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaUserClock } from "react-icons/fa6";

const SystemSettings = () => {
  const [selectedSetting, setSelectedSetting] = useState(null);

  const renderComponent = () => {
    switch (selectedSetting) {
      case 'General': return <General />;
      // case 'Roster': return <Roster />;
      default: return null;
    }
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='bg-white-200 p-5 rounded-md w-45 cursor-pointer' onClick={() => setSelectedSetting('General')}>        <IoSettingsOutline size={50} />
        <div className='flex justify-between mt-4 items-center'>
          <h2 className='font-weight-700 font18 '>General</h2>
          <MdOutlineArrowOutward />
        </div>
      </div>
      <div className='bg-white-200 p-5 rounded-md w-45'>
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
      <div className='bg-white-200 p-5 rounded-md w-45'>
        <IoSettingsOutline size={50} />
        <div className='flex justify-between mt-4 items-center'>
          <h2 className='font-weight-700 font18 '>Permissions</h2>
          <MdOutlineArrowOutward />
        </div>
      </div>
    </div>
  )
}

export default SystemSettings