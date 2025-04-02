import React, { useState } from 'react'
import { MdPeopleAlt } from "react-icons/md";
import { RiNotificationLine } from "react-icons/ri";
import { RiNotificationOffLine } from "react-icons/ri";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const People = () => {

    const [activeTab, setActiveTab] = useState("All");

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-semibold'>People</h1>
                <button className='bg-violet-600 text-white p-2 rounded-md'>+ Add People</button>
            </div>
            <div className="w-full mt-4">
                <div className="relative">
                    <ul className="flex space-x-2 p-1 bg-violet-100 rounded-full shadow-md" role="list">

                        <li className="flex-1">
                            <button
                                className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium transition-all rounded-full ${activeTab === "All"
                                    ? "text-white bg-violet-600 shadow-md"
                                    : "text-gray-600 bg-transparent hover:bg-violet-200"
                                    }`}
                                onClick={() => setActiveTab("All")}
                            >
                                <MdPeopleAlt className="w-5 h-5 mr-2" />
                                <span>All</span>
                            </button>
                        </li>

                        <li className="flex-1">
                            <button
                                className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium transition-all rounded-full ${activeTab === "Active"
                                    ? "text-white bg-violet-600 shadow-md"
                                    : "text-gray-600 bg-transparent hover:bg-violet-200"
                                    }`}
                                onClick={() => setActiveTab("Active")}
                            >
                                <RiNotificationLine className="w-5 h-5 mr-2" />
                                <span>Active</span>
                            </button>
                        </li>

                        <li className="flex-1">
                            <button
                                className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium transition-all rounded-full ${activeTab === "Inactive"
                                    ? "text-white bg-violet-600 shadow-md"
                                    : "text-gray-600 bg-transparent hover:bg-violet-200"
                                    }`}
                                onClick={() => setActiveTab("Inactive")}
                            >
                                <RiNotificationOffLine className="w-5 h-5 mr-2" />
                                <span>Inactive</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='flex items-center justify-start'>

                <Menu as="div" className="relative inline-block text-right mr-2">
                    <div>
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-4 py-2 text-sm font-semibold text-gray-700 ring-1 shadow-xs ring-violet-700 ring-inset hover:bg-violet-100 transition">
                            Category
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>
                    </div>

                    <MenuItems
                        transition
                        className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        <div className="py-1">
                            <MenuItem>
                                <a
                                    href="#"
                                    className=" flex justify-start px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-300 data-focus:text-gray-900 data-focus:outline-hidden"
                                >
                                    All
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    href="#"
                                    className=" flex justify-start px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-300 data-focus:text-gray-900 data-focus:outline-hidden"
                                >
                                    Active
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    href="#"
                                    className="flex justify-start px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-300 data-focus:text-gray-900 data-focus:outline-hidden"
                                >
                                    Inactive
                                </a>
                            </MenuItem>

                        </div>
                    </MenuItems>
                </Menu>

                <Menu as="div" className="relative inline-block text-right">
                    <div>
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-4 py-2 text-sm font-semibold text-gray-700 ring-1 shadow-xs ring-violet-700 ring-inset hover:bg-violet-100 transition">
                            Location
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>
                    </div>

                    <MenuItems
                        transition
                        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        <div className="py-1">
                            <MenuItem>
                                <a
                                    href="#"
                                    className=" flex justify-start px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-300 data-focus:text-gray-900 data-focus:outline-hidden"
                                >
                                    Office
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    href="#"
                                    className=" flex justify-start px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-300 data-focus:text-gray-900 data-focus:outline-hidden"
                                >
                                    Main Branch
                                </a>
                            </MenuItem>

                        </div>
                    </MenuItems>
                </Menu>

            </div>

            <div className='overflow-x-auto mt-4'>
                <h1 className='heading'>Table</h1>
                <table className='w-full border-collapse border border-gray-300'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='border border-gray-300 p-2'>Name</th>
                            <th className='border border-gray-300 p-2'>Email</th>
                            <th className='border border-gray-300 p-2'>Phone</th>
                            <th className='border border-gray-300 p-2'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td className='border border-gray-300 p-2'>Sourav</td>
                        <td className='border border-gray-300 p-2'>sourav.gmail.com</td>
                        <td className='border border-gray-300 p-2'>354745765765</td>
                        <td className='border border-gray-300 p-2'>Off</td>
                    </tbody>
                </table>
            </div>
            <div>
                <details className="dropdown bg-violet-800 w-1/6 text-white p-1 rounded-md shadow-md">
                    <summary className="btn m-1">open or close</summary>
                    <ul className="menu dropdown-content bg-violet-700 rounded-md cursor-pointer z-1 w-full p-2 shadow-sm">
                        <li><a href='item1'>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </details>
            </div>
        </div>
    )
}

export default People