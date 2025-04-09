import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaFilePdf } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

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
      <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-4">
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <select
            name="selectedLocation"
            className="bg-violet-100 px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 shadow-sm w-full md:w-50 appearance-none pr-10"
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
            <option value="Location 1">Location 1</option>
            <option value="Location 2">Location 2</option>
            <option value="Location 3">Location 3</option>
          </select>

          <div className="flex items-center justify-center bg-violet-100 rounded-lg text-sm font-semibold text-gray-900 shadow-sm w-full md:w-75 px-4">
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
              <IoStatsChartSharp size={20} />
            </div>
            <div className="flex items-center justify-center bg-violet-100 rounded-lg text-sm text-gray-900 shadow-sm w-10 px-2">
              <FaFilePdf size={20} />
            </div>
          </div>
        </div>

        <button className="bg-lime-500 text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-950 ...">
          Publish
        </button>
      </div>
      <div className="grid gro-colspan2">
        <h3>here</h3>
        <h3>here</h3>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center justify-start gap-4 mt-6">
        <div className="bg-white shadow-xl rounded-lg p-4 border border-gray-200 w-full md:w-auto">
          <h5 className="font-bold text-center text-indigo-950 mb-2">
            Mon, 7th Apr
          </h5>
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">
              4 Shifts
            </p>
            <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">
              1.05 Hours
            </p>
            <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">
              $301 Cost
            </p>
            <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">
              4000 Sales
            </p>
            <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">
              4% Cost vs Sales
            </p>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-4 border border-gray-200 w-full md:w-auto">
          <h5 className="font-bold text-center text-indigo-950 mb-2">
            7th Apr - 13th Apr
          </h5>
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">
              4 Shifts
            </p>
            <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">
              1.05 Hours
            </p>
            <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">
              $301 Cost
            </p>
            <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">
              4000 Sales
            </p>
            <p className="text-gray-700 px-2 py-1 border border-gray-300 bg-gray-100">
              4% Cost vs Sales
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 min-h-screen">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full font12 table-fixed">
            <thead>
              <tr className="bg-gray-300 text-gray-900">
                <th className="p-4">Open Shifts</th>
                <th className="p-4">Mon 07/04</th>
                <th className="p-4">Tue 08/04</th>
                <th className="p-4">Wed 09/04</th>
                <th className="p-4">Thu 10/04</th>
                <th className="p-4">Fri 11/04</th>
                <th className="p-4">Sat 12/04</th>
                <th className="p-4">Sun 13/04</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <th className="p-4 flex items-center gap-2 font-semibold">
                  <SlCalender className="text-xl" /> Open Shifts
                </th>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
              </tr>
              {[
                { name: "Harish Dobila", hours: "0.50hrs", salary: "₹800.25" },
                { name: "Prudhvi Raj", hours: "0.40hrs", salary: "₹700.25" },
                { name: "Vishal Kattera", hours: "0.50hrs", salary: "₹800.25" },
                { name: "Sourav", hours: "0.50hrs", salary: "₹800.25" },
              ].map((person, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 font-semibold">
                    {person.name} <br />
                    <span className="text-sm text-gray-500">
                      {person.hours} {person.salary}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="bg-violet-400 text-white p-2 rounded-md">
                      1:30 PM - 2:15 PM <br />
                      <span className="text-xs">0.50 Hrs (15 Min)</span> <br />
                      <span className="text-xs">Lunch</span>
                    </div>
                  </td>
                  <td className="p-4"></td>
                  <td className="p-4 text-gray-600">
                    Unavailable <br /> 8:00 AM - 10:00 PM
                  </td>
                  <td className="p-4 text-gray-600">
                    Unavailable <br /> 8:00 AM - 10:00 PM
                  </td>
                  <td className="p-4"></td>
                  <td className="p-4 text-gray-600">
                    Unavailable <br /> 8:00 AM - 10:00 PM
                  </td>
                  <td className="p-4 text-gray-600">
                    Unavailable <br /> 8:00 AM - 10:00 PM
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-200 font-semibold">
                <td className="p-4">Total</td>
                <td className="p-4">2.17 Hrs</td>
                <td className="p-4">0.00 Hrs</td>
                <td className="p-4">0.00 Hrs</td>
                <td className="p-4">0.00 Hrs</td>
                <td className="p-4">0.00 Hrs</td>
                <td className="p-4">0.00 Hrs</td>
                <td className="p-4">0.00 Hrs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Rosters;
