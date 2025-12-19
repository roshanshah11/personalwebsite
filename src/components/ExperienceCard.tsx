
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ExperienceCard = () => {
    const experiences = [
        { company: "Black Swan Management", role: "Researcher", date: "Nov 2025" },
        { company: "Kenan-Flagler CDR", role: "Research Assistant", date: "Sep 2025" },
        { company: "Hitech Corporation", role: "Strategy Intern", date: "Jul 2025" },
        { company: "Chakli Capital", role: "Summer Analyst", date: "May 2025" },
        { company: "DTV.AI", role: "Co-Founder", date: "May 2023" },
    ];

    return (
        <Link href="/experience" className="h-full w-full block">
            <motion.div
                className="h-full w-full p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col relative overflow-hidden group hover:border-accent-gold/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex justify-between items-center mb-6 relative z-10">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent-gold" />
                        EXPERIENCE
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 flex-grow relative z-10">
                    {experiences.map((exp, i) => (
                        <div key={i} className="group/item border-b border-white/5 last:border-0 pb-3 last:pb-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-lg text-white font-medium group-hover/item:text-accent-cyan transition-colors truncate pr-2">
                                    {exp.company}
                                </h3>
                                <span className="text-sm text-text-muted font-mono whitespace-nowrap">{exp.date}</span>
                            </div>
                            <p className="text-base text-text-muted truncate">{exp.role}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </Link>
    );
};

export default ExperienceCard;
