import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWrench, faBriefcase, faAddressCard, faBars } from "@fortawesome/free-solid-svg-icons";

const FloatingHamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [closing, setClosing] = useState(false);

    const toggleMenu = () => {
        if (isOpen) {
            setClosing(true);
            setTimeout(() => {
                setIsOpen(false);
                setClosing(false);
            }, 400);
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
        { icon: faBriefcase, text: "Professional Experience", scrollInto: "professionalExperience" },
        { icon: faWrench, text: "Skills", scrollInto: "skills" },
        { icon: faAddressCard, text: "Contact", scrollInto: "contact" },
    ];

    return (
        <div className="fixed top-4 left-4 z-50">
            <button
                className="bg-transparemt text-white p-4 rounded-full hover:bg-zinc-700 transition focus:outline-none"
                onClick={toggleMenu}
            >
                <FontAwesomeIcon icon={faBars} className="text-xl w-6 h-6" />
            </button>

            {/* Menu Options */}
            {isOpen && (
                <div className={`bg-zinc-600 rounded shadow-lg py-2 w-54 ${closing ? "animate-fadeOutDown" : "animate-fadeInUp"}`}>
                    <ul className="flex flex-col space-y-2">
                        {menuOptions.map((option, index) => (
                            <button key={index} onClick={() => { handleComponentScroll(option.scrollInto) }}>
                                <li
                                    key={index}
                                    className={`px-4 py-2 flex items-center space-x-3 ${closing ? "opacity-100" : "opacity-0 animate-fadeInUp"}`}
                                    style={{ animationDelay: closing ? undefined : `${index * 0.1}s` }}
                                >
                                    <FontAwesomeIcon icon={option.icon} className="text-zinc-200" />
                                    <span className="text-zinc-200">{option.text}</span>
                                </li>
                            </button>

                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
};

export default FloatingHamburgerMenu;
