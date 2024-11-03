import React from 'react';

const Buttons = ({ onClick, text, additionalClasses = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`button bg-[rgba(51,51,51,0.5)] text-sm text-white font-bold rounded-md px-8 py-2 mr-4 hover:bg-[#e6e6e6] hover:text-black ${additionalClasses}`}>
            {text}
        </button>
    );
};

export default Buttons;
