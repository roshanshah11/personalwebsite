"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CommandBar = () => {
    const pathname = usePathname();

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        // If we are already on the home page (or a section of it), scroll to the element.
        // If we're on a different page (which shouldn't happen in single page mode, but good for safety), navigate first.

        // Since we are refactoring to a single page, we can assume we are on '/' mostly.
        // However, standard anchor links work well if the ID exists on the page.
        // But Next.js Link might try to do a client-side navigation.
        // Using standard <a> tag interactions or handling onClick is often smoother for one-page scroll.

        // Actually, Link href="#id" works in Next.js but sometimes the scroll behavior needs to be smooth.
        // Let's use simple Link with href="/#id".
    };

    return (
        <div className="w-full bg-background-dark/90 backdrop-blur-md border-t border-white/10 text-xs md:text-sm font-mono z-50">
            <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">

                {/* Left: Status & Path */}
                <div className="flex items-center space-x-4 md:space-x-6 overflow-hidden">
                    <div className="text-text-muted whitespace-nowrap">
                        <span className="text-primary hidden md:inline">user@roshan-site</span>
                        <span className="mx-1 hidden md:inline">:</span>
                        <span className="text-accent-cyan">~{pathname === '/' ? '' : pathname}</span>
                        <span className="animate-blink ml-1">_</span>
                    </div>
                </div>

                {/* Right: Quick Links */}
                <div className="flex items-center space-x-4 md:space-x-8">
                    <div className="flex items-center space-x-4 md:space-x-8 overflow-x-auto no-scrollbar">
                        <Link href="/" className="hover:text-primary transition-colors py-2 whitespace-nowrap">/home</Link>
                        <Link href="/#experience" className="hover:text-accent-gold transition-colors py-2 whitespace-nowrap">/experience</Link>
                        <Link href="/#projects" className="hover:text-accent-cyan transition-colors py-2 whitespace-nowrap">/projects</Link>
                        <Link href="/#awards" className="hover:text-white transition-colors py-2 whitespace-nowrap">/awards</Link>
                        <Link href="/#contact" className="hover:text-destructive transition-colors py-2 whitespace-nowrap">/contact</Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CommandBar;
