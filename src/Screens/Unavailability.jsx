import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlusSquare } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import axios from "axios";

const Unavailability = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isShiftOpen, setIsShiftOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectToNotify, setSelectToNotify] = useState([]);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const days = [
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
  ];
  // fetching the notifying manager
  const fetchNotifyingManager = async () => {
    try {
      const created_by = localStorage.getItem("createdBy");
      const response = await axios.get(`${baseURL}/users/${created_by}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setSelectToNotify(response.data.data);

      setSelectToNotify([
        {
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
        },
      ]);
    } catch (error) {
      console.error("Error fetching notifying manager:", error);
    }
  };

  // save the unavailability
  const saveUnavailability = async () => {
    console.log(fromDate);
    try {
      const response = await axios.post(
        `${baseURL}/unavailability`,
        {
          userId: id,
          unavailType: 1,
          day: selectedDay,
          fromDate: fromDate,
          toDate: toDate,
          notifyTo: selectToNotify,
          unavailStatus: "pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Unavailability saved:", response.data);
    } catch (error) {
      console.error("Error saving unavailability:", error);
    }
  };
  const generateTimeOptions = () => {
    let times = [];
    let hour = 0;
    let minute = 0;

    while (hour < 24) {
      let ampm = hour < 12 ? "AM" : "PM";
      let displayHour = hour % 12 || 12;
      let displayMinute = minute === 0 ? "00" : minute;
      times.push(`${displayHour}:${displayMinute} ${ampm}`);

      minute += 15;
      if (minute === 60) {
        minute = 0;
        hour++;
      }
    }

    return times;
  };

  const timeOptions = generateTimeOptions();
  const breakOptions = [15, 30, 45, 60];
  const [start, setStart] = useState(timeOptions[0]);
  const [finish, setFinish] = useState(timeOptions[0]);
  const [breakTime, setBreakTime] = useState(breakOptions[0]);
  const hoursPerDay = ["12.25", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00"];

  const openModal = (day) => {
    setSelectedDay(day);
    setIsShiftOpen(true);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 h-full py-2 my-4">
        <div className="flex flex-col gap-4 w-full md:w-[60%]">
          <div className="card">
            <h1 className="heading">Unavailable Days</h1>
            <form>
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex flex-wrap md:flex-nowrap gap-6">
                  <div className="flex items-center gap-4 flex-1 min-w-[280px]">
                    <label className="paragraphBold whitespace-nowrap">
                      From Date & Time:
                    </label>
                    <DatePicker
                      className="mixedInput custom-focus z-9999999"
                      selected={fromDate}
                      onChange={(date) => setFromDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      customInput={
                        <div className="rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer w-full bg-white-100 ">
                          <span className="black-100 font12">
                            {fromDate.toLocaleString("en-GB")}
                          </span>
                          <svg
                            className="w-4 h-4 texttheme"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.879a1 1 0 011.414 1.414l-4 4.586a1 1 0 01-1.414 0l-4-4.586a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      }
                    />
                  </div>

                  <div className="flex items-center gap-4 flex-1 min-w-[280px]">
                    <label className="paragraphBold whitespace-nowrap">
                      To Date & Time:
                    </label>
                    <DatePicker
                      className="mixedInput custom-focus"
                      selected={toDate}
                      onChange={(date) => setToDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      customInput={
                        <div className="rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer w-full bg-white-100 ">
                          <span className="black-100 font12">
                            {toDate.toLocaleString("en-GB")}
                          </span>
                          <svg
                            className="w-4 h-4 texttheme"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.879a1 1 0 011.414 1.414l-4 4.586a1 1 0 01-1.414 0l-4-4.586a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="paragraphBold block mb-2">
                    Select a manager to notify
                  </label>
                  <select
                    className="input w-full p-3 custom-focus"
                    onClick={fetchNotifyingManager}
                  >
                    <option>-- Select --</option>
                    {selectToNotify.map((manager, id) => (
                      <option
                        key={id}
                        value={`${manager.firstName} ${manager.lastName}`}
                      >
                        {manager.firstName} {manager.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="paragraphBold block mb-2">
                    Please provide a brief reason
                  </label>
                  <textarea
                    rows="3"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="textarea w-full p-3 resize-none custom-focus"
                    placeholder="Type your reason here..."
                  />
                </div>

                <div className="flex justify-end gap-4 pt-2">
                  {/* <button
                    className="buttonSuccess button font12 font-semibold px-4 py-2 rounded-md"
                    onClick={saveUnavailability}
                  >
                    Save
                  </button> */}
                  <button onClick={saveUnavailability}>Yo</button>
                  <button className="buttonDanger button font12 font-semibold px-4 py-2 rounded-md">
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="card rounded-md p-5 md:row-span-8 overflow-auto ">
            <h1 className="subHeading">Requested Days Off</h1>
            <div className="py-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="paragraphBold">28/03/25 - 29/03/25</p>
                  <p className="paragraphThin">(Function)</p>
                </div>
                <button className="black-100 hover:texttheme mt-1">
                  <FaPencilAlt className="w-4 h-4" />
                </button>
              </div>
              <hr className="white-300" />
            </div>
            <div className="py-2 ">
              <div className="flex items-start justify-between">
                <div>
                  <p className="paragraphBold">04/04/25 - 05/04/25</p>
                  <p className="paragraphThin">
                    16.00hrs of Without Pay Leave (Sample visit)
                  </p>
                </div>
                <button className="black-100 hover:texttheme mt-1">
                  <FaPencilAlt className="w-4 h-4" />
                </button>
              </div>
              <hr className="white-300" />
            </div>
            <div className="py-2 ">
              <div className="flex items-start justify-between">
                <div>
                  <p className="paragraphBold">04/04/25 - 05/04/25</p>
                  <p className="paragraphThin">
                    16.00hrs of Without Pay Leave (Sample visit)
                  </p>
                </div>
                <button className="black-100 hover:texttheme mt-1">
                  <FaPencilAlt className="w-4 h-4" />
                </button>
              </div>
              <hr className="white-300" />
            </div>{" "}
            <div className="py-2 ">
              <div className="flex items-start justify-between">
                <div>
                  <p className="paragraphBold">04/04/25 - 05/04/25</p>
                  <p className="paragraphThin">
                    16.00hrs of Without Pay Leave (Sample visit)
                  </p>
                </div>
                <button className="black-100 hover:texttheme mt-1">
                  <FaPencilAlt className="w-4 h-4" />
                </button>
              </div>
              <hr className="white-300" />
            </div>{" "}
            <div className="py-2 ">
              <div className="flex items-start justify-between">
                <div>
                  <p className="paragraphBold">04/04/25 - 05/04/25</p>
                  <p className="paragraphThin">
                    16.00hrs of Without Pay Leave (Sample visit)
                  </p>
                </div>
                <button className="black-100 hover:texttheme mt-1">
                  <FaPencilAlt className="w-4 h-4" />
                </button>
              </div>
              <hr className="white-300" />
            </div>{" "}
            <div className="py-2 ">
              <div className="flex items-start justify-between">
                <div>
                  <p className="paragraphBold">04/04/25 - 05/04/25</p>
                  <p className="paragraphThin">
                    16.00hrs of Without Pay Leave (Sample visit)
                  </p>
                </div>
                <button className="black-100 hover:texttheme mt-1">
                  <FaPencilAlt className="w-4 h-4" />
                </button>
              </div>
              <hr className="white-300" />
            </div>
          </div>
        </div>

        <div className="card rounded-md p-5 w-full md:w-[40%]">
          <h1 className="text-center subHeading">Recurring Unavailability</h1>

          {days.map((day, index) => (
            <div
              key={index}
              className="flex rounded-md justify-between p-5 my-3 bg-white-100 items-center"
            >
              <div className="flex items-center">
                <p
                  className={`paragraphBold ${
                    day === "Saturday" || day === "Sunday"
                      ? "text-black-600"
                      : ""
                  }`}
                >
                  {day}
                </p>
              </div>
              <div
                className="mx-3 cursor-pointer"
                title="Add Unavailability"
                onClick={() => openModal(day)}
              >
                <FaPlusSquare />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={isShiftOpen}
        onClose={() => setIsShiftOpen(false)}
        className="relative z-50 rounded-lg"
      >
        <div className="fixed inset-0 bg-gray-700/70"></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-gray-200 rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-gray-800 rounded-t-lg text-white px-4 py-3 flex justify-between items-center">
              <Dialog.Title className="heading">
                Add Unavailability
              </Dialog.Title>
              <button
                className="text-white text-2xl font-bold cursor"
                onClick={() => setIsShiftOpen(false)}
              >
                ×
              </button>
            </div>
            <form className="card p-6 space-y-3">
              <p className="paragraph text-gray-500">
                Enter the times that you will NOT be available.
              </p>

              <div className="mt-3">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    <label className="paragraphBold">Start</label>
                    <select
                      className="input paragraph"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                    >
                      {timeOptions.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Finish Time */}
                  <div className="flex flex-col">
                    <label className="paragraphBold">Finish</label>
                    <select
                      className="input paragraph"
                      value={finish}
                      onChange={(e) => setFinish(e.target.value)}
                    >
                      {timeOptions.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Break Time */}
                  {/* <div className="flex flex-col">
                        <label className="paragraphBold">Break</label>
                        <select
                          className="input paragraph"
                          value={breakTime}
                          onChange={(e) => setBreakTime(e.target.value)}
                        >
                          {breakOptions.map((breakOption, index) => (
                            <option key={index} value={breakOption}>
                              {breakOption} min
                            </option>
                          ))}
                        </select>
                      </div> */}
                </div>

                {/* Description Input */}
                <label className="paragraphBold">Description:</label>
                <textarea
                  className=" textarea paragraph"
                  rows="3"
                  placeholder="Enter description..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="buttonGrey"
                  onClick={() => setIsShiftOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="buttonSuccess">
                  Save
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Unavailability;
