import React, { useEffect, useState } from "react";
import DefaultProfileImage from "../assets/images/profile.png";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", profileImage:"", mobileNumber:"" });
  const [selectedFile, setSelectedFile] = useState(null); // For profile image
  const baseURL = import.meta.env.VITE_BASE_URL;
  const profileURL = import.meta.env.VITE_PROFILE_BASE_URL;
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchProfile = async () => {
      const id = localStorage.getItem("id");
      try {
        const response = await axios.get(`${baseURL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data.data;

        setUser({
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          mobileNumber:userData.mobileNumber,
          profileImage: userData.profileImage
        });
        console.log("Profile data", response);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [baseURL, token]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("mobileNumber", user.mobileNumber);

      if (selectedFile) {
        formData.append("profileImage", selectedFile); // Key must match Laravel controller field name
      }

      const response = await axios.post(`${baseURL}/users/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profile updated:", response.data);
      alert("Profile updated successfully!");

      // Optional: re-fetch updated profile data
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile.");
    }
  };

  // Construct full image URL or use default image
  const profileImageUrl = user.profileImage
    ? `${profileURL}/${user.profileImage}` // Laravel path
    : DefaultProfileImage;


  return (
    <div className="bg-white rounded-lg shadow-lg p-5 my-4">
      <h3 className="heading text-indigo-900">Profile Information</h3>

      <div className="flex flex-col md:flex-row items-center gap-2 w-full mt-3">
        <div className="w-full md:w-1/2 flex flex-col items-center ">
           <img
            alt="User Profile"
            src={selectedFile ? URL.createObjectURL(selectedFile) : profileImageUrl}
            className="size-40 md:size-70 rounded object-cover"
          />
          <input type="file" onChange={handleFileChange} className="mt-2" />
          <h3 className="SunHeading mt-2">{user.name}</h3>
        </div>

        <div className="w-full">
          <form onSubmit={handleSubmit} className="grid gap-2" method="post">
            <div>
              <label htmlFor="" className="paragraph">
                Username
              </label>
              <input
                type="text"
                value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="input w-full border border-gray-500"
              />
            </div>
            <div>
              <label htmlFor="" className="paragraph">
                Email
              </label>
              <input
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="input w-full border border-gray-500"
              />
            </div>

            {/* <div className="mt-5">
              <h3 className="subHeading">Mobile Number</h3>
            </div> */}

            <div>
              <label htmlFor="" className="paragraph">
                Mobile Number
              </label>
              <input
                type="number"
                value={user.mobileNumber}
                onChange={(e) => setUser({ ...user, mobileNumber: e.target.value })}
                className="input w-full border border-gray-500"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button type="submit" className="buttonSuccess w-40">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Profile;
