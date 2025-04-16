import React, { useState } from "react";

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
      <div className="grid grid-cols-6 gap-6 w-full">
        {/* Left Section - 60% (3 columns) */}
        <div className="col-span-4">
          <h6 className="heading">Profile Settings</h6>

          {/* Tab Switcher */}
          <div className="subHeading flex gap-6 mb-6">
            {["general", "Notes", "Username", "Password", "LinkAccount"].map(
              (tab) => (
                <label key={tab} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tabOption"
                    value={tab}
                    checked={activeTab === tab}
                    onChange={() => setActiveTab(tab)}
                    className="form-radio text-purple-600"
                  />
                  <span className="text-sm font-semibold text-slate-900 capitalize">
                    {tab}
                  </span>
                </label>
              )
            )}
          </div>

          {/* Tab Content */}
          <div className="space-y-6 mt-6">
            {activeTab === "general" && (
              <div className="space-y-4">
                {/* Location Name */}
                <div className="cardA">
                  <div className="grid grid-cols-1 grid-rows-2 gap-4 items-center">
                    <div>
                      <div className="">
                        <label htmlFor="" className="paragraph">
                          Mobile
                        </label>
                      </div>
                      <div className="">
                        <input
                          type="text"
                          value="7780290335"
                          className="input w-full border border-gray-500 border"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="">
                        <label htmlFor="" className="paragraph">
                          Email
                        </label>
                      </div>
                      <div className="">
                        <input
                          type="text"
                          value="anita.glansa@gmail.com"
                          className="input w-full border border-gray-500 border"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="buttonTheme">Update</button>
                </div>
              </div>
            )}

            {activeTab === "Notes" && (
              <div className="cardA">
                <div className="grid grid-cols-1 grid-rows-1 gap-4 items-center">
                  <div className="sideBar p-4 rounded-lg">
                    <p className="paragraph">
                      {" "}
                      There are no notes recorded on your profile.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Username" && (
              <>
                <div className="cardA">
                  <div className="grid grid-cols-1 grid-rows-2 gap-4 items-center">
                    <div>
                      <div className="">
                        <label htmlFor="" className="paragraph">
                          Current Username
                        </label>
                      </div>
                      <div className="">
                        <input
                          type="text"
                          value="Anita Verma"
                          className="input w-full border border-gray-500"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="">
                        <label htmlFor="" className="paragraph">
                          New Username
                        </label>
                      </div>
                      <div className="">
                        <input type="text" value="" className="input w-full border border-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="buttonTheme">Update</button>
                </div>
              </>
            )}
            {activeTab === "Password" && (
              <>
                <div className="cardA">
                  <div className="grid grid-cols-1 grid-rows-2 gap-4 items-center">
                    <div>
                      <div className="">
                        <label htmlFor="" className="paragraph">
                          Current Password
                        </label>
                      </div>
                      <div className="">
                        <input type="text" value="" className="input w-full border border-gray-500" />
                      </div>
                    </div>
                    <div>
                      <div className="">
                        <label htmlFor="" className="paragraph">
                          New Password
                        </label>
                      </div>
                      <div className="">
                        <input type="text" value="" className="input w-full border border-gray-500" />
                      </div>
                    </div>
                    <div>
                      <div className="">
                        <label htmlFor="" className="paragraph">
                          Confirm New Password
                        </label>
                      </div>
                      <div className="">
                        <input type="text" value="" className="input w-full border border-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="buttonTheme">Update</button>
                </div>
              </>
            )}
            {activeTab === "LinkAccount" && (
              <>
                <div className="cardA">
                  <div className="grid grid-cols-1 grid-rows-1 gap-4 items-center">
                    <div>
                      <div className="">
                        <label htmlFor="" className="paragraph">
                          Link to username
                        </label>
                      </div>
                      <div className="">
                        <input type="text" value="" className="input w-full border border-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="buttonTheme">Update</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
