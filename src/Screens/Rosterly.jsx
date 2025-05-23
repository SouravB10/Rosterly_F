import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import { FaRegClock, FaMapMarkerAlt, FaUserTimes, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { getDistance } from "geolib";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { getRoleId } from "../Component/RoleId";

const Rosterly = () => {
  const [userName, setUserName] = useState("");

  // State updates
  const [activeTimer, setActiveTimer] = useState(null); // 'shift' | 'break' | null
  const [isShiftFinished, setIsShiftFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0); // current mode's elapsed
  const [breakElapsed, setBreakElapsed] = useState(0);
  const breakStartTimeRef = useRef(null);
  const [shiftElapsed, setShiftElapsed] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [isAtStore, setIsAtStore] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);
  const [shiftStartTime, setShiftStartTime] = useState(null);
  const [shiftEndTime, setShiftEndTime] = useState(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    setUserName(`${firstName} ${lastName}`);
  }, []);

  // Starts a timer that ticks every second
  const shiftStartTimeRef = useRef(null);

  const startTimer = (type) => {
    stopTimer();

    if (type === "shift") {
      if (!shiftStartTimeRef.current) {
        shiftStartTimeRef.current = Date.now();
      }

      timerRef.current = setInterval(() => {
        const now = Date.now();
        const elapsedInSeconds = Math.floor((now - shiftStartTimeRef.current) / 1000);
        setShiftElapsed(elapsedInSeconds);
      }, 1000);
    }

    if (type === "break") {
      breakStartTimeRef.current = Date.now(); // Set break start time

      timerRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - breakStartTimeRef.current) / 1000);
        setBreakElapsed(elapsed);
      }, 1000);
    }
  };

  // Stops any running timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const getWeekRange = (week) => {
    const startOfWeek = moment(week).isoWeekday(3); // Wednesday
    const endOfWeek = moment(startOfWeek).add(6, 'days'); // Tuesday (6 days after Wednesday)
    return `${startOfWeek.format("DD MMM")} - ${endOfWeek.format("DD MMM")}`;
  };

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => moment(prev).subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => moment(prev).add(1, "week"));
  };

  const handleShiftToggle = () => {
    if (isShiftFinished) return;

    if (activeTimer !== "shift") {
      const now = Date.now();
      if (!shiftStartTime) {
        setShiftStartTime(now); // store shift start time only once
      }
      setActiveTimer("shift");
      startTimer('shift');
    }
  };
  const handleBreakToggle = () => {
    if (isShiftFinished) return;

    if (activeTimer === "break") {
      stopTimer();
      setActiveTimer("shift");
      startTimer("shift");
    } else {
      stopTimer();
      setBreakElapsed(0);
      setActiveTimer("break");
      startTimer("break");
    }
  };

  const handleFinishShift = () => {
    stopTimer();
    setShiftEndTime(Date.now()); // store end time
    setActiveTimer(null);
    setIsShiftFinished(true);
  };

  const formatDisplayTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const unavailabilityHandler = () => {
    navigate("/unavailability");
  };

  // 17.43920120470179, 78.38736913783626 (Glansa Solutions)
  const STORE_LOCATION = {
    latitude: 17.43920120470179,
    longitude: 78.38736913783626,
  };

  const ALLOWED_RADIUS_METERS = 500; // e.g., 500m radius

  const checkLocation = () => {
    setIsCheckingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Log current location to console
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        const distance = getDistance({ latitude, longitude }, STORE_LOCATION);
        console.log("Distance from store (in meters):", distance);

        if (distance <= ALLOWED_RADIUS_METERS) {
          setIsAtStore(true);
          setLocationError('');
        } else {
          setIsAtStore(false);
          setLocationError("You must be at the store to start your shift.");
        }

        setIsCheckingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsAtStore(false);
        setLocationError("Unable to fetch location. Please enable location access.");
        setIsCheckingLocation(false);
      },
      { enableHighAccuracy: true }
    );
  };


  return (
    <>
      <div className="text-indigo-950 mb-3 p-1">
        <p className="text-sm sm:text-base font-bold">Welcome,</p>
        <p className="text-lg sm:text-xl font-bold">
          {getRoleId() === 1 ? `${userName} (Admin)` : userName}
        </p>
      </div>
      {getRoleId() === 1 ? (<Dashboard />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 p-1">
            <div className="text-indigo-950">
              {/* <p className="text-sm sm:text-base font-bold">Welcome,</p>
              <p className="text-lg sm:text-xl font-bold">{userName}</p> */}
              {/* <p className="text-lg sm:text-xl font-bold">Anita Verma</p> */}

              {isAtStore ? (
                <>
                  <button
                    onClick={handleShiftToggle}
                    className="buttonSuccess mt-2 mr-2 w-full sm:w-auto"
                  >
                    {activeTimer === "shift" ? "Shift Running..." : "Start/Resume Shift"}
                  </button>

                  <button
                    onClick={handleBreakToggle}
                    className="buttonDanger mt-2 mr-2 w-full sm:w-auto"
                  >
                    {activeTimer === "break" ? "Stop Break" : "Start Break"}
                  </button>

                  <button
                    onClick={handleFinishShift}
                    className="buttonSuccess mt-2 w-full sm:w-auto"
                    disabled={isShiftFinished || !shiftElapsed}
                  >
                    {isShiftFinished ? "Shift Finished" : "Finish Shift"}
                  </button>
                </>
              ) : (
                <>
                  <button className="buttonSuccess mt-2" disabled={isCheckingLocation} onClick={checkLocation}>
                    {isCheckingLocation ? "Checking..." : "Get Location"}
                  </button>
                  {locationError && (
                    <p className="text-red-600 mt-2 paragraph">{locationError}</p>
                  )}
                </>
              )}

            </div>

            {(shiftElapsed > 0 || isShiftFinished) && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 80 }}
                className="flex flex-col justify-end flex-1 mt-10 text-right text-indigo-950"
              >
                {shiftStartTime && (
                  <p className="subHeading text-green-800">
                    Start Time: {formatDisplayTime(shiftStartTime)}
                  </p>
                )}

                <p className="py-1 subHeading">Shift Time: <strong>{formatTime(shiftElapsed)}(8 hrs)</strong></p>
                {shiftEndTime && (
                  <p className="subHeading text-red-700">
                    End Time: {formatDisplayTime(shiftEndTime)}
                  </p>
                )}
                <p className="subHeading text-red-700">Break Time: {formatTime(breakElapsed)}(15 mins)</p>
              </motion.div>
            )}
          </div>

          <div className="card w-full px-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h2 className="subHeading text-lg sm:text-xl text-indigo-900">Shift Details</h2>
              <div className="flex items-center justify-center bg-white rounded-lg text-sm font-semibold text-gray-900 w-full sm:w-fit px-2 py-1 border border-gray-300 shadow-sm">
                <FaAngleLeft
                  className="text-gray-800 hover:text-gray-950 cursor-pointer"
                  size={16}
                  onClick={handlePrevWeek}
                />
                <span className="mx-2 paragraphBold">{getWeekRange(currentWeek)}</span>
                <FaAngleRight
                  className="text-gray-800 hover:text-gray-950 cursor-pointer"
                  size={16}
                  onClick={handleNextWeek}
                />
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-4 justify-center text-center sm:text-left">
              {[
                { day: "Wed 09/04", hours: "1.67 hrs", time: "8:00pm - 10:00pm", break: "20 min", location: "Store-1" },
                { day: "Thu 10/04", hours: "1.67 hrs", time: "8:00pm - 10:00pm", break: "20 min", location: "Store-2" },
                { day: "Fri 11/04", unavailable: true },
                { day: "Sat 12/04", hours: "1.67 hrs", time: "8:00pm - 10:00pm", break: "20 min", location: "Store-1" },
                { total: true, hours: "13.01" },
                { day: "Sun 13/04", hours: "1.67 hrs", time: "8:00pm - 10:00pm", break: "20 min", location: "Store-1" },
                { day: "Mon 14/04", off: true },
                { day: "Tue 15/04", off: true }
              ].map((shift, i) => (
                <div key={i} className="mt-2 mx-auto">
                  <div className={shift.total ? "cardA" : shift.unavailable ? "cardGrey" : shift.off ? "cardRed" : "cardYellow"}>
                    <p className="subHeading">{shift.day || (shift.total && "Weekly Total")}</p>
                    {shift.unavailable ? (
                      <div className="flex items-center">
                        <FaUserTimes className="icon50" />
                        <p className="headingBold ml-2">Unavailable</p>
                      </div>
                    ) : shift.off ? (
                      <p className="headingBold">Requested Off</p>
                    ) : shift.total ? (
                      <p className="text-indigo-900 font-bold text-xl">
                        {shift.hours} <span className="font-medium">hours</span>
                      </p>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <FaRegClock className="icon50" />
                          <strong className="headingBold ml-1">{shift.hours}</strong>
                        </div>
                        <div className="text-sm">
                          <p>{shift.time}</p>
                          <p>({shift.break} break)</p>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <FaMapMarkerAlt className="icon50" />
                          <strong>{shift.location}</strong>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-2 col-span-1 sm:col-span-2 mx-auto">
                <div className="p-4 bg-gray-100 border rounded-lg h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-indigo-900 heading">Give Your <strong>Unavailability</strong></h2>
                    <h2 className="text-indigo-900 subHeading">date and time.</h2>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button className="buttonSuccessActive w-full sm:w-1/2" onClick={unavailabilityHandler}>Select Your Unavailability</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* // <Dashboard /> */}
    </>

  );
};

export default Rosterly;
