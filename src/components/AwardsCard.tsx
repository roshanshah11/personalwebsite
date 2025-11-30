import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AwardsCard = () => {
    return (
        <Link href="/awards" className="h-full w-full block">
            <motion.div
                className="h-full w-full p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-center relative overflow-hidden group hover:border-accent-gold/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex flex-col mb-6 relative z-10">
                    <h2 className="text-2xl font-bold text-white mb-1">AWARDS</h2>
                </div>

                <div className="space-y-4 text-left relative z-10">
                    <div className="group/item border-b border-white/5 pb-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-white font-medium group-hover/item:text-accent-gold transition-colors">Herman Hollerith Prize</h3>
                            <span className="text-xs text-text-muted font-mono">CS</span>
                        </div>
                    </div>
                    <div className="group/item border-b border-white/5 pb-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-white font-medium group-hover/item:text-accent-gold transition-colors">NJ Econ Champion</h3>
                            <span className="text-xs text-text-muted font-mono">1st</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default AwardsCard;
