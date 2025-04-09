import React, { useEffect, useState, useRef } from 'react'
import { FaRegClock } from "react-icons/fa";


const Rosterly = () => {
  const [userName, setUserName] = useState('');

 // State updates
const [activeTimer, setActiveTimer] = useState(null); // 'shift' | 'break' | null
const [elapsed, setElapsed] = useState(0); // current mode's elapsed
const [shiftElapsed, setShiftElapsed] = useState(0);
const [breakElapsed, setBreakElapsed] = useState(0);
const timerRef = useRef(null);

  useEffect(() => {
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    setUserName(`${firstName} ${lastName}`);
  }, []);

   // Starts a timer that ticks every second
   const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsed(prev => prev + 1);
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
      setActiveTimer('shift');
      setElapsed(0);
      startTimer();
    } else if (activeTimer === 'shift') {
      // Stop shift and start break
      stopTimer();
      setActiveTimer('break');
      setElapsed(0);
      startTimer();
    } else if (activeTimer === 'break') {
      // Stop break and resume shift
      stopTimer();
      setActiveTimer('shift');
      setElapsed(0);
      startTimer();
    }
  };

  // Determine button text based on current mode
  const getButtonLabel = () => {
    if (activeTimer === null) return 'Start Your Shift';
    if (activeTimer === 'shift') return 'Stop Shift & Start Break';
    if (activeTimer === 'break') return 'Stop Break & Resume Shift';
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };
  
  return (
    <>
      <div className="flex items-center justify-between flex-wrap mb-4">
        {/* Left Side: Welcome + Button */}
        <div className='text-indigo-950'>
          <p className='sub-heading font-bold'>Welcome,</p>
          <p className='heading font-bold'>{userName}</p>
          <button 
          onClick={handleTimerToggle} 
          className={`mt-2 text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 px-4 py-2 rounded ${
            activeTimer === 'shift'
              ? 'dangerbutton'
              : 'successbutton'
          }`}
        >
          {getButtonLabel()}
        </button>

        </div>

        {/* Right Side: Timer (conditionally visible) */}
        {activeTimer && (
          <div className="text-right ml-auto text-xl text-indigo-950">
            <p>
              {activeTimer === 'shift' ? 'Shift Timer: ' : 'Break Timer: '} {formatTime(elapsed)}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 bg-white shadow-lg rounded-lg p-6 border border-gray-200">

        <h2 className="text-xl font-bold text-indigo-950">Shift Details</h2>
        <div className='grid gap-6 grid-cols-5'>

          <div className="mt-4 mr-4">
            <div className="p-4 bg-lime-100 rounded-lg h-full flex flex-col justify-between">
              <p className="font-bold text-lg">Mon 31/03</p>
              <p className="text-gray-700 flex items-center text-bold"><FaRegClock /> <strong className='sub-heading ml-1'>1.67 hrs</strong></p>
              <div className='mt-3'>
                <p className="text-gray-700">🕗 8:00pm - 10:00pm</p>
                <p className="text-gray-700">(20 min break)</p>
                <p className="text-gray-700">📍 Office</p>
              </div>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="p-4 bg-lime-100 rounded-lg h-full flex flex-col justify-between">
              <p className="font-bold text-lg">Tue 01/04</p>
              <p className="text-gray-700 flex items-center text-bold"><FaRegClock /> <strong className='sub-heading ml-1'>1.67 hrs</strong></p>
              <div className='mt-3'>
                <p className="text-gray-700">🕗 8:00pm - 10:00pm</p>
                <p className="text-gray-700">(20 min break)</p>
                <p className="text-gray-700">📍 Office</p>
              </div>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="p-4 bg-gray-200 rounded-lg h-full flex flex-col justify-start">
              <p className="font-bold text-lg">Wed 02/04</p>
              <p className="text-gray-700"><strong className='sub-heading'>Unscheduled</strong></p>

            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="p-4 bg-lime-100 rounded-lg h-full flex flex-col justify-between">
              <p className="font-bold text-lg">Thur 03/04</p>
              <p className="text-gray-700 flex items-center text-bold"><FaRegClock /> <strong className='sub-heading ml-1'>1.67 hrs</strong></p>
              <div className='mt-3'>
                <p className="text-gray-700">🕗 8:00pm - 10:00pm</p>
                <p className="text-gray-700">(20 min break)</p>
                <p className="text-gray-700">📍 Office</p>
              </div>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="p-4 bg-gray-100 border-1 rounded-lg h-full flex flex-col justify-between">
              <p className="font-bold sub-heading text-gray-600 text-lg">Weekly Total</p>

              <p className="font-weight-800 text-indigo-900 "><strong className='sub-heading'> 13.01 </strong><span className='font-medium'>hours</span></p>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="p-4 bg-lime-100 rounded-lg h-full flex flex-col justify-between">
              <p className="font-bold text-lg">Fri 04/04</p>
              <p className="text-gray-700 flex items-center text-bold"><FaRegClock /> <strong className='sub-heading ml-1'>1.67 hrs</strong></p>
              <div className='mt-3'>
                <p className="text-gray-700">🕗 8:00pm - 10:00pm</p>
                <p className="text-gray-700">(20 min break)</p>
                <p className="text-gray-700">📍 Office</p>
              </div>
            </div>
          </div>

          <div className="mt-4 mr-4 flex-1">
            <div className="p-4 bg-red-100 rounded-lg h-full flex flex-col justify-start">
              <p className="font-bold text-lg">Sat 05/04</p>
              <p className="text-gray-700 flex items-center text-bold"><FaRegClock /> <strong className='sub-heading ml-1'>Day Off</strong></p>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="p-4 bg-red-100 rounded-lg h-full flex flex-col justify-start">
              <p className="font-bold text-lg">Sun 06/04</p>
              <p className="text-gray-700 flex items-center text-bold"><FaRegClock /> <strong className='sub-heading ml-1'>Day Off</strong></p>

            </div>
          </div>
          <div className="mt-4 col-span-2 mr-4">
            <div className="p-4 bg-gray-100 border-1 rounded-lg h-full flex flex-col justify-between">
              <h2 className="font-weight-700 text-indigo-900">Give Your <strong>Unavailability</strong> Date and Time</h2>

              <button className="bg-indigo-800 text-white hover:bg-indigo-600 px-4 py-2 rounded-lg self-end">
                Start Your Shift
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rosterly