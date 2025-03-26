import './App.css'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Login from './Screens/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  return (
    <>
      {/* <h1 className='bg-purple-500 sub-heading font-bold text-white text-center p-4'>Rosterly</h1>
      <div className=' flex justify-center mt-4'>
        <button className='button' data-aos="flip-left">Submit</button>
      </div> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
