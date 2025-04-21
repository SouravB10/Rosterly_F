import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaSearch, FaEye, FaEdit } from "react-icons/fa";
import ProfileImage from "../assets/images/profile.png";
import Sourav from "../assets/images/IMG_20230225_033746_011.jpg";
import deadPool from "../assets/images/Screenshot 2025-04-21 111413.png";
import BlackWidow from "../assets/images/Screenshot 2025-04-21 111629.png"
import DatePicker from "react-datepicker";
import { set } from "date-fns";

const People = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewButtonModel, setViewButtonModel] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState("default");
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState(new Date());
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [note, setNote] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const profiles = [
    {
      id: 1,
      firstName: 'Vishal',
      lastName: 'Kattera',
      email: 'vishal.glansa@gmail.com',
      phone: '7780290335',
      dob: '1998-10-09',
      payrate: '50%',
      location: 'Store 1',
      image: ProfileImage,
    },
    {
      id: 2,
      firstName: 'Sourav',
      lastName: 'Behuria',
      email: "sourav@gmail.com",
      phone: "1234567890",
      dob: '1999-09-10',
      payrate: '30%',
      location: "Store 2",
      image: Sourav,
    },
    {
      id: 3,
      firstName: 'Naveen',
      lastName: 'Nagam',
      email: "naveen@gmail.com",
      phone: "9876543210",
      dob: '2002-10-04',
      payrate: '20%',
      location: "Store 2",
      image: deadPool,
    },
    {
      id: 4,
      firstName: 'Anita',
      lastName: 'Seth',
      email: "anita@gmail.com",
      phone: "9876543210",
      dob: '1997-23-05',
      payrate: '40%',
      location: "Store 1",
      image: BlackWidow,
    },
    {
      id: 5,
      firstName: 'Prudvi',
      lastName: 'Raj',
      email: "prudvi@gmail.com",
      phone: "9876543210",
      dob: '1999-10-04',
      payrate: '30%',
      location: "Store 1",
      image: deadPool,
    },
    {
      id: 6,
      firstName: 'Harish',
      lastName: 'Dobilla',
      email: "harish@gmail.com",
      phone: "9876512210",
      dob: '1995-19-01',
      payrate: '60%',
      location: "Store 1",
      image: ProfileImage,
    },
    {
      id: 7,
      firstName: 'Sudiksha',
      lastName: 'Reddy',
      email: "sudiksha@gmail.com",
      phone: "9833543210",
      dob: '1984-06-06',
      payrate: '60%',
      location: "Store 2",
      image: BlackWidow,
    },
  ];

  const [filteredProfiles, setFilteredProfiles] = useState(profiles);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);

    const filtered = profiles.filter((profile) => {
      const matchesKeyword =
        profile.firstName.toLowerCase().includes(keyword) ||
        profile.lastName.toLowerCase().includes(keyword) ||
        profile.email.toLowerCase().includes(keyword) ||
        profile.phone.toLowerCase().includes(keyword) ||
        profile.location.toLowerCase().includes(keyword) ||
        profile.payrate.includes(keyword) ||
        profile.dob.includes(keyword);

      const matchesStore =
        selectedLocation === 'all' ||
        profile.location.toLowerCase() === selectedLocation.toLowerCase();

      return matchesKeyword && matchesStore;
    });

    setFilteredProfiles(filtered);
  };


  const handleFilter = () => {
    const filtered = profiles.filter((profile) => {
      // const matchesKeyword =
      //   profile.firstName.toLowerCase().includes(searchTerm) ||
      //   profile.lastName.toLowerCase().includes(searchTerm) ||
      //   profile.email.toLowerCase().includes(searchTerm) ||
      //   profile.phone.toLowerCase().includes(searchTerm) ||
      //   profile.location.toLowerCase().includes(searchTerm) ||
      //   profile.payrate.includes(searchTerm) ||
      //   profile.dob.includes(searchTerm);

      const matchesStore =
        selectedLocation === 'all' ||
        profile.location.toLowerCase() === selectedLocation.toLowerCase();

      return matchesStore;
    });

    setFilteredProfiles(filtered);
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-5">
          <select
            name="selectedLocation"
            className="input"

          >
            <option value="default">--Select Status--</option>
            <option value="Location 1">Active</option>
            <option value="Location 2">Inactive</option>
          </select>

          <select
            name="selectedLocation"
            className="input"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="all">--All Stores--</option>
            <option value="Store 1">Store 1</option>
            <option value="Store 2">Store 2</option>
          </select>

          <button className="buttonSuccess" onClick={handleFilter}>
            Filter Data
          </button>

        </div>
        <div className="flex gap-3">
          <div className="bg-white rounded-lg border border-gray-300">
            <div className="flex flex-row items-center w-64 px-3 ">
              <FaSearch className="text-indigo-950" />
              <input
                type="text"
                placeholder="Search..."
                className="input"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <button className="buttonTheme" onClick={() => setIsModalOpen(true)}>
            + Employee
          </button>
        </div>

        {/* </div> */}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredProfiles.map((profile) => (
          <div key={profile.id}>
            <div className="@container bg-white shadow-xl p-3 rounded-xl">
              <div className="flex flex-1/3 gap-4 justify-between">
                <div className="flex flex-col @md:flex-row">
                  <img
                    alt="Profile"
                    src={profile.image}
                    className="h-20 w-20 rounded"
                  />
                </div>
                <div className="flex flex-col @md:flex-row">
                  <h3 className="subHeadingBold">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <h6 className="paragraphThin">{profile.email}</h6>
                  <h6 className="paragraphThin">{profile.phone}</h6>
                </div>
              </div>
              <div className="flex flex-1/3 gap-4 justify-end items-end">
                <div>
                  <h6 className="paragraphBold">Location: {profile.location}</h6>
                </div>
                <div className="flex flex-1/3 mt-3 gap-4 justify-end">
                  <FaEye
                    title="View Profile"
                    className="text-indigo-950 bg-amber-300 cursor p-2 rounded-md size-8"
                    onClick={() => {
                      setSelectedProfile(profile);
                      setViewButtonModel(true);
                    }}
                  />
                  <FaEdit
                    title="Add Note"
                    className="text-indigo-950 bg-gray-200 cursor p-2 rounded-md size-8"
                    onClick={() => {
                      setSelectedProfile(profile);
                      setAddNoteModal(true);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Employee Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50 rounded-lg"
      >
        <div className="fixed inset-0 bg-gray-700/70"></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-gray-200 rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-gray-800 rounded-t-lg text-white px-4 py-3 flex justify-between items-center">
              <Dialog.Title className="heading">Add Employee</Dialog.Title>
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
                  <input type="text" className="input" />
                </div>
                <div className="flex flex-col">
                  <label className="paragraphBold">Last Name</label>
                  <input type="text" className="input" />
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
                // selected={date}
                // onChange={(date) => setDate(date)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="paragraphBold">Payrate Percentage</label>
                  <input type="text" className="input" />
                </div>
                <div className="flex flex-col">
                  <label className="paragraphBold">Phone Number</label>
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

      {/* View Profile Modal */}
      <Dialog
        open={viewButtonModel}
        onClose={() => setViewButtonModel(false)}
        className="relative z-50 rounded-lg"
      >
        <div className="fixed inset-0 bg-gray-700/70"></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-gray-200 rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-gray-800 rounded-t-lg text-white px-4 py-3 flex justify-between items-center">
              <Dialog.Title className="heading">Employee Details</Dialog.Title>
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
                  <input
                    type="text"
                    className="input"
                    value={selectedProfile?.firstName || ''}
                    onChange={(e) =>
                      setSelectedProfile((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="paragraphBold">Last Name</label>
                  <input
                    type="text"
                    className="input"
                    value={selectedProfile?.lastName || ''}
                    onChange={(e) =>
                      setSelectedProfile((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="paragraphBold">Email</label>
                <input
                  type="email"
                  className="input"
                  value={selectedProfile?.email || ''}
                  onChange={(e) =>
                    setSelectedProfile((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="paragraphBold">Date of Birth</label>
                <DatePicker
                  className="input w-100"
                  selected={selectedProfile?.dob ? new Date(selectedProfile.dob) : null}
                  onChange={(date) => setDate(date)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="paragraphBold">Payrate Percentage</label>
                  <input
                    type="text"
                    className="input"
                    value={selectedProfile?.payrate || ''}
                    onChange={(e) =>
                      setSelectedProfile((prev) => ({
                        ...prev,
                        payrate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="paragraphBold">Phone Number</label>
                  <input
                    type="text"
                    className="input"
                    value={selectedProfile?.phone || ''}
                    onChange={(e) =>
                      setSelectedProfile((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
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

      {/* Add Note Modal */}
      <Dialog
        open={addNoteModal}
        onClose={() => setAddNoteModal(false)}
        className="relative z-50 rounded-lg"
      >
        <div className="fixed inset-0 bg-gray-700/70"></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-gray-200 rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-gray-800 rounded-t-lg text-white px-4 py-3 flex justify-between items-center">
              <Dialog.Title className="heading">
                {selectedProfile ? `Add Note (for ${selectedProfile.firstName})` : 'Add Note'}
              </Dialog.Title>
              <button
                className="text-white font-bold text-2xl"
                onClick={() => setAddNoteModal(false)}
              >
                ×
              </button>
            </div>
            <form className="p-6 space-y-4">
              <textarea
                className="w-full h-32 border bg-white border-gray-300 rounded-md p-2"
                placeholder="Write your note here..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="buttonGrey"
                  onClick={() => setAddNoteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="buttonTheme"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSaveNote(selectedProfile.id, note);
                  }}
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
