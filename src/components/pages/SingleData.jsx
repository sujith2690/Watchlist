import React, { useEffect, useState } from 'react';
import { H4, P } from '../common/Typography';
import { useParams } from 'react-router-dom';
import { videoDetails } from '../../API/Api';
import Loading from './Loading';
import AOS from 'aos';
import 'aos/dist/aos.css';

const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const SingleData = () => {
    const [currentMovie, setCurrentMovie] = useState(null); // Initialize as null
    const { id } = useParams();

    const getVideoDetails = async (id) => {
        const { data } = await videoDetails(id);
        setCurrentMovie(data);
        console.log(data, '--------------');
    };
    useEffect(() => {
        AOS.init({ duration: 1000, easing: 'ease-in-out' }); // Initialize AOS with custom settings
        if (id) {
            getVideoDetails(id);
        }
    }, [id]);

    if (!currentMovie) {
        return <Loading />;
    }

    return (
        <div className="w-full">
            <div
                className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden"
                data-aos="fade-up"
            >
                <img
                    src={VITE_IMAGE_URL + currentMovie.backdrop_path}
                    alt=""
                    className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
                />
            </div>
            <div className="h-auto p-4 bg-gradient-to-t from-[#050E17] to-transparent w-full flex flex-col">
                <H4
                    className="text-xl md:text-2xl lg:text-3xl font-extrabold pb-1"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    {currentMovie.title || currentMovie.name || ""}
                </H4>
                <div
                    className="flex flex-col md:flex-row md:space-x-4"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    <button className="bg-[rgba(51,51,51,0.5)] text-white font-bold rounded-md px-4 py-2 hover:bg-[#e6e6e6] hover:text-black">
                        Play
                    </button>
                    <button className="bg-[rgba(51,51,51,0.5)] text-white font-bold rounded-md px-4 py-2 mt-2 md:mt-0 hover:bg-[#e6e6e6] hover:text-black">
                        My list
                    </button>
                </div>
                <P
                    className="line-clamp-3 leading-6 text-base mt-2"
                    data-aos="fade-up"
                    data-aos-delay="500"
                >
                    {currentMovie.overview || ""}
                </P>
                <div className="flex flex-col md:flex-row items-center justify-around" data-aos="fade-up" data-aos-delay="600">
                    <P className="line-clamp-3 leading-6 text-base mt-2">
                        Released Date : {currentMovie.release_date || ""}
                    </P>
                    <P className="line-clamp-3 leading-6 text-base mt-2">
                        Revenue : {currentMovie.revenue || ""}
                    </P>
                    <P className="line-clamp-3 leading-6 text-base mt-2">
                        Rating : {currentMovie.vote_average || ""}
                    </P>
                </div>
            </div>
        </div>
    );
};

export default SingleData;
