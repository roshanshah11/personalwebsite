import React from 'react';

const Bio = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-8 max-w-4xl mx-auto my-20 animate-fade-in">

            {/* Name & Title */}
            <div className="text-center space-y-4">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white">
                    Roshan Shah
                </h1>
                <p className="text-xl md:text-2xl text-text-muted font-light tracking-wide">
                    Quantitative Finance <span className="text-white/20 mx-2">|</span> AI Research
                </p>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed text-center font-light">
                Building at the intersection of <span className="text-white font-medium">markets</span> and <span className="text-white font-medium">machine intelligence</span>.
                <br />
                Student at <span className="text-white font-medium">UNC Chapel Hill</span>.
            </p>

            {/* Subtle decorative element */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full opacity-50"></div>
        </div>
    );
};

export default Bio;
