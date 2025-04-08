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
<<<<<<< HEAD
import PayRateLevel from './Screens/PayRateLevel';
=======
import TimeSheet from './Screens/TimeSheet';

>>>>>>> 3f7f1f2957d8ac40a4214287e67df8c53be07a64

function AppWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isLoginPage = location.pathname === '/';
  const isRegisterPage = location.pathname === '/register';

  return (
    <>

      <div className='flex h-screen overflow-hidden'>
        {!isLoginPage && !isRegisterPage && (
          <div className=" top-0 left-0 h-full">
            <Sidebar open={sidebarOpen} />
          </div>
        )}
        <div className='flex-1 flex flex-col'>
          {!isLoginPage && !isRegisterPage && <NavBar toggleSidebar={toggleSidebar} />}
          <div className={`flex-1 overflow-auto ${isLoginPage || isRegisterPage ? 'p-0' : 'p-4'}`}>
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
<<<<<<< HEAD
              <Route path='/payratelevel' element={<PayRateLevel />} />
=======
              <Route path='/timesheet' element={<TimeSheet />} />
>>>>>>> 3f7f1f2957d8ac40a4214287e67df8c53be07a64
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