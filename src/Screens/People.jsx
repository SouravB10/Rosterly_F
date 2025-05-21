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
import { CgProfile } from "react-icons/cg";
import { HiTrash } from "react-icons/hi2";
import FeedbackModal from "../Component/FeedbackModal";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

const People = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const profileBaseURL = import.meta.env.VITE_PROFILE_BASE_URL;
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewButtonModel, setViewButtonModel] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [locations, setLocations] = useState([]);
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
  const [errors, setErrors] = useState({});
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(""); // ✅ Message for modal
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Track which ID to delete
  const [showConfirmButtons, setShowConfirmButtons] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);

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
    location_id: null,
  });

  // useEffect(() => {
  //   if (currentUserRole === 2) {
  //     setFormData((prev) => ({ ...prev, role_id: 3 }));
  //   }
  // }, []);

  useEffect(() => {
    if (createDate) {
      setFormData((prev) => ({
        ...prev,
        dob: createDate.toISOString().split('T')[0],
      }));
    }
  }, [createDate]);

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      payrate: "",
      mobileNumber: "",
      role_id: "",
      profileImage: "",
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.dob.trim()) newErrors.dob = "Date of birth is required.";
    if (!formData.payrate.trim()) newErrors.payrate = "Pay rate is required.";

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be exactly 10 digits.";
    }

    if (!formData.role_id) newErrors.role_id = "Role is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (currentUserRole === 2 && !formData.role_id) {
    //   setFormData((prev) => ({ ...prev, role_id: 3 }));
    // }

    if (!validateForm()) {
      return;
    }

    const form = new FormData();
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);
    form.append("dob", formData.dob);
    form.append("payrate", formData.payrate);
    form.append("mobileNumber", formData.mobileNumber);
    if (formData.role_id || currentUserRole === 2) {
      form.append("role_id", formData.role_id || 3);
    }
    form.append("created_by", currentUserId);
    form.append("created_on", new Date().toISOString());
    form.append("password", "defaultPassword123");
    form.append("location_id", formData.location_id);


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
      setFeedbackMessage(response.data?.message || "User created successfully");
      setFeedbackModalOpen(true);
      resetForm(); // clear form
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error creating user:", error);
      setFeedbackMessage(error.response?.data?.message || "Error creating user");
      setFeedbackModalOpen(true);

    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const currentUserId = parseInt(localStorage.getItem("id"));
      const response = await axios.get(`${baseURL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const allUsers = response.data.data;
      const filteredUsers = allUsers.filter(user => user.id !== currentUserId);
      setUsers(filteredUsers);
      setFilteredProfiles(filteredUsers);
      console.log("Users fetched:", filteredUsers);

    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLocations();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      setFilteredProfiles(users);
    }
  }, [users]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${baseURL}/locations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log("Locations fetched:", response.data);
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleOpenModal = () => {
    resetForm();             // ✅ Clear form and errors
    setIsModalOpen(true);    // ✅ Then show modal
  };

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
    const filtered = users.filter(user => {
      return selectedStatus === ""
        ? true // show all if no status selected
        : String(user.status) === selectedStatus; // match active/inactive
    });

    setFilteredProfiles(filtered);
  };


  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const response = await axios.post(
        `${baseURL}/users/user-profile/${id}/status`,
        {
          status: newStatus,
          updated_by: currentUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Status updated successfully:', response.data);

        // ✅ Update both users and filteredProfiles
        setUsers(prev =>
          prev.map(profile =>
            profile.id === id ? { ...profile, status: newStatus } : profile
          )
        );
        setFilteredProfiles(prev =>
          prev.map(profile =>
            profile.id === id ? { ...profile, status: newStatus } : profile
          )
        );
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Failed to update status:', error.response?.data || error.message);
    }
  };



  const updateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('firstName', selectedProfile.firstName);
      formData.append('lastName', selectedProfile.lastName);
      formData.append('email', selectedProfile.email);
      formData.append('dob', editDate?.toISOString().split('T')[0] || selectedProfile.dob); // format DOB
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
      setFeedbackMessage(response.data?.message || "User updated successfully");
      setFeedbackModalOpen(true);
      fetchUsers(); // refresh user list
      setViewButtonModel(false); // close the edit modal

    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
      setFeedbackMessage(error.response?.data?.message || "Error updating user");
      setFeedbackModalOpen(true);
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

  // const handleDelete = async (id) => {
  //   if (!id) return;

  //   try {
  //     await axios.delete(`${baseURL}/users/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });

  //     setFeedbackMessage("User deleted successfully.");
  //     setFeedbackModalOpen(true);
  //     setViewButtonModel(false);

  //     // Optional: Reload after modal closes
  //     setTimeout(() => {
  //       setFeedbackModalOpen(false);
  //       window.location.reload();
  //     }, 2000);

  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //     setFeedbackMessage("Failed to delete user.");
  //     setFeedbackModalOpen(true);

  //     setTimeout(() => setFeedbackModalOpen(false), 2000);
  //   }
  // };

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
    setFeedbackMessage("Are you sure you want to delete?");
    setShowConfirmButtons(true);
    setFeedbackModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;

    try {
      await axios.delete(`${baseURL}/users/${confirmDeleteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFeedbackMessage("User deleted successfully.");
      setShowConfirmButtons(false);
      setTimeout(() => {
        setFeedbackModalOpen(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error deleting user:", error);
      setFeedbackMessage("Failed to delete user.");
      setShowConfirmButtons(false);
      setTimeout(() => setFeedbackModalOpen(false), 2000);
    }
  };


  return (
    <div className="flex flex-col gap-3 hide-scrollbar">
      <div className="sticky top-0 bg-[#f1f1f1] py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Left side: Filters */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <select
            name="selectedStatus"
            className="input flex-1 min-w-[140px]"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">--Select Status--</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>



          {/* <select
            name="selectedLocation"
            className="input flex-1 min-w-[140px]"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="all">--All Locations--</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.location_name}>
                {loc.location_name}
              </option>
            ))}
          </select> */}

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
            onClick={handleOpenModal}
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
              {/* Top Section: Image + Info */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  {profile.profileImage ? (
                    <img
                      alt="Profile"
                      src={
                        profile.profileImage.startsWith("http")
                          ? profile.profileImage
                          : `${profileBaseURL}/${profile.profileImage}`
                      }
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <CgProfile className="h-20 w-20 rounded-full bg-gray-200 p-2" />
                  )}
                  <div className="text-left w-full min-w-0 overflow-hidden">
                    <h3 className="paragraphBold md:subheadingBold break-words">
                      {profile.firstName} {profile.lastName}
                    </h3>
                    <p className="paragraphThin break-words">{profile.email}</p>
                    <p className="paragraphThin break-words">{profile.mobileNumber}</p>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Actions + Toggle */}
              <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                {/* Status Toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={profile.status === 1}
                    onChange={() => handleToggleStatus(profile.id, profile.status)}
                  />
                  {profile.status === 1 ? (
                    <FaToggleOn
                      className="text-green-700 w-6 h-6 transition duration-300"
                    />
                  ) : (
                    <FaToggleOff
                      className="text-gray-400 w-6 h-6 transition duration-300"
                    />
                  )}
                  <span className="text-sm select-none">
                    {profile.status === 1 ? "Active" : "Inactive"}
                  </span>
                </label>
                {/* Actions */}
                <div className="flex">
                  <FaEye
                    title="View Profile"
                    className="text-indigo-950 cursor-pointer p-2 rounded-md w-8 h-8 flex items-center justify-center"
                    onClick={() => {
                      setSelectedProfile(profile);
                      setViewButtonModel(true);
                    }}
                  />
                  <FaEdit
                    title="Add Note"
                    className="text-black cursor-pointer p-2 rounded-md w-8 h-8 flex items-center justify-center"
                    onClick={() => {
                      setSelectedProfile(profile);
                      setAddNoteModal(true);
                    }}
                  />
                  <HiTrash
                    title="Delete Profile"
                    className="textRed cursor-pointer p-2 rounded-md w-8 h-8 flex items-center justify-center"
                    onClick={() => handleDeleteClick(profile.id)}
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
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

                </div>
                <div className="flex flex-col">
                  <label className="paragraphBold">Last Name</label>
                  <input type="text" className="input" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

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
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

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
                {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="paragraphBold">Payrate Percentage</label>
                  <input type="text" className="input" value={formData.payrate} onChange={(e) => setFormData({ ...formData, payrate: e.target.value })} />
                  {errors.payrate && <p className="text-red-500 text-sm">{errors.payrate}</p>}

                </div>
                <div className="flex flex-col">
                  <label className="paragraphBold">Phone Number</label>
                  <input type="text" className="input" value={formData.mobileNumber} onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} />
                  {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}

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
                  {errors.role_id && <p className="text-red-500 text-sm">{errors.role_id}</p>}

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
              {selectedProfile?.profileImage && (
                <img
                  src={
                    selectedProfile.profileImage.startsWith("http")
                      ? selectedProfile.profileImage
                      : `${profileBaseURL}/${selectedProfile.profileImage}`
                  }
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-md"
                />
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="buttonGrey"
                  onClick={() => {
                    resetForm();           // ✅ Clear form and errors
                    setIsModalOpen(false); // ✅ Hide modal
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="buttonTheme" disabled={loading}>
                  {loading ? "Adding..." : "Add"}
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
              {selectedProfile?.profileImage && (
                <img
                  src={
                    selectedProfile.profileImage.startsWith("http")
                      ? selectedProfile.profileImage
                      : `${profileBaseURL}/${selectedProfile.profileImage}`
                  }
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


      {/* message modal start */}

      {/* ✅ Reusable Modal */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        message={feedbackMessage}
        onConfirm={confirmDelete}
        showConfirmButtons={showConfirmButtons}
      />
      {/* message modal emd */}



    </div>
  );
};

export default People;
