import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { navItems } from '../assets/Data';

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className='flex items-start'>

            <div className={`h-[100vh] w-64 shadow-2xl text-violet-400 text-[18px] transition-all duration-300 ${open && 'w-[50px]'}`}>
                <div className='flex gap-[20px] p-4 justify-center'>
                    {!open && <p className='text-violet-900 text-[24px] font-semibold'>Rosterly </p>}
                </div>
                <ul className='flex flex-col gap-6 p-4 mt-10 '>
                    {
                        navItems.map((item) => (<li className="flex items-center gap-x-2 transition-all duration-300" key={item.id}> <Link to={item.path} className="flex items-center gap-2 hover:text-violet-700">
                            {item.icon}
                            {!open && <span>{item.title}</span>}
                        </Link></li>))
                    }
                </ul>
            </div>
            <button onClick={() => setOpen(!open)} className={`bg-white shadow-lg rounded-full p-2 ms-[-20px] mt-4 transition-all duration-300 ${open && 'transform rotate-180'}`}><FaArrowCircleLeft /></button>
        </div>
    );
};

export default Sidebar;
