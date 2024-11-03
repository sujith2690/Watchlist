import React, { useEffect, useState } from 'react';
import { BannerApi, videoPlayApi } from '../../API/Api';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { H4, P } from '../common/Typography';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import { toast } from 'react-toastify';
import Buttons from '../common/Buttons';

const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const Banner = ({ currentMovie }) => {
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
        }, 5000);

        return () => clearInterval(interval);
    }, [movies.length]);

    currentMovie = movies[currentIndex] || {};

    const handleNavigation = (data) => {
        console.log(data.id, '---------data')
        navigate(`/search/${data.id}`)
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
                className="banner h-[350px] bg-cover text-white relative"
            >
                <div className="content absolute bottom-0 left-0 h-[200px] p-2 bg-gradient-to-t from-[#050E17] to-transparent w-full" data-aos="fade-up">
                    <H4 className="title text-3xl font-extrabold pb-1" data-aos="fade-up" data-aos-delay="500">
                        {currentMovie.title || currentMovie.name || ""}
                    </H4>
                    <div className="banner_buttons flex flex-wrap gap-2 w-full" data-aos="fade-up" data-aos-delay="500">
                        <Buttons onClick={() => handleMovie(currentMovie)} text="Play" />
                        <Buttons onClick={() => handleNavigation(currentMovie)} text="Details" />
                        <Buttons onClick={() => AddToMyList(currentMovie)} text="Add to My List" />
                    </div>
                    <P className="description line-clamp-3 leading-6 p-4 text-base" data-aos="fade-up" data-aos-delay="500">
                        {currentMovie.overview || ""}
                    </P>
                </div>
            </div >
            {
                urlId ?
                    <Modal handlePlayVideo={handlePlayVideo} videoId={urlId.key} /> : ''
            }
        </>
    );
};
export default Banner;
