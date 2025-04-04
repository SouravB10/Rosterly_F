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
          <p className='text-lg font-bold '>Welcome,</p>
          <p className='text-2xl font-bold'>{userName}</p>
        </div>
        <button className='bg-lime-400 font-bold text-white mt-6 rounded-lg px-3 py-2 hover:bg-indigo-950 transition duration-300'>
          Start Your Shift
        </button>
      </div>
    </>
  )
}

export default Rosterly