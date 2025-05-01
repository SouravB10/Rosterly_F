import React, { useState } from "react";
import ProfileImage from "../assets/images/profile.png";

const Profile = () => {

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 my-4">
      <h3 className="heading text-indigo-900">Profile Information</h3>

      <div className="flex flex-col md:flex-row items-center gap-2 w-full mt-3">
        <div className="w-full md:w-1/2 flex flex-col items-center ">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="size-40 md:size-70 rounded"
          />
          <h3 className="SunHeading mt-2">Anita Verma</h3>
        </div>

        <div className="w-full">
          <form action="" className="grid gap-2" method="post">
            <div>
              <label htmlFor="" className="paragraph">
                Username
              </label>
              <input
                type="text"
                value="Anita Verma"
                className="input w-full border border-gray-500"
              />
            </div>
            <div>
              <label htmlFor="" className="paragraph">
                Email
              </label>
              <input
                type="text"
                value="anita.glansa@gmail.com"
                className="input w-full border border-gray-500"
              />
            </div>

            <div className="mt-5">
              <h3 className="subHeading">Change Password</h3>
            </div>

            <div>
              <label htmlFor="" className="paragraph">
                Current Password
              </label>
              <input
                type="password"
                value=""
                className="input w-full border border-gray-500"
              />
            </div>
            <div>
              <label htmlFor="" className="paragraph">
                New Password
              </label>
              <input
                type="password"
                value=""
                className="input w-full border border-gray-500"
              />
            </div>
            <div>
              <label htmlFor="" className="paragraph">
                Confirm New Password
              </label>
              <input
                type="password"
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

export default Profile;
