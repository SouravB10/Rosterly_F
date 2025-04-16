import React, { useEffect, useState, useRef } from "react";
import { FaRegClock, FaMapMarkerAlt, FaUserTimes } from "react-icons/fa";

const Rosterly = () => {
  const [userName, setUserName] = useState("");

  // State updates
  const [activeTimer, setActiveTimer] = useState(null); // 'shift' | 'break' | null
  const [elapsed, setElapsed] = useState(0); // current mode's elapsed
  const [shiftElapsed, setShiftElapsed] = useState(0);
  const [breakElapsed, setBreakElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    setUserName(`${firstName} ${lastName}`);
  }, []);

  // Starts a timer that ticks every second
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
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

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <div className="text-indigo-950">
          <p className="text-sm sm:text-base font-bold">Welcome,</p>
          <p className="text-lg sm:text-xl font-bold">{userName}</p>
          <button
            onClick={handleTimerToggle}
            className={`${activeTimer === "shift" ? "buttonDanger" : "buttonSuccessActive"} mt-2 w-full sm:w-auto`}
          >
            {getButtonLabel()}
          </button>
        </div>

        {activeTimer && (
          <div className="text-right text-indigo-950 text-sm sm:text-xl">
            <p>
              {activeTimer === "shift" ? "Shift Timer: " : "Break Timer: "}{" "}
              {formatTime(elapsed)}
            </p>
          </div>
        )}
      </div>

      <div className="card w-full">
        <h2 className="subHeading text-lg sm:text-xl">Shift Details</h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Repeatable Shift Card */}
          {[
            { day: "Mon 07/04", hours: "1.67 hrs", time: "8:00pm - 10:00pm", break: "20 min", location: "Office" },
            { day: "Tue 08/04", hours: "1.67 hrs", time: "8:00pm - 10:00pm", break: "20 min", location: "Office" },
            { day: "Wed 09/04", unavailable: true },
            { day: "Thu 10/04", hours: "1.67 hrs", time: "8:00pm - 10:00pm", break: "20 min", location: "Office" },
            { total: true, hours: "13.01" },
            { day: "Fri 11/04", hours: "1.67 hrs", time: "8:00pm - 10:00pm", break: "20 min", location: "Office" },
            { day: "Sat 12/04", off: true },
            { day: "Sun 13/04", off: true }
          ].map((shift, i) => (
            <div key={i} className="mt-2 mr-2">
              <div className={shift.total ? "cardA" : shift.unavailable ? 'cardGrey' : shift.off ? "cardRed" : "cardYellow"}>
                <p className="subHeading">{shift.day || (shift.total && "Weekly Total")}</p>
                {shift.unavailable ? (
                  <div className="flex items-center">
                    <FaUserTimes className="icon50" />
                    <p className="headingBold ml-2">Unavailable</p>
                  </div>
                ) : shift.off ? (
                  <p className="headingBold">Requested Off</p>
                ) : shift.total ? (
                  <>
                    {/* <p className="text-gray-600 text-lg font-bold">Weekly Total</p> */}
                    <p className="text-indigo-900 font-bold text-xl">
                      {shift.hours} <span className="font-medium">hours</span>
                    </p>
                  </>
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
