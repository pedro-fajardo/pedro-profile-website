import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faGraduationCap, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faStar } from "@fortawesome/free-regular-svg-icons";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const IntroductionComponent = () => {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 }
	};

	return (
		<>
			<motion.div
				className="flex flex-col md:flex-row items-center justify-center p-16 text-white"
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
				variants={containerVariants}
				ref={ref}
			>
				<motion.div className="md:w-1/3 mb-6 md:mb-0" variants={itemVariants}>
					<img
						src={`${process.env.PUBLIC_URL}/images/PedroFajardo.jpg`}
						alt="Pedro Fajardo"
						className="w-64 h-64 rounded-full object-cover mx-auto border-2 border-zinc-500 hover:scale-105 transition-transform duration-300"
					/>
				</motion.div>

				<motion.div className="md:w-2/3 md:ml-6 md:mr-24 text-zinc-200 text-center md:text-left" variants={itemVariants}>
					<h2 className="text-3xl font-semibold mb-8 font-sourceCode">Hi, I'm Pedro Fajardo!</h2>
					<p className="mb-4 text-lg">
						I'm a passionate software developer with a focus on building
						intuitive and user-friendly applications. I have experience working
						with modern web technologies such as <b className="text-red-500 hover:text-red-400 transition-colors">React</b>, <b className="text-red-500 hover:text-red-400 transition-colors">Node.js</b>,
						and <b className="text-red-500 hover:text-red-400 transition-colors">Next.js</b> and low-code platforms such as <b className="text-red-500 hover:text-red-400 transition-colors">OutSystems</b>. I
						enjoy solving complex problems and creating seamless user experiences and having a friendly and happy team environment.
					</p>
				</motion.div>
			</motion.div>
			<div className="w-full font-sourceCode pb-16">
				<motion.div
					className="bg-zinc-200 mx-4 md:mx-60 py-14 md:py-24 px-8 md:px-24 border-8 bg-zinc-200 border-zinc-500 rounded-md text-center justify-items-center"
					initial={{ opacity: 0, y: 50 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.5 }}
				>
					<h2 className="text-2xl md:text-3xl font-bold pb-8"><FontAwesomeIcon icon={faBaby}></FontAwesomeIcon> Full Name</h2>
					<p className="text-xl md:text-2xl pb-10 md:pb-16">Pedro Miguel Oliveira Fajardo</p>

					<h2 className="text-2xl md:text-3xl font-bold pb-8"><FontAwesomeIcon icon={faStar}></FontAwesomeIcon> Born</h2>
					<p className="text-xl md:text-2xl pb-10 md:pb-16">27 Aug 1998 - Figueira da Foz, Portugal</p>

					<h2 className="text-2xl md:text-3xl font-bold pb-8"><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Currently Living</h2>
					<p className="text-xl md:text-2xl pb-10 md:pb-16">Guia, Portugal</p>

					<h2 className="text-2xl md:text-3xl font-bold pb-8"><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> Email</h2>
					<p className="text-xl md:text-2xl pb-10 md:pb-16 break-words">pedro.fajardo.dev@gmail.com</p>

					<h2 className="text-2xl md:text-3xl font-bold pb-8"><FontAwesomeIcon icon={faGraduationCap}></FontAwesomeIcon> Degree</h2>
					<p className="text-xl md:text-2xl">Bachelor's Degree in Computer Science</p>
					<p className="text-md">Universidade de Aveiro</p>
				</motion.div>
			</div>
		</>

	);
};

export default IntroductionComponent;
