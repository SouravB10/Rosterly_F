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
      <div className="grid grid-cols-5 gap-6 w-full">
        {/* Left Section - 60% (3 columns) */}
        <div className="col-span-3">
          <h6 className="heading">By Location</h6>

          <div className="bg-gray-200 p-4 borderRadius10 mt-5">
            {/* Dropdown + Button */}
            <div className="flex items-center gap-4 mb-6">
              <select className="input" onChange={handleLocation}>
                <option>-- Select location --</option>
                <option value="Location 1">Store 1</option>
                <option value="Location 2">Store 2</option>
                {/* Add your options here */}
              </select>
              <button className="buttonSuccess" onClick={getLocation}>
                Get Data
              </button>
            </div>

            {/* Tab Switcher */}
            <div className="subHeading flex gap-6 mb-6">
              {["general", "Sales", "Employees"].map((tab) => (
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
                <div className="space-y-4">
                  {/* Location Name */}
                  <div className="card flex justify-between">
                    <div className="w-1/2 pr-4">
                      <h4 className="subHeading">Location Name</h4>
                      <p className="paragraphThin">
                        What you normally refer to the roster location as. For
                        example, Brisbane CBD.
                      </p>
                    </div>
                    <div className="w-1/2">
                      <input
                        type="text"
                        placeholder="Main Branch"
                        className="input"
                      />
                    </div>
                  </div>

                  {/* Location Short Name */}
                  {/* <div className="card flex justify-between">
                    <div className="w-1/2 pr-4">
                      <h4 className="subHeading">Location Short Name</h4>
                      <p className="paragraphThin">
                        We use this in SMS and reports as a 3-letter code (e.g.,
                        MNB).
                      </p>
                    </div>
                    <div className="w-1/2">
                      <input type="text" placeholder="MNB" className="input" />
                    </div>
                  </div> */}

                  <div className="flex justify-end">
                    <button className="buttonTheme">Update</button>
                  </div>
                </div>
              )}

              {activeTab === "Sales" && (
                <div className="card p-6 rounded-xl ">
                  <h2 className="heading">Expected Average Sales</h2>
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
                        placeholder="$50.00"
                        defaultValue="$50.00"
                        className="w-1/3 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  ))}
                  <div className="flex justify-end mt-6">
                    <button className="buttonSuccess">Update</button>
                  </div>
                </div>
              )}

              {activeTab === "Employees" && (
                <div className="card rounded-xl p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="heading">Employees</h4>
                      <p className="text-sm text-gray-600">
                        Employees Assigned to Office
                        <br />
                        <span className="text-xs text-gray-500">
                          Below is a list of employees assigned to Office.
                        </span>
                      </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-1/3">
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        🔍
                      </span>
                    </div>
                  </div>

                  {/* Scrollable List */}
                  <div className="bg-white rounded-md shadow-inner p-4 max-h-[250px] overflow-y-auto space-y-3">
                    {[
                      "Anita Seth",
                      "Harish Dobila",
                      "Naveen Nagam",
                      "Sourav Behuria",
                      "Sudiksha Kamireddy",
                      "Vishal Kattera",
                    ].map((emp, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between px-3 py-2 border-b border-gray-100 hover:bg-gray-50 rounded-md transition"
                      >
                        <div className="flex items-center gap-3">
                          <button className="bg-red-500 text-white w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-600">
                            ×
                          </button>

                          <span className="text-sm font-medium text-gray-800">
                            {emp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* {activeTab === "Status" && (
                <p className="text-slate-500 font-light">
                  Status tab content here.
                </p>
              )} */}
            </div>
          </div>
        </div>
        {/* Right Section - 40% (2 columns) */}
        {/* <div className="col-span-2">
          <h3 className="heading">Add Location</h3>
          <div className=" bg-gray-200 p-6 borderRadius10 mt-5 h-[350px]">
            <div className="paragraph">
              <p>
                <strong>Location Name</strong> is what you normally refer to the
                roster location as. For example, Brisbane CBD.
              </p>
            </div>
            <div className="grid grid-flow gap-5 mt-5">
              <input
                type="text"
                placeholder="Add Location"
                className="input"
              />
              <input
                type="text"
                placeholder="Average Daily Sales ($)"
                className="input"
              />
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button className="buttonGrey">Close</button>
              <button className="buttonSuccess">Create</button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Location;
