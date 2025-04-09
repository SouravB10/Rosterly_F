import React, { useState } from 'react';

const EmployeeTypeSettings = () => {
  const [partTimeLoading, setPartTimeLoading] = useState('0.00 %');
  const [casualLoading, setCasualLoading] = useState('25.00%');

  return (
    <div className=" bg-white p-8">
      <div className="mx-auto space-y-6">

        {/* PART TIME EMPLOYEE FIELD */}
        <div className="flex justify-between items-start">
          <div className="w-[60%]">
            <h6 className="font-semibold text-lg">Part Time Employee</h6>
            <p className="text-sm text-gray-600">
              What Loading Should Be Added For Employees Classified As Part Time? (i.e. 10%).
            </p>
          </div>
          <div className="w-[35%] text-right">
            <input
              type="text"
              value={partTimeLoading}
              onChange={(e) => setPartTimeLoading(e.target.value)}
              className="w-70 font-bold text-sm mt-2 p-2 rounded-md bg-gray-200 text-gray-700"
            />
          </div>
        </div>

        {/* CASUAL EMPLOYEE FIELD */}
        <div className="flex justify-between items-start">
          <div className="w-[60%]">
            <h6 className="font-semibold text-lg">Casual Employee</h6>
            <p className="text-sm text-gray-600">
              What Loading Should Be Added For Employees Classified As Casual? (i.e. 25%).
            </p>
          </div>
          <div className="w-[35%] text-right">
            <input
              type="text"
              value={casualLoading}
              onChange={(e) => setCasualLoading(e.target.value)}
              className="w-70 font-bold text-sm mt-2 p-2 rounded-md bg-gray-200 text-gray-700"
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end pt-6">
          <button
            className="successbutton w-30 text-white font-semibold px-6 py-2 rounded"
            onClick={() => {
              console.log('Part Time:', partTimeLoading);
              console.log('Casual:', casualLoading);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTypeSettings;
