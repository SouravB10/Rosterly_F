import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from '../assets/Data';
import { TbCircleLetterRFilled } from "react-icons/tb";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";

const Sidebar = () => {
    const [open, setOpen] = useState(window.innerWidth > 768);
    const [activeMenu, setActiveMenu] = useState(null);
    const location = useLocation();

    const toggleMenu = (id) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex items-start">

            <div className={`h-[96vh] inset-shadow-amber-600 transition-all duration-300 bg-indigo-950 backdrop-blur-lg m-3 rounded-2xl
            ${open ? 'w-[250px]' : 'w-[80px]'}`}>

                <div className="flex flex-col">
                    <div className={`flex items-center p-4 w-full ${open ? 'justify-between' : 'justify-center'}`}>
                        <div className="flex items-center gap-2">
                            <div className={`bg-gradient-to-b from-red-100 to-yellow-300 text-black rounded-lg p-[4px] transition-all duration-300 ${!open ? 'hidden' : 'block'}`}>
                                <TbCircleLetterRFilled />
                            </div>
                            <p className={`text-white text-[22px] font-semibold transition-all duration-300 ${!open ? 'hidden' : 'block'}`}>
                                Rosterly
                            </p>
                        </div>

                        <button
                            onClick={() => setOpen(!open)}
                            className=" p-2 text-xl text-white transition-all duration-300 flex"
                        >
                            {open ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                                : <TiThMenu />}
                        </button>
                    </div>

                    <hr className="border-t border-gray-300 mx-4 mt-1" />
                </div>

                <ul className="flex flex-col gap-2 p-4 mt-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.submenu && item.submenu.some(sub => location.pathname === sub.path));

                        return (
                            <li key={item.id}>                            
                                <Link to={item.path}
                                    className={`flex items-center gap-2 p-3 rounded-2xl transition-all duration-300 text-white hover:bg-indigo-400 hover:shadow-md cursor-pointer
                                        ${isActive ? "bg-indigo-500 shadow-md" : ""}`}
                                    onClick={() => item.submenu ? toggleMenu(item.id) : null}>
                                    <div className="w-8 flex justify-center">
                                        <span className="text-2xl">{item.icon}</span>
                                    </div>
                                    <span className={`transition-all duration-300 ${!open ? 'hidden' : 'inline'}`}>
                                        {item.title}
                                    </span>
                                    {item.submenu && open && (
                                        <span className="ml-auto">
                                            {activeMenu === item.id ? <FaChevronDown /> : <FaChevronRight />}
                                        </span>
                                    )}
                                </Link>

                                {/* Submenu */}
                                {item.submenu && (
                                    <ul
                                        className={`overflow-hidden rounded-lg p-1 w-[300px] transition-all duration-300 
                                            ${activeMenu === item.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} 
                                            ${open ? "w-full" : "absolute left-[80px] top-50% bg-violet-900 rounded-lg shadow-lg p-2 w-[200px] sm:w-auto"}`}
                                    >
                                        {item.submenu.map((sub) => {
                                            const isSubActive = location.pathname === sub.path;
                                            return (
                                                <li key={sub.id} className="w-full">
                                                    <Link
                                                        to={sub.path}
                                                        className={`flex items-center gap-2 my-1 px-3 py-2 rounded-lg text-white transition-all duration-300 
                                                            ${isSubActive ? "bg-violet-950 rounded-lg shadow-md" : "bg-violet-800 hover:bg-violet-500"}`}
                                                    >
                                                        <span className="text-lg">{sub.icon}</span>
                                                        <span className="text-sm font-light">{sub.title}</span>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>

    );
};

export default Sidebar;
