import React, { useEffect, useState } from 'react'

const Rosterly = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    setUserName(`${firstName} ${lastName}`);
  }, []);

  return (
    <>
      <div className=''>
        <div className='text-indigo-950'>
          <p className='sub-heading font-bold '>Welcome,</p>
          <p className='text-2xl heading font-bold'>{userName}</p>
        </div>
        <button className='bg-lime-400 font-bold text-white mt-6 rounded-lg px-3 py-2 hover:bg-indigo-950 transition duration-300'>
          Start Your Shift
        </button>
      </div>
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6 border border-gray-200">

        <h2 className="text-xl font-bold text-indigo-950">Shift Details</h2>
        <div className='grid gap-6 grid-cols-5'>

          <div className="mt-4 mr-4">
            <div className="p-4 bg-green-100 rounded-lg h-full flex flex-col justify-between">
              <p className="font-bold text-lg">Mon 31/03</p>
              <p className="text-gray-700">⏰ <strong>1.67 hrs</strong></p>
              <p className="text-gray-700">🕗 8:00pm - 10:00pm</p>
              <p className="text-gray-700">(20 min break)</p>
              <p className="text-gray-700">📍 Office</p>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="p-4 bg-green-100 rounded-lg h-full flex flex-col justify-between">
              <p className="font-bold text-lg">Tue 01/04</p>
              <p className="text-gray-700">⏰ <strong>1.67 hrs</strong></p>
              <p className="text-gray-700">🕗 8:00pm - 10:00pm</p>
              <p className="text-gray-700">(20 min break)</p>
              <p className="text-gray-700">📍 Office</p>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="p-4 bg-green-100 rounded-lg h-full flex flex-col justify-between">
              <p className="font-bold text-lg">Wed 02/04</p>
              <p className="text-gray-700">⏰ <strong>1.67 hrs</strong></p>
              <p className="text-gray-700">🕗 8:00pm - 10:00pm</p>
              <p className="text-gray-700">(20 min break)</p>
              <p className="text-gray-700">📍 Office</p>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="p-4 bg-green-100 rounded-lg h-full flex flex-col justify-between">
              <p className="font-bold text-lg">Thur 03/04</p>
              <p className="text-gray-700">⏰ <strong>1.67 hrs</strong></p>
              <p className="text-gray-700">🕗 8:00pm - 10:00pm</p>
              <p className="text-gray-700">(20 min break)</p>
              <p className="text-gray-700">📍 Office</p>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="p-4 bg-gray-100 border-1 rounded-lg h-full flex flex-col justify-between">
              <p className="font-bold sub-heading text-lg">Total Hours</p>

              <p className="font-bold text-gray-700">Weekly Total: <span className="text-indigo-950 text-lg">13.01 hours</span></p>
            </div>
          </div>

          <div className="mt-4 mr-4">
            <div className="p-4 bg-green-100 rounded-lg h-full flex flex-col justify-between">
              <p className="font-bold text-lg">Fri 04/04</p>
              <p className="text-gray-700">⏰ <strong>1.67 hrs</strong></p>
              <p className="text-gray-700">🕗 8:00pm - 10:00pm</p>
              <p className="text-gray-700">(20 min break)</p>
              <p className="text-gray-700">📍 Office</p>
            </div>
          </div>

          <div className="mt-4 mr-4 flex-1">
            <div className="p-4 bg-red-100 rounded-lg h-full flex flex-col justify-start">
              <p className="font-bold text-lg">Sat 05/04</p>
              <p className="text-gray-700">⏰ <strong>Day Off</strong></p>
            </div>
          </div>

          <div className="mt-4 mr-4">
          <div className="p-4 bg-red-100 rounded-lg h-full flex flex-col justify-start">
          <p className="font-bold text-lg">Sun 06/04</p>
              <p className="text-gray-700">⏰ <strong>Day Off</strong></p>
             
            </div>
          </div>
          <div className="mt-4 col-span-2 mr-4">
            <div className="p-4 bg-gray-100 border-1 rounded-lg h-full flex flex-col justify-center">
              <p className="font-bold text-lg">Mon 31/03</p>
              <p className="text-gray-700">⏰ <strong>1.67 hrs</strong></p>
              <p className="text-gray-700">🕗 8:00pm - 10:00pm</p>
              <p className="text-gray-700">(20 min break)</p>
              <p className="text-gray-700">📍 Office</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rosterly