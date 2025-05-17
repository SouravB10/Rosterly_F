import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaSearch, FaEye, FaEdit } from "react-icons/fa";
import ProfileImage from "../assets/images/profile.png";
import Sourav from "../assets/images/IMG_20230225_033746_011.jpg";
import deadPool from "../assets/images/Screenshot 2025-04-21 111413.png";
import BlackWidow from "../assets/images/Screenshot 2025-04-21 111629.png"
import DatePicker from "react-datepicker";
import { set } from "date-fns";
import axios from "axios";

const People = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewButtonModel, setViewButtonModel] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState("default");
  const [searchTerm, setSearchTerm] = useState('');
  const [createDate, setCreateDate] = useState(null);
  const [editDate, setEditDate] = useState(null);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [note, setNote] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const currentUserRole = parseInt(localStorage.getItem("role_id"));
  const currentUserId = parseInt(localStorage.getItem("id"));
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    payrate: '',
    password: '',
    location_Id: '', // If needed
    dob: '',
    profileImage: '',
    role_id: null,
  });

  useEffect(() => {
    if (currentUserRole === 2) {
      setFormData((prev) => ({ ...prev, role_id: 3 }));
    }
  }, []);

  useEffect(() => {
    if (createDate) {
      setFormData((prev) => ({
        ...prev,
        dob: createDate.toISOString().split('T')[0],
      }));
    }
  }, [createDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);
    form.append("dob", formData.dob);
    form.append("payrate", formData.payrate);
    form.append("mobileNumber", formData.mobileNumber);
    form.append("role_id", formData.role_id || 3);
    form.append("created_by", currentUserId);
    form.append("created_on", new Date());
    form.append("password", "defaultPassword123");


    if (selectedProfile.file) {
      form.append("profileImage", selectedProfile.file);
    }

    try {
      const response = await axios.post(`${baseURL}/users`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("User created:", response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data.data);
      setFilteredProfiles(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      setFilteredProfiles(users);
    }
  }, [users]);


  const [filteredProfiles, setFilteredProfiles] = useState([]);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);

    const filtered = users.filter((profile) => {
      const firstName = profile.firstName?.toLowerCase() || '';
      const lastName = profile.lastName?.toLowerCase() || '';
      const email = profile.email?.toLowerCase() || '';
      const mobile = profile.mobileNumber?.toString().toLowerCase() || '';
      const location = profile.location?.toLowerCase() || '';
      const payrate = profile.payrate?.toString() || '';
      const dob = profile.dob || '';

      const matchesKeyword =
        firstName.includes(keyword) ||
        lastName.includes(keyword) ||
        email.includes(keyword) ||
        mobile.includes(keyword) ||
        location.includes(keyword) ||
        payrate.includes(keyword) ||
        dob.includes(keyword);

      const matchesLocation =
        selectedLocation === 'all' ||
        location === selectedLocation.toLowerCase();

      return matchesKeyword && matchesLocation;
    });

    setFilteredProfiles(filtered);
  };



  const handleFilter = () => {
    const filtered = users.filter((profile) => {
      const location = profile.location?.toLowerCase() || '';
      return selectedLocation === 'all' || location === selectedLocation.toLowerCase();
    });

    setFilteredProfiles(filtered);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('firstName', selectedProfile.firstName);
      formData.append('lastName', selectedProfile.lastName);
      formData.append('email', selectedProfile.email);
      formData.append('dob', date?.toISOString().split('T')[0] || selectedProfile.dob); // format DOB
      formData.append('mobileNumber', selectedProfile.mobileNumber);
      formData.append('payrate', selectedProfile.payrate);

      if (selectedProfile.image && selectedProfile.image.startsWith("data:image")) {
        const blob = await fetch(selectedProfile.image).then(r => r.blob());
        formData.append("profileImage", blob, "profile.jpg");
      }

      const response = await axios.post(`${baseURL}/users/${selectedProfile.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('User updated:', response.data);
      fetchUsers(); // refresh user list
      setViewButtonModel(false); // close modal
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedProfile?.dob) {
      setEditDate(new Date(selectedProfile.dob));
    } else {
      setEditDate(null);
    }
  }, [selectedProfile]);

  return (
    <div className="flex flex-col gap-3">
      <div className="sticky top-0 bg-[#f1f1f1] py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Left side: Filters */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <select
            name="selectedStatus"
            className="input flex-1 min-w-[140px]"
          >
            <option value="default">--Select Status--</option>
            <option value="Location 1">Active</option>
            <option value="Location 2">Inactive</option>
          </select>

          <select
            name="selectedLocation"
            className="input flex-1 min-w-[140px]"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="all">--All Locations--</option>
            <option value="Store 1">Store 1</option>
            <option value="Store 2">Store 2</option>
          </select>

          <button
            className="buttonSuccess flex-1 min-w-[120px]"
            onClick={handleFilter}
          >
            Filter Data
          </button>
        </div>

        {/* Right side: Search + Add */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="bg-white rounded-lg border border-gray-300 flex items-center px-3 flex-1 min-w-[200px]">
            <FaSearch className="text-indigo-950" />
            <input
              type="text"
              placeholder="Search..."
              className="input w-full border-none focus:ring-0"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <button
            className="buttonTheme flex-1 min-w-[120px]"
            title="Add Employee"
            onClick={() => setIsModalOpen(true)}
          >
            + Employee
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {loading && <p>Loading users...</p>}
        {Array.isArray(filteredProfiles) && filteredProfiles.map((profile) => (
          <div key={profile.id} className="w-full">
            <div className="mSideBar shadow-xl p-4 rounded-xl h-full flex flex-col justify-between">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex flex-row items-center min-w-0 md:flex-row gap-4">
                  <img
                    alt="Profile"
                    src={profile.image}
                    className="h-20 w-20 rounded object-cover"
                  />
                  <div className="text-left md:text-left w-full">
                    <h3 className="paragraphBold md:subheadingBold truncate overflow-hidden text-ellipsis">
                      {profile.firstName} {profile.lastName}
                    </h3>
                    <p className="paragraphThin truncate overflow-hidden text-ellipsis">{profile.email}</p>
                    <p className="paragraphThin truncate overflow-hidden text-ellipsis">{profile.mobileNumber}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-row justify-between items-center gap-2">
                <p className="paragraphBold">
                  Location: {profile.location}
                </p>
                <div className="flex gap-2">
                  <FaEye
                    title="View Profile"
                    className="text-indigo-950 bg-amber-300 cursor-pointer p-2 rounded-md size-8"
                    onClick={() => {
                      setSelectedProfile(profile);
                      setViewButtonModel(true);
                    }}
                  />
                  <FaEdit
                    title="Add Note"
                    className="text-indigo-950 bg-gray-200 cursor-pointer p-2 rounded-md size-8"
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
          <Dialog.Panel className="bg-gray-200 rounded-lg shadow-lg max-w-sm sm:max-w-md w-full">
            <div className="bg-gray-800 rounded-t-lg text-white px-4 py-3 flex justify-between items-center">
              <Dialog.Title className="heading">Add Employee</Dialog.Title>
              <button
                className="text-white font-bold text-2xl"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form className="mt-4 p-6 space-y-3" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="paragraphBold">First Name</label>
                  <input type="text" className="input" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                </div>
                <div className="flex flex-col">
                  <label className="paragraphBold">Last Name</label>
                  <input type="text" className="input" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="paragraphBold">Email</label>
                <input
                  type="email"
                  className="input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label className="paragraphBold">Date of Birth</label>
                <DatePicker
                  className="input w-100"
                  selected={createDate}
                  onChange={(date) => setCreateDate(date)}
                  showYearDropdown
                  showMonthDropdown
                  dateFormat="dd/MM/yyyy" // or "yyyy-MM-dd" if you prefer
                  scrollableYearDropdown
                  yearDropdownItemNumber={100} // optional: sets how many years to show
                  placeholderText="Select date"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="paragraphBold">Payrate Percentage</label>
                  <input type="text" className="input" value={formData.payrate} onChange={(e) => setFormData({ ...formData, payrate: e.target.value })} />
                </div>
                <div className="flex flex-col">
                  <label className="paragraphBold">Phone Number</label>
                  <input type="text" className="input" value={formData.mobileNumber} onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} />
                </div>
              </div>
              {currentUserRole === 1 && (
                <div className="flex flex-col">
                  <label className="paragraphBold">Role</label>
                  <select
                    className="input"
                    value={formData.role_id || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, role_id: parseInt(e.target.value) }))
                    }
                  >
                    <option value="">Select Role</option>
                    <option value="2">Manager</option>
                    <option value="3">Employee</option>
                  </select>
                </div>
              )}
              <div className="flex flex-col">
                <label className="paragraphBold">Profile Image</label>
                <input
                  type="file"
                  className="bg-white rounded p-2"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setSelectedProfile({ image: URL.createObjectURL(file), file });
                    }
                  }}
                />
              </div>
              {selectedProfile?.image && (
                <img
                  src={selectedProfile.image}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-md"
                />
              )}

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
          <Dialog.Panel className="bg-gray-200 rounded-lg shadow-lg max-w-sm sm:max-w-md w-full">
            <div className="bg-gray-800 rounded-t-lg text-white px-4 py-3 flex justify-between items-center">
              <Dialog.Title className="heading">Employee Details</Dialog.Title>
              <button
                className="text-white font-bold text-2xl"
                onClick={() => setViewButtonModel(false)}
              >
                ×
              </button>
            </div>
            <form className="mt-4 p-6 space-y-3" onSubmit={updateUser}>
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
                  selected={editDate} // <-- use the actual state
                  onChange={(date) => {
                    setEditDate(date);
                    setSelectedProfile((prev) => ({
                      ...prev,
                      dob: date.toISOString().split("T")[0], // Optional: update dob in selectedProfile if needed
                    }));
                  }}
                  showYearDropdown
                  showMonthDropdown
                  dateFormat="dd/MM/yyyy"
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  placeholderText="Select date"
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
                    value={selectedProfile?.mobileNumber || ''}
                    onChange={(e) =>
                      setSelectedProfile((prev) => ({
                        ...prev,
                        mobileNumber: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="paragraphBold">Profile Image</label>
                  <input
                    type="file"
                    className="bg-white rounded p-2"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSelectedProfile((prev) => ({
                            ...prev,
                            image: reader.result, // Base64 image data
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>
              {selectedProfile?.image && (
                <img
                  src={selectedProfile.image}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-md"
                />
              )}


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
          <Dialog.Panel className="bg-gray-200 rounded-lg shadow-lg max-w-sm sm:max-w-md w-full">
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
