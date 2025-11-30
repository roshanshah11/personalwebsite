import React from 'react';
import { motion, Variants } from 'framer-motion';
import ProfileCard from './ProfileCard';
import ExperienceCard from './ExperienceCard';
import ProjectsCard from './ProjectsCard';
import AwardsCard from './AwardsCard';
import InterestsCard from './InterestsCard';

const HomeGrid = () => {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 15,
                mass: 1
            }
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-3 gap-6 w-full max-w-[90vw] mx-auto h-auto md:h-[85vh] p-4"
        >
            {/* Profile - Large Square (2x2) */}
            <motion.div variants={item} className="md:col-span-2 md:row-span-2">
                <ProfileCard />
            </motion.div>

            {/* Awards - Top Middle (1x1) */}
            <motion.div variants={item} className="md:col-span-1 md:row-span-1">
                <AwardsCard />
            </motion.div>

            {/* Connect - Tall Right (1x2) */}
            <motion.div variants={item} className="md:col-span-1 md:row-span-2">
                <motion.div
                    className="h-full w-full p-8 rounded-3xl bg-white/[0.03] border border-primary/20 flex flex-col justify-center items-center relative overflow-hidden group hover:border-accent-gold/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <h2 className="text-2xl font-bold text-white mb-2 relative z-10 text-center">LET'S CONNECT</h2>
                    <p className="text-text-muted text-base text-center mb-6 max-w-xs relative z-10">
                        I'm always happy to chat about finance, AI, or just say hello.
                    </p>
                    <div className="flex flex-row gap-4 relative z-10">
                        <a href="mailto:roshah@unc.edu" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white hover:scale-110 duration-300 flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/roshan-shah11/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white hover:scale-110 duration-300 flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                        </a>
                        <a href="https://github.com/roshanshah11" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white hover:scale-110 duration-300 flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                        </a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Interests - Middle Middle (1x1) */}
            <motion.div variants={item} className="md:col-span-1 md:row-span-1">
                <InterestsCard />
            </motion.div>

            {/* Bottom Row */}

            {/* Projects - Wide (2x1) */}
            <motion.div variants={item} className="md:col-span-2 md:row-span-1">
                <ProjectsCard />
            </motion.div>

            {/* Experience - Wide (2x1) */}
            <motion.div variants={item} className="md:col-span-2 md:row-span-1">
                <ExperienceCard />
            </motion.div>

        </motion.div>
    );
};

export default HomeGrid;
