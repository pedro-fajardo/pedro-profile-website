import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faGraduationCap, faLocationDot, faEnvelope, faStar, faLanguage, faBriefcase, faLaptop, faClock } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const IntroductionComponent = () => {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
	};

	return (
		<div className="min-h-screen pt-20 px-4 bg-zinc-800">
			<motion.div
				className="max-w-6xl mx-auto"
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
				variants={containerVariants}
				ref={ref}
			>
				<motion.div className="flex flex-col md:flex-row items-center gap-12 mb-20" variants={itemVariants}>
					<div className="relative">
						<div className="absolute -inset-1.5 bg-gradient-to-r from-red-500 to-zinc-500 rounded-full blur-md"></div>
						<img
							src={`${process.env.PUBLIC_URL}/images/PedroFajardo.jpg`}
							alt="Pedro Fajardo"
							className="relative w-64 h-64 rounded-full object-cover border-4 border-zinc-800 hover:scale-105 transition-transform duration-300"
						/>
					</div>

					<div className="md:w-2/3 text-center md:text-left space-y-6">
						<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent font-sourceCode">
							Hi, I'm Pedro Fajardo!
						</h2>
						<p className="text-lg text-zinc-300 leading-relaxed">
							I'm a passionate software developer with a focus on building
							intuitive and user-friendly applications. I have experience working
							with modern web technologies such as{' '}
							<span className="text-red-400 font-semibold">React</span>,{' '}
							<span className="text-red-400 font-semibold">Node.js</span>,{' '}
							<span className="text-red-400 font-semibold">Next.js</span> and low-code platforms such as{' '}
							<span className="text-red-400 font-semibold">OutSystems</span>. I
							enjoy solving complex problems and creating seamless user experiences and having a friendly and happy team environment.
						</p>
					</div>
				</motion.div>

				<motion.div 
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
					variants={itemVariants}
				>
					{[
						{ icon: faBaby, title: "Full Name", content: "Pedro Miguel Oliveira Fajardo" },
						{ icon: faStar, title: "Born", content: "27 Aug 1998 - Figueira da Foz, Portugal" },
						{ icon: faLocationDot, title: "Currently Living", content: "Guia, Portugal" },
						{ icon: faEnvelope, title: "Email", content: "pedro.fajardo.dev@gmail.com" },
						{ icon: faGraduationCap, title: "Education", 
						  content: <>Bachelor's Degree in Computer Science<br/><span className="text-sm text-zinc-400">Universidade de Aveiro</span></> },
						{ icon: faLanguage, title: "Languages", 
						  content: <>Portuguese (Native)<br/>English (Fluent)</> },
						{ icon: faBriefcase, title: "Experience", 
						  content: "5+ Years in Software Development" },
						{ icon: faLaptop, title: "Work Preference", 
						  content: "Remote / Hybrid" },
						{ icon: faClock, title: "Timezone", 
						  content: "GMT/UTC (Lisbon)" },
					].map((item, index) => (
						<motion.div
							key={index}
							className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-6 hover:bg-zinc-700/50 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col items-center text-center"
							whileHover={{ scale: 1.05 }}
						>
							<FontAwesomeIcon icon={item.icon} className="text-red-400 text-2xl mb-4" />
							<h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
							<p className="text-zinc-300">{item.content}</p>
						</motion.div>
					))}
				</motion.div>
			</motion.div>
		</div>
	);
};

export default IntroductionComponent;
