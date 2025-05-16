import React from 'react'

const ChangePassword = () => {
    return (

        <div className="bg-white rounded-lg shadow-lg p-5 my-4">
            <h3 className="heading text-indigo-900">Profile Information</h3>

            <div className="flex flex-col md:flex-row items-center gap-2 w-full mt-3">

                <div className="w-full">
                    <form action="" className="grid gap-2" method="post">
                        <div>
                            <label htmlFor="" className="paragraph">
                                Current Password
                            </label>
                            <input
                                type="text"
                                className="input w-full border border-gray-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="" className="paragraph">
                                Change Password
                            </label>
                            <input
                                type="text"
                                className="input w-full border border-gray-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="" className="paragraph">
                                Conform Password
                            </label>
                            <input
                                type="text"
                                className="input w-full border border-gray-500"
                            />
                        </div>




                        <div className="flex justify-end gap-2 mt-4">
                            <button type="submit" className="buttonSuccess w-40">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword