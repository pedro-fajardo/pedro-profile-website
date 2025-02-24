import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const SkillCircle = React.memo(({ name, percentage, animate }) => {
	const radius = 70;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference * (1 - percentage / 100);
	const controls = useAnimation();
	const circleRef = useRef(null);

	useEffect(() => {
		if (animate) {
			controls.start({
				strokeDashoffset,
				transition: { duration: 1, ease: "easeOut" }
			});
		}
	}, [animate, controls, strokeDashoffset]);

	return (
		<motion.div 
			className="flex flex-col items-center justify-center space-y-4 group"
			initial={{ opacity: 0, y: 20 }}
			animate={animate ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.5 }}
		>
			<div className="relative w-40 h-40 transform transition-transform duration-300 group-hover:scale-110">
				<svg
					className="absolute inset-0 w-full h-full transform -rotate-90"
					viewBox="0 0 200 200"
				>
					<circle
						cx="100"
						cy="100"
						r={radius}
						className="stroke-zinc-700 stroke-[10] fill-none"
					/>
					<motion.circle
						ref={circleRef}
						cx="100"
						cy="100"
						r={radius}
						className="stroke-red-500 stroke-[10] fill-none"
						initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
						animate={controls}
					/>
				</svg>

				<div className="absolute inset-0 flex items-center justify-center">
					<motion.span 
						className="text-2xl font-bold text-red-500 transition-all duration-300 group-hover:scale-110"
						initial={{ scale: 0 }}
						animate={animate ? { scale: 1 } : {}}
						transition={{ delay: 0.5 }}
					>
						{percentage}%
					</motion.span>
				</div>
			</div>

			<motion.p 
				className="text-center text-xl text-zinc-200 font-semibold transition-colors duration-300 group-hover:text-red-500"
				initial={{ opacity: 0 }}
				animate={animate ? { opacity: 1 } : {}}
				transition={{ delay: 0.7 }}
			>
				{name}
			</motion.p>
		</motion.div>
	);
});

export default SkillCircle;
