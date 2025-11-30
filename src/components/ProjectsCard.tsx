import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ProjectsCard = () => {
    return (
        <Link href="/projects" className="h-full w-full block">
            <motion.div
                className="h-full w-full p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-primary/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        PROJECTS
                    </h2>
                </div>

                <div className="relative z-10 mt-2 space-y-3">
                    <div className="group/item border-b border-white/5 pb-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-white font-medium group-hover/item:text-primary transition-colors">HFT Orderbook</h3>
                            <span className="text-xs text-text-muted font-mono">C++ Project</span>
                        </div>
                    </div>
                    <div className="group/item border-b border-white/5 pb-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-white font-medium group-hover/item:text-primary transition-colors">Options Pricing</h3>
                            <span className="text-xs text-text-muted font-mono">Research</span>
                        </div>
                    </div>
                    <div className="group/item border-b border-white/5 pb-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-white font-medium group-hover/item:text-primary transition-colors">Krypop</h3>
                            <span className="text-xs text-text-muted font-mono">E-Commerce</span>
                        </div>
                    </div>
                </div>

                {/* Decorative Background */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
            </motion.div>
        </Link>
    );
};

export default ProjectsCard;
