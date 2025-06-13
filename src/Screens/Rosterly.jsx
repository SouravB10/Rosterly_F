import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import {
  FaRegClock,
  FaMapMarkerAlt,
  FaUserTimes,
  FaAngleLeft,
  FaAngleRight,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { getDistance } from "geolib";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { getRoleId } from "../Component/RoleId";
import axios from "axios";
import { SlCalender } from "react-icons/sl";

const Rosterly = () => {
  const userName = localStorage.getItem("firstName");
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const loginId = localStorage.getItem("id");
  // State updates
  const [activeTimer, setActiveTimer] = useState(null); // 'shift' | 'break' | null
  const [isShiftFinished, setIsShiftFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0); // current mode's elapsed
  const [breakElapsed, setBreakElapsed] = useState(0);
  const breakStartTimeRef = useRef(null);
  const [shiftElapsed, setShiftElapsed] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [isAtStore, setIsAtStore] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);
  const [shiftStartTime, setShiftStartTime] = useState(null);
  const [shiftEndTime, setShiftEndTime] = useState(null);
  const [rWeekStartDate, setRWeekStartDate] = useState("");
  const [rWeekEndDate, setRWeekEndDate] = useState("");
  const [weekId, setWeekId] = useState(null);
  const [rosterData, setRosterData] = useState([]);
  const [endWeekDay, setEndWeekDay] = useState("");
  const [startWeekDay, setStartWeekDay] = useState("");
  const [loading, setLoading] = useState(true);

  const timerRef = useRef(null);
  const navigate = useNavigate();

  // for DB
  const [locLatitude, setLocLatitude] = useState([]);
  const [locLongitude, setLocLognitude] = useState([]);
  const [shiftData, setShiftData] = useState([]);

  useEffect(() => {
    if (weekId) {
      // This will run AFTER weekId is updated
      console.log("Updated Week ID:", weekId);
      // You can perform dependent actions here
    }
  }, [weekId]);

  // useEffect(() => {
  //   console.log("LocLatitude: ", locLatitude, "LocLognitude: ", locLongitude);
  // }, [locLatitude, locLongitude]);

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
        const elapsedInSeconds = Math.floor(
          (now - shiftStartTimeRef.current) / 1000
        );
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
    const endOfWeek = moment(startOfWeek).add(6, "days"); // Tuesday

    return {
      displayRange: `${startOfWeek.format("DD MMM")} - ${endOfWeek.format(
        "DD MMM"
      )}`,
      startDate: startOfWeek.format("YYYY-MM-DD"),
      endDate: endOfWeek.format("YYYY-MM-DD"),
    };
  };
  const { displayRange, startDate, endDate } = getWeekRange(currentWeek);

  useEffect(() => {
    const fetchDashboardCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseURL}/dashboardCards`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              rWeekStartDate: startDate,
              rWeekEndDate: endDate,
            },
          } // ✅ your Laravel endpoint
        );
        const shiftData = response.data.RosterData;
        setShiftData(shiftData);
        console.log(shiftData, "bhaaaaiaiiiiii");
      } catch (error) {
        console.error("Error fetching dashboard cards:", error);
      } finally {
        setLoading(false);
      }
    };
    if (startDate && endDate) {
      fetchDashboardCards();
    }
    console.log(startDate, "and", endDate);
  }, [startDate, endDate]);

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => moment(prev).subtract(1, "week"));
  };
  const handleNextWeek = () => {
    setCurrentWeek((prev) => moment(prev).add(1, "week"));
  };

  const getDaysForWeek = (week) => {
    const start = moment(week).day(3); // Start from Wednesday
    return Array.from({ length: 7 }, (_, i) =>
      start.clone().add(i, "days").format("ddd, DD/MM")
    );
  };

  const days = getDaysForWeek(currentWeek);
  const [activeTab, setActiveTab] = useState(days[0].id);

  const handleShiftToggle = () => {
    if (isShiftFinished) return;

    if (activeTimer !== "shift") {
      const now = Date.now();
      if (!shiftStartTime) {
        setShiftStartTime(now); // store shift start time only once
      }
      setActiveTimer("shift");
      startTimer("shift");
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
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const unavailabilityHandler = () => {
    navigate("/unavailability");
  };

  // 17.43920120470179, 78.38736913783626 (Glansa Solutions)
  const STORE_LOCATION = {
    latitude: 17.4391091,
    longitude: 78.3873906,
  };

  const ALLOWED_RADIUS_METERS = 100; // e.g., 500m radius

  const checkLocation = async () => {
    setIsCheckingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        console.log("Current Latitude:", latitude);
        console.log("Current Longitude:", longitude);
        try {
          const response = await axios.get(`${baseURL}/rosterWeekDay`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              latitude: latitude,
              longitude: longitude,
              rWeekStartDate: rWeekStartDate,
              rWeekEndDate: rWeekEndDate,
            },
          });

          const rosterWeekData = response.data.rosterWeekId;
          const weekId =
            rosterWeekData.length > 0 ? rosterWeekData[0].id : null;
          const locationId =
            rosterWeekData.length > 0 ? rosterWeekData[0].location_id : null;
          // setWeekId(shiftData.id);
          setIsAtStore(true);
          setLocationError("");
          if (weekId) {
            console.log("bhai agaya week id", weekId);
            try {
              const response = await axios.get(`${baseURL}/dashboardData`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                params: {
                  locationId: locationId, // ✅ corrected key
                  rosterWeekId: weekId,
                },
              });

              // const shiftData = response.data.RosterData;
              // setShiftData(shiftData);
              console.log("Shift Data:", shiftData);
            } catch (error) {
              console.error("Failed to fetch dashboard data:", error);
            }
          }

          console.log("rosterWeekData:", response.data.rosterWeekId);
        } catch (error) {
          setIsAtStore(false);
          setLocationError(error.response.data.message);
          console.error(
            "Failed to fetch dashboard data:",
            error.response.data.message
          );
        }
        // if (distance <= ALLOWED_RADIUS_METERS) {
        //   setIsAtStore(true);
        //   setLocationError("");

        // } else {
        //   setIsAtStore(false);
        //   setLocationError("You must be at the store to start your shift.");
        // }

        setIsCheckingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsAtStore(false);
        setLocationError(
          "Unable to fetch location. Please enable location access."
        );
        setIsCheckingLocation(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <>
      <div className="text-indigo-950 p-1">
        <p className="text-sm sm:text-base font-bold">Welcome, </p>
        <p className="text-lg sm:text-xl font-bold">
          {getRoleId() === 1 ? `${userName} (Admin)` : userName}
        </p>
      </div>
      {getRoleId() === 1 ? (
        <Dashboard />
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
                    className="buttonSuccess mr-2 w-full sm:w-auto"
                  >
                    {activeTimer === "shift"
                      ? "Shift Running..."
                      : "Start/Resume Shift"}
                  </button>

                  <button
                    onClick={handleBreakToggle}
                    className="buttonDanger mr-2 w-full sm:w-auto"
                  >
                    {activeTimer === "break" ? "Stop Break" : "Start Break"}
                  </button>

                  <button
                    onClick={handleFinishShift}
                    className="buttonTheme w-full sm:w-auto"
                    disabled={isShiftFinished || !shiftElapsed}
                  >
                    {isShiftFinished ? "Shift Finished" : "Finish Shift"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="buttonSuccess "
                    disabled={isCheckingLocation}
                    onClick={checkLocation}
                  >
                    {isCheckingLocation ? "Checking..." : "Check Location"}
                  </button>
                  {locationError && (
                    <p className="text-red-600 paragraph">{locationError}</p>
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

                <p className="py-1 subHeading">
                  Shift Time: <strong>{formatTime(shiftElapsed)}(8 hrs)</strong>
                </p>
                {shiftEndTime && (
                  <p className="subHeading text-red-700">
                    End Time: {formatDisplayTime(shiftEndTime)}
                  </p>
                )}
                <p className="subHeading text-red-700">
                  Break Time: {formatTime(breakElapsed)}(15 mins)
                </p>
              </motion.div>
            )}
          </div>

          {/* <div className="card w-full px-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h2 className="subHeading text-lg sm:text-xl text-indigo-900">
                Shift Details
              </h2>
              <div className="flex items-center justify-center bg-white rounded-lg text-sm font-semibold text-gray-900 w-full sm:w-fit px-2 py-1 border border-gray-300 shadow-sm">
                <FaAngleLeft
                  className="text-gray-800 hover:text-gray-950 cursor-pointer"
                  size={16}
                  onClick={handlePrevWeek}
                />
                <span className="mx-2 paragraphBold">
                  {displayRange} ({startDate} to {endDate})
                </span>
                <FaAngleRight
                  className="text-gray-800 hover:text-gray-950 cursor-pointer"
                  size={16}
                  onClick={handleNextWeek}
                />
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-4 justify-center text-center sm:text-left">
              {days.map((day, i) => {
                const fullDate = moment(rWeekStartDate)
                  .add(i, "days")
                  .format("YYYY-MM-DD");

                const shift = shiftData.find((item) => item.date === fullDate);
                return (
                  <div key={i} className="mt-2 mx-auto">
                    <div className={`${shift ? 'cardYellow' : 'cardGrey'}`}>
                      <p className="subHeading">{day}</p>
                      {shift ? (
                        <>
                          <p className="paragraph">
                            Shift Time: {shift.startTime} - {shift.endTime}
                          </p>
                          <p className="paragraph">
                            Total Hours: {shift.totalHrs} hrs
                          </p>
                          <p className="paragraph">
                            Break Time: {shift.breakTime} min
                          </p>
                        </>
                      ) : (
                        <p className="headingBold text-gray-500">
                          No Shift Assigned
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="mt-2 w-full col-span-1 sm:col-span-2 mx-auto">
                <div className="p-4 bg-gray-100 border rounded-lg h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-indigo-900 heading">
                      Give Your <strong>Unavailability</strong>
                    </h2>
                    <h2 className="text-indigo-900 subHeading">
                      date and time.
                    </h2>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      className="buttonSuccessActive w-full sm:w-1/2"
                      onClick={unavailabilityHandler}
                    >
                      Select Your Unavailability
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="card w-full px-4 my-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h2 className="subHeading text-lg sm:text-xl text-indigo-900">
                Shift Details
              </h2>
              <div className="flex items-center justify-center bg-white rounded-lg text-sm font-semibold text-gray-900 w-full sm:w-fit px-2 py-1 border border-gray-300 shadow-sm">
                <FaAngleLeft
                  className="text-gray-800 hover:text-gray-950 cursor-pointer"
                  size={16}
                  onClick={handlePrevWeek}
                />
                <span className="mx-2 paragraphBold">
                  {displayRange}
                </span>
                <FaAngleRight
                  className="text-gray-800 hover:text-gray-950 cursor-pointer"
                  size={16}
                  onClick={handleNextWeek}
                />
              </div>
            </div>

            <div className="w-full text-gray-300">
              <div className="w-full flex flex-row gap-2">
                {days.map((dayLabel, i) => {
                  const fullDate = moment(startDate)
                    .add(i, "days")
                    .format("YYYY-MM-DD");
                  const shifts = shiftData.filter(
                    (item) => item.date === fullDate
                  ); // get all shifts for the day

                  return (
                    <div
                      key={i}
                      className="w-full items-start gap-3 mb-3 p-3 border rounded-lg"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="text-black paragraphBold text-center mb-2 px-4 py-2 rounded-lg min-w-[120px]">
                          {dayLabel}
                        </div>
                        {loading ? (<p className="text-center text-gray-500 italic">Loading...</p>) : (
                          < div className="flex flex-col gap-2 text-xs text-gray-800">
                            {shifts.length > 0 ? (
                              shifts.map((shift, index) => (
                                <div className="cardYellow w-full" key={index}>
                                  <p className="flex items-center gap-1">
                                    <SlCalender
                                      className="text-gray-600"
                                      title="Time"
                                    />
                                    {shift.startTime} - {shift.endTime}
                                  </p>

                                  <p className="flex flex-col items-start">
                                    <span className="flex gap-1 items-center">
                                      <FaClock
                                        className="text-gray-600"
                                        title="Total hours"
                                      />
                                      {shift.totalHrs} hrs
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <FaClock
                                        className="text-red-400"
                                        title="Break"
                                      />
                                      {shift.breakTime} Min Break
                                    </span>
                                  </p>

                                  <p className="flex items-center gap-1">
                                    <FaMapMarkerAlt
                                      className="text-gray-600"
                                      title="Location"
                                    />
                                    <span>{shift.location_name}</span>
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="italic text-center text-gray-500 cardGrey">
                                No Shift Assigned
                              </p>
                            )}
                          </div>)}

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )
      }
      {/* // <Dashboard /> */}
    </>
  );
};

export default Rosterly;
