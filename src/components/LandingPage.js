import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const LandingPage = ({ loading, setLoading }) => {
	const [text, setText] = useState("");
	const [showDots, setShowDots] = useState(false);
	const fullText = "Welcome to my Profile!";
	const dotsContainerRef = useRef(null);

	useEffect(() => {
		const loadingTimeout = setTimeout(() => {
			setLoading(false);
		}, 4000);

		return () => clearTimeout(loadingTimeout);
	}, [setLoading]);

	useEffect(() => {
		if (!loading) {
			let currentIndex = 0;
			let timeoutId;

			const typeText = () => {
				if (currentIndex < fullText.length) {
					setText(fullText.slice(0, currentIndex + 1));
					currentIndex++;
					timeoutId = setTimeout(typeText, 100);
				} else {
					setShowDots(true);
				}
			};

			setText("");
			timeoutId = setTimeout(typeText, 100);
			return () => clearTimeout(timeoutId);
		}
	}, [loading, fullText]);

	const handleComponentScroll = useCallback((id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		}
	}, []);

	const dots = useMemo(() =>
		Array.from({ length: 30 }).map((_, index) => {
			const randomSize = Math.random() * 50 + 5;
			return (
				<div
					key={index}
					className="dot"
					style={{
						left: `${Math.random() * 100}%`,
						animationDelay: `${Math.random() * 3}s`,
						animationDuration: `${3 + Math.random() * 3}s`,
						width: `${randomSize}px`,
						height: `${randomSize}px`,
					}}
				/>
			);
		}), []);

	return (
		<div className="relative flex items-center justify-center h-screen w-screen bg-gradient-to-b from-black to-zinc-800 overflow-hidden">
			{loading && (
				<div className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center z-20">
					<div className="relative w-2/3 h-2 bg-zinc-700 rounded overflow-hidden">
						<div className="h-full bg-red-500 animate-loading" />
					</div>
				</div>
			)}

			{!loading && (
				<>
					<div className="absolute z-10 text-center px-16 md:px-0">
						<h1 className="animate-fade font-semibold text-6xl text-zinc-200 font-sourceCode">
							{text}
						</h1>
					</div>

					{showDots && (
						<div
							className="absolute inset-0 z-0 overflow-hidden"
							ref={dotsContainerRef}
						>
							{dots}
						</div>
					)}

					<button
						className="absolute bottom-10 flex flex-col items-center z-10 focus:outline-none animate-fadeIn transition duration-75 text-zinc-200 hover:text-red-500 hover:scale-105"
						aria-label="Scroll Down Button"
						onClick={() => handleComponentScroll("introduction")}
					>
						<FontAwesomeIcon
							icon={faChevronDown}
							className="h-8 w-8 animate-bounce border-2 rounded-full p-2"
						/>
						<p className="text-lg md:text-xl">Scroll Down</p>
					</button>
				</>
			)}

			<style jsx>{`
            @keyframes loading {
               0% { transform: translateX(-100%); }
               100% { transform: translateX(0); }
            }

            .animate-loading {
               animation: loading 3s linear forwards;
            }

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

            @keyframes fade {
               0% { opacity: 0; }
               100% { opacity: 1; }
            }

            .animate-fade {
               animation: fade 4s;
            }
         `}</style>
		</div>
	);
};

export default LandingPage;
