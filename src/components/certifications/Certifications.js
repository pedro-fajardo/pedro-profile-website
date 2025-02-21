import React from "react";
import CertificationCard  from './CertificationCard'

const CERTIFICATIONS_DATA = [
  {
    id: "os-reactive-dev",
    title: "Associate Reactive Developer",
    year: 2021,
    provider: "OutSystems",
  },
  {
    id: "os-mobile-spec",
    title: "Mobile Developer Specialist",
    year: 2022,
    provider: "OutSystems",
  },
  {
    id: "os-associate-odc",
    title: "Associate Developer - ODC",
    year: 2023,
    provider: "OutSystems",
  },
  {
    id: "udemy-react-redux",
    title: "Modern React with Redux [2024 Update]",
    year: 2025,
    provider: "Udemy",
  },
];

const Certifications = () => {
  const sortedCertifications = React.useMemo(
    () => [...CERTIFICATIONS_DATA].sort((a, b) => b.year - a.year),
    [] 
  );

  return (
    <section className="py-24 bg-zinc-800 font-sourceCode">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-semibold mb-12 text-center text-zinc-300">
          Certifications & Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {sortedCertifications.map((cert) => (
            <CertificationCard 
              key={cert.id} 
              certification={cert}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;