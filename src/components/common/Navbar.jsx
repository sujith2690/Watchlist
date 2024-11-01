import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Link, useLocation } from 'react-router-dom'
import { H1, H2, H3, H4, H5, H6, P } from './Typography'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigation = [
        { name: 'Home', href: '/', current: true },
        { name: 'Search List', href: '/search-list', current: false },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }
    return (
        <>
            <div className="w-full md:w-64 md:h-full bg-inherit text-white flex flex-row  md:flex-col ">
                <div className="p-2 flex flex-row items-center justify-center md:flex-col ">
                    <Link to="/" className=' flex items-center md:flex-col'>
                        <img src={logo} className='w-1/6 md:w-full' loading="lazy" alt="Logo" />
                        <H4 className='font-semibold md:flex text-center justify-center'>Watch List</H4>
                    </Link>
                </div>
                <nav className="hidden md:flex flex-col flex-1  px-4 py-6 space-y-2">
                    {
                        navigation.map((item, i) => (
                            <Link key={i} to={item.href} className={classNames(
                                item.href === location.pathname
                                    ? 'cursor-pointer duration-300 bg-gray-800 hover:bg-gray-700'
                                    : 'text-[#B5B3B3] cursor-pointer hover:text-white transition',
                                'rounded-md px-3 py-2 flex gap-1'
                            )}>
                                {item.name}
                            </Link>
                        ))
                    }
                </nav>
                <div className="md:hidden flex items-center md:mr-16 p-5">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-2xl focus:outline-none text-white"
                    >
                        {isMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="flex flex-col items-center mb-2 md:mb-0 bg-slate-900 w-full p-2 md:py-4 md:px-6 space-y-2 lg:hidden">
                    {navigation.map((item, i) => (
                        <div key={i} className="relative w-full text-center">
                            <Link
                                onClick={() => {
                                    setIsMenuOpen(false);
                                }}
                                to={item.dropDown ? "#" : item.href}
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
                </div>
            )}
        </>
    )
}

export default Navbar