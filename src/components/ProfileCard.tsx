import React from 'react';
import { motion } from 'framer-motion';

const ProfileCard = () => {
    return (
        <motion.div
            className="h-full w-full p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-white/20 transition-colors"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Profile Image */}
            <div className="w-64 h-64 rounded-full border-2 border-accent-gold/40 mb-6 relative z-10 overflow-hidden shadow-2xl shrink-0 aspect-square" style={{ borderRadius: '50%' }}>
                <img
                    src="/profile.jpeg"
                    alt="Roshan Shah"
                    className="w-full h-full rounded-full object-cover hover:scale-110 transition-transform duration-500"
                    style={{ borderRadius: '50%' }}
                />
            </div>

            <h1 className="text-6xl font-bold text-white mb-2 relative z-10">Roshan Shah</h1>
            <p className="text-accent-gold font-mono text-lg tracking-wider mb-6 relative z-10">
                FINANCE + AI
            </p>

            <p className="text-text-muted text-base leading-relaxed max-w-xs relative z-10">
                Building at the intersection of financial markets and machine intelligence.
                <br />
                <span className="text-white">Student at UNC Chapel Hill</span>.
            </p>
        </motion.div>
    );
};

export default ProfileCard;
