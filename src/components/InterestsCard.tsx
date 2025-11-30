import React from 'react';
import { motion } from 'framer-motion';

const InterestsCard = () => {
    const interests = ["AI Research", "AI Governance", "3D Design", "Philly Sports", "Basketball", "Baseball", "Tabla"];

    return (
        <motion.div
            className="h-full w-full p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col relative overflow-hidden group hover:border-primary/50 transition-colors"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                <span className="w-2 h-2 rounded-full bg-primary" />
                INTERESTS
            </h2>

            <div className="flex flex-wrap gap-3 relative z-10">
                {interests.map((interest, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-base text-text-muted border border-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-default">
                        {interest}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

export default InterestsCard;
