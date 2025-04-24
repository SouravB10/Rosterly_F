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
import Register from './Screens/Register';
import People from './Screens/People';
import Location from './Screens/Location';
import SystemSettings from './Screens/RosterSettings/SystemSettings';
import PayRate from './Screens/RosterSettings/PayRate';
import Utilities from './Screens/Utilities';
import Rosters from './Screens/Rosters';
import TimeSheet from './Screens/TimeSheet';
import Notification from './Screens/Notification';
import General from './Screens/RosterSettings/General';
import RosterSetting from './Screens/RosterSettings/RosterSetting';
import EmployeeTypeLoading from './Screens/RosterSettings/EmployeeTypeLoading';
import Permission from './Screens/RosterSettings/Permission';
import JuniorRate from './Screens/RosterSettings/JuniorRate';
import PenalityRate from './Screens/RosterSettings/PenalityRate';
import Profile from './Screens/Profile';


function AppWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true); // expanded view for desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isLoginPage = location.pathname === '/';
  const isRegisterPage = location.pathname === '/register';

  return (
    <>
      <div className='flex h-screen overflow-hidden'>
        {!isLoginPage && !isRegisterPage && (
          
        <div className=" top-0 left-0 h-full">
          {(sidebarOpen || !isMobile) && (
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} isMobile={isMobile} />
          )}
        </div>
        )}
        <div className='flex-1 flex flex-col'>
          {!isLoginPage && !isRegisterPage && <NavBar toggleSidebar={toggleSidebar} />}
          <div className={`flex-1 overflow-auto ${isLoginPage || isRegisterPage ? 'p-0' : 'px-4'}`}>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/myrosterly' element={<Rosterly />} />
              <Route path='/unavailability' element={<Unavailability />} />
              <Route path='/people' element={<People />} />
              <Route path='/location' element={<Location />} />
              <Route path='/systemsettings' element={<SystemSettings />} />
              <Route path='/payrate' element={<PayRate />} />
              <Route path='/utilities' element={<Utilities />} />
              <Route path='/roster' element={<Rosters />} />
              <Route path='/timesheet' element={<TimeSheet />} />
              <Route path='/notification' element={<Notification />} />
              <Route path='/generalsettings' element={<General />} />
              <Route path='/rostersetting' element={<RosterSetting />} />
              <Route path='/employeetypeloading' element={<EmployeeTypeLoading />} />
              <Route path='/permission' element={<Permission />} />
              <Route path='/JuniorRate' element={<JuniorRate />} />
              <Route path='/PanalityRate' element={<PenalityRate />} />
              <Route path='/Profile' element={<Profile />} />

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