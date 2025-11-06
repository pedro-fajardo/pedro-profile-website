import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const ProjectCard = ({ project, isActive, index, activeIndex }) => {
    const scrollToContact = () => {
        const el = document.getElementById('contact');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        window.location.hash = '#contact';
    };

	return (
		<div className="h-full w-full py-4 px-2">
			<motion.article
				className="group bg-zinc-700 rounded-lg shadow-lg hover:shadow-2xl flex flex-col w-full min-w-[300px] max-w-[400px] md:min-w-0 md:max-w-none mx-auto h-full"
				initial={{ opacity: 0, x: isActive ? 0 : (index < activeIndex ? -100 : 100) }}
				animate={{
					opacity: 1,
					x: 0,
					scale: 1
				}}
				transition={{ duration: 0.3 }}
				whileHover={{ scale: window.innerWidth < 768 ? 1 : 1.05 }}
			>
				<div className="relative h-48 md:h-60 w-full">
					<LazyLoadImage
						src={project.thumbnail}
						alt={project.name}
						className="w-full h-full rounded-t-lg object-cover"
						effect="blur"
						width="100%"
						height="100%"
					/>
				</div>
				<div className="p-4 md:p-6 flex flex-col flex-grow">
					<h3 className="text-xl md:text-2xl font-bold text-zinc-200 mb-2 md:mb-3 group-hover:text-red-500 transition-colors">
						{project.name}
					</h3>
					<p className="text-zinc-300 mb-4 md:mb-5 leading-relaxed text-sm md:text-base line-clamp-3">
						{project.description}
					</p>
					<div className="mt-auto">
						<div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
							{project.techStack.map((tech) => (
								<span
									key={tech}
									className="px-2 md:px-3 py-1 md:py-1.5 bg-red-500/10 text-xs md:text-sm rounded-full text-red-500 hover:bg-red-500/20 transition-colors"
								>
									{tech}
								</span>
							))}
						</div>
						<div className="flex gap-2 md:gap-4">
							{project.link && (
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center gap-1 md:gap-2 flex-1 px-2 md:px-4 py-1 md:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm md:text-base"
								>
									<FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs md:text-sm" />
									Visit
								</a>
							)}
							{project.github ? (
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center gap-1 md:gap-2 flex-1 px-2 md:px-4 py-1 md:py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-500 transition-colors text-sm md:text-base"
								>
									<FontAwesomeIcon icon={faGithub} className="text-xs md:text-sm" />
									GitHub
								</a>
							) : project.privateRepo && (
								<button
									onClick={scrollToContact}
									className="flex items-center justify-center gap-1 md:gap-2 flex-1 px-2 md:px-4 py-1 md:py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-500 transition-colors text-sm md:text-base"
								>
									<FontAwesomeIcon icon={faMessage} className="text-xs md:text-sm" />
									Get Quote
								</button>
							)}
						</div>
					</div>
				</div>
			</motion.article>
		</div>
	);
};

export default ProjectCard;