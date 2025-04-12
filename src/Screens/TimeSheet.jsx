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
    const tabs = [
        { id: 1, title: "Mon 07/04/25", content: "This is the overview content." },
        { id: 2, title: "Tue 08/04/25", content: "Here are some awesome features." },
        { id: 3, title: "Wed 09/04/25", content: "Our pricing is simple and fair." },
        { id: 4, title: "Thu 10/04/25", content: "Our pricing is simple and fair." },
        { id: 5, title: "Fri 11/04/25", content: "Our pricing is simple and fair." },
        { id: 6, title: "Sat 12/04/25", content: "Our pricing is simple and fair." },
        { id: 7, title: "Sun 13/04/25", content: "Our pricing is simple and fair." },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].id);
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-4">
                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <select
                        name="selectedLocation"
                        className="input w-50"
                        // style={{
                        //     backgroundImage:
                        //         "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='black'><path stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/></svg>\")",
                        //     backgroundRepeat: "no-repeat",
                        //     backgroundPosition: "right 1rem center",
                        //     backgroundSize: "1.25rem",
                        // }}
                        value={selectedLocation}
                        onChange={handleLocation}
                    >
                        <option value="default">--Select Location--</option>
                        <option value="Location 1">Main Office</option>
                        <option value="Location 2">Office</option>
                    </select>

                    <div className="flex items-center justify-center bg-white rounded-lg text-sm font-semibold text-gray-900 w-full md:w-75 px-2">
                        <FaAngleLeft
                            className="text-violet-800 hover:text-violet-950"
                            size={16}
                            onClick={handlePrevWeek}
                        />
                        <span className="paragraphBold">{getWeekRange(currentWeek)}</span>
                        <FaAngleRight
                            className="text-violet-800 hover:text-violet-950"
                            size={16}
                            onClick={handleNextWeek}
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="flex items-center justify-center bg-white rounded-lg text-sm text-gray-900 w-10 px-2">
                            <IoStatsChartSharp className="icon50" />
                        </div>
                        <div className="flex items-center justify-center bg-white rounded-lg text-sm text-gray-900 w-10 px-2">
                            <FaFilePdf className="icon50" />
                        </div>
                    </div>
                </div>
                <div>
                    <select
                        name="selectedEmployee"
                        className="input w-50 mx-2"

                    >
                        <option value="default">--Select Employee--</option>
                        <option value="Location 1">Vishal</option>
                        <option value="Location 2">Harish</option>
                        <option value="Location 3">Anita</option>
                    </select>

                    <button className="buttonSuccess">
                        Employee +
                    </button>
                </div>
            </div>
            <div className=" mt-6 ">
                <div className="sideBar text-white p-2 rounded-lg">
                    <div className="flex justify-between items-center ">
                        <h2 className="subHeading">
                            Harish Dobila
                        </h2>
                        <div className="flex items-center gap-8 mx-4">
                            <input
                                type="text"
                                className="inputS text-black"
                                placeholder="Import 0 Leaves Items"
                            />
                            <input
                                type="text"
                                className="inputS text-black"
                                placeholder="Import 0 Scans"
                            />

                            <button className="buttonSubway">
                                Finalise
                            </button>
                            <div className="flex gap-4 items-center">
                                <FaPlus
                                    className=" hover:text-violet-950 bg-yellow text-black cursor rounded-md p-1"
                                    size={26}
                                />
                                <RiDeleteBin6Line
                                    className=" hover:text-violet-950 bg-rosterRed text-white cursor rounded-md p-1"
                                    size={26}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="w-1/6 text-white">
                        <div className="w-full bg-gray-100 p-4 flex flex-col gap-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`text-left px-4 py-2 rounded-lg transition-colors ${activeTab === tab.id
                                        ? "bg-white text-blue-600 paragraphBold shadow"
                                        : "hover:bg-white paragraphBold hover:text-blue-500 text-gray-700"
                                        }`}
                                >
                                    {tab.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 card p-6">
                        <div>
                            <div className="grid grid-cols-5 gap-3 f9f9f9card p-6 mb-4">
                                <div className="flex items-center justify-start paragraphBold my-3">
                                    Rostered
                                </div>
                                <div>
                                    <p className="paragraphBold">Start</p>
                                    <input
                                        type="text"
                                        className="input"
                                        value="1:30 PM"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <p className="paragraphBold">Finish</p>
                                    <input
                                        type="text"
                                        className="input"
                                        value="2:15 PM"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <p className="paragraphBold">Break</p>
                                    <input
                                        type="text"
                                        className="input"
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
                                <div className="flex items-center justify-start paragraphBold">
                                    Scanned
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        className="input"
                                        value="1:30 PM"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="input"
                                        value="2:15 PM"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="input"
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
                                <div className="flex items-center justify-start paragraphBold">
                                    Approved
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        className="input"
                                        value="1:30 PM"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="input"
                                        value="2:15 PM"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="input"
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

                            </div>
                            <div className="mt-4 p-6 ">
                                <label className="subHeading">Add</label>
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
                                            <button className="buttonSuccess">
                                                Approve & Next
                                            </button>
                                            <button className="border px-3  rounded-md buttonSuccessB paragraph">
                                                Approve
                                            </button>
                                            <button className="buttonDanger">
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
        </>
    );
};

export default TimeSheet;
