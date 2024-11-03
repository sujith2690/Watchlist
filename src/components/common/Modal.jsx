import React from 'react'
import YouTube from 'react-youtube';
import { FaTimes } from "react-icons/fa";

const Modal = ({ videoId, handlePlayVideo }) => {

    const handleClose = (e) => {
        if (e.target.id === "container") {
            handlePlayVideo();
        }
    };
    
    const opts = {
        // height: "390",
        // width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };
    return (
        <div
            id="container"
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        >
            <div className="w-full max-w-3xl aspect-w-16 aspect-h-9">
                <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
            </div>
        </div>
    )
}

export default Modal