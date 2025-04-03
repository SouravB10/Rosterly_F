    import React, { useEffect, useState } from 'react';
    import '../App.css';
    import { Link, useNavigate } from 'react-router-dom';
    import axios from 'axios';
    import loadingGif from '../assets/Loading/Loading-circle.gif';
    import { FaEye, FaEyeSlash } from 'react-icons/fa';


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
        const [modalMessage, setModalMessage] = useState('');
        const [modalTitle, setModalTitle] = useState('');
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [modalClass, setModalClass] = useState('transform translate-y-10 opacity-0');
        const [loading, setLoading] = useState(false);
        const [showPassword, setShowPassword] = useState(false);

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };
        

        const navigate = useNavigate();

        const openModal = () => {
            setModalClass('transform translate-y-15 opacity-0');
            setIsModalOpen(true);

            setTimeout(() => {
                setModalClass('transform translate-y-0 opacity-100 transition-all duration-500 ease-out');
            }, 10);
        };

        const closeModal = () => {
            setModalClass('transform translate-y-10 opacity-0');
            setIsModalOpen(false);
        };

        useEffect(() => {
            if (isModalOpen) {
                openModal();
            }
        }, [isModalOpen]);

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (token) {
                navigate('/dashboard');
            }
        }, [navigate]);

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

        const handleSubmit = async (e) => {
            e.preventDefault();
            const validationErrors = validate();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
            } else {
                setErrors({});
                setLoading(true);
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/admin/login', { email, password });
                    const data = response.data;

                    setModalTitle('Success');
                    setModalMessage('Login successful!');
                    setIsModalOpen(true);

                    localStorage.setItem('token', data.token);
                    console.log("Login successful:", data);
                    navigate('/myrosterly');
                } catch (error) {
                    const errorMessage = error.response?.data?.message || 'Email or password is incorrect.';

                    setModalTitle('Error');
                    setModalMessage(errorMessage);
                    setIsModalOpen(true);
                } finally {
                    setLoading(false);
                }
            }
        };


        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
                <div className={`bg-white p-8 rounded-2xl shadow-lg w-full ${isLogin ? 'max-w-md' : 'max-w-2xl'}`}>
                    <h1 className="text-center text-2xl font-bold text-secondary mb-6">Login</h1>
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

                        <div className="relative">
                            <label className="text-secondary font-semibold mb-1 block">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                className={`custom-focus w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg pr-12`}
                                placeholder="Enter your password"
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                className="absolute right-4 top-2/3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                            >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </span>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>


                        {/* <div>
                            <button type="submit" className="cursor-pointer w-full py-3 mt-3 bg-secondary text-white rounded-lg font-semibold hover:bg-primary shadow">
                                Login
                            </button>
                        </div> */}
                        <div>
                            <button
                                type="submit"
                                className={`w-full py-3 mt-3 bg-secondary text-white rounded-lg font-semibold shadow flex items-center justify-center
                    transition-transform duration-400 ease-in-out hover:scale-105 hover:bg-primary 
                    ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <img src={loadingGif} alt="Loading..." className="h-5 w-5 mr-2" />
                                        Logging in...
                                    </>
                                ) : 'Login'}
                            </button>

                        </div>
                    </form>
                    <div className='mt-2 text-center'>
                        <Link to='/register' className="text-center text-sm text-gray-600">Don’t have an account?
                            <span className="ml-1 text-primary cursor-pointer font-semibold hover:underline">Create an account</span>
                        </Link>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-modal-opacity flex items-center justify-center z-50">
                        <div className={`bg-white p-6 rounded-lg shadow-2xl w-80 ${modalClass}`}>
                            <h3 className="font-bold text-lg text-center">{modalTitle}</h3>
                            <p className="py-4 text-center">{modalMessage}</p>
                            <div className="text-center">
                                <button onClick={closeModal} className="bg-secondary text-white py-2 px-4 rounded-lg">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
