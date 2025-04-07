import React, { useState } from "react";

const Location = () => {
  const [selectLocation, setSelectLocation] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const [showModal, setShowModal] = useState(false);


  const handleLocation = (e) => {
    setSelectLocation(e.target.value);
  };

  const getLocation = () => {
    alert(selectLocation);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Locations</h3>

      {/* Top bar with dropdown and buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3 items-center">
          <select
            name="selectedLocation"
            className="bg-white px-3 py-3 rounded-lg text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50 w-80 appearance-none pr-10"
            style={{
              backgroundImage:
                'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke-width=\'2\' stroke=\'black\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19 9l-7 7-7-7\'/></svg>")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              backgroundSize: "1.25rem",
            }}
            onChange={handleLocation}
          >
            <option value="">-- Select location --</option>
            <option value="Location 1">Location 1</option>
            <option value="Location 2">Location 2</option>
            <option value="Location 3">Location 3</option>
          </select>

          <button
            onClick={getLocation}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-full"
          >
            Get Data
          </button>
        </div>

          <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-full" onClick={() => setShowModal(true)}>
            + Location
          </button>
      </div>

      

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
      <div className="space-y-6">
      {activeTab === "general" && (
          <div className="w-1/2 pl-1 space-y-4">
            {/* Location Name */}
            <div className="bg-gray-100 rounded-xl shadow-md p-6 flex items-start justify-between">
              <div className="w-2/3">
                <h4 className="text-lg font-semibold text-purple-800 mb-2">
                  Location Name
                </h4>
                <p className="text-sm text-gray-600">
                  What you normally refer to the roster location as.
                  For example, if it was a Subway store in Brisbane CBD you might refer to it as Brisbane CBD.
                </p>
              </div>
              <div className="w-2/3 pl-4">
                <input
                  type="text"
                  placeholder="Main Branch"
                  className="bg-white w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Location Short Name */}
            <div className="bg-gray-100 rounded-xl shadow-md p-6 flex items-start justify-between">
              <div className="w-2/3">
                <h4 className="text-lg font-semibold text-purple-800 mb-2">
                  Location Short Name
                </h4>
                <p className="text-sm text-gray-600">
                  We will sometimes refer to this roster location with a three letter code (for example, in an SMS).
                </p>
              </div>
              <div className="w-2/3 pl-4">
                <input
                  type="text"
                  placeholder="MNB"
                  className="bg-white w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Update Button */}
            <div className="flex justify-end">
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-2 rounded-md text-sm shadow-md">
                Update
              </button>
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {activeTab === "Sales" && (
          <div className="bg-gray-100 p-6 rounded-xl shadow-md w-1/2">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Expected Average Sales</h2>
      
          {[
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
          ].map((day, index) => (
            <div key={index} className="flex items-center justify-between mb-4">
              <label className="font-medium text-sm text-black">{day}</label>
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
        {activeTab === "Employees" && (
          <p className="text-slate-500 font-light">Employees tab content here.</p>
        )}
        {activeTab === "Status" && (
          <p className="text-slate-500 font-light">Status tab content here.</p>
        )}
      </div>

       {/* Modal */}
       {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Modal Box */}
            <div className="bg-gray-100 w-full max-w-md p-8 rounded-xl shadow-lg">

              {/* Title */}
              <h2 className="text-xl font-semibold text-purple-700 mb-4">Add Location</h2>

              {/* Description */}
              <div className="bg-gray-100 p-6 rounded-xl mb-6">
                <p className="text-sm text-gray-600">
                  <strong className="text-black">Location Name</strong> is what you normally refer to the roster location as.
                  For example, if it was a Subway store in Brisbane CBD you might refer to it as Brisbane CBD
                </p>
              </div>

              {/* Form Fields */}
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

              {/* Buttons */}
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-md text-sm"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Submit logic
                    setShowModal(false);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md text-sm"
                >
                  Create
                </button>
              </div>

            </div>
          </div>
        )}

    </div>
    
  );
};

export default Location;
