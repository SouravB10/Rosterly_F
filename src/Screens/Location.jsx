import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Location = () => {
  const [selectLocation, setSelectLocation] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLocation = (e) => {
    setSelectLocation(e.target.value);
  };

  const getLocation = () => {
    alert(selectLocation);
  };

  return (
    <div className=" ">
      <div className="">
        {/* Left Section - 60% (3 columns) */}
        <div className="col-span-3">
          <h6 className="heading">By Location</h6>

          <div className="bg-gray-200 p-4 borderRadius10 mt-5">
            {/* Dropdown + Button */}
            <div className="flex justify-between  mb-6">
              <div className="flex gap-4">
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
              {activeTab === "general" && (
                <button className="buttonTheme" title="Add Location" onClick={() => setIsModalOpen(true)}>
                  + Location
                </button>
              )
              }

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
                  <div className="card flex justify-between ">
                    <div className="w-full">
                      <h4 className="subHeading">Location Name</h4>
                      <p className="paragraphThin">
                        What you normally refer to the roster location as. For
                        example, Brisbane CBD.
                      </p>
                    </div>
                    <div className="w-full flex justify-end">
                      <input
                        type="text"
                        placeholder="Main Branch"
                        className="input border border-gray-300"
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
                        className="w-1/3 px-4 py-2 text-sm border bg-white border-gray-300 rounded-md focus:outline-none"
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
                    <div className="bg-white rounded-lg border border-gray-300">
                      <div className="flex flex-row items-center w-64 px-3 ">
                        <FaSearch className="text-indigo-950" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="input"

                        />
                      </div>
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
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50 rounded-lg"
      >
        <div className="fixed inset-0 bg-gray-700/70"></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-gray-200 rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-gray-800 rounded-t-lg text-white px-4 py-3 flex justify-between items-center">
              <Dialog.Title className="heading">Add Location</Dialog.Title>
              <button
                className="text-white font-bold text-2xl"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form className="mt-1 p-4 space-y-3">
              <div>
                <p className="paragraph text-gray-500">                 
                  'Location Name' is what you normally refer to the roster location as. For example, if it was a Subway store in Brisbane CBD you might refer to it as Brisbane CBD.
                </p>
              </div>
              <div className="flex flex-col gap-4">

                <div className="flex flex-col">
                  <label className="paragraphBold">Location Name</label>
                  <input type="text" className="input" />
                </div>
                <div className="flex flex-col">
                  <label className="paragraphBold">Average Daily Sales ($)</label>
                  <input type="text" className="input" />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="buttonGrey"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="buttonTheme">
                  Add
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

    </div>
  );
};

export default Location;
