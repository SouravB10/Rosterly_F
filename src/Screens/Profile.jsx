import React, { useState } from "react";
import ProfileImage from "../assets/images/profile.png";

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
    <div className=" bg-white rounded-lg shadow-lg p-5 mb-6">
      <h3 className="heading">Profile Information</h3>

      <div className="flex md:flex-col items-center gap-5 w-full mt-3">

        <div className="w-1/2">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="md:size-80 size-40 rounded "
          />
          <h3 className="SunHeading mt-2">Anita Verma</h3>
        </div>
        <div className=" w-full">
          <form action="" className="grid gap-2" method="post">
            <div className="">
              <label htmlFor="" className="paragraph">
                Username
              </label>
              <input
                type="text"
                value="Anita Verma"
                className="input w-full border border-gray-500"
              />
            </div>
            <div className="">
              <label htmlFor="" className="paragraph">
                Email
              </label>
              <input
                type="text"
                value="anita.glansa@gmail.com"
                className="input w-full border border-gray-500 "
              />
            </div>
            <div className="mt-5">
              <h3 className="subHeading">Change Password</h3>
            </div>
            <div className="">
              <label htmlFor="" className="paragraph">
                Current Password
              </label>
              <input
                type="text"
                value=""
                className="input w-full border border-gray-500"
              />
            </div>
            <div className="">
              <label htmlFor="" className="paragraph">
                New Password
              </label>
              <input
                type="text"
                value=""
                className="input w-full border border-gray-500"
              />
            </div>
            <div className="">
              <label htmlFor="" className="paragraph">
                Confirm New Password
              </label>
              <input
                type="text"
                value=""
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

export default Location;
