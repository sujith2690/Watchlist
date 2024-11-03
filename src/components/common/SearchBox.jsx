import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { searchQuery } from '../../API/Api';
import { H5, P } from './Typography';
import { useNavigate } from 'react-router-dom';
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const SearchBox = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchOut, setSearchOut] = useState([]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (query) {
                setLoading(true);
                handleSearch(query);
            } else {
                setLoading(false);
                setSearchOut([]);
            }
        }, 1000);

        return () => clearTimeout(handler);
    }, [query]);

    const handleSearch = async (searchTerm) => {
        if (!searchTerm) {
            setLoading(false);
            return;
        }

        try {
            const { data } = await searchQuery(searchTerm);
            const limitedResults = data.results.slice(0, 5);
            setSearchOut(limitedResults);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching search data:', error.message);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleNavigation = (data) => {
        navigate(`/${data.id}`);
    };

    const handlePath = () => {
        navigate(`/search/${query}`);
    };

    return (
        <div className='gap-2 p-5 mt-10 md:mt-2 '>
            <div className='bg-[#050E17] grid gap-2 rounded-xl outline-none p-4 transition duration-200 border-[#22AAD2] ring-2 ring-[#22AAD259]'>
                <form onSubmit={(e) => e.preventDefault()} className='flex gap-2 items-center justify-between w-full'>
                    <CiSearch className='w-6 h-6 md:w-8 md:h-8' />
                    <input
                        type="text"
                        id="search"
                        value={query}
                        onChange={handleInputChange}
                        className='border-[#22AAD259] text-sm w-full bg-[#0A1828] border-t-2 rounded-xl outline-none p-2 transition duration-200 focus:border-[#22AAD2] focus:ring-2 focus:ring-[#22AAD259]'
                        placeholder="Search Videos"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                    />
                </form>
                {loading && (
                    <div className="pb-2 pt-4">
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-500"></div>
                            <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-500"></div>
                            <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-500"></div>
                        </div>
                    </div>
                )}

                {!loading && searchOut.length > 0 ? (
                    <>
                        <div className='flex flex-wrap gap-4 justify-center p-2 overflow-y-auto h-32'>
                            {searchOut.map((item, i) => (
                                <div key={i} onClick={() => handleNavigation(item)} className='flex flex-col gap-2 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                    <div>
                                        <img
                                            src={VITE_IMAGE_URL + item.backdrop_path}
                                            alt={item.original_title}
                                            className='w-full h-1/2 md:h-[150px]  object-cover rounded-lg'
                                        />
                                    </div>
                                    <div>
                                        <P className='text-center text-wrap'>{item.original_title}</P>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div onClick={handlePath} className='bg-red-700 hover:bg-red-800 transition duration-200 text-center rounded cursor-pointer p-2 mt-2'>
                            <H5>Show More</H5>
                        </div>
                    </>
                ) : !loading && query && searchOut.length === 0 && (
                    <div className='text-center text-gray-500 mt-4'>
                        <P>No results found.</P>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBox;
