import React, { useState } from "react";

const Location = () => {
  const [selectLocation, setSelectLocation] = useState("");
  const [activeTab, setActiveTab] = useState("Sales");

  const handleLocation = (e) => {
    setSelectLocation(e.target.value);
  };

  const getLocation = () => {
    alert(selectLocation);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6">Location</h3>

      {/* Filter Section */}
      <div className="flex gap-3 items-center mb-6">
        <label className="text-sm font-semibold text-purple-700 mr-2">
          By Location
        </label>
        <select
          name="selectedLocation"
          className="bg-white px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 shadow-sm w-80 border"
          onChange={handleLocation}
        >
          <option value="">-- Select location --</option>
          <option value="Location 1">Location 1</option>
          <option value="Location 2">Location 2</option>
          <option value="Location 3">Location 3</option>
        </select>

        <button
          onClick={getLocation}
          className="bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2 rounded-md text-sm"
        >
          Filter Data
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex gap-10">
        {/* Left: Tabs and Content */}
        <div className="flex-1">
          {/* Tab Switcher */}
          <div className="flex gap-6 mb-6">
            {["general", "Sales", "Employees", "Status"].map((tab) => (
              <label key={tab} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tabOption"
                  value={tab}
                  checked={activeTab === tab}
                  onChange={() => setActiveTab(tab)}
                  className="form-radio text-purple-600"
                />
                <span className="text-sm font-semibold text-slate-900 capitalize">
                  {tab}
                </span>
              </label>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "Sales" && (
            <div className="bg-gray-100 p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-purple-700 mb-4">
                Expected Average Sales
              </h2>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-4"
                >
                  <label className="font-medium text-sm text-black">
                    {day}
                  </label>
                  <input
                    type="text"
                    placeholder="₹5000.00"
                    defaultValue="₹5000.00"
                    className="w-1/3 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              ))}
              <div className="flex justify-end mt-6">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md text-sm">
                  Update
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Add Location Panel */}
        <div className="w-[400px] bg-gray-50 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">
            Add Location
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            <strong className="text-black">Location Name</strong> is what you
            normally refer to the roster location as. For example, if it was a
            Subway store in Brisbane CBD you might refer to it as Brisbane CBD
          </p>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Add Location"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <input
              type="text"
              placeholder="Average Daily Sales (₹)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md text-sm">
              Close
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md text-sm">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
