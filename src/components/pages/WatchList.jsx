import React, { useEffect, useState } from 'react';
import { videoDetails, videoPlayApi } from '../../API/Api';
import { H3, H5, P } from '../common/Typography';
import { FaRegTrashAlt } from "react-icons/fa";
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
import { FaPlay } from "react-icons/fa";
import Loading from './Loading';
import Modal from '../common/Modal';
import { toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WatchList = () => {
    const [watchList, setWatchList] = useState([]);
    const [urlId, setUrlId] = useState('');

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 600, 
        });

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const loggedInUser = users.find(user => user.loggedIn);
        const userWatchList = loggedInUser ? loggedInUser.watchList || [] : [];
        setWatchList(userWatchList);

        const fetchMovies = async () => {
            const movieDetailsPromises = userWatchList.map(id => videoDetails(id));
            const movieDetailsResponses = await Promise.all(movieDetailsPromises);
            setMovies(movieDetailsResponses.map(response => response.data));
            setLoading(false);
        };

        if (userWatchList.length > 0) {
            fetchMovies();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <Loading />;
    }

    const handleMovie = async (data) => {
        try {
            const response = await videoPlayApi(data.id);
            setUrlId(response.data.results[0]);
        } catch (error) {
            console.error(error.message);
        }
    };

    const RemoveFromMyList = (movieData) => {
        const movieId = movieData.id;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const loggedInUserIndex = users.findIndex(user => user.loggedIn);

        if (loggedInUserIndex !== -1) {
            const user = users[loggedInUserIndex];
            if (user.watchList && user.watchList.includes(movieId)) {
                user.watchList = user.watchList.filter(id => id !== movieId);
                localStorage.setItem('users', JSON.stringify(users));
                setMovies(prev => prev.filter(movie => movie.id !== movieId));
                toast.success(`${movieData.title} removed from your list`);
            } else {
                toast.info('Movie is not in your list');
            }
        } else {
            toast.error('No user is logged in');
        }
    };

    const handlePlayVideo = () => {
        setUrlId('');
    }

    return (
        <div className="p-5 bg-inherit overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">My Watch List</h2>
            <div className='min-w-full px-4 overflow-hidden lg:overflow-auto'>
                {movies.length > 0 ? (
                    <div className="md:pl-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 overflow-y-scroll h-[calc(100vh-180px)] md:h-[calc(100vh-150px)]">
                        {movies.map((movie, i) => (
                            <div key={i} className="my-2" data-aos="fade-up"> 
                                <div className='flex flex-col'>
                                    <img src={VITE_IMAGE_URL + movie.backdrop_path} className='rounded-md' alt="" />
                                    <div className='flex justify-between items-center p-2'>
                                        <div>
                                            <P className="font-semibold">{movie.title || movie.name}</P>
                                        </div>
                                        <div className='flex gap-5'>
                                            <button
                                                onClick={() => handleMovie(movie)}
                                                className='p-2 px-4 rounded-md bg-slate-800 hover:bg-slate-950 transition duration-200'>
                                                <FaPlay />
                                            </button>
                                            <button
                                                onClick={() => RemoveFromMyList(movie)}
                                                className='bg-red-800 p-2 px-4 rounded-md hover:bg-red-600 transition duration-200'>
                                                <FaRegTrashAlt />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No movies in your watch list.</p>
                )}
                {urlId ? <Modal handlePlayVideo={handlePlayVideo} videoId={urlId.key} /> : ''}
            </div>
        </div>
    );
};

export default WatchList;
