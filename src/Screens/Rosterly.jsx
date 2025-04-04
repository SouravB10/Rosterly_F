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
      <div className='flex justify-between'>
        <div className='text-indigo-950'>
          <p className='text-lg font-bold '>Welcome,</p>
          <p className='text-2xl font-bold'>{userName}</p>
        </div>
        <button className='bg-indigo-950 text-white rounded-lg px-3 py-1 hover:bg-indigo-800 transition duration-300'>
          Start Your Shift
        </button>
      </div>
    </>
  )
}

export default Rosterly