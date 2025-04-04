import React from "react";

const Unavailability = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {/* Days Off Adding */}
        <div className="bg-gray-100 rounded p-3 md:row-span-5">
          Days Off Adding
        </div>
        <div className="bg-gray-100 rounded p-3 md:col-span-1 md:row-span-13">
          Recurring Unavailability
        </div>
        {/* Requested Days Off List */}
        <div className="bg-gray-100 rounded p-3 md:row-span-8">
          Requested Days Off List
        </div>

        {/* Recurring Unavailability (Full Height in Large Screens) */}
      </div>
    </>
  );
};

export default Unavailability;
