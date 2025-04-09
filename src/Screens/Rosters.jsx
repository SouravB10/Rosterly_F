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

  const days = [
    "Mon 07/04",
    "Tue 08/04",
    "Wed 09/04",
    "Thu 10/04",
    "Fri 11/04",
    "Sat 12/04",
    "Sun 13/04",
  ];

  const data = [
    {
      time: "09:30 Am - 06:30 Pm",
      hrs: "8.25hrs(45m)",
      unavail: "Unavailable",
      icon: "+",
    },
  ];

  const employees = [
    { name: "Open Shifts", hours: "8.25", cost: null },
    { name: "Harish Dobila", hours: "0.00", cost: "₹0.00" },
    { name: "Sourav Behuria", hours: "4.00", cost: "₹840.00" },
    { name: "Vishal Kattera", hours: "0.00", cost: "₹0.00" },
  ];

  const hoursPerDay = ["12.25", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00"];
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-4">
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <select
            name="selectedLocation"
            className="input w-50 "
            // style={{
            //   backgroundImage:
            //     "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='black'><path stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/></svg>\")",
            //   backgroundRepeat: "no-repeat",
            //   backgroundPosition: "right 1rem center",
            //   backgroundSize: "1.25rem",
            // }}
            value={selectedLocation}
            onChange={handleLocation}
          >
            <option value="default">--Select Location--</option>
            <option value="Location 1">Location 1</option>
            <option value="Location 2">Location 2</option>
            <option value="Location 3">Location 3</option>
          </select>

          <div className="flex items-center justify-center bg-white rounded-lg text-sm font-semibold text-gray-900 w-full md:w-75 px-2">
            <FaAngleLeft
              className="text-violet-800 hover:text-violet-950"
              size={16}
              onClick={handlePrevWeek}
            />
            <p className="paragraphBold">{getWeekRange(currentWeek)}</p>
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

        <button className="buttonSuccess ">Publish</button>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-start gap-4 mt-6">
        <div className="card w-1/2">
          <h5 className="subHeading text-center">Mon, 7th Apr</h5>
          <div className="flex items-center justify-center gap-6 overflow-x-auto whitespace-nowrap">
            <p className="paragraph border p-1 border-gray-300 bg-gray-100">
              4 Shifts
            </p>
            <p className="paragraph border p-1 border-gray-300 bg-gray-100">
              1.05 Hours
            </p>
            <p className="paragraph border p-1 border-gray-300 bg-gray-100">
              $301 Cost
            </p>
            <p className="paragraph border p-1 border-gray-300 bg-gray-100">
              4000 Sales
            </p>
            <p className="paragraph border p-1 border-gray-300 bg-gray-100">
              4% Cost vs Sales
            </p>
          </div>
        </div>

        <div className="card w-1/2">
          <h5 className="subHeading text-center">7th Apr - 13th Apr</h5>
          <div className="flex items-center justify-center gap-6 overflow-x-auto whitespace-nowrap">
            <p className="paragraph border p-1 border-gray-300 bg-gray-100">
              4 Shifts
            </p>
            <p className="paragraph border p-1 border-gray-300 bg-gray-100">
              1.05 Hours
            </p>
            <p className="paragraph border p-1 border-gray-300 bg-gray-100">
              $301 Cost
            </p>
            <p className="paragraph border p-1 border-gray-300 bg-gray-100">
              4000 Sales
            </p>
            <p className="paragraph border p-1 border-gray-300 bg-gray-100">
              4% Cost vs Sales
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 min-h-screen">
        {/* <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full font12 table-fixed">
            <thead>
              <tr className="bg-gray-300 paragraphBold">
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
              <tr className="border-b paragraph">
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
                  <td className="p-4 paragraph">
                    {person.name} <br />
                    <span className="paragraphBold">
                      {person.hours} {person.salary}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="bg-violet-400 text-white p-2 paragraph">
                      1:30 PM - 2:15 PM <br />
                      <span className="text-xs">0.50 Hrs (15 Min)</span> <br />
                      <span className="text-xs">Lunch</span>
                    </div>
                  </td>
                  <td className="p-4"></td>
                  <td className="p-4 paragraph">
                    Unavailable <br /> 8:00 AM - 10:00 PM
                  </td>
                  <td className="p-4 paragraph">
                    Unavailable <br /> 8:00 AM - 10:00 PM
                  </td>
                  <td className="p-4"></td>
                  <td className="p-4 paragraph">
                    Unavailable <br /> 8:00 AM - 10:00 PM
                  </td>
                  <td className="p-4 paragraph">
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
        </div> */}
        <div className="overflow-x-auto  rounded-lg bg-white rounded shadow">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-theme">
              <tr className="h-15">
                <th className="w-48 p-2 text-left border-r subHeading"></th>
                {days.map((day, idx) => (
                  <th
                    key={idx}
                    className="p-2 text-center font-medium paragraphBoldWhite border-r"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {employees.map((emp, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2 border-r bg-gray-50">
                    <div className="paragraphBold">{emp.name}</div>
                    <div className="smallText">
                      {emp.hours} hrs {emp.cost ? `· ${emp.cost}` : ""}
                    </div>
                  </td>

                  {data.map((d, colIdx) => (
                    <td
                      key={colIdx}
                      className="text-center h-20 align-center p-2 border-r"
                    >
                      <div className="bg-green-400 text-white p-2 paragraph rounded">
                        {d.time}
                        <br />
                        <span className="text-xs">0.50 Hrs (15 Min)</span>{" "}
                        <br />
                        <span className="text-xs">Lunch</span>
                      </div>
                    </td>
                  ))}
                  {data.map((d, colIdx) => (
                    <td
                      key={colIdx}
                      className="text-center h-20 align-center p-2 border-r"
                    >
                      <button className="text-gray-400 hover:text-blue-500">
                        {d.icon}
                      </button>
                    </td>
                  ))}
                  {data.map((d, colIdx) => (
                    <td
                      key={colIdx}
                      className="text-center h-20 bg-gray-100 align-center p-2 border-r"
                    >
                      <button className="text-gray-400 hover:text-blue-500 ">
                        {d.unavail}
                      </button>
                    </td>
                  ))}
                  {data.map((d, colIdx) => (
                    <td
                      key={colIdx}
                      className="text-center h-20 align-center p-2 border-r"
                    >
                      <button className="text-gray-400 hover:text-blue-500">
                        {d.icon}
                      </button>
                    </td>
                  ))}
                  {data.map((d, colIdx) => (
                    <td
                      key={colIdx}
                      className="text-center h-20 align-center p-2 border-r"
                    >
                      <button className="text-gray-400 hover:text-blue-500">
                        {d.icon}
                      </button>
                    </td>
                  ))}
                  {data.map((d, colIdx) => (
                    <td
                      key={colIdx}
                      className="text-center h-20 align-center p-2 border-r"
                    >
                      <button className="text-gray-400 hover:text-blue-500">
                        {d.icon}
                      </button>
                    </td>
                  ))}
                  {data.map((d, colIdx) => (
                    <td
                      key={colIdx}
                      className="text-center h-20 align-center p-2 border-r"
                    >
                      <button className="text-gray-400 hover:text-blue-500">
                        {d.icon}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}

              {/* Add Employee Button */}
              <tr className="border-t h-15 bg-gray-100">
                <td className="p-2 border-r">
                  <button className="buttonSuccess">+ Employee</button>
                </td>
                {days.map((_, idx) => (
                  <td
                    key={idx}
                    className="p-2 text-center paragraphBold border-r"
                  >
                    {hoursPerDay[idx]} hrs
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Rosters;
