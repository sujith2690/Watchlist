import React from 'react';

const H1 = ({ children, className }) => (
    <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#F2F2F2] font-heebo ${className}`}>
        {children}
    </h1>
);

const H2 = ({ children, className }) => (
    <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#F2F2F2] font-heebo ${className}`}>
        {children}
    </h2>
);

const H3 = ({ children, className }) => (
    <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-[#F2F2F2] font-heebo ${className}`}>
        {children}
    </h3>
);

const H4 = ({ children, className }) => (
    <h4 className={`text-xl   md:text-2xl lg:text-3xl xl:text-4xl font-medium text-[#F2F2F2] font-heebo ${className}`}>
        {children}
    </h4>
);

const H5 = ({ children, className }) => (
    <h5 className={`text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-[#F2F2F2] font-heebo ${className}`}>
        {children}
    </h5>
);

const H6 = ({ children, className }) => (
    <h6 className={`text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-[#F2F2F2] font-heebo ${className}`}>
        {children}
    </h6>
    
);

const P = ({ children, className }) => (
    <p className={`text-sm  text-[#B5B3B3] font-heebo ${className}`}>
        {children}
    </p>
);

export { H1, H2, H3, H4, H5, H6, P };
