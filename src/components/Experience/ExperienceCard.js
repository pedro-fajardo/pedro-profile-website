import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCode,
   faBuilding,
   faCalendar,
   faAward,
   faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const ExperienceCard = ({ experience, isActive, onClick }) => {
   return (
      <div
         className={`
        relative rounded-xl p-6 transition-all duration-500 cursor-pointer
        ${
           isActive
              ? "bg-red-900/20 border-red-500 shadow-lg shadow-red-900/20"
              : "bg-zinc-700/10 hover:bg-zinc-700"
        }
      `}
         onClick={onClick}
      >
         <div className="flex items-start gap-4">
            <div className="relative">
               <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
                  <img
                     src={experience.logo}
                     alt={`${experience.company} logo`}
                     className="w-12 h-12 object-contain"
                     loading="lazy"
                     onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/api/placeholder/48/48";
                     }}
                  />
               </div>
            </div>

            <div className="flex-1">
               <div className="flex justify-between items-start">
                  <div>
                     <h3 className="text-xl font-semibold text-zinc-200 mb-1">
                        {experience.company}
                     </h3>
                     <div className="flex items-center gap-2 text-zinc-400 mb-2">
                        <FontAwesomeIcon icon={faBuilding} />
                        <span>{experience.position}</span>
                     </div>
                     <div className="flex items-center gap-2 text-zinc-500">
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>{experience.duration}</span>
                     </div>
                  </div>
                  <div
                     className={`transition-transform duration-300 text-red-500 ${
                        isActive ? "rotate-90" : ""
                     }`}
                  >
                     <FontAwesomeIcon icon={faChevronRight} />
                  </div>
               </div>

               {isActive && (
                  <div className="mt-6 space-y-6 animate-fadeIn">
                     <p className="text-zinc-300">{experience.description}</p>

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
                                 className="px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400 border border-red-500/20"
                              >
                                 {tech}
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default ExperienceCard;