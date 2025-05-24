import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaFilePdf } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaAngleLeft, FaPlus } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { set } from "date-fns";

const Rosters = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("default");
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [stats, setStats] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShiftOpen, setIsShiftOpen] = useState(false);
  const [copiedShift, setCopiedShift] = useState(null);
  const [shiftsByEmployeeDay, setShiftsByEmployeeDay] = useState({});
  const [currentEmpId, setCurrentEmpId] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);
  const [locatedEmployees, setLocatedEmployees] = useState([]);
  const [description, setDescription] = useState("");
  const loginId = localStorage.getItem("id");

  const getWeekRange = (week) => {
    const startOfWeek = moment(week).day(3); // 3 = Wednesday
    const endOfWeek = startOfWeek.clone().add(6, "days");
    return `${startOfWeek.format("DD MMM")} - ${endOfWeek.format("DD MMM")}`;
  };

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => moment(prev).subtract(7, "days")); // subtract full week
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => moment(prev).add(7, "days")); // add full week
  };

  const getDaysForWeek = (week) => {
    const start = moment(week).day(3); // Start from Wednesday
    return Array.from({ length: 7 }, (_, i) =>
      start.clone().add(i, "days").format("ddd, DD/MM")
    );
  };

  const days = getDaysForWeek(currentWeek);


  const handleLocation = (e) => {
    const newLocationId = e.target.value;
    setSelectedLocation(newLocationId);

    const fetchEmployees = async (id) => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${baseURL}/locations/${id}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // locatedEmployees = response.data;
        setLocatedEmployees(response.data.data);
        console.log("Employees fetched:", response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    // Call with the new location id directly
    fetchEmployees(newLocationId);

    console.log("Selected Location:", newLocationId);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${baseURL}/locations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // const days = [
  //   "Mon 07/04",
  //   "Tue 08/04",
  //   "Wed 09/04",
  //   "Thu 10/04",
  //   "Fri 11/04",
  //   "Sat 12/04",
  //   "Sun 13/04",
  // ];

  const data = [
    {
      time: "09:30 Am - 06:30 Pm",
      hrs: "8.25hrs(45m)",
      unavail: "Unavailable",
      icon: "+",
    },
  ];

  const [shifts, setShifts] = useState(data);

  const employees = [
    { id: "unassigned", name: "Unassigned shifts", hours: "8.25", cost: null },
    { id: "harish", name: "Harish Dobila", hours: "5.00", cost: "$10.00" },
    { id: "sourav", name: "Sourav Behuria", hours: "4.00", cost: "$9.00" },
    { id: "vishal", name: "Vishal Kattera", hours: "8.00", cost: "$20.00" },
  ];

  const onShiftAdd = (empId, day) => {
    setCurrentEmpId(empId);
    setCurrentDay(day);
    setIsShiftOpen(true);
  };

  const handleStats = () => {
    setStats(!stats);
  };

  const generateTimeOptions = () => {
    let times = [];
    let hour = 0;
    let minute = 0;

    while (hour < 24) {
      let ampm = hour < 12 ? "AM" : "PM";
      let displayHour = hour % 12 || 12;
      let displayMinute = minute === 0 ? "00" : minute;
      times.push(`${displayHour}:${displayMinute} ${ampm}`);

      minute += 15;
      if (minute === 60) {
        minute = 0;
        hour++;
      }
    }

    return times;
  };

  const timeOptions = generateTimeOptions();
  const breakOptions = [0, 15, 30, 45, 60];
  const [start, setStart] = useState(timeOptions[0]);
  const [finish, setFinish] = useState(timeOptions[0]);
  const [breakTime, setBreakTime] = useState(breakOptions[0]);
  const hoursPerDay = ["12.25", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00"];

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const [sourceEmpId, sourceDay] = source.droppableId.split("-");
    const [destEmpId, destDay] = destination.droppableId.split("-");

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const sourceList = Array.from(
      (shiftsByEmployeeDay[sourceEmpId] &&
        shiftsByEmployeeDay[sourceEmpId][sourceDay]) ||
      []
    );

    const destList = Array.from(
      (shiftsByEmployeeDay[destEmpId] &&
        shiftsByEmployeeDay[destEmpId][destDay]) ||
      []
    );

    const [moved] = sourceList.splice(source.index, 1);
    const newShift = { ...moved, id: `${destEmpId}-${destDay}-${Date.now()}` };
    destList.splice(destination.index, 0, newShift);

    setShiftsByEmployeeDay((prev) => ({
      ...prev,
      [sourceEmpId]: {
        ...prev[sourceEmpId],
        [sourceDay]: sourceList,
      },
      [destEmpId]: {
        ...prev[destEmpId],
        [destDay]: destList,
      },
    }));
  };

  const handleCopy = (shift) => {
    setCopiedShift(shift);
  };

  const handlePaste = (empId, day) => {
    if (!copiedShift) return;
    const newShift = { ...copiedShift, id: `${empId}-${day}-${Date.now()}` };
    setShiftsByEmployeeDay((prev) => ({
      ...prev,
      [empId]: {
        ...prev[empId],
        [day]: [...(prev[empId]?.[day] || []), newShift],
      },
    }));
    setCopiedShift(null);
  };

  const handleShiftSave = (e) => {
    e.preventDefault();

    if (!currentEmpId || !currentDay || !start || !finish) return;

    const newShift = {
      id: `${currentEmpId}-${currentDay}-${Date.now()}`,
      time: `${start} - ${finish}`,
      breakTime,
      description,
    };

    setShiftsByEmployeeDay((prev) => ({
      ...prev,
      [currentEmpId]: {
        ...prev[currentEmpId],
        [currentDay]: [...(prev[currentEmpId]?.[currentDay] || []), newShift],
      },
    }));

    // Reset form and close modal
    setIsShiftOpen(false);
    setStart("");
    setFinish("");
    setBreakTime("");
    setDescription("");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-4 py-2">
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <select
            name="selectedLocation"
            className="input w-50 "
            value={selectedLocation}
            onChange={handleLocation}
          >
            <option value="">--Select Location--</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.location_name}
              </option>
            ))}
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
            <div
              className="group relative flex items-center justify-center cursor-pointer bg-white rounded-lg text-sm text-gray-900 w-10 px-2"
              onClick={handleStats}
            >
              <IoStatsChartSharp className="icon50" />
              <span className="absolute top-full mt-1 hidden group-hover:flex bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                Statistics
              </span>
            </div>

            <div className="group relative flex items-center justify-center cursor-pointer bg-white rounded-lg text-sm text-gray-900 w-10 px-2">
              <FaFilePdf className="icon50" />
              <span className="absolute top-full mt-1 hidden group-hover:flex bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                PDF
              </span>
            </div>
          </div>
        </div>

        <button className="buttonSuccess ">Publish</button>
      </div>
      {stats && (
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
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 bgTable rounded ">
              <tr>
                <th className="w-48 p-2 text-left border border-gray-300">
                  Employee
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="p-2 text-center border border-gray-300"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {locatedEmployees.map((emp) => (
                <tr key={emp.id} className="border border-gray-300">
                  {/* Employee Info */}
                  <td className="p-2 bg-white">
                    <div className="font-semibold">{emp.firstName}{" "}{emp.lastName}</div>
                    <div className="text-xs text-gray-500">
                      {emp.hours} hrs {emp.cost ? `· ${emp.cost}` : ""}
                    </div>
                  </td>

                  {/* Days Column with DragDrop */}
                  {days.map((day) => (
                    <Droppable
                      key={`${emp.id}-${day}`}
                      droppableId={`${emp.id}-${day}`}
                    >
                      {(provided) => (
                        <td
                          className="p-2 border border-gray-300"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <div className="space-y-2 ">
                            {(shiftsByEmployeeDay[emp.id]?.[day] || []).map(
                              (shift, index) => (
                                <Draggable
                                  key={shift.id}
                                  draggableId={shift.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      className="bgTable paragraph text-white p-2 rounded flex justify-between items-center cursor-move"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <span>{shift.time}</span>
                                      {/* {shift.description && <span className="text-xs italic ml-2">{shift.description}</span>} */}
                                      <button
                                        className="text-xs bg-white text-green-700 px-1 rounded"
                                        onClick={() => handleCopy(shift)}
                                        title="Copy Shift"
                                      >
                                        +
                                      </button>
                                    </div>
                                  )}
                                </Draggable>
                              )
                            )}
                            {provided.placeholder}
                          </div>

                          {/* Paste Button */}
                          {copiedShift && (
                            <button
                              onClick={() => handlePaste(emp.id, day)}
                              className="text-xs mt-2 text-blue-500 underline"
                            >
                              Paste
                            </button>
                          )}

                          {/* Add Shift Button */}
                          {!shiftsByEmployeeDay[emp.id]?.[day]?.length && (
                            <div className="text-center">
                              <button
                                onClick={() => onShiftAdd(emp.id, day)}
                                className="text-gray-500 hover:text-green-700"
                                title="Add Shift"
                              >
                                <FaPlus size={12} />
                              </button>
                            </div>
                          )}

                        </td>
                      )}
                    </Droppable>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DragDropContext>

      {/* <div className="mt-8 min-h-screen">
        <div className="overflow-x-auto   ">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bgTable">
              <tr className=" border border-gray-300">
                <th className="w-48 p-2 text-left border border-gray-300 subHeading"></th>
                {days.map((day, idx) => (
                  <th
                    key={idx}
                    className="p-2 text-center text-gray-800 font-bold border border-gray-300"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {employees.map((emp, idx) => (
                <tr key={idx} className="border border-gray-300">
                  <td className="p-2 border border-gray-300 bg-gray-50">
                    <div className="paragraphBold">{emp.name}</div>
                    <div className="smallText">
                      {emp.hours} hrs {emp.cost ? `· ${emp.cost}` : ""}
                    </div>
                  </td>

                  {data.map((d, colIdx) => (
                    <td
                      key={colIdx}
                      className="text-center h-20 align-center p-2 border border-gray-300"
                    >
                      <div className="bgSucces text-white p-2 paragraph rounded">
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
                      className="text-center h-20 align-center p-2 border border-gray-300 "
                    >
                      <button
                        className="text-gray-400 hover:text-blue-500 font-bold"
                        onClick={() => setIsShiftOpen(true)}
                      >
                        <FaPlus
                          className=" hover:text-violet-950 cursor bg-rosterGreen text-white rounded-md p-1"
                          size={20}
                        />
                      </button>
                    </td>
                  ))}
                  {data.map((d, colIdx) => (
                    <td
                      key={colIdx}
                      className="text-center h-20 bg-gray-100 align-center p-2 border border-gray-300"
                    >
                      <button className="text-gray-500 paragraph hover:text-blue-500 ">
                        {d.unavail}
                      </button>
                    </td>
                  ))}
                  {data.map((d, colIdx) => (
                    <td
                      key={colIdx}
                      className="text-center h-20 align-center p-2 border border-gray-300"
                    >
                      <button
                        className="text-gray-400 hover:text-blue-500 font-bold"
                        onClick={() => setIsShiftOpen(true)}
                      >
                        <FaPlus
                          className=" hover:text-violet-950 cursor bg-rosterGreen text-white rounded-md p-1"
                          size={20}
                        />
                      </button>
                    </td>
                  ))}
                  {data.map((d, colIdx) => (
                    <td
                      key={colIdx}
                      className="text-center h-20 align-center p-2 border border-gray-300"
                    >
                      <button
                        className="text-gray-400 hover:text-blue-500 font-bold"
                        onClick={() => setIsShiftOpen(true)}
                      >
                        <FaPlus
                          className=" hover:text-violet-950 cursor bg-rosterGreen text-white rounded-md p-1"
                          size={20}
                        />
                      </button>
                    </td>
                  ))}
                  {data.map((d, colIdx) => (
                    <td
                      key={colIdx}
                      className="text-center h-20 align-center p-2 border border-gray-300"
                    >
                      <button
                        className="text-gray-400 hover:text-blue-500 font-bold"
                        onClick={() => setIsShiftOpen(true)}
                      >
                        <FaPlus
                          className=" hover:text-violet-950 cursor bg-rosterGreen text-white rounded-md p-1"
                          size={20}
                        />
                      </button>
                    </td>
                  ))}
                  {data.map((d, colIdx) => (
                    <td
                      key={colIdx}
                      className="text-center h-20 align-center p-2 border border-gray-300"
                    >
                      <button
                        className="text-gray-400 hover:text-blue-500 font-bold"
                        onClick={() => setIsShiftOpen(true)}
                      >
                        <FaPlus
                          className=" hover:text-violet-950 cursor bg-rosterGreen text-white rounded-md p-1"
                          size={20}
                        />
                      </button>
                    </td>
                  ))}
                </tr>
              ))}

              <tr className="border border-gray-300 h-15 bg-gray-100">
                <td className="p-2 border border-gray-300">
                  <button
                    className="buttonSuccess"
                    onClick={() => setIsModalOpen(true)}
                  >
                    + Employee
                  </button>
                </td>
                {days.map((_, idx) => (
                  <td
                    key={idx}
                    className="p-2 text-center paragraphBold border border-gray-300"
                  >
                    {hoursPerDay[idx]} hrs
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50 rounded-lg"
      >
        <div className="fixed inset-0 bg-gray-700/70"></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-gray-200 rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-gray-800 rounded-t-lg text-white px-4 py-3 flex justify-between items-center">
              <Dialog.Title className="heading">Add Employee</Dialog.Title>
              <button
                className="text-white text-2xl font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form className=" p-6 space-y-3">
              <div>
                <p className="paragraph text-gray-500">
                  {" "}
                  An employee from any location can be added to this roster.
                  They will be displayed across all pages for this week only.
                  For a permanent addition to this location, change the
                  employee's profile.
                </p>
              </div>
              <div className="mt-5">
                <select name="selectedEmployee" className="inputFull">
                  <option value="default">--Select Employee--</option>
                  <option value="Location 1">Vishal</option>
                  <option value="Location 2">Harish</option>
                  <option value="Location 3">Anita</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="buttonGrey"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="buttonSuccess">
                  Save
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog
        open={isShiftOpen}
        onClose={() => setIsShiftOpen(false)}
        className="relative z-50 rounded-lg"
      >
        <div className="fixed inset-0 bg-gray-700/70"></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-gray-200 rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-gray-800 rounded-t-lg text-white px-4 py-3 flex justify-between items-center">
              <Dialog.Title className="heading">Add Open Shift</Dialog.Title>
              <button
                className="text-white text-2xl font-bold cursor"
                onClick={() => setIsShiftOpen(false)}
              >
                ×
              </button>
            </div>
            <form className="card p-6 space-y-3" onSubmit={handleShiftSave}>
              <div className="">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {/* Start Time */}
                  <div className="flex flex-col">
                    <label className="paragraphBold">Start</label>
                    <select
                      className="input paragraph"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                    >
                      {timeOptions.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Finish Time */}
                  <div className="flex flex-col">
                    <label className="paragraphBold">Finish</label>
                    <select
                      className="input paragraph"
                      value={finish}
                      onChange={(e) => setFinish(e.target.value)}
                    >
                      {timeOptions.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Break Time */}
                  <div className="flex flex-col">
                    <label className="paragraphBold">Break</label>
                    <select
                      className="input paragraph"
                      value={breakTime}
                      onChange={(e) => setBreakTime(e.target.value)}
                    >
                      {breakOptions.map((breakOption, index) => (
                        <option key={index} value={breakOption}>
                          {breakOption} min
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description Input */}
                <label className="paragraphBold">Description:</label>
                <textarea
                  className=" textarea paragraph"
                  rows="3"
                  placeholder="Enter description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="buttonGrey"
                  onClick={() => setIsShiftOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="buttonSuccess">
                  Save
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Rosters;
