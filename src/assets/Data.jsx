import { FaHome } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { TbCircleLetterRFilled } from "react-icons/tb";
import { PiArticleNyTimesFill } from "react-icons/pi";
import { RiNotificationLine } from "react-icons/ri";
import { RiNotificationOffLine } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { MdDisplaySettings } from "react-icons/md";
import { TbSettingsDollar } from "react-icons/tb";
import { TbSettingsSearch } from "react-icons/tb";


export const navItems = [
    {
        id: 1,
        title: 'My Rosterly',
        icon: <FaHome className="text-xl text-black"/>,
        path:'/myrosterly'
    },
    {
        id: 2,
        title: 'Unavailability',
        icon: <CgUnavailable className="text-xl text-black"/>,
        path:'/unavailability'
    },
    {
        id: 3,
        title: 'People',
        icon: <FaPeopleGroup className="text-xl text-black"/>,
        path:'/people',
        // submenu: [
        //     { id: 1, title: 'Active', path: '/active', icon: <RiNotificationLine className="text-xl text-black"/> },
        //     { id: 2, title: 'Inactive', path: '/inactive', icon: <RiNotificationOffLine className="text-xl text-black"/> }
        // ]
    },
    {
        id: 4,
        title: 'Location',
        icon: <FaLocationDot className="text-xl text-black"/>,
        path:'/location'
    },
    {
        id: 5,
        title: 'Rosters',
        path:'/roster',
        icon: <TbCircleLetterRFilled className="text-xl text-black"/>
    },
    {
        id: 6,
        title: 'Timesheet',
        path:'/timesheet',
        icon: <PiArticleNyTimesFill className="text-xl text-black"/>
    },
    {
        id: 8,
        title: 'Profile',
        path:'/profile',
        icon: <PiArticleNyTimesFill className="text-xl text-black"/>
    },
    {
        id: 7,
        title: 'Settings',
        icon: <IoSettings className="text-xl text-black"/>,
        // path:'/settings',
        submenu: [
            { id: 1, title: 'System Settings', path: '/systemsettings', icon: <MdDisplaySettings className="text-xl text-black"/> },
            { id: 2, title: 'Pay Rate Setup', path: '/payrate', icon: <TbSettingsDollar className="text-xl text-black   "/> },
        ]
    },
]