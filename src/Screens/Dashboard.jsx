import React from "react";

export default function Dashboard() {
  return (
    <>
      <div className="my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-2xl font-bold mt-2">120</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Active Rosters</h2>
            <p className="text-2xl font-bold mt-2">34</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Pending Approvals</h2>
            <p className="text-2xl font-bold mt-2">8</p>
          </div>
         
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Managers</h2>
            <p className="text-2xl font-bold mt-2">5</p>
          </div>
           <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Stores</h2>
            <p className="text-2xl font-bold mt-2">5</p>
          </div>
           <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Employees</h2>
            <p className="text-2xl font-bold mt-2">105</p>
          </div>
        </div>
      </div>

    </>
  )
}
