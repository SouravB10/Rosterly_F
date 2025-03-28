import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './Component/SideBar';
import Rosterly from './Screens/Rosterly';
import Unavailability from './Screens/Unavailability';

function Layout() {
  const location = useLocation();
  const hideSidebarRoutes = ['/', '/register'];

  return (
    <>
      <BrowserRouter>
        <div className='flex'>
          <Sidebar />
          <div className='flex-1'>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/myrosterly' element={<Rosterly />} />
              <Route path='/unavailability' element={<Unavailability />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
