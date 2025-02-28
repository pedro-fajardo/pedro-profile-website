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
		open: { opacity: 1, y: 0 },
		closed: { opacity: 0, y: -10 }
	};

	return (
		<div className="fixed top-4 left-4 z-50">
			<button
				className="bg-transparent text-white p-4 rounded-full hover:bg-zinc-700 transition focus:outline-none"
				onClick={toggleMenu}
				aria-label="Menu"
			>
				<FontAwesomeIcon icon={faBars} className="text-xl w-6 h-6" />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="bg-zinc-600 rounded shadow-lg py-2 w-54"
						initial="closed"
						animate="open"
						exit="closed"
						variants={menuVariants}
					>
						<ul className="flex flex-col space-y-2">
							{menuOptions.map((option, index) => (
								<motion.li
									key={index}
									className="px-4 py-2 flex items-center space-x-3 cursor-pointer hover:bg-zinc-500 transition-colors"
									onClick={() => handleComponentScroll(option.scrollInto)}
									variants={itemVariants}
								>
									<FontAwesomeIcon icon={option.icon} className="text-zinc-200" />
									<span className="text-zinc-200">{option.text}</span>
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
