import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaSearch } from "react-icons/fa";

const People = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewButtonModel, setViewButtonModel] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("default");
  const[selectedBranch, setSelectedBranch] = useState("default"); 
  const [searchTerm, setSearchTerm] = useState("");

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

      <div className="overflow-x-auto mt-4">
        <div className="card">
          <table className="w-full border-collapse border border-gray-300 text-xs font-semibold">
            <thead className="bgTable subHeading text-white">
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">Age</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Last Active</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border border-gray-300 p-2">Sourav</td>
                <td className="border border-gray-300 p-2">9876543210</td>
                <td className="border border-gray-300 p-2">25</td>
                <td className="border border-gray-300 p-2">sourav@gmail.com</td>
                <td className="border border-gray-300 p-2">few days ago</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button className="buttonGrey" onClick={() => setViewButtonModel(true)}>View</button>
                  <button className="buttonSuccess">Add Note</button>
                </td>
              </tr>
              <tr className="text-center">
                <td className="border border-gray-300 p-2">Anita</td>
                <td className="border border-gray-300 p-2">9125676080</td>
                <td className="border border-gray-300 p-2">28</td>
                <td className="border border-gray-300 p-2">anita@gmail.com</td>
                <td className="border border-gray-300 p-2">2 hours ago</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button className="buttonGrey">View</button>
                  <button className="buttonSuccess">Add Note</button>
                </td>
              </tr>
              <tr className="text-center">
                <td className="border border-gray-300 p-2">Navin</td>
                <td className="border border-gray-300 p-2">9876543210</td>
                <td className="border border-gray-300 p-2">24</td>
                <td className="border border-gray-300 p-2">navin@gmail.com</td>
                <td className="border border-gray-300 p-2">few days ago</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button className="buttonGrey">View</button>
                  <button className="buttonSuccess">Add Note</button>
                </td>
              </tr>
              <tr className="text-center">
                <td className="border border-gray-300 p-2">Vishal</td>
                <td className="border border-gray-300 p-2">9876543210</td>
                <td className="border border-gray-300 p-2">25</td>
                <td className="border border-gray-300 p-2">vishal@gmail.com</td>
                <td className="border border-gray-300 p-2">few days ago</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button className="buttonGrey">View</button>
                  <button className="buttonSuccess">Add Note</button>
                </td>
              </tr>
            </tbody>
          </table>
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
              <Dialog.Title className="heading">
                Add Person
              </Dialog.Title>
              <button
                className="text-white font-bold text-2xl"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form className="mt-4 p-6 space-y-3">
            <div className="flex flex-col">
            <label className="paragraphBold">First Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter first name"
                />
              </div>
              <div className="flex flex-col">
                <label className="paragraphBold">Last Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter last name"
                />
              </div>
              <div className="flex flex-col">
                <label className="paragraphBold">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Enter email"
                />
              </div>
              <div className="flex flex-col">
                <label className="paragraphBold">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  id="generatePassword"
                  className="h-3 w-3 text-violet-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="generatePassword"
                  className="paragraphBold"
                >
                  Generate Password
                </label>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="buttonGrey"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="buttonSuccess"
                >
                  Save
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
              <Dialog.Title className="heading">
                Person Details
              </Dialog.Title>
              <button
                className="text-white font-bold text-2xl"
                onClick={() => setViewButtonModel(false)}
              >
                ×
              </button>
            </div>
            <form className="mt-4 p-6 space-y-3">
            <div className="flex flex-col">
            <label className="paragraphBold">First Name</label>
                <input
                  type="text"
                  className="input"
                  value="Sourav"
                />
              </div>
              <div className="flex flex-col">
                <label className="paragraphBold">Last Name</label>
                <input
                  type="text"
                  className="input"
                   value="Behuria"
                />
              </div>
              <div className="flex flex-col">
                <label className="paragraphBold">Email</label>
                <input
                  type="email"
                  className="input"
                   value="sourav.glansa@gmail.com"
                />
              </div>
              <div className="flex flex-col">
                <label className="paragraphBold">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="input"
                   value="9876543210"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="buttonGrey"
                  onClick={() => setViewButtonModel(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="buttonTheme"
                >
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
