import React from "react";

const Skills = () => {
    const skills = [
        { name: "JavaScript", percentage: 90 },
        { name: "HTML", percentage: 90 },
        { name: "React", percentage: 85 },
        { name: "CSS", percentage: 80 },
        { name: "Node.js", percentage: 70 },
        { name: "OutSystems", percentage: 80 },
        { name: "SQL", percentage: 75 },
        { name: "MongoDB", percentage: 70 },
    ];

    return (
        <div className="pt-24 bg-zinc-800">
            <h2 className="text-4xl font-semibold mb-6 text-center font-sourceCode text-zinc-300">Skills</h2>
            <div className="pt-4 grid grid-cols-1 md:grid-cols-4 gap-x-1 gap-y-12 p-8 px-20">

                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center space-y-2"
                    >
                        {/* Circular Progress */}
                        <div className="relative w-40 h-40">
                            {/* Circular Progress */}
                            <svg className="absolute inset-0 w-full h-full transform">
                                {/* Background Circle */}
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="70"
                                    className="stroke-zinc-300 stroke-[10] fill-none"
                                />
                                {/* Foreground Progress */}
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="70"
                                    className="stroke-red-500 stroke-[10] fill-none"
                                    style={{
                                        strokeDasharray: `${2 * Math.PI * 70}`,
                                        strokeDashoffset: `${(2 * Math.PI * 70 * (100 - skill.percentage)) / 100
                                            }`,
                                        transition: "stroke-dashoffset 0.4s ease-out",
                                    }}
                                />
                            </svg>
                            {/* Percentage */}
                            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-red-500">
                                {skill.percentage}%
                            </div>
                        </div>
                        {/* Skill Name */}
                        <p className="text-center text-2xl text-zinc-200 font-semibold">{skill.name}</p>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Skills;
