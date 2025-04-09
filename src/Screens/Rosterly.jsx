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
      <div className="flex items-center justify-between flex-wrap mb-4">
        {/* Left Side: Welcome + Button */}
        <div className="text-indigo-950">
          <p className="subHeading font-bold">Welcome,</p>
          <p className="heading font-bold">{userName}</p>
          <button
            onClick={handleTimerToggle}
            className={`${
              activeTimer === "shift" ? "buttonDanger" : "buttonTheme"
            }`}
          >
            {getButtonLabel()}
          </button>
        </div>

        {/* Right Side: Timer (conditionally visible) */}
        {activeTimer && (
          <div className="text-right ml-auto text-xl text-indigo-950">
            <p>
              {activeTimer === "shift" ? "Shift Timer: " : "Break Timer: "}{" "}
              {formatTime(elapsed)}
            </p>
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="subHeading">Shift Details</h2>
        <div className="grid gap-6 grid-cols-5">
          <div className="mt-4 mr-4">
            <div className="cardYellow">
              <p className="subHeading">Mon 07/04</p>
              <div className="flex justify-start items-center felx-col">
                <p className="icon50">
                  <FaRegClock />{" "}
                </p>
                <strong className="headingBold ml-1">1.67 hrs</strong>
              </div>
              <div className="flex flex-wrap justify-start items-center">
                <p className="paragraph">8:00pm - 10:00pm</p>
                <p className="paragraph">(20 min break)</p>
              </div>
              <div className="flex justify-start items-center felx-col gap-1">
                <p className="icon50">
                  <FaMapMarkerAlt />
                </p>
                <strong className="subHeadingBold"> Office</strong>
              </div>
              <div className="flex flex-wrap justify-start items-center"></div>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="cardYellow">
              <p className="subHeading">Tue 08/04</p>
              <div className="flex justify-start items-center felx-col">
                <p className="icon50">
                  <FaRegClock />{" "}
                </p>
                <strong className="headingBold ml-1">1.67 hrs</strong>
              </div>
              <div className="flex flex-wrap justify-start items-center">
                <p className="paragraph">8:00pm - 10:00pm</p>
                <p className="paragraph">(20 min break)</p>
              </div>
              <div className="flex justify-start items-center felx-col gap-1">
                <p className="icon50">
                  <FaMapMarkerAlt />
                </p>
                <strong className="subHeadingBold"> Office</strong>
              </div>
              <div className="flex flex-wrap justify-start items-center"></div>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="cardGrey">
              <p className="subHeading">Wed 09/04</p>
              <div className="flex justify-start items-center felx-col">
                <p className="icon50">
                  <FaUserTimes />{" "}
                </p>
                <p className="headingBold ml-1">Unavailable</p>
              </div>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="cardYellow">
              <p className="subHeading">Thu 10/04</p>
              <div className="flex justify-start items-center felx-col">
                <p className="icon50">
                  <FaRegClock />{" "}
                </p>
                <strong className="headingBold ml-1">1.67 hrs</strong>
              </div>
              <div className="flex flex-wrap justify-start items-center">
                <p className="paragraph">8:00pm - 10:00pm</p>
                <p className="paragraph">(20 min break)</p>
              </div>
              <div className="flex justify-start items-center felx-col gap-1">
                <p className="icon50">
                  <FaMapMarkerAlt />
                </p>
                <strong className="subHeadingBold"> Office</strong>
              </div>
              <div className="flex flex-wrap justify-start items-center"></div>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="">
              <p className="font-bold subHeading text-gray-600 text-lg">
                Weekly Total
              </p>

              <p className="font-weight-800 text-indigo-900 ">
                <strong className="mainHeading"> 13.01 </strong>
                <span className="font-medium">hours</span>
              </p>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="cardYellow">
              <p className="subHeading">Fri 11/04</p>
              <div className="flex justify-start items-center felx-col">
                <p className="icon50">
                  <FaRegClock />{" "}
                </p>
                <strong className="headingBold ml-1">1.67 hrs</strong>
              </div>
              <div className="flex flex-wrap justify-start items-center">
                <p className="paragraph">8:00pm - 10:00pm</p>
                <p className="paragraph">(20 min break)</p>
              </div>
              <div className="flex justify-start items-center felx-col gap-1">
                <p className="icon50">
                  <FaMapMarkerAlt />
                </p>
                <strong className="subHeadingBold"> Office</strong>
              </div>
              <div className="flex flex-wrap justify-start items-center"></div>
            </div>
          </div>

          <div className="mt-4 mr-4 flex-1">
            <div className="cardRed">
              <p className="subHeading">Sat 12/43</p>
              <div className="flex justify-start items-center felx-col">
                <p className="headingBold">Requested Off</p>
              </div>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="cardRed">
              <p className="subHeading">Sub 13/04</p>
              <div className="flex justify-start items-center felx-col">
                <p className="headingBold">Requested Off</p>
              </div>
            </div>
          </div>
          <div className="mt-4 col-span-2 mr-4">
            <div className="p-4 bg-gray-100 border-1 rounded-lg h-full flex flex-col justify-between">
              <h2 className="font-weight-700 text-indigo-900">
                Give Your <strong>Unavailability</strong> Date and Time
              </h2>

              <button className="buttonTheme">Start Your Shift</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rosterly;
