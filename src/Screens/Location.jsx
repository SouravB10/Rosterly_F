import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Location = () => {
  const [selectLocation, setSelectLocation] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [locationName, setLocationName] = useState("");
  const [sales, setSales] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState("");

  const handleLocation = (e) => {
    setSelectLocation(e.target.value);
  };

  const getLocation = () => {
    alert(selectLocation);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!locationName.trim()) newErrors.locationName = "Location name is required.";
    if (!sales.trim() || isNaN(sales)) newErrors.sales = "Enter a valid number for sales.";
    if (!latitude.trim() || isNaN(latitude)) newErrors.latitude = "Enter a valid latitude.";
    if (!longitude.trim() || isNaN(longitude)) newErrors.longitude = "Enter a valid longitude.";
    // if (!address.trim()) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log({ locationName, sales, latitude, longitude });

      setLocationName("");
      setSales("");
      setLatitude("");
      setLongitude("");
      setErrors({});
      setIsModalOpen(false);
    }
  };
  const handleCloseModal = () => {
    setLocationName("");
    setSales("");
    setLatitude("");
    setLongitude("");
    setAddress("");
    setErrors({});
    setIsModalOpen(false);
  };


  return (
    <div className=" py-2">
      <div className="">
        <div className="col-span-3">
          <h6 className="heading">By Location</h6>

          <div className="bg-gray-200 p-4 borderRadius10 mt-5">
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
              <div className="flex md:flex-row gap-4">
                <select className="input w-full md:w-auto" onChange={handleLocation}>
                  <option>-- Select location --</option>
                  <option value="Location 1">Store 1</option>
                  <option value="Location 2">Store 2</option>
                </select>
                <button className="buttonSuccess w-full md:w-auto" onClick={getLocation}>
                  Get Data
                </button>
              </div>
              {activeTab === "general" && (
                <button
                  className="buttonTheme w-full md:w-auto"
                  title="Add Location"
                  onClick={() => setIsModalOpen(true)}
                >
                  + Location
                </button>
              )}
            </div>

            <div className="subHeading flex  md:flex-row gap-6 mb-6">
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

            <div className="space-y-6">
              {activeTab === "general" && (
                <div className="space-y-4">
                  <div className="card flex flex-col md:flex-row justify-between gap-4">
                    <div className="w-full">
                      <h4 className="subHeading">Location Name</h4>
                      <p className="paragraphThin">
                        What you normally refer to the roster location as. For example,
                        Brisbane CBD.
                      </p>
                    </div>
                    <div className="w-full flex justify-end">
                      <input
                        type="text"
                        placeholder="Main Branch"
                        className="input border border-gray-300 w-full md:w-auto"
                      />
                    </div>
                  </div>

                  {/* Location Short Name */}
                  {/* <div className="card flex flex-col md:flex-row justify-between">
                    <div className="w-full md:w-1/2 md:pr-4">
                      <h4 className="subHeading">Location Short Name</h4>
                      <p className="paragraphThin">
                        We use this in SMS and reports as a 3-letter code (e.g.,
                        MNB).
                      </p>
                    </div>
                    <div className="w-full md:w-1/2">
                      <input type="text" placeholder="MNB" className="input" />
                    </div>
                  </div> */}

                  <div className="flex justify-end">
                    <button className="buttonTheme w-full md:w-auto">Update</button>
                  </div>
                </div>
              )}

              {activeTab === "Sales" && (
                <div className="card p-6 rounded-xl">
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
                      className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2"
                    >
                      <label className="font-medium text-sm text-black w-full md:w-auto">
                        {day}
                      </label>
                      <input
                        type="text"
                        placeholder="$50.00"
                        defaultValue="$50.00"
                        className="w-full md:w-1/3 px-4 py-2 text-sm border bg-white border-gray-300 rounded-md focus:outline-none"
                      />
                    </div>
                  ))}
                  <div className="flex justify-end mt-6">
                    <button className="buttonSuccess w-full md:w-auto">Update</button>
                  </div>
                </div>
              )}

              {activeTab === "Employees" && (
                <div className="card rounded-xl p-6 space-y-4">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4">
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
                    <div className="bg-white rounded-lg border border-gray-300 w-full md:w-auto">
                      <div className="flex flex-row items-center px-3">
                        <FaSearch className="text-indigo-950" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="input w-full"
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
                        className="flex flex-col md:flex-row items-center justify-between px-3 py-2 border-b border-gray-100 hover:bg-gray-50 rounded-md transition gap-2"
                      >
                        <div className="flex items-center gap-3 w-full md:w-auto">
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
                onClick={handleCloseModal}
              >
                ×
              </button>
            </div>
            <form className="mt-1 p-4 space-y-3" onSubmit={handleSubmit}>
              <div>
                <p className="paragraph text-gray-500">
                  'Location Name' is what you normally refer to the roster location as. For example, if it was a Subway store in Brisbane CBD you might refer to it as Brisbane CBD.
                </p>
              </div>
              <div className="flex flex-col gap-4">

                <div className="flex flex-col">
                  <label className="paragraphBold">Location Name</label>
                  {/* <input type="text" className="input" /> */}
                  <input
                    type="text"
                    className="input"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                  />
                  {errors.locationName && (
                    <span className="text-sm text-red-600">{errors.locationName}</span>
                  )}
                </div>

                {/* <div className="flex flex-col">
                  <label className="paragraphBold">Average Daily Sales ($)</label>
                  <input
                    type="text"
                    className="input"
                    value={sales}
                    onChange={(e) => setSales(e.target.value)}
                  />
                  {errors.sales && (
                    <span className="text-sm text-red-600">{errors.sales}</span>
                  )}
                </div> */}

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full md:w-1/2">
                    <label className="paragraphBold">Latitude</label>
                    <input
                      type="text"
                      className="input"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                    {errors.latitude && (
                      <span className="text-sm text-red-600">{errors.latitude}</span>
                    )}
                  </div>

                  <div className="flex flex-col w-full md:w-1/2">
                    <label className="paragraphBold">Longitude</label>
                    <input
                      type="text"
                      className="input"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                    {errors.longitude && (
                      <span className="text-sm text-red-600">{errors.longitude}</span>
                    )}
                  </div>
                </div>


                <div className="flex flex-col">
                  <label className="paragraphBold">Address <span className="smallFont">(optional)</span> </label>
                  <textarea
                    type="text"
                    className="input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

              </div>


              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="buttonGrey"
                  onClick={handleCloseModal}
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
