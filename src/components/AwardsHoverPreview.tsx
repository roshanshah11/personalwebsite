"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface AwardItem {
    name: string;
    org: string;
    year: string;
    description: string;
    image?: string;
}

const awards: AwardItem[] = [
    {
        name: "Herman Hollerith Prize",
        org: "The Lawrenceville School",
        year: "May 2025",
        description: "Awarded to the student who exhibits the most creativity, ingenuity, or entrepreneurial flair in the application of computer science. Recognized for building a Transcript analysis tool used by dean of students for student analysis and insight."
    },
    {
        name: "NJ State Economics Champion",
        org: "Council for Economic Education",
        year: "Apr 2024",
        description: "Led 4-person team to 1st place in NJ (David Ricardo Division). Qualified for National Semifinals. Tested on micro/macro theory and international trade."
    },
    {
        name: "Wharton Investment Comp",
        org: "Wharton School (UPenn)",
        year: "Jan 2024",
        description: "Top 50 out of 1,600+ global teams. Managed $100K virtual portfolio. Pitched long-term strategy focusing on semiconductor supply chains."
    },
    {
        name: "Most Innovative Idea",
        org: "Jerome Fisher Program (UPenn)",
        year: "Jul 2023",
        description: "Awarded for 'VoiceBraille' – a portable speech-to-Braille printer. Developed prototype and business plan during the Management & Technology Summer Institute."
    },
    {
        name: "McClellan Society",
        org: "The Lawrenceville School",
        year: "2021 – 2024",
        description: "Given to students with 400+ hours of community service. Recognized for tutoring in Trenton public schools and organizing campus cleanups."
    },
    {
        name: "Cum Laude Society",
        org: "The Lawrenceville School",
        year: "May 2025",
        description: "Top 10% of graduating class. Recognized for academic excellence across all disciplines (GPA 3.92/4.00)."
    },
    {
        name: "Journal of Future Economists",
        org: "Federal Reserve Bank",
        year: "May 2025",
        description: "Selected as one of the top 12 teams nationally in the High School Fed Challenge. Research published highlighting excellence in monetary policy."
    },
];

export default function AwardsHoverPreview() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            className="relative max-w-5xl mx-auto py-24 px-4"
            onMouseMove={handleMouseMove}
        >
            <h2 className="text-3xl md:text-5xl font-bold text-amber-400 tracking-tight mb-16 px-4">
                AWARDS
            </h2>

            <div className="space-y-4">
                {awards.map((award, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col md:flex-row items-baseline justify-between py-8 border-b border-white/10 cursor-none group relative overflow-hidden px-4"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {/* Hover Background Hihghlight */}
                        <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                        <div className="flex items-baseline gap-6 relative z-10 w-full md:w-auto">
                            <span className="text-xs text-cyan-400 font-mono min-w-[30px]">0{index + 1}</span>
                            <h3 className="text-lg md:text-xl font-bold text-gray-400 group-hover:text-white transition-colors duration-300">
                                {award.name}
                            </h3>
                        </div>
                        <div className="flex gap-8 text-xs md:text-sm text-gray-600 font-mono relative z-10 mt-2 md:mt-0">
                            <span className="group-hover:text-amber-400 transition-colors whitespace-nowrap">{award.year}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Floating Preview Tooltip */}
            <AnimatePresence>
                {hoveredIndex !== null && (
                    <motion.div
                        className="absolute pointer-events-none z-50 flex flex-col gap-3 rounded-xl bg-[#0a0a0f] border border-white/20 p-5 w-80 shadow-2xl"
                        style={{
                            top: 0,
                            left: 0,
                            x: mousePos.x + 40,
                            y: mousePos.y - 100, // Offset upwards slightly
                        }}
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    >
                        <div className="w-full h-40 bg-gradient-to-br from-gray-900 to-black rounded-lg mb-1 overflow-hidden relative border border-white/5">
                            <div className="absolute inset-0 opacity-40"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 50% 50%, ${hoveredIndex % 2 ? '#00D9FF' : '#D4AF37'} 0%, transparent 60%)`,
                                }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 font-mono tracking-widest">
                                [IMAGE PREVIEW]
                            </div>
                        </div>

                        <div>
                            <p className="text-white font-bold text-sm mb-1">{awards[hoveredIndex].name}</p>
                            <p className="text-[10px] text-cyan-400 mb-2 uppercase tracking-wider">{awards[hoveredIndex].org}</p>
                            <p className="text-xs text-gray-400 leading-relaxed font-mono">
                                {awards[hoveredIndex].description}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
