import './App.css'
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Login from './Screens/Login';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './Component/SideBar';
import Rosterly from './Screens/Rosterly';
import Unavailability from './Screens/Unavailability';
import NavBar from './Component/NavBar';
import Dashboard from './Screens/Dashboard';

function AppWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isLoginPage = location.pathname === '/';

  return (
    <>

      <div className='flex h-screen overflow-hidden'>
        {!isLoginPage && (
          <div className=" top-0 left-0 h-full">
            <Sidebar open={sidebarOpen} />
          </div>
        )}
        <div className='flex-1 flex flex-col'>
          {!isLoginPage && <NavBar toggleSidebar={toggleSidebar} />}
          <div className={`flex-1 overflow-auto ${isLoginPage ? 'p-0' : 'p-6'}`}>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/myrosterly' element={<Rosterly />} />
              <Route path='/unavailability' element={<Unavailability />} />
            </Routes>
          </div>
        </div>
      </div>

    </>
  )
}


export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}