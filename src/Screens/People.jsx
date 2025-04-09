import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaSearch } from "react-icons/fa";

const People = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");

  const handleLocation = (e) => {
    setSelectedLocation(e.target.value);
    console.log("Selected Location:", e.target.value);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log("Search Term:", e.target.value);
  };
  const getLocation = () => {
    console.log("Fetching data for:", selectedLocation);
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    setIsModalOpen(false); // close modal after action
  };

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
            value={selectedLocation}
            onChange={handleLocation}
          >
            <option value="default">--Select Location--</option>
            <option value="Location 1">Location 1</option>
            <option value="Location 2">Location 2</option>
            <option value="Location 3">Location 3</option>
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
            <thead className="bg-gray-100 subHeading">
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
              <tr className="text-center paragraph">
                <td className="border border-gray-300 p-2">Sourav</td>
                <td className="border border-gray-300 p-2">9876543210</td>
                <td className="border border-gray-300 p-2">25</td>
                <td className="border border-gray-300 p-2">sourav@gmail.com</td>
                <td className="border border-gray-300 p-2">few days ago</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button className="buttonGrey">View</button>
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
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-opacity-60 backdrop-blur-xs"></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
              <Dialog.Title className="font-semibold text-lg">
                Add Person
              </Dialog.Title>
              <button
                className="text-white text-lg font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form className="mt-4 p-6 space-y-3">
              <div className="">
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  className="w-full font14 border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 p-2"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 p-2"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 p-2"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 p-2"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="generatePassword"
                  className="h-4 w-4 text-violet-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="generatePassword"
                  className="text-sm text-gray-700"
                >
                  Generate Password
                </label>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-600 text-white rounded-md"
                >
                  Save
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
