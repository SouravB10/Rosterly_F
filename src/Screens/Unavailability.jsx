import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlusSquare } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import axios from "axios";
import { set } from "date-fns";
import moment from "moment";
import FeedbackModal from "../Component/FeedbackModal";

const Unavailability = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isShiftOpen, setIsShiftOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectToNotify, setSelectToNotify] = useState([]);
  const [notifyToId, setNotifyToId] = useState("");
  const [unavailability, setUnavailability] = useState([]);
  const [errors, setErrors] = useState({});
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
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

      const userData = response?.data?.data;
      if (userData) {
        setSelectToNotify([
          {
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
          },
        ]);
      } else {
        console.warn("No user data returned for createdBy ID.");
      }
    } catch (error) {
      console.error("Error fetching notifying manager:", error);
    }
  };

  const resetForm = () => {
    setFromDate(new Date());
    setToDate(new Date());
    setReason("");
    setNotifyToId("");
    setSelectedDay("");
    setSelectToNotify([]);
  };

  // save the unavailability
  const saveUnavailability = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}/unavailability/1`,
        {
          userId: id,
          unavailType: 1,
          day: selectedDay,
          fromDT: moment(fromDate).format("YYYY-MM-DD HH:mm:ss"),
          toDT: moment(toDate).format("YYYY-MM-DD HH:mm:ss"),
          notifyTo: notifyToId,
          unavailStatus: "pending",
          reason: reason, // if you added `reason` column
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Unavailability saved:", response.data);
      resetForm();
      setFeedbackMessage(response.data?.message);
      setFeedbackModalOpen(true);
    } catch (error) {
      console.error("Error saving unavailability:", error);
      setFeedbackMessage(error.response.data?.message || "An error occurred");
      setFeedbackModalOpen(true);
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

  const convertTo24Hour = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}:00`; // match backend's H:i:s
  };

  const timeOptions = generateTimeOptions();
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");
  const [modalNotifyToId, setModalNotifyToId] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const openModal = (day) => {
    setSelectedDay(day);
    setIsShiftOpen(true);
  };

  const saveRecurringUnavailability = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseURL}/unavailability/2`,
        {
          userId: id,
          unavailType: 2,
          startTime: convertTo24Hour(start),
          endTime: convertTo24Hour(finish),
          day: selectedDay,
          notifyTo: modalNotifyToId,
          unavailStatus: "pending",
          reason: modalDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Recurring Unavailability saved:", response.data);
      // Reset modal form state
      setStart("");
      setFinish("");
      setModalNotifyToId("");
      setModalDescription("");
      setIsShiftOpen(false); // Close modal
      setFeedbackMessage(response.data?.message);
      setFeedbackModalOpen(true);
    } catch (error) {
      console.error("Error saving recurring unavailability:", error);
      setFeedbackMessage(error.response.data?.message || "An error occurred");
      setFeedbackModalOpen(true);
    }
  };

  useEffect(() => {
    const fetchUnavailability = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/unavailability/login/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUnavailability(response.data.data);
        console.log("Unavailability data:", response.data.data);

      } catch (error) {
        console.error("Error fetching unavailability:", error);
      }
    };

    fetchUnavailability();
  }, []);

  const formatDate = (datetime) => {
    return new Date(datetime).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (datetime) => {
    return new Date(datetime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 h-full py-2 my-4">
        <div className="flex flex-col gap-4 w-full md:w-[60%]">
          <div className="card">
            <h1 className="heading">Unavailable Days</h1>
            <form onSubmit={saveUnavailability}>
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
                      timeFormat="HH:mm:ss"
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
                    onChange={(e) => setNotifyToId(e.target.value)}
                    onClick={fetchNotifyingManager}
                  >
                    <option>-- Select --</option>
                    {selectToNotify.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
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
                  <button
                    className="buttonSuccess button font12 font-semibold px-4 py-2 rounded-md"
                  >
                    Save
                  </button>
                  <button onClick={resetForm} className="buttonDanger button font12 font-semibold px-4 py-2 rounded-md">
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="card rounded-md p-5 md:row-span-8 overflow-auto">
            <h1 className="subHeading">Requested Days Off</h1>

            {unavailability.map((item) => (
              <div key={item.id} className="py-2">
                <div className="flex items-start justify-between">
                  <div>
                    {item.unavailType.toLowerCase() === 'days' ? (
                      <>
                        <p className="paragraphBold">
                          {formatDate(item.fromDT)} ({formatTime(item.fromDT)}) - {formatDate(item.toDT)} ({formatTime(item.toDT)})
                        </p>

                        {item.reason && (
                          <p className="paragraphThin">{item.reason || "No reason provided"}</p>
                        )}
                      </>
                    ) : item.unavailType.toLowerCase() === 'recudays' ? (
                      <>
                        <p className="paragraphBold">
                          {item.day} ({item.fromDT?.slice(0, 5)} - {item.toDT?.slice(0, 5)})
                        </p>
                        {item.reason && (
                          <p className="paragraphThin">{item.reason || "No reason provided"}</p>
                        )}
                      </>
                    ) : null}
                    <p className={`paragraphThin mt-1 text-sm italic ${item.unavailStatus === 0 ? "text-red-500" : "text-green-600"}`}>
                      {item.unavailStatus === 0 ? 'Pending' : 'Approved'}
                    </p>
                  </div>
                  <button className="black-100 hover:texttheme mt-1">
                    <FaPencilAlt className="w-4 h-4" />
                  </button>
                </div>
                <hr className="white-300" />
              </div>
            ))}
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
                  className={`paragraphBold ${day === "Saturday" || day === "Sunday"
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
            <form className="card p-6 space-y-3" onSubmit={saveRecurringUnavailability}>
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


                </div>
                <div>
                  <label className="paragraphBold block mb-4">
                    Select a manager to notify
                  </label>
                  <select
                    className="input w-full p-3 custom-focus"
                    onChange={(e) => setModalNotifyToId(e.target.value)}
                    onClick={fetchNotifyingManager}
                  >
                    <option>-- Select --</option>
                    {selectToNotify.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="paragraphBold">Description:</label>
                <textarea
                  className=" textarea paragraph"
                  rows="3"
                  placeholder="Enter description..."
                  value={modalDescription}
                  onChange={(e) => setModalDescription(e.target.value)}
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
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        message={feedbackMessage}
      />
    </>
  );
};

export default Unavailability;
