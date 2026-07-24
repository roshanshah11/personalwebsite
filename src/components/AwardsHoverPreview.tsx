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
        description: "Awarded for the highest degree of creativity and entrepreneurial application in computer science. Recognized for building a Python/React transcript analysis tool that automated academic auditing and was used by school administration.",
        image: undefined
    },
    {
        name: "Journal of Future Economists",
        org: "Federal Reserve Bank of New York",
        year: "2025",
        description: "Published in the 2025 Journal of Future Economists. Selected as one of the top 12 papers from approximately 195 submissions nationwide.",
        image: "/hsfedchallange.jpeg"
    },
    {
        name: "National Economics Challenge",
        org: "Council for Economic Education",
        year: "Apr 2024",
        description: "New Jersey State Champion and National Finalist. Led 4-person team to 1st place in NJ (David Ricardo Division). Tested on micro/macro theory and international trade.",
        image: "/NEC.png"
    },
    {
        name: "President's Volunteer Service Award (Gold)",
        org: "President's Council on Service",
        year: "2024",
        description: "Recognized for 250+ hours of volunteer service, including logistics and operations support for community drives and pantry work.",
        image: undefined
    },
    {
        name: "Karl Bronson Prize",
        org: "The Lawrenceville School",
        year: "May 2025",
        description: "Presented to the student with the highest cumulative GPA in Griswold House.",
        image: undefined
    },
    {
        name: "Cum Laude Society",
        org: "The Lawrenceville School",
        year: "May 2025",
        description: "Top 10% of graduating class. Recognized for academic excellence across all disciplines.",
        image: "/cumlaudesociety.png"
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
            data-tour="awards"
            className="relative section-container py-16 px-4"
            onMouseMove={handleMouseMove}
        >
            <div className="px-4 mb-6">
                <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-gray-600 mb-1">Supporting signal</p>
                <h2 className="text-2xl md:text-3xl font-bold text-amber-300">
                    Honors &amp; Publications
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-4">
                {awards.map((award, index) => (
                    <motion.div
                        key={index}
                        className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-4 cursor-none transition-colors hover:border-amber-500/40 hover:bg-white/[0.04] ${index === 0 ? "sm:col-span-2" : ""}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                        data-tour={index === 0 ? "award-0" : undefined}
                    >
                        <div className="flex items-center justify-between gap-2 relative z-10">
                            <span className="text-[10px] text-cyan-400 font-mono">0{index + 1}</span>
                            <span className="text-[10px] text-gray-600 font-mono group-hover:text-amber-400 transition-colors whitespace-nowrap">{award.year}</span>
                        </div>
                        <h3 className={`mt-2 font-bold text-gray-300 leading-snug group-hover:text-white transition-colors ${index === 0 ? "text-base md:text-lg" : "text-sm"}`}>
                            {award.name}
                        </h3>
                        <p className="mt-1 text-[11px] text-gray-600 font-mono">{award.org}</p>
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
                            {awards[hoveredIndex].image ? (
                                <img
                                    src={awards[hoveredIndex].image}
                                    alt={awards[hoveredIndex].name}
                                    className="w-full h-full object-cover opacity-90"
                                />
                            ) : (
                                <>
                                    <div className="absolute inset-0 opacity-40"
                                        style={{
                                            backgroundImage: `radial-gradient(circle at 50% 50%, ${hoveredIndex % 2 ? '#00D9FF' : '#D4AF37'} 0%, transparent 60%)`,
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 font-mono tracking-widest">
                                        [IMAGE PREVIEW]
                                    </div>
                                </>
                            )}
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
