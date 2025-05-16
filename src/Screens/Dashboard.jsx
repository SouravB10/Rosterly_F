import React from "react";
import { motion } from "framer-motion";
import { FiUsers } from "react-icons/fi";
import { MdAssignment, MdOutlinePendingActions } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";

const stats = [
  {
    title: "Total Users",
    value: 120,
    bg: "bg-white-200",
    icon: <FiUsers className="text-3xl text-black-100" />,
  },
  {
    title: "Active Rosters",
    value: 34,
    bg: "bg-rosterGreen",
    icon: <MdAssignment className="text-3xl text-black-100" />,
  },
  {
    title: "Pending Approvals",
    value: 8,
    bg: "bg-yellow",
    icon: <MdOutlinePendingActions className="text-3xl text-black-100" />,
  },
  {
    title: "Managers",
    value: 5,
    bg: "bg-white-300",
    icon: <FaUserTie className="text-3xl text-black-100" />,
  },
  {
    title: "Stores",
    value: 5,
    bg: "bgSucces",
    icon: <AiOutlineShop className="text-3xl text-black-100" />,
  },
  {
    title: "Employees",
    value: 105,
    bg: "bg-rosterRed",
    icon: <BsPeopleFill className="text-3xl text-black-100" />,
  },
];

export default function Dashboard() {
  return (
    <div className="my-10 px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-3xl font-bold mb-8 text-black-100"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard Overview
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            className={`rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 ${item.bg}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-black-100">{item.title}</h2>
              {item.icon}
            </div>
            <p className="text-4xl font-bold text-black-200">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
