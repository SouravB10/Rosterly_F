import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import FeedbackModal from "../Component/FeedbackModal"; // ✅ Import here
import GoogleMapSelector from "../Component/GoogleMap";


const Location = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [selectLocation, setSelectLocation] = useState("");
  const [employees, setEmployees] = useState("");
  const [employeeName, setEmployeeName] = useState([]);
  const [staff, setStaff] = useState([]);
  const [activeTab, setActiveTab] = useState("general");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [locationId, setLocationId] = useState("");
  const [addlocationName, setAddlocationName] = useState("");
  const [addaddress, setAddaddress] = useState("");
  const [sales, setSales] = useState("");
  const [salesId, setSalesId] = useState("");

  const [locations, setLocations] = useState([]);
  const [updatelocationName, setUpdatelocationName] = useState("");
  const [updateaddress, setUpdateaddress] = useState("");

  const [salesData, setSalesData] = useState({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  });
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [addlatitude, setAddlatitude] = useState("");
  const [addlongitude, setAddlongitude] = useState("");
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState("");
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    console.log("user ID:", id);
  }, []);


  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${baseURL}/locations`, { headers });
        console.log("Locations:", response.data);
        setLocations(response.data.data || response.data);
      } catch (error) {
        console.error("Failed to fetch locations", error);
      }
    };

    // Employee List Start here
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const employeeList = await axios.get(`${baseURL}/users/login/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployeeName(employeeList.data.data);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };

    fetchLocations();
    // fetchSales();
    if (id) fetchEmployees();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!locationName.trim()) {
      newErrors.locationName = "Location Name is required";
    }
    if (employees.length === 0) {
      newErrors.employees = "At least one employee must be selected";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      setEmployees((prev) => [...prev, e.target.value]);
    } else {
      setEmployees((prev) => prev.filter((emp) => emp !== e.target.value));
    }
  };

  const handleAllchecked = (e) => {
    const checked = e.target.checked;
    if (checked) {
      // Select all employee IDs
      const allIds = employeeName.map((emp) => emp.id.toString());
      setEmployees(allIds);
    } else {
      setEmployees([]);
    }
  };

  // Check if all are selected
  const allSelected =
    employeeName.length > 0 && employees.length === employeeName.length;

  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // proceed with form submission
      console.log({ locationName, employees });
      alert("Form submitted!");
    }
  };

  // Location Handling Start here
  const getLocation = async () => {
    // alert(selectLocation);
    if (!selectLocation) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${baseURL}/locations/${selectLocation}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data || response.data;
      const locId = data.id;
      console.log("Fetched Location:", data);
      setLocationId(locId);
      setLocationName(data.location_name || "");
      setSales(data.sales?.toString() || "");
      // setLatitude(data.latitude?.toString() || "");
      // setLongitude(data.longitude?.toString() || "");
      setAddress(data.address || "");

      // Sales data based on location ID
      const Salesresponse = await axios.get(
        `${baseURL}/locationSales/location/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Sales data:", Salesresponse.data);
      const salesId = Salesresponse.data.id;
      setSalesId(salesId);
      setSalesData({
        Monday: Salesresponse.data.monday || 0,
        Tuesday: Salesresponse.data.tuesday || 0,
        Wednesday: Salesresponse.data.wednesday || 0,
        Thursday: Salesresponse.data.thursday || 0,
        Friday: Salesresponse.data.friday || 0,
        Saturday: Salesresponse.data.saturday || 0,
        Sunday: Salesresponse.data.sunday || 0,
      });

      const Staffresponse = await axios.get(
        `${baseURL}/locations/${data.id}/role/3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStaff(Staffresponse.data.data);
      console.log("Staff data:", Staffresponse.data.data);
      console.log("saleId:", salesId);
    } catch (error) {
      console.error("Failed to fetch location", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!locationName.trim())
      newErrors.locationName = "Location name is required.";
    if (!sales.trim() || isNaN(sales))
      newErrors.sales = "Enter a valid number for sales.";
    if (!latitude.trim() || isNaN(latitude))
      newErrors.latitude = "Enter a valid latitude.";
    if (!longitude.trim() || isNaN(longitude))
      newErrors.longitude = "Enter a valid longitude.";
    // if (!address.trim()) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          `${baseURL}/locations`,
          {
            location_name: addlocationName,
            sales: parseFloat(sales),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            address: addaddress,
            created_by: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Location added successfully", response.data);

        setAddlocationName("");
        setSales("");
        setLatitude("");
        setLongitude("");
        setAddaddress("");
        setErrors({});
        // Close modal if applicable
        setIsModalOpen(false);

        // Show success feedback
        setFeedbackMessage(response.data?.message || "Location added successfully.");
        setFeedbackModalOpen(true);
      } catch (error) {
        console.error("API Error:", error);
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
        setFeedbackMessage(
          error.response?.data?.message || "Failed to add location. Please try again."
        );
        setFeedbackModalOpen(true);
      }
    }
  };

  const handleCloseModal = () => {
    setAddlocationName("");
    setSales("");
    setLatitude("");
    setLongitude("");
    setAddaddress("");
    setErrors({});
    setIsModalOpen(false);
  };

  const handleLocation = (e) => {
    setSelectLocation(e.target.value);
  };

  const updateLocation = async () => {
    if (!selectLocation) return;

    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${baseURL}/locations/${selectLocation}`,
        {
          location_name: locationName,
          sales: parseFloat(sales),
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Location updated successfully", response.data);
      // Show success feedback
      setFeedbackMessage(response.data?.message || "Location updated successfully.");
      setFeedbackModalOpen(true);

      const updatedLocations = await axios.get(`${baseURL}/locations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocations(updatedLocations.data.data || updatedLocations.data);

      const updatedLocation = await axios.get(
        `${baseURL}/locations/${selectLocation}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(
        "Verified updated location:",
        updatedLocation.data.data || updatedLocation.data
      );
    } catch (error) {
      console.error("Update error:", error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const updateSales = async () => {
    if (!salesId) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${baseURL}/locationSales/${salesId}`,
        {
          monday: salesData.Monday,
          tuesday: salesData.Tuesday,
          wednesday: salesData.Wednesday,
          thursday: salesData.Thursday,
          friday: salesData.Friday,
          saturday: salesData.Saturday,
          sunday: salesData.Sunday,
          updated_by: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Sales updated successfully", response.data);
      setFeedbackMessage(response.data?.message || "Sales Updated successfully");
      setFeedbackModalOpen(true);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className=" py-2">
      <div className="">
        <div className="col-span-3">
          <h6 className="heading">By Location</h6>

          <div className="bg-gray-200 p-4 borderRadius10 mt-5">
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
              <div className="flex md:flex-row gap-4">
                <select
                  className="input w-full md:w-auto"
                  onChange={handleLocation}
                  value={selectLocation}
                >
                  <option value="">-- Select location --</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.location_name}
                    </option>
                  ))}
                </select>

                <button
                  className="buttonSuccess w-full md:w-auto"
                  onClick={getLocation}
                >
                  Get Data
                </button>
              </div>
              {(activeTab === "general" || activeTab === "Sales") && (
                <button
                  className="buttonTheme w-full md:w-auto"
                  title="Add Location"
                  onClick={() => setIsModalOpen(true)}
                >
                  + Location
                </button>
              )}
              {activeTab === "Employees" && (
                <button
                  className="buttonTheme w-full md:w-auto"
                  title="Add Location"
                  onClick={() => setIsEmployeeModalOpen(true)}
                >
                  + Employee
                </button>
              )}
            </div>

            <div className="subHeading flex  md:flex-row gap-6 mb-6">
              {["general", "Sales", "Employees"].map((tab) => (
                <label key={tab} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tabOption"
                    value={tab}
                    checked={activeTab === tab}
                    onChange={() => setActiveTab(tab)}
                    className="form-radio text-purple-600"
                  />
                  <span className="text-sm font-semibold text-slate-900 capitalize">
                    {tab}
                  </span>
                </label>
              ))}
            </div>

            <div className="space-y-6">
              {activeTab === "general" && (
                <div className="space-y-4">
                  <div className="card flex flex-col md:flex-row justify-between gap-4">
                    <div className="w-full">
                      <h4 className="subHeading">Location Name</h4>
                      <p className="paragraphThin">
                        What you normally refer to the roster location as. For
                        example, Brisbane CBD.
                      </p>
                    </div>
                    <div className="w-full flex justify-end">
                      {/* <input
                        type="text"
                        placeholder="Main Branch"
                        className="input border border-gray-300 w-full md:w-auto"
                      /> */}
                      <input
                        type="text"
                        placeholder="Main Branch"
                        className="input border border-gray-300 w-full md:w-auto"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="card flex flex-col md:flex-row justify-between gap-4">
                    <div className="w-full">
                      <h4 className="subHeading">Address</h4>
                      <p className="paragraphThin">
                        The address of the location. This is optional.
                      </p>
                    </div>
                    <div className="w-full flex justify-end">
                      {/* <input
                        type="text"
                        placeholder="Main Branch"
                        className="input border border-gray-300 w-full md:w-auto"
                      /> */}
                      <input
                        type="text"
                        placeholder="Main Branch"
                        className="input border border-gray-300 w-full md:w-auto"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="buttonTheme w-full md:w-auto"
                      onClick={updateLocation}
                      disabled={!selectLocation}
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "Sales" && (
                <div className="card p-6 rounded-xl">
                  <h2 className="heading">Expected Average Sales</h2>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2"
                    >
                      <label className="font-medium text-sm text-black w-full md:w-auto">
                        {day}
                      </label>
                      <input
                        type="text"
                        value={salesData[day] || 0}
                        onChange={(e) =>
                          setSalesData((prev) => ({
                            ...prev,
                            [day]: e.target.value,
                          }))
                        }
                        className="w-full md:w-1/3 px-4 py-2 text-sm border bg-white border-gray-300 rounded-md focus:outline-none"
                      />
                    </div>
                  ))}
                  {/* <div className="flex justify-end mt-6">
                    <button className="buttonSuccess w-full md:w-auto">Update</button>
                  </div> */}
                  <div className="flex justify-end">
                    <button
                      className="buttonTheme w-full md:w-auto"
                      onClick={updateSales}
                      disabled={!selectLocation}
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "Employees" && (
                <div className="card rounded-xl p-6 space-y-4">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                    <div>
                      <h4 className="heading">Employees</h4>
                      <p className="text-sm text-gray-600">
                        Employees Assigned to Office
                        <br />
                        <span className="text-xs text-gray-500">
                          Below is a list of employees assigned to Office.
                        </span>
                      </p>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white rounded-lg border border-gray-300 w-full md:w-auto">
                      <div className="flex flex-row items-center px-3">
                        <FaSearch className="text-indigo-950" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="input w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Scrollable List */}
                  <div className="bg-white rounded-md shadow-inner p-4 max-h-[250px] overflow-y-auto space-y-3">
                    {staff.map((sf) => (
                      <div
                        key={sf.id}
                        className="flex flex-col md:flex-row items-center justify-between px-3 py-2 border-b border-gray-100 hover:bg-gray-50 rounded-md transition gap-2"
                      >
                        <div className="flex items-center gap-3 w-full md:w-auto">
                          <button className="bg-red-500 text-white w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-600">
                            ×
                          </button>

                          <span className="text-sm font-medium text-gray-800">
                            {sf.firstName} {sf.lastName}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* {activeTab === "Status" && (
                          <p className="text-slate-500 font-light">
                            Status tab content here.
                          </p>
                          )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Location Model starts */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50 rounded-lg"
      >
        <div className="fixed inset-0 bg-gray-700/70"></div>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
          <Dialog.Panel className="bg-gray-200 rounded-lg shadow-lg max-w-4xl w-full mx-4">
            <div className="bg-gray-800 rounded-t-lg text-white px-4 py-3 flex justify-between items-center">
              <Dialog.Title className="heading">Add Location</Dialog.Title>
              <button
                className="text-white font-bold text-2xl"
                onClick={handleCloseModal}
              >
                ×
              </button>
            </div>
            <form className="p-6" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Column - Form */}
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="paragraphBold block mb-1">Location Name</label>
                    <input
                      type="text"
                      className="input w-full"
                      value={addlocationName}
                      onChange={(e) => setAddlocationName(e.target.value)}
                    />
                    {errors.addlocationName && (
                      <span className="text-sm text-red-600">{errors.locationName}</span>
                    )}
                  </div>

                  <div>
                    <label className="paragraphBold block mb-1">Average Daily Sales ($)</label>
                    <input
                      type="text"
                      className="input w-full"
                      value={sales}
                      onChange={(e) => setSales(e.target.value)}
                    />
                    {errors.sales && (
                      <span className="text-sm text-red-600">{errors.sales}</span>
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                      <label className="paragraphBold block mb-1">Latitude</label>
                      <input
                        type="text"
                        className="input w-full"
                        value={latitude}
                        onChange={(e) => setlatitude(e.target.value)}
                      />
                      {errors.latitude && (
                        <span className="text-sm text-red-600">{errors.latitude}</span>
                      )}
                    </div>
                    <div className="w-full">
                      <label className="paragraphBold block mb-1">Longitude</label>
                      <input
                        type="text"
                        className="input w-full"
                        value={longitude}
                        onChange={(e) => setlongitude(e.target.value)}
                      />
                      {errors.longitude && (
                        <span className="text-sm text-red-600">{errors.longitude}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="paragraphBold block mb-1">
                      Address <span className="smallFont text-gray-500">(optional)</span>
                    </label>
                    <textarea
                      className="input w-full"
                      rows={3}
                      value={addaddress}
                      onChange={(e) => setAddaddress(e.target.value)}
                    />
                  </div>
                </div>

                {/* Right Column - Map */}
                <div className="w-full md:w-1/2 flex flex-col">
                  <label className="paragraphBold mb-2">Select Location on Map</label>
                  <div className="flex-1 h-74 border rounded-md overflow-hidden">
                    <GoogleMapSelector
                      address={address}
                      onLocationSelect={({ lat, lng }) => {
                        setLatitude(lat.toFixed(6));
                        setLongitude(lng.toFixed(6));
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="buttonGrey"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="buttonTheme"
                >
                  Add
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* Location Model Ends */}
      {/* Employee Model Starts*/}
      <Dialog
        open={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
        className="relative z-50 rounded-lg"
      >
        <div className="fixed inset-0 bg-gray-700/70"></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-gray-200 rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-gray-800 rounded-t-lg text-white px-4 py-3 flex justify-between items-center">
              <Dialog.Title className="heading">Add Employee</Dialog.Title>
              <button
                className="text-white font-bold text-2xl"
                onClick={() => setIsEmployeeModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form
              className="mt-1 p-4 space-y-3"
              onSubmit={handleEmployeeSubmit}
            >
              <div className="flex flex-col">
                <label className="paragraphBold">Location Name</label>
                <input
                  type="text"
                  className="input"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  required
                />
                {errors.locationName && (
                  <span className="text-sm text-red-600">
                    {errors.locationName}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between aitems-center mb-2">
                  <label className="paragraphBold">Employees List</label>
                  <div className="paragraphBold aitems-center flex gap-2">
                    <input
                      type="checkbox"
                      onChange={handleAllchecked}
                      checked={allSelected}
                    />
                    Select All
                  </div>
                </div>

                <div className="employee-checkboxes border p-2 rounded max-h-80 overflow-auto">
                  {employeeName.map((emp) => (
                    <div
                      className="flex items-center bg-white-100 rounded p-2 gap-3 mb-2"
                      key={emp.id}
                    >
                      <input
                        type="checkbox"
                        value={emp.id.toString()}
                        onChange={handleChange}
                        checked={employees.includes(emp.id.toString())}
                      />
                      <img
                        src={emp.profileImage}
                        alt={`${emp.firstName} ${emp.lastName}`}
                        className="h-10 w-10 rounded-4xl"
                      />
                      <p className="paragraph">
                        {emp.firstName} {emp.lastName}
                      </p>
                    </div>
                  ))}
                </div>

                {/* <div>
                  Selected Employee IDs:{" "}
                  {Array.isArray(employees) ? employees.join(", ") : "None"}
                </div> */}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="submit" className="buttonTheme">
                  Submit
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* Employee Model Ends */}
      {/* ✅ Reusable Modal */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        message={feedbackMessage}
      />
    </div>
  );
};

export default Location;
