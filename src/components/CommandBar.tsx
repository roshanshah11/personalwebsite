"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CommandBar = () => {
    const pathname = usePathname();

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
                        <Link href="/experience" className="hover:text-accent-gold transition-colors py-2 whitespace-nowrap">/experience</Link>
                        <Link href="/projects" className="hover:text-accent-cyan transition-colors py-2 whitespace-nowrap">/projects</Link>
                        <Link href="/contact" className="hover:text-destructive transition-colors py-2 whitespace-nowrap">/contact</Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CommandBar;
