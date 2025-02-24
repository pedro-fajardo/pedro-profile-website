import React, { useState } from "react";
import ExperienceCard from "./ExperienceCard";
import { motion, AnimatePresence } from "framer-motion";

const EXPERIENCES_DATA = [
  {
    company: "itGlee",
    position: "Frontend Developer",
    duration: "Sep 2024 - Present",
    logo: `${process.env.PUBLIC_URL}/images/company/itGlee.png`,
    description:
      "itGlee and BelleEpoque new website development using React and TailwindCSS.",
    keyAchievements: [
      "Built user-friendly, accessible and responsive websites.",
      "SEO optimization for better search engine rankings.",
      "Integration with Email and Google Drive plugins.",
      "Deployed the websites using AWS.",
    ],
    techStack: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "TailwindCSS",
      "AWS",
      "SEO",
    ],
  },
  {
    company: "itGlee - PPL Next Gen",
    position: "OutSystems Developer",
    duration: "Jan 2022 - Sep 2024",
    logo: `${process.env.PUBLIC_URL}/images/company/itGlee.png`,
    description:
      "Worked on PPL (Placing Platform Limited) Next Gen project using OutSystems. PPL Next Gen is the new electronic trading platform for the London insurance market. It's not simply a replacement for the existing PPL platform. It's the London market rebuilt and reimagined for a digital first environment, more intuitive, more flexible, more scalable.",
    keyAchievements: [
      "Requirement Analysis.",
      "Solution Design.",
      "Junior mentoring, Tech Lead helper and Code Reviewer.",
      "Worked in a big and complex project.",
    ],
    techStack: [
      "OutSystems",
      "HTML",
      "CSS",
      "JavaScript",
      "MongoDB",
      "SQL",
      "Rest API",
      "Agile",
      "Jira",
    ],
  },
  {
    company: "Dellent Consulting - Altice Labs",
    position: "Frontend Developer",
    duration: "Jan 2020 - Dec 2021",
    logo: `${process.env.PUBLIC_URL}/images/company/dellentConsulting.jpg`,
    description:
      "AGORA is a network management app with a set of tools which allows the users to config and control all the fibre network equipments from the control center to the consumer house.",
    keyAchievements: [
      "Developed new tools and features in the already existing app.",
      "Learned how to work in an Agile environment and how to use Jira.",
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "AngularJS",
      "Rest API",
      "XML",
      "Agile",
      "Jira",
    ],
  },
];

const Experience = () => {
  const [activeExperience, setActiveExperience] = useState(0);

  return (
    <section className="py-24" id="experience">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2 
          className="text-3xl sm:text-4xl font-semibold mb-12 text-center text-zinc-300 font-sourceCode"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Professional Experience
        </motion.h2>

        <div className="space-y-4">
          <AnimatePresence>
            {EXPERIENCES_DATA.map((experience, index) => (
              <motion.div
                key={experience.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ExperienceCard
                  experience={experience}
                  isActive={activeExperience === index}
                  onClick={() => setActiveExperience(index === activeExperience ? null : index)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
