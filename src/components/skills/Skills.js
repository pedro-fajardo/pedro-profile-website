import React from "react";
import SkillCircle from "./SkillCircle";
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const SKILLS_DATA = [
	{ name: "JavaScript", percentage: 90 },
	{ name: "TypeScript", percentage: 80 },
	{ name: "HTML & CSS", percentage: 90 },
	{ name: "React", percentage: 85 },
	{ name: "Redux", percentage: 75 },
	{ name: "OutSystems", percentage: 85 },
	{ name: "Python", percentage: 80 },
	{ name: "Java", percentage: 75 },
	{ name: "SQL", percentage: 75 },
	{ name: "MongoDB", percentage: 70 },
];

const Skills = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
	});

	return (
		<section ref={ref} className="py-24 bg-zinc-800 font-sourceCode">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-semibold mb-16 text-center text-zinc-300">
					Skills
				</h2>

				<div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-16">
					{SKILLS_DATA.map((skill) => (
						<SkillCircle
							key={skill.name}
							name={skill.name}
							percentage={skill.percentage}
							animate={inView}
						/>
					))}
				</div>

				<div className="sm:hidden relative">
					<Swiper
						spaceBetween={30}
						slidesPerView={1}
						centeredSlides={true}
						loop={true}
					>
						{SKILLS_DATA.map((skill) => (
							<SwiperSlide key={skill.name}>
								<div className="flex justify-center">
									<SkillCircle
										name={skill.name}
										percentage={skill.percentage}
										animate={inView}
									/>
								</div>
							</SwiperSlide>
						))}

						<div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10">
							<FontAwesomeIcon
								icon={faChevronLeft}
								className="text-zinc-400 text-2xl"
							/>
						</div>
						<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10">
							<FontAwesomeIcon
								icon={faChevronRight}
								className="text-zinc-400 text-2xl"
							/>
						</div>
					</Swiper>
					<p className="text-center text-zinc-400 mt-4 text-sm">
						Swipe to see more skills
					</p>
				</div>
			</div>
		</section>
	);
};

export default Skills;