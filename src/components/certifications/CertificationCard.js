import { memo } from 'react';

const providerLogos = {
	OutSystems: `${process.env.PUBLIC_URL}/images/certifications/outsystems.png`,
	Udemy: `${process.env.PUBLIC_URL}/images/certifications/udemy.png`,
};

const CertificationCard = memo(({ certification }) => {
	const logoUrl = providerLogos[certification.provider] || '/api/placeholder/192/192';

	return (
		<article className="flex flex-col items-center w-full p-3 sm:p-4 bg-zinc-700/20 rounded-lg hover:transform hover:scale-105 transition-transform duration-300 group">
			<div className="relative mb-3 sm:mb-4 overflow-hidden rounded-md w-32 h-32 sm:w-48 sm:h-48">
				<img
					src={logoUrl}
					alt={`${certification.provider} logo`}
					className="w-full h-full border-2 border-zinc-500 object-contain bg-white"
					loading="lazy"
					onError={(e) => {
						e.target.src = "/api/placeholder/192/192";
						e.target.alt = "Certification provider logo not found";
					}}
				/>
			</div>
			<span className="text-sm sm:text-md text-zinc-400 mb-1 sm:mb-2 group-hover:text-zinc-300 transition-colors duration-300">
				{certification.provider}
			</span>
			<h3 className="font-semibold text-center text-zinc-200 mb-1 sm:mb-2 px-2 sm:px-4 group-hover:text-zinc-100 transition-colors duration-300 text-sm sm:text-base">
				{certification.title}
			</h3>
			<time dateTime={certification.year.toString()} className="text-red-500 font-medium group-hover:text-red-400 transition-colors duration-300 text-sm sm:text-base">
				{certification.year}
			</time>
		</article>
	);
});

CertificationCard.displayName = 'CertificationCard';

export default CertificationCard;
