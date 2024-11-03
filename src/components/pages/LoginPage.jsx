import React, { useEffect, useState } from 'react';
import { H5 } from '../common/Typography';
import logo1 from '../../assets/images/logo copy.png';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');

    useEffect(() => {
        AOS.init(); 
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email) {
            const emailPrefix = email.split('@')[0];
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = existingUsers.findIndex(user => user.preferences.email === email);
            if (userIndex === -1) {
                const newUser = {
                    loggedIn: true,
                    preferences: { email },
                    watchList: []  
                };
                existingUsers.push(newUser);
            } else {
                existingUsers[userIndex].loggedIn = true;
            }

            localStorage.setItem('users', JSON.stringify(existingUsers));
            toast.success(`Welcome ${emailPrefix}`);
            navigate('/');
        } else {
            alert(`Enter Your Email`);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen bg-inherit flex-col md:flex-row p-5'>
            <form
                onSubmit={handleLogin}
                className='flex flex-col bg-slate-800 p-2 md:p-10 rounded-lg shadow-lg gap-3 md:w-1/2'
                data-aos="fade-up" 
                data-aos-duration="1000" 
            >
                <div className='p-5'>
                    <div className='grid place-items-center'>
                        <img src={logo1} className='w-2/6' alt="Logo" />
                    </div>
                    <H5 className='text-center text-white mb-5'>
                        Sign in to your account
                    </H5>
                    <div className='flex flex-col mb-4 gap-2'>
                        <label htmlFor="email" className='text-white mb-1'>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className='border-[#22AAD259] bg-[#0A1828] border-t-2 rounded-xl outline-none p-2 px-4 transition duration-200 focus:border-[#22AAD2] focus:ring-2 focus:ring-[#22AAD259]'
                            placeholder="Enter your email"
                            data-aos="fade-left" 
                            data-aos-duration="1000" 
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type='submit'
                            className='w-full p-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition duration-200'
                            data-aos="fade-up"
                            data-aos-duration="1000" 
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
