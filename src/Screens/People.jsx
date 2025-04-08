import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaSearch } from "react-icons/fa";

const People = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("default");
    const [searchTerm, setSearchTerm] = useState("");

    const handleLocation = (e) => {
        setSelectedLocation(e.target.value);
        console.log("Selected Location:", e.target.value);
    };
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        console.log("Search Term:", e.target.value);
    };
    const getLocation = () => {
        console.log("Fetching data for:", selectedLocation);
    };

    const handleAddPerson = (e) => {
        e.preventDefault();
        setIsModalOpen(false); // close modal after action
    };



    return (
        <div className='flex flex-col gap-3 p-4'>
            <div className='flex items-center justify-between'>
            </div>
            <div className="flex justify-between items-center mb-2">
                <div className="flex gap-3">
                    <select
                        name="selectedLocation"
                        className="bg-white px-3 rounded-lg py-3 text-sm font-semibold text-gray-900 shadow-sm w-50 appearance-none pr-10"
                        style={{
                            backgroundImage:
                                'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke-width=\'2\' stroke=\'black\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19 9l-7 7-7-7\'/></svg>")',
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 1rem center",
                            backgroundSize: "1.25rem",
                        }}
                        value={selectedLocation}
                        onChange={handleLocation}
                    >
                        <option value="default">--Select Status--</option>
                        <option value="Location 1">Active</option>
                        <option value="Location 2">Inactive</option>
                    </select>

                    <select
                        name="selectedLocation"
                        className="bg-white px-3 rounded-lg py-3 text-sm font-semibold text-gray-900 shadow-sm w-50 appearance-none pr-10"
                        style={{
                            backgroundImage:
                                'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke-width=\'2\' stroke=\'black\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19 9l-7 7-7-7\'/></svg>")',
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 1rem center",
                            backgroundSize: "1.25rem",
                        }}
                        value={selectedLocation}
                        onChange={handleLocation}
                    >
                        <option value="default">--Select Location--</option>
                        <option value="Location 1">Location 1</option>
                        <option value="Location 2">Location 2</option>
                        <option value="Location 3">Location 3</option>
                    </select>

                    <button
                        className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700"
                        onClick={getLocation}
                    >
                        Filter Data
                    </button>
                    <div className="relative w-64">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-950" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm w-full"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>


                <button className="px-3 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700" onClick={() => setIsModalOpen(true)}>
                    + People
                </button>
                {/* </div> */}
            </div>

            <div className='overflow-x-auto mt-4'>
                <table className='w-full border-collapse border border-gray-300 text-xs font-semibold'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='border border-gray-300 p-2'>Name</th>
                            <th className='border border-gray-300 p-2'>Phone</th>
                            <th className='border border-gray-300 p-2'>Age</th>
                            <th className='border border-gray-300 p-2'>Email</th>
                            <th className='border border-gray-300 p-2'>Last Active</th>
                            <th className='border border-gray-300 p-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-center">
                            <td className='border border-gray-300 p-2'>Sourav</td>
                            <td className='border border-gray-300 p-2'>9876543210</td>
                            <td className='border border-gray-300 p-2'>25</td>
                            <td className='border border-gray-300 p-2'>sourav@gmail.com</td>
                            <td className='border border-gray-300 p-2'>few days ago</td>
                            <td className='border border-gray-300 p-2 space-x-2'>
                                <button className='bg-blue-600 text-white px-3 py-1 hover:bg-blue-700 transition duration-200'>
                                    View
                                </button>
                                <button className='bg-green-600 text-white px-3 py-1 hover:bg-green-700 transition duration-200'>
                                    Add Note
                                </button>
                            </td>
                        </tr>
                        <tr className="text-center">
                            <td className='border border-gray-300 p-2'>Anita</td>
                            <td className='border border-gray-300 p-2'>9125676080</td>
                            <td className='border border-gray-300 p-2'>28</td>
                            <td className='border border-gray-300 p-2'>anita@gmail.com</td>
                            <td className='border border-gray-300 p-2'>2 hours ago</td>
                            <td className='border border-gray-300 p-2 space-x-2'>
                                <button className='bg-blue-600 text-white px-3 py-1 hover:bg-blue-700 transition duration-200'>
                                    View
                                </button>
                                <button className='bg-green-600 text-white px-3 py-1 hover:bg-green-700 transition duration-200'>
                                    Add Note
                                </button>
                            </td>
                        </tr>
                        <tr className="text-center">
                            <td className='border border-gray-300 p-2'>Navin</td>
                            <td className='border border-gray-300 p-2'>9876543210</td>
                            <td className='border border-gray-300 p-2'>24</td>
                            <td className='border border-gray-300 p-2'>navin@gmail.com</td>
                            <td className='border border-gray-300 p-2'>few days ago</td>
                            <td className='border border-gray-300 p-2 space-x-2'>
                                <button className='bg-blue-600 text-white px-3 py-1 hover:bg-blue-700 transition duration-200'>
                                    View
                                </button>
                                <button className='bg-green-600 text-white px-3 py-1 hover:bg-green-700 transition duration-200'>
                                    Add Note
                                </button>
                            </td>
                        </tr>
                        <tr className="text-center">
                            <td className='border border-gray-300 p-2'>Vishal</td>
                            <td className='border border-gray-300 p-2'>9876543210</td>
                            <td className='border border-gray-300 p-2'>25</td>
                            <td className='border border-gray-300 p-2'>vishal@gmail.com</td>
                            <td className='border border-gray-300 p-2'>few days ago</td>
                            <td className='border border-gray-300 p-2 space-x-2'>
                                <button className='bg-blue-600 text-white text-xs px-3 py-1 hover:bg-blue-700 transition duration-200'>
                                    View
                                </button>
                                <button className='bg-green-600 text-white text-xs px-3 py-1 hover:bg-green-700 transition duration-200'>
                                    Add Note
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-opacity-40 backdrop-blur-xs"></div>    
                <div className="fixed inset-0 flex items-center justify-center">
                    <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <Dialog.Title className="text-lg font-semibold" >Add People</Dialog.Title>
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
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="generatePassword"
                                    className="h-4 w-4 text-violet-600 border-gray-300 rounded"
                                />
                                <label htmlFor="generatePassword" className="text-sm text-gray-700">
                                    Generate Password
                                </label>
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
    );
};

export default People;
