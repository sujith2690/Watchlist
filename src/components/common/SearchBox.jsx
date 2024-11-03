import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { searchQuery } from '../../API/Api';
import { H5, P, H4 } from './Typography';
import { useNavigate } from 'react-router-dom';
import SingleData from '../pages/SingleData';
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const SearchBox = () => {
    const navigate = useNavigate()
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
            console.log(data.results[0].backdrop_path,'------------backdrop_path')
            setSearchOut(limitedResults);

            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.error('Error fetching search data:', error.message);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    const handleNavigation = (data) => {
        navigate(`/${data.id}`)
    }
    return (
        <div className='mb-4 gap-2 p-5'>
            <div className='bg-[#050E17] grid gap-2 rounded-xl outline-none p-2 px-4 transition duration-200 border-[#22AAD2] ring-2 ring-[#22AAD259]'>
                <form onSubmit={(e) => e.preventDefault()} className='flex gap-2 items-center justify-center w-full'>
                    <CiSearch className='w-10 h-10' />
                    <input
                        type="text"
                        id="search"
                        value={query}
                        onChange={handleInputChange}
                        className='border-[#22AAD259] w-full bg-[#0A1828] border-t-2 rounded-xl outline-none p-2 px-4 transition duration-200 focus:border-[#22AAD2] focus:ring-2 focus:ring-[#22AAD259]'
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
                        <div className='md:flex gap-2 items-center space-y-2 p-2'>
                            {
                                searchOut.map((item, i) => (
                                    <div key={i} onClick={()=>handleNavigation(item)} className='flex flex-col gap-2 cursor-pointer'>
                                        <div>
                                            <img
                                                src={VITE_IMAGE_URL + item.backdrop_path}
                                                alt=""
                                                className='w-[200px] h-[100px] max-h-60 object-cover'
                                            />
                                        </div>
                                        <div>
                                            <P className='text-center text-wrap'>{item.original_title}</P>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='bg-red-700 text-center rounded cursor-pointer'>
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
