import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const baseURL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        try {
           const response = await axios.post(
                `${baseURL}/changePassword`,
                {
                    login_id: id, // ✅ send login_id from localStorage
                    current_password: currentPassword,
                    new_password: newPassword,
                    confirm_password: confirmPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Password changed successfully!");
            // Clear form
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error("Error changing password:", error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Failed to change password.");
            }
        }
    };

    return (

        <div className="bg-white rounded-lg shadow-lg p-5 my-4">
            <h3 className="heading text-indigo-900">Change Password</h3>

            <div className="flex flex-col md:flex-row items-center gap-2 w-full mt-3">

                <div className="w-full">
                    <form onSubmit={handleSubmit} className="grid gap-2" method="post">
                        <div>
                            <label htmlFor="" className="paragraph">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="input w-full border border-gray-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="" className="paragraph">
                                New Password
                            </label>
                            <input
                                type="text"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="input w-full border border-gray-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="" className="paragraph">
                                Confirm Password
                            </label>
                            <input
                                type="text"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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