import React from "react";
import { FaPlusSquare } from "react-icons/fa";

const Unavailability = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {/* Days Off Adding */}
        <div className="bg-gray-100 rounded-md p-3 md:row-span-5">
          Days Off Adding
        </div>


        <div className="bg-white-300 rounded-md p-5 md:col-span-1 md:row-span-13">
          <h1 className="text-center font-weight-700">Recurring Unavailability</h1>

          <div className="flex rounded-md justify-between my-5 bg-white-100 items-center p-3">
            <div>
              <p className="primary-300 font-weight-700 ">Monday</p>
            </div>
            <div className="mx-3">
              <FaPlusSquare />
            </div>
          </div>
          <div className="flex rounded-md justify-between my-5 bg-white-100 items-center p-3">
            <div>
              <p className="primary-300 font-weight-700 ">Tuesday</p>
            </div>
            <div className="mx-3">
              <FaPlusSquare />
            </div>
          </div>
          <div className="flex rounded-md justify-between my-5 bg-white-100 items-center p-3">
            <div>
              <p className="primary-300 font-weight-700 ">Wednesday</p>
            </div>
            <div className="mx-3">
              <FaPlusSquare />
            </div>
          </div>
          <div className="flex rounded-md justify-between my-5 bg-white-100 items-center p-3">
            <div>
              <p className="primary-300 font-weight-700 ">Thursday</p>
            </div>
            <div className="mx-3">
              <FaPlusSquare />
            </div>
          </div>
          <div className="flex rounded-md justify-between my-5 bg-white-100 items-center p-3">
            <div>
              <p className="primary-300 font-weight-700 ">Friday</p>
            </div>
            <div className="mx-3">
              <FaPlusSquare />
            </div>
          </div>
          <div className="flex rounded-md justify-between my-5 bg-white-100 items-center p-3">
            <div>
              <p className="text-red-600 font-weight-700 ">Saturday</p>
              <p className=" font10">8:00am - 11:00am/off</p>
            </div>
            <div className="mx-3">
              <FaPlusSquare />
            </div>
          </div>
          <div className="flex rounded-md justify-between my-5 bg-white-100 items-center p-3">
            <div>
              <p className="text-red-600 font-weight-700 ">Sunday</p>
              <p className=" font10">8:00am - 11:00pm/its sunday</p>
            </div>
            <div className="mx-3">
              <FaPlusSquare />
            </div>
          </div>

        </div>



        {/* Requested Days Off List */}
        <div className="bg-gray-100 rounded-md p-3 md:row-span-8">
          <h1 className="text-center font-weight-700">Requested Days Off List</h1>

        </div>

        {/* Recurring Unavailability (Full Height in Large Screens) */}
      </div>
    </>
  );
};

export default Unavailability;
