import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const navItems = [
    {
        name: 'Experience',
        path: '/experience',
        color: 'group-hover:text-blue-400',
        border: 'group-hover:border-blue-400/30',
        bg: 'group-hover:bg-blue-400/10'
    },
    {
        name: 'Projects',
        path: '/projects',
        color: 'group-hover:text-purple-400',
        border: 'group-hover:border-purple-400/30',
        bg: 'group-hover:bg-purple-400/10'
    },
    {
        name: 'Awards',
        path: '/awards',
        color: 'group-hover:text-amber-400',
        border: 'group-hover:border-amber-400/30',
        bg: 'group-hover:bg-amber-400/10'
    },
    {
        name: 'Contact',
        path: '/contact',
        color: 'group-hover:text-emerald-400',
        border: 'group-hover:border-emerald-400/30',
        bg: 'group-hover:bg-emerald-400/10'
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
};

const NavigationMenu = () => {
    return (
        <motion.nav
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full max-w-2xl mx-auto mt-12"
        >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4">
                {navItems.map((navItem) => (
                    <motion.div key={navItem.name} variants={item}>
                        <Link
                            href={navItem.path}
                            className="group relative block"
                        >
                            <div className={`
                                px-4 py-3 rounded-lg bg-white/5 border border-white/5
                                transition-all duration-300 ease-out
                                backdrop-blur-sm relative overflow-hidden
                                ${navItem.border} ${navItem.bg}
                                hover:scale-[1.02]
                            `}>
                                <div className="relative z-10 flex items-center justify-center">
                                    <span className={`
                                        text-sm font-medium text-text-muted
                                        transition-colors duration-300
                                        ${navItem.color}
                                    `}>
                                        {navItem.name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.nav>
    );
};

export default NavigationMenu;
