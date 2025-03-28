import './App.css'
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Login from './Screens/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Component/SideBar';

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='flex'>
          <Sidebar />
          <div className='flex-1'>
            <Routes>
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
