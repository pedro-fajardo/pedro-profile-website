import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCode,
	faBuilding,
	faCalendar,
	faAward,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const ExperienceCard = ({ experience, isActive, onClick }) => {
	return (
		<motion.div
			className={`relative rounded-xl p-8 transition-all duration-500 cursor-pointer ${isActive
					? "bg-red-900/20 border-red-500 shadow-lg shadow-red-900/20"
					: "bg-zinc-700/10 hover:bg-zinc-700"
				}`}
			onClick={onClick}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			<div className="flex flex-col md:flex-row items-start gap-4">
				<div className="relative">
					<div className="w-20 h-20 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
						<img
							src={experience.logo}
							alt={`${experience.company} logo`}
							className="w-16 h-16 object-contain"
							loading="lazy"
							onError={(e) => {
								e.currentTarget.onerror = null;
								e.currentTarget.src = "/api/placeholder/48/48";
							}}
						/>
					</div>
				</div>

				<div className="flex-1 w-full">
					<div className="flex justify-between items-start">
						<div>
							<h3 className="text-2xl font-semibold text-zinc-200 mb-2">
								{experience.company}
							</h3>
							<div className="flex items-center gap-2 text-zinc-400 text-lg">
								<FontAwesomeIcon icon={faBuilding} />
								<span>{experience.position}</span>
							</div>
							<div className="flex items-center gap-2 text-zinc-500 text-lg">
								<FontAwesomeIcon icon={faCalendar} />
								<span>{experience.duration}</span>
							</div>
							{experience.partner && ( // Display partner if exists
								<div className="flex items-center gap-2 text-zinc-500 mb-3 text-lg">
									<FontAwesomeIcon icon={faBuilding} />
									<span>Partner: {experience.partner}</span>
								</div>
							)}
						</div>
						<div
							className={`transition-transform duration-300 text-red-500 ${isActive ? "rotate-90" : ""}`}
						>
							<FontAwesomeIcon icon={faChevronRight} />
						</div>
					</div>

					<AnimatePresence>
						{isActive && (
							<motion.div
								className="mt-6 space-y-6 w-full"
								initial={{ opacity: 0, height: 0 }}
								animate={{
									opacity: 1,
									height: 'auto',
									transition: {
										delay: 0.2,
										duration: 0.5
									}
								}}
								exit={{
									opacity: 0,
									height: 0,
									transition: { duration: 0.2 }
								}}
							>
								<p className="text-zinc-300 text-lg leading-relaxed">
									{experience.description}
								</p>

								<div>
									<div className="flex items-center gap-2 text-red-500 mb-3">
										<FontAwesomeIcon icon={faAward} />
										<h4 className="font-semibold">Key Achievements</h4>
									</div>
									<ul className="space-y-2 text-zinc-300 ml-6">
										{experience.keyAchievements.map((achievement, i) => (
											<li key={i} className="list-disc">
												{achievement}
											</li>
										))}
									</ul>
								</div>

								<div>
									<div className="flex items-center gap-2 text-red-500 mb-3">
										<FontAwesomeIcon icon={faCode} />
										<h4 className="font-semibold">Tech Stack</h4>
									</div>
									<div className="flex flex-wrap gap-2">
										{experience.techStack.map((tech, i) => (
											<span
												key={i}
												className="px-4 py-1.5 bg-red-500/10 rounded-full text-base text-red-400 border border-red-500/20"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	);
};

export default ExperienceCard;