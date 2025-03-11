import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faCode, faBriefcase, faGraduationCap, faAddressCard, faBars, faTerminal } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const FloatingHamburgerMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		if (isOpen) {
			setTimeout(() => {
				setIsOpen(false);
			}, 100);
		} else {
			setIsOpen(true);
		}
	};

	const handleComponentScroll = (id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			setIsOpen(false);
		}
	};

	const menuOptions = [
		{ icon: faInfoCircle, text: "Introduction", scrollInto: "introduction" },
		{ icon: faBriefcase, text: "Professional Experience", scrollInto: "experience" },
		{ icon: faCode, text: "Skills", scrollInto: "skills" },
		{ icon: faTerminal, text: "Projects", scrollInto: "projects" },
		{ icon: faGraduationCap, text: "Certifications and Courses", scrollInto: "certifications" },
		{ icon: faAddressCard, text: "Contact", scrollInto: "contact" },
	];

	const menuVariants = {
		open: {
			opacity: 1,
			y: 0,
			transition: { staggerChildren: 0.1, delayChildren: 0.2 }
		},
		closed: {
			opacity: 0,
			y: -20,
			transition: { staggerChildren: 0.05, staggerDirection: -1 }
		}
	};

	const itemVariants = {
		open: { opacity: 1},
		closed: { opacity: 0 }
	};

	return (
		<div className="fixed top-4 left-4 z-50">
			<button
				className="bg-zinc-800/70 backdrop-blur-sm text-white p-3.5 rounded-xl hover:bg-zinc-700/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-400 shadow-lg"
				onClick={toggleMenu}
				aria-label="Menu"
			>
				<FontAwesomeIcon icon={faBars} className="text-xl w-5 h-5" />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="absolute top-16 bg-zinc-800/90 backdrop-blur-md rounded-xl shadow-xl py-3 w-64 border border-zinc-700/50"
						initial="closed"
						animate="open"
						exit="closed"
						variants={menuVariants}
					>
						<ul className="flex flex-col space-y-1">
							{menuOptions.map((option, index) => (
								<motion.li
									key={index}
									className="mx-2 px-4 py-2.5 flex items-center space-x-3 cursor-pointer hover:bg-zinc-700/70 rounded-lg transition-all duration-200"
									onClick={() => handleComponentScroll(option.scrollInto)}
									variants={itemVariants}
								>
									<FontAwesomeIcon icon={option.icon} className="text-zinc-300 w-5 h-5" />
									<span className="text-zinc-200 font-medium">{option.text}</span>
								</motion.li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default FloatingHamburgerMenu;
