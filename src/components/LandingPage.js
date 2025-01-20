import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


const LandingPage = ({ loading, setLoading }) => {
    const [text, setText] = useState(""); // Text being typed
    const [showDots, setShowDots] = useState(false); // State to control when to show dots
    const fullText = "Welcome to my Profile!";

    useEffect(() => {
        // Simulate loading process
        const loadingTimeout = setTimeout(() => {
            setLoading(false); // Hide loading bar after 4 seconds
        }, 4000);

        // Clean up timeout
        return () => clearTimeout(loadingTimeout);
    }, []);

    useEffect(() => {
        if (!loading) {
            let currentIndex = 0;
            let updatedText = "";
            const interval = setInterval(() => {
                if (currentIndex < fullText.length) {
                    updatedText = updatedText + fullText[currentIndex];
                    setText(updatedText);
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    setShowDots(true); // Show dots after text typing is finished
                }
            }, 100); // Typing speed

            return () => clearInterval(interval);
        }
    }, [loading, setLoading, fullText]);

    // Scroll handler
    const handleComponentScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative flex items-center justify-center h-screen w-screen bg-gradient-to-b from-black to-zinc-800 overflow-hidden">
            {/* Loading bar */}
            {loading && (
                <div className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center z-20">
                    <div className="relative w-2/3 h-2 bg-zinc-700 rounded overflow-hidden">
                        <div className="h-full bg-red-500 animate-loading"></div>
                    </div>
                </div>
            )}

            {/* Main content */}
            {!loading && (
                <>
                    {/* Typing text */}
                    <div className="absolute z-10">
                        <h1 className="animate-fade font-semibold text-6xl text-zinc-200 font-sourceCode">{text}</h1>
                    </div>

                    {/* Background dots (only show after text is done) */}
                    {showDots && (
                        <div className="absolute inset-0 z-0 overflow-hidden">
                            {[...Array(30)].map((_, index) => {
                                const randomSize = Math.random() * 50 + 5; // Random size between 5px and 55px
                                return (
                                    <div
                                        key={index}
                                        className="dot"
                                        style={{
                                            left: `${Math.random() * 100}%`, // Random horizontal position
                                            animationDelay: `${Math.random() * 3}s`, // Random delay
                                            animationDuration: `${3 + Math.random() * 3}s`, // Random speed
                                            width: `${randomSize}px`, // Random width
                                            height: `${randomSize}px`, // Random height
                                        }}
                                    ></div>
                                );
                            })}
                        </div>
                    )}
                    {/* Scroll Down section at the bottom */}
                    <button
                        className="absolute bottom-10 flex flex-col items-center z-10 focus:outline-none animate-fadeIn transition duration-75 text-zinc-200"
                        aria-label="Scroll Down Button"
                        onClick={() => { handleComponentScroll('introduction') }}
                    >
                        {/* Downward Arrow Icon */}
                        <FontAwesomeIcon icon={faChevronDown} className="h-8 w-8 animate-bounce border-2 rounded-full p-2" />
                        {/* "Scroll Down" Text */}
                        <p className="text-lg md:text-xl">Scroll Down</p>
                    </button>
                </>
            )}

            {/* Styles */}
            <style>
                {`
          /* Loading bar animation */
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); }
          }

          .animate-loading {
            animation: loading 3s linear forwards;
          }

          /* Dots styling */
          .dot {
            position: absolute;
            bottom: -100px;
            background-color: red;
            border-radius: 50%;
            opacity: 0.8;
            animation: moveUp linear infinite;
          }

          @keyframes moveUp {
            0% {
              transform: translateY(0);
              opacity: 0.8;
            }
            100% {
              transform: translateY(-120vh);
              opacity: 0;
            }
          }

          /* Typing text animation */
          @keyframes fade {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          .animate-fade {
            animation: fade 4s;
          }
        `}
            </style>
        </div>
    );
};

export default LandingPage;
