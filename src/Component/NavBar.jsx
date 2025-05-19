import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../assets/Data";
import { TiThMenu } from "react-icons/ti";

const NavBar = ({ toggleSidebar }) => {
  const [profileImage, setProfileImage] = useState("");
  const baseURL = import.meta.env.VITE_BASE_URL;
  const profileURL = import.meta.env.VITE_PROFILE_BASE_URL;

  const navigate = useNavigate();

  //   useEffect(() => {
  //   const image = localStorage.getItem("profileImage");
  //   if (image) {
  //     setProfileImage(`${profileURL}/${image}`); // <-- prepend baseURL here
  //   }
  // }, []);

  useEffect(() => {
    const loadImage = () => {
      const image = localStorage.getItem("profileImage");
      if (image) {
        setProfileImage(`${profileURL}/${image}`);
      }
    };

    loadImage();

    // Update when profile image changes
    const handleUpdate = () => loadImage();
    window.addEventListener("profileImageUpdated", handleUpdate);

    return () => {
      window.removeEventListener("profileImageUpdated", handleUpdate);
    };
  }, [profileURL]);

  const handleClick = () => {
    navigate("/notification");
  };

  const handlechangepasswordClick = () => {
    navigate("/changepassword");
  };
  const handleProfileClick = () => {
    navigate("/profile");
  };
  const location = useLocation();

  const activeMenu = navItems.find(
    (item) =>
      item.path === location.pathname ||
      (item.submenu &&
        item.submenu.some((sub) => sub.path === location.pathname))
  );

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      // localStorage.removeItem('token');
      localStorage.clear();
      navigate("/");
    } catch (error) {
      alert("Logout failed!");
      console.error("Logout error:", error);
    }
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white z-1 ackdrop-blur-lg mt-3 mx-3 mb-1 rounded-2xl"
    >
      <div className="px-4 sm:px-3 lg:px-4">
        <div className="relative flex h-14 items-center justify-between">
          <div className="font-bold hidden sm:block">
            <h1>{activeMenu ? activeMenu.title : "Rosterly"}</h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="sm:hidden text-gray-800 fixed z-30"
          >
            <TiThMenu className="text-2xl" />
          </button>
          <div className="absolute inset-y-0 right-0 flex gap-5 items-center pr-2 sm:static sm:inset-auto sm:ml-2 sm:pr-0">
            <button
              type="button"
              onClick={handleClick}
              className="cursor-pointer relative rounded-full bg-gray-200 p-1 text-black-400 hover:text-gray focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-500 focus:outline-hidden hover:bg-gray-400"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
              <span className="absolute top-0 right-0 transform translate-x -translate-y block h-2 w-2 rounded-full bg-red-600 ring-1 ring-white" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative border rounded-full">
              <div>
                <MenuButton className="cursor-pointer relative flex rounded-full text-sm focus:ring-2 focus:ring-white">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={profileImage || "https://via.placeholder.com/150"} // fallback if null
                    className="size-8 rounded p-1"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-[9999] mt-2 w-49 origin-top-right rounded-md mSideBar shadow-3xl ring-1 ring-black/5 focus:outline-none"
              >
                <MenuItem>
                  <a
                    onClick={handleProfileClick}
                    className="block px-4 py-2 paragraph cursor text-black data-focus:bg-yellow-200 data-focus:outline-hidden"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    onClick={handlechangepasswordClick}
                    className="block px-4 py-2 paragraph cursor text-black data-focus:bg-yellow-200 data-focus:outline-hidden"
                  >
                    Change Password
                  </a>
                </MenuItem>
                {/* <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 paragraph text-black data-focus:bg-gray-400 data-focus:outline-hidden"
                  >
                    Settings
                  </a>
                </MenuItem> */}
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`block w-full px-4 py-2 text-left paragraph cursor-pointer text-black ${
                        active ? "bg-yellow-200" : ""
                      }`}
                    >
                      Sign out
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default NavBar;
