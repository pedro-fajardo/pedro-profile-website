import React, { useMemo } from "react";
import CertificationCard from './CertificationCard'
import { motion, AnimatePresence } from "framer-motion";

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
].map(cert => ({
  ...cert,
  // Add a proper slug for better SEO
  slug: cert.id.replace(/-/g, '_'),
  // Add a default image URL
  imageUrl: `${process.env.PUBLIC_URL}/images/certifications/${cert.id}.png`
}));

const Certifications = () => {
  const sortedCertifications = useMemo(
    () => [...CERTIFICATIONS_DATA].sort((a, b) => b.year - a.year),
    []
  );

  return (
    <section className="py-16 md:py-24 bg-zinc-800 font-sourceCode" id="certifications">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.h2 
          className="text-3xl sm:text-4xl font-semibold mb-8 md:mb-12 text-center text-zinc-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Certifications & Courses
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-items-center">
          <AnimatePresence>
            {sortedCertifications.map((cert, index) => (
              <motion.div
                key={cert.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full"
              >
                <CertificationCard
                  certification={cert}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Certifications;