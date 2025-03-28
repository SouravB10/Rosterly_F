import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        switch (field) {
            case 'firstName': setFirstName(value); break;
            case 'lastName': setLastName(value); break;
            case 'company': setCompany(value); break;
            case 'mobile': setMobile(value); break;
            case 'email': setEmail(value); break;
            case 'password': setPassword(value); break;
            case 'confirmPassword': setConfirmPassword(value); break;
            default: break;
        }

        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!firstName) newErrors.firstName = 'First name is required.';
        if (!lastName) newErrors.lastName = 'Last name is required.';
        if (!company) newErrors.company = 'Company name is required.';
        if (!mobile) newErrors.mobile = 'Mobile number is required.';
        else if (!/^\d{10}$/.test(mobile.replace(/\s/g, ''))) newErrors.mobile = 'Enter a valid 10-digit mobile number.';

        if (!email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email address.';

        if (!password) newErrors.password = 'Password is required.';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

        if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
        else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

        if (!agreeTerms) newErrors.terms = 'You must agree to the terms and conditions.';

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            console.log('Registered successfully!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
                <h1 className="text-center text-2xl font-bold text-secondary mb-6">
                    Create Your Account
                </h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className='flex justify-between'>
                        <div className='w-48'>
                            <label className="text-secondary font-semibold mb-1 block">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                className={`custom-focus w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                placeholder="Enter your first name"
                            />
                            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        </div>

                        <div className='w-48'>
                            <label className="text-secondary font-semibold mb-1 block">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                className={`custom-focus w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                placeholder="Enter your last name"
                            />
                            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='w-48'>
                            <label className="text-secondary font-semibold mb-1 block">Company Name</label>
                            <input
                                type="text"
                                value={company}
                                onChange={(e) => handleChange('company', e.target.value)}
                                className={`custom-focus w-full px-4 py-3 border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                placeholder="Enter your company name"
                            />
                            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                        </div>

                        <div className='w-48'>
                            <label className="text-secondary font-semibold mb-1 block">Mobile Number</label>
                            <input
                                type="tel"
                                value={mobile}
                                onChange={(e) => handleChange('mobile', e.target.value)}
                                className={`custom-focus w-full px-4 py-3 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                placeholder="Enter your mobile number"
                            />
                            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='w-48'>
                            <label className="text-secondary font-semibold mb-1 block">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className={`custom-focus w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div className='w-48'>
                            <label className="text-secondary font-semibold mb-1 block">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                className={`custom-focus w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                    </div>


                    <div className='flex justify-between'>
                        <div className='w-48'>
                            <label className="text-secondary font-semibold mb-1 block">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                className={`custom-focus w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>
                        <div className='w-48'>
                            <button type="submit" className="cursor-pointer w-full py-3 mt-7 bg-secondary text-white rounded-lg font-semibold hover:bg-primary shadow">Get Started</button>
                        </div>
                    </div>
                </form>
                <p className="text-center mt-6 text-sm text-gray-600">
                    "Already have an account?"
                    <Link
                        to='/'
                        className="ml-1 text-primary cursor-pointer font-semibold hover:underline"
                    >
                        "Login here"
                    </Link>
                </p>
            </div>
        </div>
    );
} 