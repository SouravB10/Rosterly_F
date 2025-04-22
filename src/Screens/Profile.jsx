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
    <div className="p-6">
      <div className="grid grid-cols-6 gap-6 w-full bg-white rounded-lg shadow-md p-5 mb-6">
        <div className="col-span-2 grid">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="size-80 rounded"
          />
          <h3 className="heading">Anita Verma</h3>
        </div>
        <div className="col-span-4 ">
          <form action="" className="grid gap-4" method="post">
            <h3 className="subHeading">Profile Information</h3>
            <div className="">
              <label htmlFor="" className="paragraph">
                Current Username
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
            <h3 className="subHeading">Change Password</h3>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Location;
