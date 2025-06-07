import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUsers } from "react-icons/fi";
import { MdAssignment, MdOutlinePendingActions } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import axios from "axios";


export default function Dashboard() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState(0);
  const [managers, setManagers] = useState(0);
  const [employees, setEmployees] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseURL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const users = res.data?.data || [];

        setUsers(users.length);
        setManagers(users.filter((user) => user.role_id === 2).length);
        setEmployees(users.filter((user) => user.role_id === 3).length);

        console.log("Fetched users:", users);
        console.log("Total users:", users.length);
        console.log("Total managers:", users.filter((user) => user.role_id === 2).length);
        console.log("Total employees:", users.filter((user) => user.role_id === 3).length);

      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: users,
      bg: "bg-white-200",
      icon: <FiUsers className="text-3xl text-black-100" />,
      link: "/employee",
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
      bg: "bg-yellow-200",
      icon: <MdOutlinePendingActions className="text-3xl text-black-100" />,
    },
    {
      title: "Managers",
      value: managers,
      bg: "bg-red-100",
      icon: <FaUserTie className="text-3xl text-black-100" />,
      link: "/employee",
    },
    {
      title: "Stores",
      value: 5,
      bg: "bgSucces",
      icon: <AiOutlineShop className="text-3xl text-black-100" />,
    },
    {
      title: "Employees",
      value: employees,
      bg: "bg-red-300",
      icon: <BsPeopleFill className="text-3xl text-black-100" />,
    },
  ];

  return (
    <div className="my-5">
      <motion.h1
        className="text-3xl font-bold mb-8 text-indigo-900"
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
            onClick={() => {
              if (item.link) {
                window.location.href = item.link;
              }
            }}
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
