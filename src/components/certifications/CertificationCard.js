import React from "react";

const providerLogos = {
   OutSystems: `${process.env.PUBLIC_URL}/images/certifications/outsystems.png`,
   Udemy: `${process.env.PUBLIC_URL}/images/certifications/udemy.png`,
};

// Extract card component for better organization
const CertificationCard = React.memo(({ certification }) => (
   <div className="flex flex-col items-center max-w-sm p-4 hover:transform hover:scale-105 transition-transform duration-300 bg-zinc-700/20 rounded-lg">
      <div className="relative mb-4 overflow-hidden rounded-md">
         <img
            src={providerLogos[certification.provider]}
            alt={`${certification.provider} logo`}
            className="w-48 h-48 border-2 border-zinc-500 object-contain bg-white"
            loading="lazy"
            onError={(e) => {
               e.target.src = "/api/placeholder/192/192"; // Fallback image
               e.target.alt = "Certification provider logo not found";
            }}
         />
      </div>
      <span className="text-md text-zinc-400 mb-2">
         {certification.provider}
      </span>
      <h3 className="font-semibold text-center text-zinc-200 mb-2 px-4">
         {certification.title}
      </h3>
      <span className="text-red-500 font-medium">{certification.year}</span>
   </div>
));

export default CertificationCard;
