"use client";

import Link from "next/link";
import NextPageButton from "@/components/NextPageButton";

export default function ContactPage() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-dark text-primary font-display">
            <div className="layout-container flex h-full grow flex-col p-4 md:p-8">
                <div className="flex flex-1 justify-center items-center">
                    <div className="layout-content-container flex w-full max-w-[1600px] flex-1 flex-col justify-center">

                        {/* Header (Minimal) */}
                        <header className="absolute top-8 left-4 md:left-8 right-4 md:right-8 flex justify-between items-center z-10">
                            <div className="text-sm font-mono text-text-muted tracking-widest">
                                PAGE 1/1
                            </div>
                            <Link href="/" className="text-sm text-text-muted hover:text-primary transition-colors tracking-widest">
                                [ ESC ] BACK
                            </Link>
                        </header>

                        {/* Split Screen Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center py-24">

                            {/* Left: Statement */}
                            <div className="space-y-8">
                                <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white leading-[0.9]">
                                    GET IN <br />
                                    <span className="text-accent-cyan text-glow">TOUCH</span>
                                </h1>
                                <p className="text-xl md:text-2xl text-text-muted max-w-md font-light leading-relaxed">
                                    I'm always open to discussing new opportunities, collaborations, or just chatting about tech and finance.
                                </p>
                            </div>

                            {/* Right: Details */}
                            <div className="space-y-16 lg:pl-16">

                                {/* Email */}
                                <div className="group">
                                    <h2 className="text-sm font-bold text-accent-amber tracking-[0.2em] mb-4 uppercase">
                                        // Email
                                    </h2>
                                    <a href="mailto:roshah@unc.edu" className="text-3xl md:text-5xl font-bold text-white hover:text-accent-cyan transition-colors tracking-tight break-all">
                                        roshah@unc.edu
                                    </a>
                                </div>

                                {/* Socials */}
                                <div>
                                    <h2 className="text-sm font-bold text-accent-amber tracking-[0.2em] mb-6 uppercase">
                                        // Socials
                                    </h2>
                                    <div className="flex flex-col gap-6 items-start">
                                        <a
                                            href="https://www.linkedin.com/in/roshan-shah11/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-2xl md:text-3xl text-text-muted hover:text-white transition-colors flex items-center gap-4 group"
                                        >
                                            <span>LinkedIn</span>
                                            <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity text-accent-cyan">↗</span>
                                        </a>
                                        <a
                                            href="https://github.com/roshanshah11"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-2xl md:text-3xl text-text-muted hover:text-white transition-colors flex items-center gap-4 group"
                                        >
                                            <span>GitHub</span>
                                            <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity text-accent-cyan">↗</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <h2 className="text-sm font-bold text-accent-amber tracking-[0.2em] mb-4 uppercase">
                                        // Base
                                    </h2>
                                    <p className="text-2xl text-white">
                                        Chapel Hill, NC
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className="mt-auto pb-12">
                            <NextPageButton href="/awards" label="AWARDS" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
