import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaChartSimple } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";

export const navItems = [
    {
        id: 1,
        title: 'Home',
        icon: <FaHome className="text-xl text-violet-900"/>,
    },
    {
        id: 2,
        title: 'Profile',
        icon: <CgProfile className="text-xl text-violet-900"/>,
    },
    {
        id: 3,
        title: 'Charts',
        icon: <FaChartSimple className="text-xl text-violet-900"/>,
    },
    {
        id: 4,
        title: 'Settings',
        icon: <IoSettings className="text-xl text-violet-900"/>
    },
    {
        id: 5,
        title: 'Login',
        path:'/',
        icon: <IoIosLogIn className="text-xl text-violet-900"/>
    },
]