import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchQuery } from '../../API/Api';
import { P } from '../common/Typography';
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const Search = () => {
    const { path } = useParams();
    const [content, setContent] = useState([]);

    console.log(path, '--------------params');

    const searchData = async () => {
        try {
            const response = await searchQuery(path);
            console.log(response, 'API response');
            setContent(response.data.results || []); // Update according to response structure
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (path) {
            searchData();
        }
    }, [path]);

    const handleNavigation = (item) => {
        console.log("Navigating to:", item);
    };

    return (
        <div className='overflow-x-auto flex '>
            <div className='min-w-full px-4 overflow-hidden lg:overflow-auto'>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 overflow-y-scroll h-[calc(100vh-180px)] md:h-[calc(100vh-150px)]">
                    {Array.isArray(content) && content.length > 0 ? (
                        content.map((item, i) => (
                            <div key={i} onClick={() => handleNavigation(item)} className="flex flex-col gap-2 cursor-pointer  items-center">
                                <div>
                                    <img
                                        src={VITE_IMAGE_URL + item.backdrop_path}
                                        alt=""
                                        className="w-full h-full max-h-60 object-cover"
                                    />
                                </div>
                                <div>
                                    <P className="text-center text-wrap">{item.original_title}</P>
                                    <P className="text-center text-wrap"> Released Date : {item.release_date || ""}</P>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No results found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
