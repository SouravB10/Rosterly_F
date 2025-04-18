import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlusSquare } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

const Unavailability = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isShiftOpen, setIsShiftOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");

  const days = [
    "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday",
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="card">
          <h1 className="heading">
            Days Off Adding
          </h1>

          <div className="flex flex-wrap gap-4 ">
            <div className="w-full md:w-[48%] flex flex-col gap-4">
              <div className="flex mb-2 font12">
                <div className="w-1/2 bg-white-100 pt-2 text-center relative">
                  <label className="paragraphBold">
                    From Date
                  </label>
                  <DatePicker
                    className="mixedInput"
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <div className="w-full bg-white-100  rounded-md px-4 py-2 flex justify-between items-center cursor-pointer">
                        <span className="black-100 font12">
                          {fromDate.toLocaleDateString("en-GB")}
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

                <div className="w-1/2 bg-white-100 pt-2 text-center ml-1">
                  <label className="paragraphBold">
                    To Date
                  </label>
                  <DatePicker
                    className="mixedInput"
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <div className="w-full bg-white-100  rounded-md px-4 py-2 flex justify-between items-center cursor-pointer">
                        <span className="black-100 font12">
                          {toDate.toLocaleDateString("en-GB")}
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
                <label className="paragraphBold">
                  Specify the leave type
                </label>
                <select className="input w-full custom-focus">
                  <option>--Select One--</option>
                  <option>Without Pay</option>
                </select>
              </div>

              <div>
                <label className="paragraphBold">
                  Specify number of leave hours per week
                </label>
                <div className="flex justify-between items-center pl-2 borderRadius5 bg-yellow-200">
                  <span className="paragraphBold ">
                    Week 31/03 - 06/04
                  </span>
                  <input
                    type="number"
                    className="mixedInput custom-focus w-25"
                    defaultValue="16.00"
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-[48%] flex flex-col pt-2 gap-4">
              <div>
                <label className="paragraphBold">
                  Please provide a brief reason
                </label>
                <textarea
                  rows="1"
                  className="textArea custom-focus"
                />
              </div>

              <div>
                <label className="paragraphBold">
                  Select a manager to notify
                </label>
                <select className="input w-full custom-focus">
                  <option>-- Select --</option>
                  <option>Vishal</option>
                  <option>Sourav</option>
                  <option value="">Naveen</option>
                </select>
              </div>

              <div className="flex justify-end gap-4 mt-auto pt-2">
                <button className="buttonSuccess button font12 font-weight-500">
                  Save
                </button>
                <button className="buttonDanger button font12 font-weight-500">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="card rounded-md p-5 md:col-span-1 md:row-span-9">
          <h1 className="text-center subHeading">
            Recurring Unavailability
          </h1>

          <div className="flex rounded-md justify-between my-2 bg-white-100 items-center p-3">
            <div>
              <p className="paragraphBold">Monday</p>
            </div>
            <div className="mx-3">
              <FaPlusSquare />
            </div>
          </div>
          <div className="flex rounded-md justify-between my-2 bg-white-100 items-center p-3">
            <div>
              <p className="paragraphBold">Tuesday</p>
            </div>
            <div className="mx-3">
              <FaPlusSquare />
            </div>
          </div>
          <div className="flex rounded-md justify-between my-2 bg-white-100 items-center p-3">
            <div>
              <p className="paragraphBold">Wednesday</p>
            </div>
            <div className="mx-3">
              <FaPlusSquare />
            </div>
          </div>
          <div className="flex rounded-md justify-between my-2 bg-white-100 items-center p-3">
            <div>
              <p className="paragraphBold">Thursday</p>
            </div>
            <div className="mx-3">
              <FaPlusSquare />
            </div>
          </div>
          <div className="flex rounded-md justify-between my-2 bg-white-100 items-center p-3">
            <div>
              <p className="paragraphBold">Friday</p>
            </div>
            <div className="mx-3">
              <FaPlusSquare />
            </div>
          </div>
          <div className="flex rounded-md justify-between my-2 bg-white-100 items-center p-3">
            <div>
              <p className="text-red-600 paragraphBold ">Saturday</p>
              <p className="paragraphThin">8:00am - 11:00am/off</p>
            </div>
            <div className="mx-3">
              <FaPlusSquare />
            </div>
          </div>
          <div className="flex rounded-md justify-between my-5 bg-white-100 items-center p-3">
            <div>
              <p className="text-red-600 paragraphBold ">Sunday</p>
              <p className="paragraphThin">8:00am - 11:00pm/its sunday</p>
            </div>
            <div className="mx-3">
              <FaPlusSquare />
            </div>
          </div>
        </div> */}

        <div className="card rounded-md p-5 md:col-span-1 md:row-span-9">
          <h1 className="text-center subHeading">Recurring Unavailability</h1>

          {days.map((day, index) => (
            <div
              key={index}
              className="flex rounded-md justify-between my-2 bg-white-100 items-center p-3"
            >
              <div>
                {/* <p className={`paragraphBold ${day === "Saturday" || day === "Sunday" ? "text-red-600" : ""}`}> */}
                <p className={`paragraphBold ${day === "Saturday" || day === "Sunday" ? "text-black-600" : ""}`}>
                  {day}
                </p>
                {(day === "Saturday" || day === "Sunday") && (
                  <p className="paragraphThin">
                    {/* {day === "Saturday" ? "8:00am - 11:00am / off" : "8:00am - 11:00pm / it's Sunday"} */}
                  </p>
                )}
              </div>
              <div className="mx-3 cursor-pointer" onClick={() => openModal(day)}>
                <FaPlusSquare />
              </div>
            </div>
          ))}
        </div>

        {/* Requested Days Off List */}
        <div className="card rounded-md p-5 md:row-span-8">
          <h1 className="subHeading">
            Requested Days Off
          </h1>

          {/* Row 1 */}
          <div className="py-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="paragraphBold">
                  28/03/25 - 29/03/25
                </p>
                <p className="paragraphThin">(Function)</p>
              </div>
              <button className="black-100 hover:texttheme mt-1">
                <FaPencilAlt className="w-4 h-4" />
              </button>
            </div>
            <hr className="white-300" />
          </div>

          {/* Row 2 */}
          <div className="py-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="paragraphBold">
                  04/04/25 - 05/04/25
                </p>
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

        {/* Recurring Unavailability (Full Height in Large Screens) */}
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
              <Dialog.Title className="heading">Add Unavailability</Dialog.Title>
              <button
                className="text-white text-2xl font-bold cursor"
                onClick={() => setIsShiftOpen(false)}
              >
                ×
              </button>
            </div>
            <form className="card p-6 space-y-3">
              <p className="paragraph text-gray-500">Enter the times that you will NOT be available.</p>

              <div className="mt-3">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Start Time */}
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
