import React from "react";

export default SkillCircle = React.memo(({ name, percentage }) => {
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

         <div className="absolute inset-0 flex items-center justify-center">
           <span className="text-2xl font-bold text-red-500 transition-all duration-300 group-hover:scale-110">
             {percentage}%
           </span>
         </div>
       </div>

       <p className="text-center text-xl text-zinc-200 font-semibold transition-colors duration-300 hover:text-red-500">
         {name}
       </p>
     </div>
   );
 });