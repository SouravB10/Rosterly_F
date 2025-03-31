import React, { useState } from "react";

const Location = () => {
  const [selectLocation, setSelectLocation] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLocation = (e) => {
    setSelectLocation(e.target.value);
  };

  const getLocation = () => {
    alert(selectLocation);
  };

  return (
    <>
      <h3 className="text-2xl font-semibold">Locations</h3>
      <div className="grid grid-flow-col grid-rows-6 rounded p-4 mt-4 text-white">
        <div className="row-span-1 flex justify-between items-center p-1 mb-2">
          <div className="flex justify-between gap-3">
            <select
              name="selectedFruit"
              className="bg-white px-3 rounded-lg py-3 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50 w-80 appearance-none pr-10"
              style={{
                backgroundImage:
                  'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>\')',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
                backgroundSize: "1.25rem",
              }}
              onChange={handleLocation}
            >
              <option value="default">--Select location--</option>
              <option value="Location 1">Location 1</option>
              <option value="Location 2">Location 2</option>
              <option value="Location 3">Location 3</option>
            </select>
            <button
              className="px-5 py-2 bagActive text-white rounded-full cursor-pointer"
              onClick={getLocation}
            >
              Get Data
            </button>
          </div>
          <div>
            <button className="px-4 py-2 bagActive text-white rounded-full">
              + Location
            </button>
          </div>
        </div>
        <div className="row-span-1 p-1">
          <div className="w-full">
            <div className="relative right-0">
              <ul
                className="relative flex flex-wrap px-2 py-2 list-none rounded-full bg"
                role="list"
              >
                <li className="z-30 flex-auto text-center">
                  <button
                    className={`z-30 flex items-center justify-center w-full px-2 py-4 text-sm mb-0 transition-all ease-in-out border-0 rounded-full cursor-pointer ${
                      activeTab === "general"
                        ? "text-white-700 font-semibold bagActive"
                        : "text-slate-900 font-semibold"
                    }`}
                    onClick={() => setActiveTab("general")}
                    role="tab"
                    aria-selected={activeTab === "general"}
                    aria-controls="general"
                  >
                    General
                  </button>
                </li>
                <li className="z-30 flex-auto text-center">
                  <button
                    className={`z-30 flex items-center justify-center w-full px-2 py-4 text-sm mb-0 transition-all ease-in-out border-0 rounded-full cursor-pointer ${
                      activeTab === "Sales"
                        ? "text-white-700 font-semibold bagActive"
                        : "text-slate-900 font-semibold"
                    }`}
                    onClick={() => setActiveTab("Sales")}
                    role="tab"
                    aria-selected={activeTab === "Sales"}
                    aria-controls="Sales"
                  >
                    Sales
                  </button>
                </li>
                <li className="z-30 flex-auto text-center">
                  <button
                    className={`z-30 flex items-center justify-center w-full px-2 py-4 text-sm mb-0 transition-all ease-in-out border-0 rounded-full cursor-pointer ${
                      activeTab === "Employees"
                        ? "text-white-700 font-semibold bagActive"
                        : "text-slate-900 font-semibold"
                    }`}
                    onClick={() => setActiveTab("Employees")}
                    role="tab"
                    aria-selected={activeTab === "Employees"}
                    aria-controls="Employees"
                  >
                    Employees
                  </button>
                </li>
              </ul>

              <div className="p-5">
                {activeTab === "general" && (
                  <div id="general" role="tabpanel">
                    <p className="text-slate-400 font-light">
                      Because it's about motivating the doers. Because I'm here
                      to follow my dreams and inspire other people to follow
                      their dreams, too.
                    </p>
                  </div>
                )}

                {activeTab === "Sales" && (
                  <div id="Sales" role="tabpanel">
                    <p className="text-slate-400 font-light">
                      The reading of all good books is like a conversation with
                      the finest minds of past centuries.
                    </p>
                  </div>
                )}

                {activeTab === "Employees" && (
                  <div id="Employees" role="tabpanel">
                    <p className="text-slate-400 font-light">
                      Comparing yourself to others is the thief of joy.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
