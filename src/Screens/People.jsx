import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaSearch, FaEye, FaEdit } from "react-icons/fa";
import ProfileImage from "../assets/images/profile.png";
import DatePicker from "react-datepicker";

const People = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewButtonModel, setViewButtonModel] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("default");
  const [selectedBranch, setSelectedBranch] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState(new Date());


  const handleLocation = (e) => {
    setSelectedLocation(e.target.value);
    console.log("Selected Location:", e.target.value);
  };
  const handleBranch = (e) => {
    setSelectedBranch(e.target.value);
    console.log("Selected Branch:", e.target.value);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log("Search Term:", e.target.value);
  };
  const getLocation = () => {
    console.log("Fetching data for:", selectedLocation);
  };

  // const handleAddPerson = (e) => {
  //   e.preventDefault();
  //   setIsModalOpen(false); // close modal after action
  // };

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-5">
          <select
            name="selectedLocation"
            className="input"
            value={selectedLocation}
            onChange={handleLocation}
          >
            <option value="default">--Select Status--</option>
            <option value="Location 1">Active</option>
            <option value="Location 2">Inactive</option>
          </select>

          <select
            name="selectedLocation"
            className="input"
            value={selectedBranch}
            onChange={handleBranch}
          >
            <option value="default">--Select Location--</option>
            <option value="store1">Store 1</option>
            <option value="store2">Store 2</option>
          </select>

          <button className="buttonSuccess" onClick={getLocation}>
            Filter Data
          </button>
          <div className="relative w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-950" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <button className="buttonTheme" onClick={() => setIsModalOpen(true)}>
            + People
          </button>
        </div>

        {/* </div> */}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <div className="@container bg-white p-3 rounded-xl">
            <div className="flex flex-1/3 gap-4 justify-between">
              <div className="flex flex-col @md:flex-row">
                <img
                  alt="Profile"
                  src={ProfileImage}
                  className="h-20 w-20 rounded"
                />
              </div>
              <div className="flex flex-col @md:flex-row">
                <h3 className="subHeadingBold">Vishal Kattera</h3>
                <h6 className="paragraphThin">vishal.glansa@gmail.com</h6>
                <h6 className="paragraphThin">7780290335</h6>
              </div>
            </div>
            <div className="flex flex-1/3 gap-4 justify-end items-end">
              <div>
                <h6 className="paragraphBold">Location:Store 1</h6>
              </div>
              <div className=" flex flex-1/3 mt-3 gap-4 justify-end">
                <FaEye
                  className="text-indigo-950 bg-amber-300 cursor p-2 rounded-md size-8"
                  onClick={() => setViewButtonModel(true)}
                />
                <FaEdit className="text-indigo-950  bg-gray-200 cursor p-2 rounded-md size-8" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="@container bg-white p-3 rounded-xl">
            <div className="flex flex-1/3 gap-4 justify-between">
              <div className="flex flex-col @md:flex-row">
                <img
                  alt="Profile"
                  src={ProfileImage}
                  className="h-20 w-20 rounded"
                />
              </div>
              <div className="flex flex-col @md:flex-row">
                <h3 className="subHeadingBold">Vishal Kattera</h3>
                <h6 className="paragraphThin">vishal.glansa@gmail.com</h6>
                <h6 className="paragraphThin">7780290335</h6>
              </div>
            </div>
            <div className="flex flex-1/3 gap-4 justify-end items-end">
              <div>
                <h6 className="paragraphBold">Location:Store 1</h6>
              </div>
              <div className=" flex flex-1/3 mt-3 gap-4 justify-end">
                <FaEye
                  className="text-indigo-950 bg-amber-300 cursor p-2 rounded-md size-8"
                  onClick={() => setViewButtonModel(true)}
                />
                <FaEdit className="text-indigo-950  bg-gray-200 cursor p-2 rounded-md size-8" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="@container bg-white p-3 rounded-xl">
            <div className="flex flex-1/3 gap-4 justify-between">
              <div className="flex flex-col @md:flex-row">
                <img
                  alt="Profile"
                  src={ProfileImage}
                  className="h-20 w-20 rounded"
                />
              </div>
              <div className="flex flex-col @md:flex-row">
                <h3 className="subHeadingBold">Vishal Kattera</h3>
                <h6 className="paragraphThin">vishal.glansa@gmail.com</h6>
                <h6 className="paragraphThin">7780290335</h6>
              </div>
            </div>
            <div className="flex flex-1/3 gap-4 justify-end items-end">
              <div>
                <h6 className="paragraphBold">Location:Store 1</h6>
              </div>
              <div className=" flex flex-1/3 mt-3 gap-4 justify-end">
                <FaEye
                  className="text-indigo-950 bg-amber-300 cursor p-2 rounded-md size-8"
                  onClick={() => setViewButtonModel(true)}
                />
                <FaEdit className="text-indigo-950  bg-gray-200 cursor p-2 rounded-md size-8" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="@container bg-white p-3 rounded-xl">
            <div className="flex flex-1/3 gap-4 justify-between">
              <div className="flex flex-col @md:flex-row">
                <img
                  alt="Profile"
                  src={ProfileImage}
                  className="h-20 w-20 rounded"
                />
              </div>
              <div className="flex flex-col @md:flex-row">
                <h3 className="subHeadingBold">Vishal Kattera</h3>
                <h6 className="paragraphThin">vishal.glansa@gmail.com</h6>
                <h6 className="paragraphThin">7780290335</h6>
              </div>
            </div>
            <div className="flex flex-1/3 gap-4 justify-end items-end">
              <div>
                <h6 className="paragraphBold">Location:Store 1</h6>
              </div>
              <div className=" flex flex-1/3 mt-3 gap-4 justify-end">
                <FaEye
                  className="text-indigo-950 bg-amber-300 cursor p-2 rounded-md size-8"
                  onClick={() => setViewButtonModel(true)}
                />
                <FaEdit className="text-indigo-950  bg-gray-200 cursor p-2 rounded-md size-8" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="@container bg-white p-3 rounded-xl">
            <div className="flex flex-1/3 gap-4 justify-between">
              <div className="flex flex-col @md:flex-row">
                <img
                  alt="Profile"
                  src={ProfileImage}
                  className="h-20 w-20 rounded"
                />
              </div>
              <div className="flex flex-col @md:flex-row">
                <h3 className="subHeadingBold">Vishal Kattera</h3>
                <h6 className="paragraphThin">vishal.glansa@gmail.com</h6>
                <h6 className="paragraphThin">7780290335</h6>
              </div>
            </div>
            <div className="flex flex-1/3 gap-4 justify-end items-end">
              <div>
                <h6 className="paragraphBold">Location:Store 1</h6>
              </div>
              <div className=" flex flex-1/3 mt-3 gap-4 justify-end">
                <FaEye
                  className="text-indigo-950 bg-amber-300 cursor p-2 rounded-md size-8"
                  onClick={() => setViewButtonModel(true)}
                />
                <FaEdit className="text-indigo-950  bg-gray-200 cursor p-2 rounded-md size-8" />
              </div>
            </div>
          </div>
        </div>
        {/* End */}
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
              <Dialog.Title className="heading">Add Person</Dialog.Title>
              <button
                className="text-white font-bold text-2xl"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form className="mt-4 p-6 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="paragraphBold">First Name</label>
                  <input type="text" className="input"/>
                </div>
                <div className="flex flex-col">
                  <label className="paragraphBold">Last Name</label>
                  <input type="text" className="input"/>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="paragraphBold">Email</label>
                <input
                  type="email"
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label className="paragraphBold">Date of Birth</label>
                <DatePicker
                  type="text"
                  className="input w-100"
                  selected={date}
                  onChange={(date) => setDate(date)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="paragraphBold">Payrate Percentage</label>
                  <input type="text" className="input"/>
                </div>
                <div className="flex flex-col">
                  <label className="paragraphBold">Phone Number</label>
                  <input type="text" className="input"/>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="buttonGrey"
                  onClick={() => setViewButtonModel(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="buttonTheme">
                  Update
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
      <Dialog
        open={viewButtonModel}
        onClose={() => setViewButtonModel(false)}
        className="relative z-50 rounded-lg"
      >
        <div className="fixed inset-0 bg-gray-700/70"></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-gray-200 rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-gray-800 rounded-t-lg text-white px-4 py-3 flex justify-between items-center">
              <Dialog.Title className="heading">Person Details</Dialog.Title>
              <button
                className="text-white font-bold text-2xl"
                onClick={() => setViewButtonModel(false)}
              >
                ×
              </button>
            </div>
            <form className="mt-4 p-6 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="paragraphBold">First Name</label>
                  <input type="text" className="input" value="Vishal" />
                </div>
                <div className="flex flex-col">
                  <label className="paragraphBold">Last Name</label>
                  <input type="text" className="input" value="Kattera" />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="paragraphBold">Email</label>
                <input
                  type="email"
                  className="input"
                  value="vishal.glansa@gmail.com"
                />
              </div>
              <div className="flex flex-col">
                <label className="paragraphBold">Date of Birth</label>
                <DatePicker
                  type="text"
                  className="input w-100"
                  value="09-10-1998"
                  selected={date}
                  onChange={(date) => setDate(date)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="paragraphBold">Payrate Percentage</label>
                  <input type="text" className="input" value="50%" />
                </div>
                <div className="flex flex-col">
                  <label className="paragraphBold">Phone Number</label>
                  <input type="text" className="input" value="7780290335" />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="buttonGrey"
                  onClick={() => setViewButtonModel(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="buttonTheme">
                  Update
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default People;
