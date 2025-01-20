import React from "react";
import ItGleeLogo from "../images/itGleeLogo.png"
import DellentLogo from "../images/dellent_consulting_logo.jpg"

const ProfessionalExperienceComponent = () => {
    const experiences = [
        {
            company: "itGlee",
            position: "Frontend Developer",
            duration: "Sep 2024 - Present",
            logo: ItGleeLogo,
            description:
                "itGlee and BelleEpoque new website development using React and TailwindCSS.",
            keyAchievements: [
                "Built user-friendly, accessible and responsive websites.",
                "SEO optimization for better search engine rankings.",
                "Integration with Email and Google Drive plugins.",
                "Deployed the websites using AWS.",
            ],
            techStack: ["React", "JavaScript", "HTML", "CSS", "TailwindCSS", "AWS", "SEO"],
        },
        {
            company: "itGlee - PPL Next Gen",
            position: "OutSystems Developer",
            duration: "Jan 2022 - Sep 2024",
            logo: ItGleeLogo,
            description:
                "Worked on PPL (Placing Platform Limited) Next Gen project using OutSystems. PPL Next Gen is the new electronic trading platform for the London insurance market. It’s not simply a replacement for the existing PPL platform. It’s the London market rebuilt and reimagined for a digital first environment, more intuitive, more flexible, more scalable.",
            keyAchievements: [
                "Requirement Analysis.",
                "Solution Design.",
                "Junior mentoring, Tech Lead helper and Code Reviewer.",
                "Worked in a big and complex project."
            ],
            techStack: ["OutSystems", "HTML", "CSS", "JavaScript", "MongoDB", "SQL", "Rest API", "Agile", "Jira"],
        },
        {
            company: "Dellent Consulting - Altice Labs",
            position: "Frontend Developer",
            duration: "Jan 2020 - Dec 2021",
            logo: DellentLogo,
            description:
                "AGORA is a network management app with a set of tools which allows the users to config and control all the fibre network equipments from the control center to the consumer house.",
            keyAchievements: [
                "Developed new tools and features in the already existing app.",
                "Learned how to work in an Agile environment and how to use Jira.",
            ],
            techStack: ["HTML", "CSS", "JavaScript", "AngularJS", "Rest API", "XML", "Agile", "Jira"],
        },
    ];

    return (
        <div className="p-8 md:px-80 bg-zinc-800 text-zinc-300">
            <h2 className="text-4xl font-semibold mb-6 text-center font-sourceCode">Professional Experience</h2>

            <div className="space-y-8">
                {experiences.map((exp, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-6 py-4">
                        <div className="flex items-center space-x-6 mb-4">
                            {/* Company Logo */}
                            <img src={exp.logo} alt={`${exp.company} logo`} className="w-24 h-24 rounded-full border-2 border-zinc-600 object-contain" />
                            <div>
                                <h3 className="text-2xl font-semibold">{exp.company}</h3>
                                <p className="text-xl text-gray-400">{exp.position}</p>
                                <p className="text-lg text-gray-500">{exp.duration}</p>
                            </div>
                        </div>

                        <p className="text-lg">{exp.description}</p>

                        {/* Key Achievements */}
                        {exp.keyAchievements && (
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold text-red-500 mb-2">Key Achievements:</h4>
                                <ul className="list-disc list-inside text-lg text-gray-300">
                                    {exp.keyAchievements.map((achievement, i) => (
                                        <li key={i}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Technologies */}
                        {exp.techStack && (
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold text-red-500 mb-2">Technologies and Skills:</h4>
                                <ul className="flex flex-wrap gap-2 text-lg text-zinc-200">
                                    {exp.techStack.map((tech, i) => (
                                        <li key={i} className="px-3 py-1 bg-red-900 rounded-full">{tech}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfessionalExperienceComponent;
