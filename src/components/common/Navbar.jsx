import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { H4 } from './Typography';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); 

    const navigation = [
        { name: 'Home', href: '/', current: true },
        { name: 'Watch List', href: '/watch-list', current: false },
    ];

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const handleLogout = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const loggedInUserIndex = users.findIndex(user => user.loggedIn);
        if (loggedInUserIndex !== -1) {
            users[loggedInUserIndex].loggedIn = false; 
            localStorage.setItem('users', JSON.stringify(users)); 
        }
        navigate('/'); 
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }
    return (
        <>
            <div className="w-full md:w-64 md:h-full bg-inherit text-white flex flex-row md:flex-col">
                <div className='flex flex-col  justify-between  h-full'>
                    <div
                        className="p-2 flex flex-row items-center justify-center md:flex-col"
                        data-aos="fade-right"
                    >
                        <Link to="/" className='flex items-center md:flex-col'>
                            <img src={logo} className='w-1/6 md:w-full' loading="lazy" alt="Logo" />
                            <H4 className='font-semibold md:flex text-center justify-center'>Watch List</H4>
                        </Link>
                    </div>
                    <nav className="hidden md:flex flex-col  flex-1 px-4 py-6 space-y-2" data-aos="fade-down">
                        {navigation.map((item, i) => (
                            <Link
                                key={i}
                                to={item.href}
                                className={classNames(
                                    item.href === location.pathname
                                        ? 'cursor-pointer duration-300 bg-gray-800 hover:bg-gray-700'
                                        : 'text-[#B5B3B3] cursor-pointer hover:text-white transition',
                                    'rounded-md px-3 py-2 flex gap-1'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="flex md:hidden mt-4 text-[#B5B3B3] hover:text-white transition bg-gray-800 hover:bg-gray-700 rounded-md px-3 py-2"
                        >
                            Logout
                        </button>
                    </nav>
                    <div className='hidden w-full md:flex items-center justify-center p-2'>
                        <button
                            onClick={handleLogout}
                            className="mt-4 text-[#B5B3B3] w-5/6 hover:text-white transition bg-gray-800 hover:bg-gray-700 rounded-md  py-2"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div
                    className="md:hidden flex items-center p-5"
                    data-aos="fade-left"
                >
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-2xl focus:outline-none text-white"
                    >
                        {isMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div
                    className="flex flex-col items-center mb-2 bg-slate-900 w-full p-2 md:py-4 md:px-6 space-y-2 lg:hidden"
                    data-aos="fade-up"
                >
                    {navigation.map((item, i) => (
                        <div key={i} className="relative w-full text-center">
                            <Link
                                onClick={() => setIsMenuOpen(false)}
                                to={item.href}
                                className={classNames(
                                    item.href === location.pathname
                                        ? 'duration-300 bg-gray-800 hover:bg-gray-700'
                                        : 'text-[#B5B3B3] cursor-pointer hover:text-white transition',
                                    'rounded-md px-3 py-2 text-sm font-medium flex gap-1 justify-center'
                                )}
                            >
                                {item.name}
                            </Link>
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                        }}
                        className="text-[#B5B3B3] hover:text-white transition bg-gray-800 hover:bg-gray-700 rounded-md px-3 py-2 w-full text-center"
                    >
                        Logout
                    </button>
                </div>
            )}
        </>
    );
};

export default Navbar;
