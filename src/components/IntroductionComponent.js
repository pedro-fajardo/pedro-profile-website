import React from "react";
import PedroFajardo from '../images/PedroFajardo.jpg';

const IntroductionComponent = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-16 bg-zinc-800 text-white">
      {/* Photo Section */}
      <div className="md:w-1/3 mb-6 md:mb-0">
        <img
          src={PedroFajardo}
          alt="Pedro Fajardo"
          className="w-64 h-64 rounded-full object-cover mx-auto border-2 border-zinc-500"
        />
      </div>

      {/* Text Section */}
      <div className="md:w-2/3 md:ml-6 md:mr-24  text-zinc-200 text-center md:text-left">
        <h2 className="text-3xl font-semibold mb-8 font-sourceCode">Hi, I'm Pedro Fajardo!</h2>
        <p className="mb-4 text-lg">
          I'm a passionate software developer with a focus on building
          intuitive and user-friendly applications. I have experience working
          with modern web technologies such as <b className="text-red-500">React</b>, <b className="text-red-500">Node.js</b>, 
          and <b className="text-red-500">Next.js</b> and low-code platforms such as <b className="text-red-500">OutSystems</b>. I
          enjoy solving complex problems and creating seamless user experiences and having a friendly and happy team environment.
        </p>
      </div>
    </div>
  );
};

export default IntroductionComponent;
