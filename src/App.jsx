import './App.css'
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Login from './Screens/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FaArrowCircleLeft  } from "react-icons/fa";
import { navItems } from './assets/Data';

function App() {

  const [open, setOpen] = useState(false);

  return (
    <div className='flex items-start'>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter> */}
      <div className={`h-[100vh] w-64 shadow-2xl text-violet-400 text-[18px] transition-all duration-300 ${open && 'w-[50px]'}`}>
        <div className='flex gap-[20px] p-4 justify-center'>
         {!open && <p className='text-violet-900 text-[24px] font-semibold'>Rosterly </p>}
        </div>
        <ul className='flex flex-col gap-6 p-4 mt-10 '>
        {
          navItems.map((item) => (<li className="flex items-center gap-x-2 transition-all duration-300" key={item.id}><span title={item.title}>{item.icon}</span>{!open && item.title}</li>))
        }
        </ul>
      </div>
      <button onClick={() => setOpen(!open)} className={`bg-white shadow-lg rounded-full p-2 ms-[-20px] mt-4 transition-all duration-300 ${open && 'transform rotate-180'}`}><FaArrowCircleLeft  /></button>
    </div>
  )
}

export default App
