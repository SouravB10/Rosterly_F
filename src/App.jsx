import './App.css'
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Login from './Screens/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Component/SideBar';
import Rosterly from './Screens/Rosterly';
import Unavailability from './Screens/Unavailability';
import NavBar from './Component/NavBar';

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='flex'>
          <Sidebar />
          <NavBar />
          <div className='flex-1'>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/myrosterly' element={<Rosterly/>} />
              <Route path='/unavailability' element={<Unavailability />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
