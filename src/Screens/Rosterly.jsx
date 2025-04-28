import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import { FaRegClock, FaMapMarkerAlt, FaUserTimes, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Rosterly = () => {
  const [userName, setUserName] = useState("");

  // State updates
  const [activeTimer, setActiveTimer] = useState(null); // 'shift' | 'break' | null
  const [elapsed, setElapsed] = useState(0); // current mode's elapsed
  const [breakRemaining, setBreakRemaining] = useState(900);
  const [shiftElapsed, setShiftElapsed] = useState(0);
  const [breakElapsed, setBreakElapsed] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(moment());
  const timerRef = useRef(null);

  useEffect(() => {
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    setUserName(`${firstName} ${lastName}`);
  }, []);

  // Starts a timer that ticks every second
  const startTimer = (type) => {
    stopTimer(); // clear any previous timers
    if (type === "shift") {
      timerRef.current = setInterval(() => {
        setShiftElapsed((prev) => prev + 1);
      }, 1000);
    } else if (type === "break") {
      timerRef.current = setInterval(() => {
        setBreakRemaining((prev) => {
          if (prev <= 1) {
            stopTimer();
            setActiveTimer("shift");
            startTimer("shift"); // Auto resume shift after break ends
            return 0;
          }
          return prev - 1;
        });
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

  // Handler to toggle between shift and break modes
  const handleTimerToggle = () => {
    if (activeTimer === null) {
      // Start shift timer if nothing is running
      setActiveTimer("shift");
      setElapsed(0);
      startTimer();
    } else if (activeTimer === "shift") {
      // Stop shift and start break
      stopTimer();
      setActiveTimer("break");
      setElapsed(0);
      startTimer();
    } else if (activeTimer === "break") {
      // Stop break and resume shift
      stopTimer();
      setActiveTimer("shift");
      setElapsed(0);
      startTimer();
    }
  };

  // Determine button text based on current mode
  const getButtonLabel = () => {
    if (activeTimer === null) return "Start Your Shift";
    if (activeTimer === "shift") return "Stop Shift & Start Break";
    if (activeTimer === "break") return "Stop Break & Resume Shift";
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
    const startOfWeek = moment(week).startOf("isoWeek").format("DD MMM");
    const endOfWeek = moment(week).endOf("isoWeek").format("DD MMM");
    return `${startOfWeek} - ${endOfWeek}`;
  };

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => moment(prev).subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => moment(prev).add(1, "week"));
  };

  const handleShiftToggle = () => {
    if (activeTimer !== "shift") {
      setActiveTimer("shift");
      startTimer("shift");
    }
  };

  const handleBreakToggle = () => {
    if (activeTimer !== "break") {
      setActiveTimer("break");
      startTimer("break");
    } else {
      // if already on break, stop break and resume shift
      stopTimer();
      setActiveTimer("shift");
      startTimer("shift");
    }
  };


  return (
    <>
      {/* Top Section: Welcome & Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 p-1">
        <div className="text-indigo-950">
          <p className="text-sm sm:text-base font-bold">Welcome,</p>
          <p className="text-lg sm:text-xl font-bold">{userName}</p>

          <button
            onClick={handleShiftToggle}
            className={`buttonSuccess mt-2 mr-2 w-full sm:w-auto`}
          >
            {activeTimer === "shift" ? "Shift Running..." : "Start/Resume Shift"}
          </button>

          <button
            onClick={handleBreakToggle}
            className={`buttonDanger mt-2 w-full sm:w-auto`}
          >
            {activeTimer === "break" ? "Stop Break" : "Start Break"}
          </button>
        </div>

        {(activeTimer || shiftElapsed > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="flex flex-col justify-end flex-1 mt-10 text-right text-indigo-950"
          >
            <p className="py-1 heading">Shift Time:<strong> {formatTime(shiftElapsed)}</strong></p>
            <p className="subHeading">Break Time Left: {formatTime(breakRemaining)}</p>
          </motion.div>
        )}
        {/* <div className="flex flex-col justify-end flex-1 mt-10 text-right text-indigo-950">

        </div> */}
      </div>

      {/* Card Container */}
      <div className="card w-full px-4">
        {/* Header */}
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

        {/* Shift Cards Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-4">
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
            <div key={i} className="mt-2">
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

          <div className="mt-2 col-span-1 sm:col-span-2">
            <div className="p-4 bg-gray-100 border rounded-lg h-full flex flex-col justify-between">
              <div>
                <h2 className="text-indigo-900 heading">Give Your <strong>Unavailability</strong></h2>
                <h2 className="text-indigo-900 subHeading">date and time.</h2>
              </div>
              <div className="flex justify-end mt-4">
                <button className="buttonSuccessActive w-full sm:w-1/2">Start Your Shift</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Rosterly;
