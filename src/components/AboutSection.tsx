"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ProfileImage3D from "./ProfileImage3D";

const education = [
    {
        school: "UNC Chapel Hill",
        program: "Kenan-Flagler Business School",
        degree: "B.S. Business Administration + Data Science (GPA 4.0)",
        details: "Assured Enrollment into KF. Portfolio Management Team (TMT), Quant Finance Association"
    },
    {
        school: "The Lawrenceville School",
        program: "High School (GPA 3.92/4.00)",
        details: "Herman Hollerith Prize, Cum Laude Society, McClellan Society"
    }
];

const skills = {
    languages: ["Python", "R", "C++", "SQL"],
    skills: ["DCF / Comps", "Volatility Models", "Derivatives trading", "Economic modeling"],
    interests: ["Poker", "Football", "Traveling", "FOOD (like any)", "Reading", "AI governance"]
};

export default function AboutSection() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const textX = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    return (
        <section id="about" ref={sectionRef} data-tour="about" className="py-16 px-4 relative">
            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Profile Image */}
                    <motion.div
                        className="lg:col-span-4"
                        style={isMounted ? { scale: imageScale, opacity: textOpacity } : {}}
                    >
                        <ProfileImage3D />
                    </motion.div>

                    {/* Right: Bio Content */}
                    <motion.div
                        className="lg:col-span-8 space-y-8"
                        style={isMounted ? { x: textX, opacity: textOpacity } : {}}
                    >
                        {/* Bio */}
                        <div>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                                <span className="text-amber-400 font-bold">Roshan Shah</span>: Finance and quantitative researcher focused on volatility modeling and AI-driven financial systems. Always building at the intersection of
                                <span className="text-cyan-400"> finance</span>,
                                <span className="text-cyan-400"> technology</span>, and
                                <span className="text-cyan-400"> markets</span>.
                            </p>
                        </div>

                        {/* Education */}
                        <div data-tour="education" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {education.map((edu, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white/[0.02] border border-white/10 rounded-lg p-4"
                                >
                                    <h4 className="text-sm font-bold text-white">{edu.school}</h4>
                                    <p className="text-xs text-cyan-400 font-mono mt-1">{edu.program}</p>
                                    <p className="text-xs text-gray-400 mt-2">{edu.degree}</p>
                                    {edu.details && <p className="text-xs text-gray-500 mt-1">{edu.details}</p>}
                                </motion.div>
                            ))}
                        </div>

                        {/* Skills Grid */}
                        <div data-tour="skills" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(skills).map(([category, items], i) => (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="space-y-2"
                                >
                                    <h4 className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                                        {category}
                                    </h4>
                                    <ul className="space-y-1">
                                        {items.map((item, j) => (
                                            <li key={j} className="text-xs text-gray-400 font-mono">{item}</li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>

                        {/* Contact Links */}
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="mailto:roshah@unc.edu"
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-amber-500/50 hover:bg-white/10 transition-all text-sm text-white"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                                Email
                            </a>
                            <a
                                href="https://www.linkedin.com/in/roshan-shah11/"
                                target="_blank"
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-500/50 hover:bg-white/10 transition-all text-sm text-white"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x="2" y="9" width="4" height="12" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/roshanshah11"
                                target="_blank"
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-gray-500/50 hover:bg-white/10 transition-all text-sm text-white"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                    <path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                                GitHub
                            </a>
                            <a
                                href="/roshan_shah_resume.pdf"
                                target="_blank"
                                className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg hover:bg-amber-500/30 transition-all text-sm text-amber-400 font-medium"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                </svg>
                                Resume
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
