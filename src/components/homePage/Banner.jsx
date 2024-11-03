import React, { useEffect, useState } from 'react';
import { BannerApi, videoPlayApi } from '../../API/Api';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { H1, H3, H4, P } from '../common/Typography';
import { useNavigate } from 'react-router-dom';
import YouTube from "react-youtube";
import Modal from '../common/Modal';
import { toast } from 'react-toastify';

const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const Banner = () => {
    const [urlId, setUrlId] = useState('')
    const navigate = useNavigate()
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        AOS.init();
        const getBanner = async () => {
            try {
                const response = await BannerApi();
                setMovies(response.data.results);
                setCurrentIndex(Math.floor(Math.random() * response.data.results.length));
            } catch (error) {
                console.error('Error fetching banner data:', error.message);
            }
        };

        getBanner();
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 5000); // Change banner every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [movies.length]); // Dependency array includes movies.length

    const currentMovie = movies[currentIndex] || {};

    const handleNavigation = (data) => {
        console.log(data.id, '---------data')
        navigate(`/${data.id}`)
    }

    const handleMovie = async (data) => {

        try {
            console.log(data.id)
            console.log('lets play')
            const response = await videoPlayApi(data.id);
            setUrlId(response.data.results[0]);
            console.log(response.data, '--------------response')
        } catch (error) {
            console.error(error.message)
        }
    };

    const handlePlayVideo = () => {
        setUrlId('')
    }
    const AddToMyList = (movieData) => {
        const movieId = movieData.id;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const loggedInUserIndex = users.findIndex(user => user.loggedIn);

        if (loggedInUserIndex !== -1) {
            const user = users[loggedInUserIndex];
            if (!user.watchList) {
                user.watchList = []; 
            }
            if (!user.watchList.includes(movieId)) {
                user.watchList.push(movieId);
                localStorage.setItem('users', JSON.stringify(users));
                toast.success('Movie added to your list');
            } else {
                toast.info('Movie is already in your list');
            }
        } else {
            toast.error('No user is logged in');
        }
    };

    return (
        <>

            <div
                style={{ backgroundImage: `url(${currentMovie.backdrop_path ? VITE_IMAGE_URL + currentMovie.backdrop_path : ""})` }}
                className="banner h-[448px] bg-cover text-white relative"
            >
                <div className="content absolute bottom-0 left-0 h-[200px] p-2 bg-gradient-to-t from-[#050E17] to-transparent w-full" data-aos="fade-up">
                    <H4 className="title text-3xl font-extrabold pb-1" data-aos="fade-up" data-aos-delay="500">
                        {currentMovie.title || currentMovie.name || ""}
                    </H4>
                    <div className="banner_buttons flex" data-aos="fade-up" data-aos-delay="500">
                        <button
                            onClick={() => handleMovie(currentMovie)}
                            className="button bg-[rgba(51,51,51,0.5)] text-white font-bold rounded-md px-8 py-2 mr-4 hover:bg-[#e6e6e6] hover:text-black">
                            Play
                        </button>
                        <button
                            onClick={() => handleNavigation(currentMovie)}
                            className="button bg-[rgba(51,51,51,0.5)] text-white font-bold rounded-md px-8 py-2 mr-4 hover:bg-[#e6e6e6] hover:text-black">
                            Details
                        </button>
                        <button
                            onClick={() => AddToMyList(currentMovie)}
                            className="button bg-[rgba(51,51,51,0.5)] text-white font-bold rounded-md px-8 py-2 hover:bg-[#e6e6e6] hover:text-black">
                            Add to My list
                        </button>
                    </div>
                    <P className="description line-clamp-3 leading-6 p-4 text-base" data-aos="fade-up" data-aos-delay="500">
                        {currentMovie.overview || ""}
                    </P>
                </div>
            </div >
            {urlId &&
                <Modal handlePlayVideo={handlePlayVideo} videoId={urlId.key} />
            }
        </>
    );
};
export default Banner;
