import React, { useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaUserClock } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaPerson } from "react-icons/fa6";
import { MdOutlineDoNotDisturb } from "react-icons/md";

import EmployeeTypeSettings from './EmployeeTypeLoading';
import PayRateLevel from './PayRateLevel';
import JuniorRate from './JuniorRate';
import PenalityRate from './PenalityRate';

const PayRate = () => {
  const [selectedSetting, setSelectedSetting] = useState(null);

  const renderComponent = () => {
    switch (selectedSetting) {
      case 'Employee Types': return <EmployeeTypeSettings />;
      case 'Pay Rate Level': return <PayRateLevel />;
      case 'Junior Rates': return <JuniorRate />;
      case 'Penalty Rate Rules': return <PenalityRate />;
      default: return null;
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between'>
        {[
          { name: 'Employee Types', icon: <FaPeopleGroup size={40} /> },
          { name: 'Pay Rate Level', icon: <BiMoneyWithdraw size={40} /> },
          { name: 'Junior Rates', icon: <FaPerson size={40} /> },
          { name: 'Penalty Rate Rules', icon: <MdOutlineDoNotDisturb size={40} /> },
        ].map((setting) => (
          <div
            key={setting.name}
            className={`p-4 rounded-md w-45 cursor-pointer transition-all duration-200
              ${selectedSetting === setting.name ? 'bg-indigo-900 text-white' : 'bg-gray-200'}
              hover:bg-indigo-300`}
            onClick={() => setSelectedSetting(setting.name)}
          > 
            <div className={`transition-all duration-200 
              ${selectedSetting === setting.name ? 'text-white' : 'text-gray-600'} 
              hover:text-indigo-900`}>
              {setting.icon}
            </div>
            <div className='flex justify-between mt-4 items-center'>
              <div className={`font-semibold text-lg ${selectedSetting == setting.name ? 'text-white' : 'text-gray-700'}`}>{setting.name}</div>
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