import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaEdit, FaFilePdf, FaTrash } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaAngleLeft, FaPlus, FaRegCopy } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { set } from "date-fns";
import { HiTrash } from "react-icons/hi2";

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
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedRosters, setPublishedRosters] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [shiftToEdit, setShiftToEdit] = useState(null);
  const [rosterWeekId, setRosterWeekId] = useState(null);
  const [weekId, setWeekId] = useState("");

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

  useEffect(() => {
    if (selectedLocation) {
      postWeek();
    }
  }, [currentWeek, selectedLocation]);

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
        console.log("Employees fetched:", response.data.data);
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


  const onShiftAdd = (empId, empfirstName, day) => {
    setCurrentEmpId(empId);
    setCurrentDay(day);
    setIsShiftOpen(true);
    setFirstName(empfirstName);
  };

  const onShiftEdit = (empId, empFirstName, day, shift) => {
    setCurrentEmpId(empId);
    setCurrentDay(day);
    setFirstName(empFirstName);
    setStart(shift.time.split(" - ")[0]);
    setFinish(shift.time.split(" - ")[1]);
    setBreakTime(shift.breakTime);
    setDescription(shift.description);
    setShiftToEdit(shift);
    setIsShiftOpen(true);
  };

  useEffect(() => {
    if (shiftToEdit) {
      setStart(shiftToEdit.time.split(" - ")[0]);
      setFinish(shiftToEdit.time.split(" - ")[1]);
      setBreakTime(shiftToEdit.breakTime);
      setDescription(shiftToEdit.description || "");

    } else {
      setStart("");
      setFinish("");
      setBreakTime(null);
      setDescription("");
    }
  }, [shiftToEdit]);


  const handleStats = () => {
    setStats(!stats);
  };

  const generateTimeOptions = () => {
    let times = ["--"];
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
  const breakOptions = [null, 0, 15, 30, 45, 60];
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


  // Handle saving the shift
  const handleShiftSave = (e) => {
    e.preventDefault();

    // if (!currentEmpId || !currentDay || !start || !finish) {
    //   alert("Please fill all fields before saving the shift.");
    //   return;
    // }

    const isEditing = !!shiftToEdit;

    const newShift = {
      id: isEditing ? shiftToEdit.id : `${currentEmpId}-${currentDay}-${Date.now()}`,
      time: `${start} - ${finish}`,
      breakTime,
      description,
      user_id: currentEmpId,
      date: currentDay
    };

    setShiftsByEmployeeDay((prev) => {
      const currentEmpData = prev[currentEmpId] || {};
      const currentDayShifts = currentEmpData[currentDay] || [];
      const updatedShifts = isEditing
        ? currentDayShifts.map((shift) =>
          shift.id === shiftToEdit.id ? newShift : shift
        )
        : [...currentDayShifts, newShift];

      return {
        ...prev,
        [currentEmpId]: {
          ...currentEmpData,
          [currentDay]: updatedShifts,
        },
      };
    });

    console.log("Saving shift for:", currentEmpId, currentDay, newShift);
    // Reset form and close modal
    setIsShiftOpen(false);
    setStart("");
    setFinish("");
    setBreakTime("");
    setDescription("");
    setShiftToEdit(null);
  };


  //To publish the roster
  const handlePublish = async () => {
    const token = localStorage.getItem("token");

    if (!selectedLocation) {
      alert("Please select a location before publishing the roster.");
      return;
    }

    const startOfWeek = moment(currentWeek).day(3); // Wednesday
    const endOfWeek = startOfWeek.clone().add(6, "days"); // Tuesday next week

    // Check if already published
    const alreadyPublished = publishedRosters.some(
      (r) => r.location_id === selectedLocation && r.days === days
    );

    if (alreadyPublished) {
      alert("This roster has already been published for the selected week and location.");
      return;
    }

    const formattedShifts = [];

    Object.entries(shiftsByEmployeeDay).forEach(([empId, daysObj]) => {
      Object.entries(daysObj).forEach(([day, shifts]) => {
        shifts.forEach((shift) => {
          formattedShifts.push({
            shiftId: shift.id,
            user_id: empId,
            date: moment(day, "ddd, DD/MM").format("YYYY-MM-DD"),
            startTime: shift.time.split(" - ")[0],
            endTime: shift.time.split(" - ")[1],
            breakTime: shift.breakTime,
            description: shift.description,
            hrsRate: shift.hrsRate || "0.00",
            percentRate: shift.percentRate || "0.00",
            totalPay: shift.totalPay || "0.00",
            status: "active",
            location_id: selectedLocation,
          });
        });
      });
    });

    if (formattedShifts.length === 0) {
      alert("No shifts to publish.");
      return;
    }

    setIsPublishing(true);
    console.log("published", formattedShifts);
    try {
      const response = await axios.post(
        `${baseURL}/rosterStore`,
        {
          rWeekStartDate: startOfWeek.format("YYYY-MM-DD"),
          rWeekEndDate: endOfWeek.format("YYYY-MM-DD"),
          location_id: selectedLocation,
          rosters: formattedShifts,
          rosterWeekId: weekId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Roster published successfully!");
      console.log("Publish response:", response.data);
      setRosterWeekId(response.data.roster_week_id);
      // Add to published list
      setPublishedRosters((prev) => [
        ...prev,
        { location_id: selectedLocation, days },
      ]);
      console.log("days", days);

      fetchRoster();
    } catch (error) {
      console.error("Error publishing roster:", error);
      alert("Failed to publish roster. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const fetchRoster = async () => {
    try {
      const response = await axios.get(`${baseURL}/rosterfetch/${selectedLocation}/${loginId}`);
      const rosterData = response.data.data;
      console.log("Roster data fetched:", rosterData);

      const organizedShifts = {};

      rosterData.forEach((shift) => {
        const empId = shift.user_id;
        const day = moment(shift.date).format("ddd, DD/MM");

        const formattedShift = {
          id: shift.id.toString(),
          time: `${shift.startTime} - ${shift.endTime}`,
          breakTime: shift.breakTime,
          totalPay: shift.totalPay,
          hrsRate: shift.hrsRate,
          percentRate: shift.percentRate,
          description: shift.description,
          location_id: shift.location_id,
        };

        if (!organizedShifts[empId]) {
          organizedShifts[empId] = {};
        }

        if (!organizedShifts[empId][day]) {
          organizedShifts[empId][day] = [];
        }

        organizedShifts[empId][day].push(formattedShift);
      });

      setShiftsByEmployeeDay(organizedShifts);
      console.log("rosterdta", rosterData)

    } catch (error) {
      console.error("Failed to fetch roster:", error);
    }
  };

  useEffect(() => {
    if (selectedLocation && currentWeek) {
      fetchRoster();
    }
  }, [selectedLocation, currentWeek]);

  const handleTogglePublish = async () => {
    if (isPublished == 1) {
      // Unpublishing
      setIsPublished(false);

      try{
        const response = await axios.post(`${baseURL}/pubUnpub/${weekId}`);
        console.log(response);
      }catch(e){
        console.log("Failed to unpublish");
      }

      // Optional: Call unpublish API here
    } else {
      // Publishing
      setIsPublished(true);
      handlePublish();
    }
  };

  const handleModalClose = () => {
    setIsShiftOpen(false);
    setShiftToEdit(null);
    setCurrentEmpId(null);
    setCurrentDay(null);
    setFirstName("");
    setStart("");
    setFinish("");
    setBreakTime(null);
    setDescription("");
  };

  const postWeek = async () => {
    const token = localStorage.getItem("token");
    const startOfWeek = moment(currentWeek).day(3);
    const endOfWeek = startOfWeek.clone().add(6, "days");
    try {
      const response = await axios.post(
        `${baseURL}/rosterWeekftch`,
        {
          rWeekStartDate: startOfWeek.format("YYYY-MM-DD"),
          rWeekEndDate: endOfWeek.format("YYYY-MM-DD"),
          location_id: selectedLocation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post week response:", response.data);
      setWeekId(response.data.weekId);
      setIsPublished(response.data.isPublished);
      console.log(weekId);

    } catch (error) {
      console.error("Error posting week:", error);
    }
  }

  const calculateTotalHoursDisplay = (startTime, endTime, breakMinutes) => {
    if (!startTime || !endTime || startTime === '--' || endTime === '--') return '';

    const to24Hour = (timeStr) => {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      if (modifier === 'PM' && hours !== 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      return { hours, minutes };
    };

    const start = to24Hour(startTime);
    const end = to24Hour(endTime);

    const startDate = new Date(0, 0, 0, start.hours, start.minutes);
    const endDate = new Date(0, 0, 0, end.hours, end.minutes);

    let diff = (endDate - startDate) / (1000 * 60); // total minutes
    if (diff < 0) diff += 1440; // overnight shift fix

    const breakMins = Number(breakMinutes) || 0;
    diff -= breakMins;

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours}h ${minutes}m (${breakMins} min break)`;
  };

  const calculateShiftDuration = (timeRange, breakTime) => {
    if (!timeRange) return '';

    const [startTime, endTime] = timeRange.split(' - ');
    if (!startTime || !endTime) return '';

    const to24Hour = (timeStr) => {
      const [time, modifier] = timeStr.trim().split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      if (modifier === 'PM' && hours !== 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      return { hours, minutes };
    };

    const start = to24Hour(startTime);
    const end = to24Hour(endTime);

    const startDate = new Date(0, 0, 0, start.hours, start.minutes);
    const endDate = new Date(0, 0, 0, end.hours, end.minutes);

    let diff = (endDate - startDate) / (1000 * 60); // in minutes
    if (diff < 0) diff += 1440; // handle overnight shift

    const breakMins = Number(breakTime) || 0;
    diff -= breakMins;

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours}h ${minutes}m (${breakMins} min break)`;
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

        <button
          className={`${isPublished ? "buttonDanger" : "buttonSuccess"}`}
          onClick={handleTogglePublish}
          disabled={isPublishing}
        >
          {isPublishing ? "Publishing..." : isPublished ? "Unpublish" : "Publish"}
        </button>

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
          <table className="min-w-full border border-gray-300 text-sm mb-6 mt-2">
            <thead className="bg-gray-100 bgTable rounded ">
              <tr>
                <th className="w-48 p-2 text-white bgTable1 text-left border border-gray-300">
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
            {locatedEmployees.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan={days.length + 1} className="p-2 text-center">
                    Select a location to view employees.
                  </td>
                </tr>
              </tbody>
            )}
            <tbody>
              {locatedEmployees.map((emp) => (
                <tr key={emp.user.id} className="border border-gray-300">
                  {/* Employee Info */}
                  <td className="p-2 bg-white">
                    <div className="font-semibold">{emp.user.firstName}{" "}{emp.user.lastName}</div>
                    <div className="text-xs text-gray-500">
                      {/* {emp.hours} hrs {emp.cost ? `· ${emp.cost}` : ""} */}
                    </div>
                  </td>

                  {/* Days Column with DragDrop */}
                  {days.map((day) => (
                    <Droppable
                      key={`${emp.user.id}-${day}`}
                      droppableId={`${emp.user.id}-${day}`}
                    >
                      {(provided) => (
                        <td
                          className="p-2 border border-gray-300"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <div className="space-y-2 ">
                            {(shiftsByEmployeeDay[emp.user.id]?.[day] || []).map(
                              (shift, index) => (
                                <Draggable
                                  key={shift.id}
                                  draggableId={shift.id}
                                  index={index}
                                  isDragDisabled={isPublished}
                                >
                                  {(provided) => (
                                    <div
                                      className="bgTable paragraph text-white p-2 rounded flex justify-between items-center cursor-move group"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="flex flex-col items-center justify-end w-full">
                                        <span>{shift.time}</span>
                                        <span className="text-xs text-gray-200">
                                          {calculateShiftDuration(shift.time, shift.breakTime)}
                                        </span>
                                        {shift.description && <span className="paragraphThin italic ml-2">{shift.description}</span>}

                                      </div>

                                      <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <FaRegCopy className="text-md  text-green-900  rounded cursor-pointer"
                                          onClick={() => handleCopy(shift)}
                                          title="Copy Shift" />
                                        <FaEdit className="text-lg  text-black px-1 rounded cursor-pointer" onClick={() => onShiftEdit(emp.user.id, emp.user.firstName, day, shift)}
                                          title="Edit Shift" />
                                        <HiTrash className="text-xl  text-red-600 px-1 rounded cursor-pointer"
                                          title="Delete Shift" />
                                      </div>

                                    </div>
                                  )}
                                </Draggable>
                              )
                            )}
                            {provided.placeholder}
                          </div>

                          {/* Paste Button */}
                          {copiedShift && !(shiftsByEmployeeDay[emp.user.id]?.[day]?.length > 0) && !(isPublished) && (
                            <button
                              onClick={() => handlePaste(emp.user.id, day)}
                              className="text-xs mt-2 text-gray-500 underline cursor-pointer hover:text-green-800"
                            >
                              Paste
                            </button>
                          )}

                          {/* Add Shift Button */}
                          {!(shiftsByEmployeeDay[emp.user.id]?.[day]?.length > 0) && !(isPublished) && (
                            <div className="text-center">
                              <button
                                onClick={() => onShiftAdd(emp.user.id, emp.user.firstName, day)}
                                className="text-gray-500 hover:text-green-700 cursor-pointer p-1"
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
        onClose={handleModalClose}
        className="relative z-50 rounded-lg"
      >
        <div className="fixed inset-0 bg-gray-700/70"></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-gray-200 rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-gray-800 rounded-t-lg text-white px-4 py-3 flex justify-between items-center">
              <Dialog.Title className="heading">Add Shift for : "{firstName}"</Dialog.Title>
              <button
                className="text-white text-2xl font-bold cursor"
                onClick={handleModalClose}
              >
                ×
              </button>
            </div>
            <form className="card p-6 space-y-3" onSubmit={handleShiftSave}>
              <div className="">
                <div className="grid grid-cols-3 gap-4">
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
                      value={breakTime == null ? "" : breakTime}
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
                {!calculateTotalHoursDisplay(start, finish, breakTime) ?
                  <div className="text-red-600 text-xs mb-2 mt-1">
                    *Please select valid start and finish times.
                  </div> :
                  <div className="mb-2 ">
                    <span className="text-xs mt-1 text-gray-700">
                      Total Hours: {calculateTotalHoursDisplay(start, finish, breakTime)}
                    </span>
                  </div>
                }


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
                  onClick={handleModalClose}
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
