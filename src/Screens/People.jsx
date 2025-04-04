import React, { useState } from 'react'
import { MdPeopleAlt } from "react-icons/md";
import { RiNotificationLine } from "react-icons/ri";
import { RiNotificationOffLine } from "react-icons/ri";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Dialog } from '@headlessui/react';

const People = () => {

    const [activeTab, setActiveTab] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);  

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-semibold'>People</h1>
                <button className='bg-violet-600 text-white p-2 rounded-md'
                onClick={() => setIsModalOpen(true)}>+ Add People</button>
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
                        className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-violet-100 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        <div className="py-1">
                            <MenuItem>
                                <a
                                    href="#"
                                    className=" flex justify-start px-4 py-2 text-sm text-gray-700 data-focus:bg-violet-300 data-focus:text-gray-900 data-focus:outline-hidden"
                                >
                                    All
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    href="#"
                                    className=" flex justify-start px-4 py-2 text-sm text-gray-700 data-focus:bg-violet-300 data-focus:text-gray-900 data-focus:outline-hidden"
                                >
                                    Active
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    href="#"
                                    className="flex justify-start px-4 py-2 text-sm text-gray-700 data-focus:bg-violet-300 data-focus:text-gray-900 data-focus:outline-hidden"
                                >
                                    Inactive
                                </a>
                            </MenuItem>

                        </div>
                    </MenuItems>
                </Menu>

                <Menu as="div" className="relative inline-block text-right">
                    <div>
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-4 py-2 text-sm font-semibold text-gray-700 ring-1 shadow-xs ring-violet-800 ring-inset hover:bg-violet-100 transition">
                            Location
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>
                    </div>

                    <MenuItems
                        transition
                        className="absolute  left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-violet-100 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        <div className="py-1">
                            <MenuItem className=''>
                                <a
                                    href="#"
                                    className=" flex justify-start px-4 py-2 text-sm text-gray-700 data-focus:bg-violet-300 data-focus:text-gray-900 data-focus:outline-hidden"
                                >
                                    Office
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    href="#"
                                    className=" flex justify-start px-4 py-2 text-sm text-gray-700 data-focus:bg-violet-300 data-focus:text-gray-900 data-focus:outline-hidden"
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
                    {/* <tbody>
                        <td className='border border-gray-300 p-2'>Sourav</td>
                        <td className='border border-gray-300 p-2'>sourav.gmail.com</td>
                        <td className='border border-gray-300 p-2'>354745765765</td>
                        <td className='border border-gray-300 p-2'>Off</td>
                    </tbody> */}
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
            {/* Modal for Adding People */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-gray bg-opacity-30 backdrop-blur-[1px]"></div>
                <div className="fixed inset-0 flex items-center justify-center">
                <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <Dialog.Title className="text-lg font-semibold">Add People</Dialog.Title>
                    <form className="mt-4 space-y-3">
                    <div>
                        <label className="block text-sm font-medium">First Name</label>
                        <input
                        type="text"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 p-2"
                        placeholder="Enter first name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Last Name</label>
                        <input
                        type="text"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 p-2"
                        placeholder="Enter last name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                        type="email"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 p-2"
                        placeholder="Enter email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone Number</label>
                        <input
                        type="text"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 p-2"
                        placeholder="Enter phone number"
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 rounded-md"
                        onClick={() => setIsModalOpen(false)}
                        >
                        Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-violet-600 text-white rounded-md">
                        Save
                        </button>
                    </div>
                    </form>
                </Dialog.Panel>
                </div>
            </Dialog>
        </div>

        
    )
}

export default People