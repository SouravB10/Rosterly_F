import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
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

        if (!email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email address.';

        if (!password) newErrors.password = 'Password is required.';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

        if (!isLogin) {
            if (!firstName) newErrors.firstName = 'First name is required.';
            if (!lastName) newErrors.lastName = 'Last name is required.';
            if (!company) newErrors.company = 'Company name is required.';
            if (!mobile) newErrors.mobile = 'Mobile number is required.';
            else if (!/^\d{10}$/.test(mobile.replace(/\s/g, ''))) newErrors.mobile = 'Enter a valid 10-digit mobile number.';

            if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
            else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

            if (!agreeTerms) newErrors.terms = 'You must agree to the terms and conditions.';
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
        <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
            <div className={`bg-white p-8 rounded-2xl shadow-lg w-full ${isLogin ? 'max-w-md' : 'max-w-2xl'}`}>
                <h1 className="text-center text-2xl font-bold text-secondary mb-6">
                    Login
                </h1>
                <form className="space-y-5" onSubmit={handleSubmit}>

                    <div>
                        <label className="text-secondary font-semibold mb-1 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className={`custom-focus w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div >
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

                    <div>
                        <label className="text-secondary font-semibold mb-4 block"></label>
                        <Link to='dashboard'>
                            <button type="submit" className="cursor-pointer w-full py-3 mt-3 bg-secondary text-white rounded-lg font-semibold hover:bg-primary shadow">
                                Login
                            </button>
                        </Link>
                    </div>
                </form>
                <Link to='/register' className="text-center mt-6 text-sm text-gray-600">"Don’t have an account?"
                    <span className="ml-1 text-primary cursor-pointer font-semibold hover:underline">"Create an account"</span>
                </Link>
            </div >
        </div >
    );
}
