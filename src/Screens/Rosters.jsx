import React, { useEffect, useState } from 'react'
import moment from "moment";
import { FaFilePdf } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";



const Rosters = () => {
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
            <div className="flex justify-between items-center mb-2">
                <div className="flex gap-3">

                    <select
                        name="selectedLocation"
                        className="bg-violet-100 px-3 rounded-lg text-sm font-semibold text-gray-900 shadow-sm w-50 appearance-none pr-10"
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

                    <div className="flex items-center justify-center bg-violet-100 rounded-lg text-sm font-semibold text-gray-900 shadow-sm w-75">
                        <button onClick={handlePrevWeek} className="text-violet-600 hover:text-violet-900">
                            &#9665;
                        </button>

                        <span>{getWeekRange(currentWeek)}</span>

                        <button onClick={handleNextWeek} className="text-violet-600 hover:text-violet-900">
                            &#9655;
                        </button>
                    </div>
                    <div className="flex items-center justify-center bg-violet-100 rounded-lg text-sm text-gray-900 shadow-sm w-10">
                        <IoStatsChartSharp size={20} />
                    </div>
                    <div className='flex items-center justify-center bg-violet-100 rounded-lg text-sm text-gray-900 shadow-sm w-10'>
                        <FaFilePdf size={20} />
                    </div>
                </div>


                <button className="px-5 py-2 bg-lime-500 text-white rounded-full hover:bg-indigo-700" >
                    Publish
                </button>

            </div>
            <div className="w-100% flex items-center justify-start gap-4 mt-6">
                <div className="bg-white shadow-xl rounded-lg p-4 border border-gray-200">
                    <h5 className=" font-bold text-center text-indigo-950 mb-2">Mon, 7th Apr</h5>
                    <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                        <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">4 Shifts</p>
                        <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">1.05 Hours</p>
                        <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">$301 Cost</p>
                        <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">4000 Sales</p>
                        <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">4% Cost vs Sales</p>
                    </div>
                </div>
                <div className="bg-white shadow-xl rounded-lg p-4 border border-gray-200">
                    <h5 className=" font-bold text-center text-indigo-950 mb-2">7th Apr - 13th Apr</h5>
                    <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                        <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">4 Shifts</p>
                        <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">1.05 Hours</p>
                        <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">$301 Cost</p>
                        <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">4000 Sales</p>
                        <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">4% Cost vs Sales</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Rosters