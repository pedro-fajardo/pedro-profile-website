import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faGraduationCap, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import PedroFajardo from '../images/PedroFajardo.jpg';
import { faEnvelope, faStar } from "@fortawesome/free-regular-svg-icons";

const IntroductionComponent = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-center p-16 bg-zinc-800 text-white">
                {/* Photo Section */}
                <div className="md:w-1/3 mb-6 md:mb-0">
                    <img
                        src={PedroFajardo}
                        alt="Pedro Fajardo"
                        className="w-64 h-64 rounded-full object-cover mx-auto border-2 border-zinc-500"
                    />
                </div>

                {/* Text Section */}
                <div className="md:w-2/3 md:ml-6 md:mr-24 text-zinc-200 text-center md:text-left">
                    <h2 className="text-3xl font-semibold mb-8 font-sourceCode">Hi, I'm Pedro Fajardo!</h2>
                    <p className="mb-4 text-lg">
                        I'm a passionate software developer with a focus on building
                        intuitive and user-friendly applications. I have experience working
                        with modern web technologies such as <b className="text-red-500">React</b>, <b className="text-red-500">Node.js</b>,
                        and <b className="text-red-500">Next.js</b> and low-code platforms such as <b className="text-red-500">OutSystems</b>. I
                        enjoy solving complex problems and creating seamless user experiences and having a friendly and happy team environment.
                    </p>
                </div>
            </div>
            <div className="w-full  bg-zinc-800 font-sourceCode pb-16">
                <div className="bg-zinc-200 mx-4 md:mx-60 py-14 md:py-24 px-8 md:px-24 border-8 bg-zinc-200 border-zinc-500 rounded-md text-center justify-items-center">
                    <h2 className="text-2xl md:text-3xl font-bold pb-8"><FontAwesomeIcon icon={faBaby}></FontAwesomeIcon> Full Name</h2>
                    <p className="text-xl md:text-2xl pb-10 md:pb-16">Pedro Miguel Oliveira Fajardo</p>

                    <h2 className="text-2xl md:text-3xl font-bold pb-8"><FontAwesomeIcon icon={faStar}></FontAwesomeIcon> Born</h2>
                    <p className="text-xl md:text-2xl pb-10 md:pb-16">27 Aug 1998 - Figueira da Foz, Portugal</p>

                    <h2 className="text-2xl md:text-3xl font-bold pb-8"><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Currently Living</h2>
                    <p className="text-xl md:text-2xl pb-10 md:pb-16">Guia, Portugal</p>

                    <h2 className="text-2xl md:text-3xl font-bold pb-8"><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> Email</h2>
                    <p className="text-xl md:text-2xl pb-10 md:pb-16">pedro.fajardo.dev@gmail.com</p>

                    <h2 className="text-2xl md:text-3xl font-bold pb-8"><FontAwesomeIcon icon={faGraduationCap}></FontAwesomeIcon> Degree</h2>
                    <p className="text-xl md:text-2xl">Bachelor's Degree in Computer Science</p>
                    <p className="text-md">Universidade de Aveiro</p>
                </div>
            </div>
        </>

    );
};

export default IntroductionComponent;
