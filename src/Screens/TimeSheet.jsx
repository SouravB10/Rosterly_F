import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaFilePdf } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowCircleDown } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { ImCheckmark } from "react-icons/im";

const TimeSheet = () => {
    const [selectedLocation, setSelectedLocation] = useState("default");
    const [currentWeek, setCurrentWeek] = useState(moment());

    const getWeekRange = (week) => {
        const startOfWeek = moment(week).startOf("isoWeek").format("DD MMM");
        const endOfWeek = moment(week).endOf("isoWeek").format("DD MMM");
        return `${startOfWeek} - ${endOfWeek}`;
    };

    const handlePrevWeek = () => {
        setCurrentWeek((prev) => moment(prev).subtract(1, "week"));
    };

    const handleNextWeek = () => {
        setCurrentWeek((prev) => moment(prev).add(1, "week"));
    };

    const handleLocation = (e) => {
        setSelectedLocation(e.target.value);
        console.log("Selected Location:", e.target.value);
    };
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-4">
                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <select
                        name="selectedLocation"
                        className="bg-violet-100 px-3 font12 py-2 rounded-lg text-sm font-semibold text-gray-900 shadow-sm w-full md:w-50 appearance-none pr-10"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='black'><path stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/></svg>\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 1rem center",
                            backgroundSize: "1.25rem",
                        }}
                        value={selectedLocation}
                        onChange={handleLocation}
                    >
                        <option value="default">--Select Location--</option>
                        <option value="Location 1">Main Office</option>
                        <option value="Location 2">Office</option>
                    </select>

                    <div className="flex items-center font12 justify-center bg-violet-100 rounded-lg text-sm font-semibold text-gray-900 shadow-sm w-full md:w-75 px-4">
                        <FaAngleLeft
                            className="text-violet-800 hover:text-violet-950"
                            size={20}
                            onClick={handlePrevWeek}
                        />
                        <span className="mx-2">{getWeekRange(currentWeek)}</span>
                        <FaAngleRight
                            className="text-violet-800 hover:text-violet-950"
                            size={20}
                            onClick={handleNextWeek}
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="flex items-center justify-center bg-violet-100 rounded-lg text-sm text-gray-900 shadow-sm w-10 px-2">
                            <IoStatsChartSharp size={18} />
                        </div>
                        <div className="flex items-center justify-center bg-violet-100 rounded-lg text-sm text-gray-900 shadow-sm w-10 px-2">
                            <FaFilePdf size={18} />
                        </div>
                    </div>
                </div>
                <div>
                    <select
                        name="selectedEmployee"
                        className="bg-violet-100 font12 px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 shadow-sm w-full md:w-50 appearance-none pr-10"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='black'><path stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/></svg>\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 1rem center",
                            backgroundSize: "1.25rem",
                        }}
                    >
                        <option value="default">--Select Employee--</option>
                        <option value="Location 1">Vishal</option>
                        <option value="Location 2">Harish</option>
                        <option value="Location 3">Anita</option>
                    </select>

                    <button className="font12 successbutton mx-4 text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-950 ...">
                        Employee +
                    </button>
                </div>
            </div>
            <div className=" mt-6 ">
                <div className="bg-indigo-950 text-white p-2 rounded-lg">
                    <div className="flex justify-between items-center ">
                        <h2 className="text-lg font-semibold text-center font14">
                            Harish Dobila
                        </h2>
                        <div className="flex items-center gap-8 mx-4">
                            <input
                                type="text"
                                className="border px-4 inputfield bg-white text-black rounded-md font12 w-1/2"
                                placeholder="Import 0 Leaves Items"
                            />
                            <input
                                type="text"
                                className="border px-4 inputfield  bg-white text-black rounded-md font12 w-1/2"
                                placeholder="Import 0 Scans"
                            />

                            <button className="bg-green-500 successbutton font12  text-white ">
                                Finalise
                            </button>
                            <div className="flex gap-4 items-center">
                                <FaPlus
                                    className=" hover:text-violet-950 bg-green-700 text-white rounded-md p-1"
                                    size={26}
                                />
                                <RiDeleteBin6Line
                                    className=" hover:text-violet-950 bg-red-700 text-white rounded-md p-1"
                                    size={26}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="w-1/6 bg-gray-300 text-white p-4">
                        <div className="space-y-2">
                            {[
                                "Mon 07/04/25",
                                "Tue 08/04/25",
                                "Wed 09/04/25",
                                "Thu 10/04/25",
                                "Fri 11/04/25",
                                "Sat 12/04/25",
                                "Sun 13/04/25",
                            ].map((day, index) => (
                                <div
                                    key={index}
                                    className="p-2 text-black font-bold rounded-md"
                                >
                                    <p>{day}</p>
                                    <p className="text-sm">₹ 0 | 0.00 Hrs</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 p-6">
                        <div>
                            <div className="grid grid-cols-5 gap-3 f9f9f9card p-6 rounded-md shadow-md mb-4">
                                <div className="flex items-center justify-start font-semibold font12 my-3">
                                    Rostered
                                </div>
                                <div>
                                    <p className="font-semibold font12">Start</p>
                                    <input
                                        type="text"
                                        className="input"
                                        value="1:30 PM"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold font12">Finish</p>
                                    <input
                                        type="text"
                                        className="bg-gray-200 p-2 rounded-md w-full font12 my-3"
                                        value="2:15 PM"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold font12">Break</p>
                                    <input
                                        type="text"
                                        className="bg-gray-200 p-2 rounded-md w-full font12 my-3"
                                        value="15 MIN"
                                        readOnly
                                    />
                                </div>
                                <div className="flex items-center justify-end">
                                    <FaArrowCircleDown
                                        className=" hover:text-violet-950 p-1 bg-gray-400 text-white rounded-md"
                                        size={26}
                                    />
                                </div>
                                <div className="flex items-center justify-start font-semibold font12">
                                    Scanned
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        className="bg-gray-200 p-2 rounded-md w-full font12 my-3"
                                        value="1:30 PM"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="bg-gray-200 p-2 rounded-md w-full font12 my-3"
                                        value="2:15 PM"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="bg-gray-200 p-2 rounded-md w-full font12 my-3"
                                        value="15 MIN"
                                        readOnly
                                    />
                                </div>
                                <div className="flex items-center justify-end">
                                    <IoSettingsSharp
                                        className=" hover:text-violet-950 p-1 bg-gray-400 text-white rounded-md"
                                        size={26}
                                    />
                                </div>
                                <div className="flex items-center justify-start font-semibold font12">
                                    Approved
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        className="bg-gray-200 p-2 rounded-md w-full font12 my-3"
                                        value="1:30 PM"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="bg-gray-200 p-2 rounded-md w-full font12 my-3"
                                        value="2:15 PM"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="bg-gray-200 p-2 rounded-md w-full font12 my-3"
                                        value="15 MIN"
                                        readOnly
                                    />
                                </div>
                                <div className="flex items-center justify-end">
                                    <ImCheckmark
                                        className=" hover:text-violet-950 bg-green-400 text-white rounded-md p-1"
                                        size={26}
                                    />
                                </div>
                                <div className="mt-4 bg-white p-6 rounded-md shadow-md">
                                    <label className="sub-heading font12">Add</label>
                                    <div className="mt-4 flex justify-between">
                                        <div className="flex w-3/4">
                                            <div className="w-full">
                                                <textarea
                                                    className="border p-2 rounded-md w-full font12"
                                                    rows="6"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="flex w-1/5 justify-end">
                                            <div className="flex flex-col justify-between w-full space-y-1">
                                                <button className="bg-green-500 text-white px-3  rounded-md font12 successbutton">
                                                    Approve & Next
                                                </button>
                                                <button className="border px-3  rounded-md primarybutton font12">
                                                    Approve
                                                </button>
                                                <button className="bg-red-500 dangerbutton text-white px-3  rounded-md font12">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TimeSheet;
