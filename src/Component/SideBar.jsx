import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { navItems } from '../assets/Data';
import { TbCircleLetterRFilled } from "react-icons/tb";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const Sidebar = () => {
    const [open, setOpen] = useState(window.innerWidth > 768);
    const [activeMenu, setActiveMenu] = useState(null);

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

            <div className={`h-[100vh] shadow-2xl text-violet-400 text-[18px] transition-all duration-300 bg-gradient-to-b from-violet-600 to-violet-900
            ${open ? 'w-[250px]' : 'w-[80px]'}`}>

                <div className="flex flex-col">
                    <div className="flex items-center p-4 w-full justify-around">
                        <div className="flex items-center gap-2">
                            <div className={`bg-gradient-to-b from-red-100 to-yellow-300 text-white rounded-lg p-[4px] transition-all duration-300 ${!open ? 'hidden' : 'block'}`}>
                                <TbCircleLetterRFilled />
                            </div>
                            <p className={`text-white text-[22px] font-semibold transition-all duration-300 ${!open ? 'hidden' : 'block'}`}>
                                Rosterly
                            </p>
                        </div>

                        <button
                            onClick={() => setOpen(!open)}
                            className={`bg-white shadow-lg rounded-full p-2 text-violet-950 transition-all duration-300 flex ml-auto
                        ${open ? 'transform rotate-180' : ''}`}>
                            <FaArrowCircleLeft />
                        </button>
                    </div>

                    <hr className="border-t border-gray-300 mx-4 mt-1" />
                </div>

                <ul className="flex flex-col gap-2 p-4 mt-4">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            {/* Main Menu Link */}
                            <Link to={item.path}
                                className="flex items-center gap-2 p-3 rounded-lg transition-all duration-300 text-white hover:bg-violet-500 hover:shadow-md cursor-pointer"
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
                                    className={`overflow-hidden rounded-lg p-1 w-[200px] transition-all duration-300 ${activeMenu === item.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                        } ${open ? "w-full" : "absolute left-[80px] top-50% bg-violet-900 rounded-lg shadow-lg p-2 w-[200px] sm:w-auto"}`}
                                >
                                    {item.submenu.map((sub) => (
                                        <li key={sub.id} className="w-full">
                                            <Link
                                                to={sub.path}
                                                className="flex items-center gap-2 my-1 px-3 py-2 rounded-lg text-white bg-violet-500 transition-all duration-300 hover:bg-violet-900 w-full"
                                            >
                                                <span className="text-lg">{sub.icon}</span>
                                                <span className="text-sm font-light">{sub.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default Sidebar;
