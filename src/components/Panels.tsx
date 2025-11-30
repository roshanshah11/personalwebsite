import React from 'react';
import Link from 'next/link';

const Panels = () => {
    const panels = [
        {
            title: 'EXPERIENCE',
            description: 'PROFESSIONAL HISTORY & ROLES',
            link: '/experience',
            icon: (
                <svg className="size-8 mb-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: 'CONTACT',
            description: 'GET IN TOUCH & SOCIALS',
            link: '/contact',
            icon: (
                <svg className="size-8 mb-4 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: 'PROJECTS',
            description: 'CODE & BUILD LOGS',
            link: '/projects', // Assuming this route exists or will exist
            icon: (
                <svg className="size-8 mb-4 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            )
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 w-full animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {panels.map((panel, index) => (
                <Link href={panel.link} key={index} className="group">
                    <div className="glass-panel p-8 h-full flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 hover:border-primary/50 cursor-pointer group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <div className="transform group-hover:-translate-y-2 transition-transform duration-300">
                            {panel.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 tracking-wider group-hover:text-primary transition-colors">
                            {panel.title}
                        </h3>
                        <p className="text-text-muted text-xs font-medium tracking-widest">
                            {panel.description}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Panels;
