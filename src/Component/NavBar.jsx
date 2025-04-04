import React from "react";
import { FaBars } from "react-icons/fa";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../assets/Data";


const NavBar = ({ toggleSidebar }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const activeMenu = navItems.find((item) => item.path === location.pathname || (item.submenu && item.submenu.some(sub => sub.path === location.pathname)));

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/api/admin/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('token');
      alert('Logged out successfully!');
      console.log("Token:", token);
      navigate('/');
    } catch (error) {
      alert('Logout failed!');
      console.error('Logout error:', error);
    }
  };

  return (

    <Disclosure as="nav" className=" backdrop-blur-lg mt-3 mx-3 mb-1 rounded-2xl" style={{ boxShadow: '-5px 3px 10px 5px rgba(0, 0, 0, 0.05)' }}>
      <div className="mx-auto max-w-7xl px-2 sm:px-3 lg:px-4">
        <div className="relative flex h-14 items-center justify-between">
          <div className="font-bold hidden sm:block">
            <h1>{activeMenu ? activeMenu.title : "My Rosterly"}</h1>
          </div>
          <div className="absolute inset-y-0 right-0 flex gap-1 items-center pr-2 sm:static sm:inset-auto sm:ml-2 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-200 p-1 text-black-400 hover:text-gray focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-500 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <div>
                <MenuButton className="relative flex rounded-full text-sm focus:ring-2 focus:ring-white">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-9 rounded"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-49 origin-top-right rounded-md bg-violet-100 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
              >

                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-black data-focus:bg-violet-300 data-focus:outline-hidden"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-black data-focus:bg-violet-300 data-focus:outline-hidden"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`block w-full px-4 py-2 text-left text-sm text-black ${active ? 'bg-violet-300' : ''
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
