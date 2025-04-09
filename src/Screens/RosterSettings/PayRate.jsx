import React, { useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaUserClock } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaPerson } from "react-icons/fa6";
import { MdOutlineDoNotDisturb } from "react-icons/md";

import EmployeeTypeSettings from './EmployeeTypeLoading';


const PayRate = () => {
  const [selectedSetting, setSelectedSetting] = useState(null);

  const renderComponent = () => {
    switch (selectedSetting) {
      case 'Employee Types': return <EmployeeTypeSettings />;
      case 'Pay Rate Level': return <fgdfg />;
      case 'Junior Rates': return <sdgd />;
      case 'Penalty Rate Rules': return <sdgd />;
      default: return null;
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between'>
        {[
          { name: 'Employee Types', icon: <FaPeopleGroup size={50} /> },
          { name: 'Pay Rate Level', icon: <BiMoneyWithdraw size={50} /> },
          { name: 'Junior Rates', icon: <FaPerson size={50} /> },
          { name: 'Penalty Rate Rules', icon: <MdOutlineDoNotDisturb size={50} /> },
        ].map((setting) => (
          <div
            key={setting.name}
            className={`p-5 rounded-md w-45 cursor-pointer transition-all duration-200
              ${selectedSetting === setting.name ? 'bg-indigo-900 text-white' : 'bg-gray-200'}
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

export default PayRate