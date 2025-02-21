import React from "react";

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

const SkillCircle = React.memo(({ name, percentage }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 group">
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
          <circle
            cx="100"
            cy="100"
            r={radius}
            className="stroke-red-500 stroke-[10] fill-none transition-all duration-1000 ease-out"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </svg>
        {/* Percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-red-500 transition-all duration-300 group-hover:scale-110">
            {percentage}%
          </span>
        </div>
      </div>
      {/* Skill Name */}
      <p className="text-center text-xl text-zinc-200 font-semibold transition-colors duration-300 group-hover:text-red-500">
        {name}
      </p>
    </div>
  );
});

const Skills = () => {
  return (
    <section className="py-24 bg-zinc-800 font-sourceCode">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-semibold mb-16 text-center text-zinc-300">
          Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-16">
          {SKILLS_DATA.map((skill) => (
            <SkillCircle
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;