import React from 'react'

const General = () => {
    return (
        <div className="card">
            <div className="space-y-6 my-4">
                <div className='flex items-center justify-between'>
                    <div className='w-140'>
                        <h6 className="subHeading">Timezone</h6>
                        <p className="paragraphThin">Which Timezone Do Your Locations Belong To?</p>
                    </div>
                    <div>
                        <select className="input">
                            <option>(UTC+05:30) Asia/Kolkata</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="space-y-6 my-4">
                <div className='flex items-center justify-between'>
                    <div className='w-140'>
                        <h6 className="subHeading">Default Employee Type</h6>
                        <p className="paragraphThin">When Adding A New Employee, By Default What Should Their Employment Type Be?</p>
                    </div>
                    <div>
                        <select className="inputFull">
                            <option>Full Time</option>
                            <option>Part Time</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="space-y-6 my-4">
                <div className='flex items-center justify-between'>
                    <div className='w-140'>
                        <h6 className="subHeading">Default Hours Per Day</h6>
                        <p className="paragraphThin">Default Number Of Hours Per Full-Time Employee Day. Used To Calculate Hours For Leave Days.</p>
                    </div>
                    <div>
                        <select className="inputFull">
                            <option>08:00</option>
                            <option>12:00</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="space-y-6 my-4">
                <div className='flex items-center justify-between'>
                    <div className='w-140'>
                        <h6 className="subHeading">Default Leave Type</h6>
                        <p className="paragraphThin">When Applying For And Importing Leave Onto The Timesheet, If Unspecified, What Leave Type Should Be The Default?.</p>
                    </div>
                    <div>
                        <select className="input">
                            <option>Without Pay</option>
                            <option>Casual Leave</option>
                            <option>Sick Leave</option>
                            <option>Annual Leave</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="space-y-6 my-4">
                <div className="flex justify-between items-center">
                    <div className='w-140'>
                        <h6 className="font-bold text-gray-800">Availability Changes Require Approval</h6>
                        <p className="paragraphThin">Check To Require Management Approval Before Implementing And Using Employee Initiated Unavailability Updates.</p>
                    </div>
                    <input
                        type="checkbox"
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                </div>
            </div>
            <div className="space-y-6 my-4">
                <div className="flex justify-between items-center">
                    <div className='w-140'>
                        <h6 className="font-bold text-gray-800">Only Show Same Location Managers</h6>
                        <p className="paragraphThin">Check To Only Display Managers Within The Same Location(S) As The Employee When The Employee Is Selecting Who Should Approve Their Availability Change Request.</p>
                    </div>
                    <input
                        type="checkbox"
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className='w-140'>
                    <h6 className="font-bold text-gray-800">Send All Unavailability Request Notifications By Email To Manager</h6>
                    <p className="paragraphThin">Check To Notify Selected Manager By Email Of All Unavailability Or Leave Requests/Updates As They Occur.</p>
                </div>
                <input
                    type="checkbox"
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
            </div>
            <div className='flex justify-end'>
                <button className="buttonSuccess w-50">
                    Save
                </button>
            </div>
        </div>
    )
}

export default General