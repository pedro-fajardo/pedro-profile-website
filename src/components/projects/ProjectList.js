import 'react-lazy-load-image-component/src/effects/blur.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, Fragment, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css';
import ProjectCard from './ProjectCard';

const projects = [
	{
		id: 1,
		name: 'Pedro Profile',
		description: 'My profile website to show my professional and personal experience',
		thumbnail: `${process.env.PUBLIC_URL}/images/projects/pedro-profile.png`,
		techStack: ['React', 'JavaScript', 'TailwindCSS', 'CSS', 'HTML'],
		link: 'https://pedro-fajardo.github.io/pedro-profile-website/',
		github: 'https://github.com/pedro-fajardo/pedro-profile-website'
	},
	{
		id: 2,
		name: 'Weather App',
		description: 'Weather app that provides a 5-day forecast, temperature map and temperature evolution graph for the desired city',
		thumbnail: `${process.env.PUBLIC_URL}/images/projects/weather-app.png`,
		techStack: ['React', 'TypeScript', 'CSS', 'HTML'],
		link: 'https://pedro-fajardo.github.io/weather-app/',
		github: 'https://github.com/pedro-fajardo/weather-app'
	},
	{
		id: 3,
		name: 'Equipment Repair Management App',
		description: 'App for management of equipments that come for repair to an appliance store',
		thumbnail: `${process.env.PUBLIC_URL}/images/projects/jomafal-app.png`,
		techStack: ['React', 'JavaScript', 'TailwindCSS', 'CSS', 'HTML', 'Django Rest Framework'],
	},
];

const ProjectList = () => {
	const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 1 : 3);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const swiperRef = useRef(null);

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 768;
			setIsMobile(mobile);
			setItemsPerPage(mobile ? 1 : 3);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<section className="pt-12 md:pt-24 bg-zinc-800 font-sourceCode relative overflow-visible">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl md:text-4xl font-semibold mb-8 md:mb-16 text-center text-zinc-300">
					Some of the projects I've made
				</h2>
				<div className="relative overflow-visible">
					<Swiper
						spaceBetween={30}
						slidesPerView={itemsPerPage}
						centeredSlides={false}
						loop={false}
						threshold={isMobile ? 5 : 50}
						shortSwipes={isMobile}
						followFinger={isMobile}
						touchRatio={isMobile ? 1.2 : 0}
						touchAngle={45}
						speed={500}
						allowTouchMove={isMobile}
						onSwiper={(swiper) => (swiperRef.current = swiper)}
						onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
						style={{ height: 'auto', overflow: 'visible' }}
						className="overflow-visible"
					>
						{projects.map((project, index) => (
							<SwiperSlide key={project.id} style={{ height: 'auto', overflow: 'visible' }}>
								<ProjectCard
									project={project}
									isActive={index === activeIndex}
									index={index}
									activeIndex={activeIndex}
								/>
							</SwiperSlide>
						))}
					</Swiper>
					{!isMobile &&
						<Fragment>
							<div
								className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-20 z-10 w-10 h-10 flex items-center justify-center bg-zinc-700/50 rounded-full hover:bg-zinc-700/80 transition-colors cursor-pointer"
								onClick={() => swiperRef.current?.slidePrev()}
							>
								<FontAwesomeIcon
									icon={faChevronLeft}
									className="text-zinc-400 text-xl hover:text-zinc-200 transition-colors"
								/>
							</div>
							<div
								className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-20 z-10 w-10 h-10 flex items-center justify-center bg-zinc-700/50 rounded-full hover:bg-zinc-700/80 transition-colors cursor-pointer"
								onClick={() => swiperRef.current?.slideNext()}
							>
								<FontAwesomeIcon
									icon={faChevronRight}
									className="text-zinc-400 text-xl hover:text-zinc-200 transition-colors"
								/>
							</div>
						</Fragment>
					}
					{isMobile &&
						<p className="text-center text-zinc-400 mt-4 text-sm">
							Swipe to see more projects
						</p>
					}
				</div>
			</div>
		</section>
	);
};

export default ProjectList;