import React, { useState } from 'react';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleChange = (field, value) => {
        if (field === 'email') setEmail(value);
        if (field === 'password') setPassword(value);
        if (field === 'confirmPassword') setConfirmPassword(value);

        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email address.';

        if (!password) newErrors.password = 'Password is required.';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

        if (!isLogin) {
            if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
            else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            console.log(isLogin ? 'Logged in successfully!' : 'Registered successfully!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#eed9ff] px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-center text-2xl font-bold text-[#4b0082] mb-6">
                    {isLogin ? 'Login' : 'Create Your Account'}
                </h1>
                <form className="space-y-5" onSubmit={handleSubmit}>

                    <div>
                        <label className="text-[#4b0082] text-base font-semibold mb-1 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ad46ff] placeholder:text-sm`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="text-[#4b0082] text-base font-semibold mb-1 block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ad46ff] placeholder:text-sm`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="text-[#4b0082] text-base font-semibold mb-1 block">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ad46ff] placeholder:text-sm`}
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="cursor-pointer w-full py-3 mt-3 bg-[#ad46ff] text-white rounded-lg font-semibold hover:bg-[#9c3ae5] shadow"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span
                        onClick={toggleForm}
                        className="text-[#ad46ff] cursor-pointer ml-1 font-medium hover:underline"
                    >
                        {isLogin ? 'Register here' : 'Login here'}
                    </span>
                </p>
            </div>
        </div>
    );
}
