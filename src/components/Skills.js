import React from "react";

const Skills = () => {
    const skills = [
        { name: "JavaScript", percentage: 85 },
        { name: "React", percentage: 75 },
        { name: "CSS", percentage: 90 },
        { name: "Node.js", percentage: 70 },
    ];

    return (
        <div className="pt-24 bg-zinc-800">
            <h2 className="text-4xl font-semibold mb-6 text-center font-sourceCode text-zinc-300">Skills</h2>
            <div className="pt-12 grid grid-cols-1 md:grid-cols-4 gap-6 p-8">

            {skills.map((skill, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center justify-center space-y-4"
                >
                    {/* Circular Progress */}
                    <div className="relative w-40 h-40">
                        {/* Background Circle */}
                        <div className="absolute inset-0 rounded-full border-4 border-zinc-300"></div>
                        {/* Foreground Progress */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="40%"
                                className="stroke-red-500 stroke-[8] fill-none"
                                style={{
                                    strokeDasharray: "251.2",
                                    strokeDashoffset: `${251.2 - (251.2 * skill.percentage) / 100}`,
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
