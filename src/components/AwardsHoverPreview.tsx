"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface AwardItem {
    name: string;
    org: string;
    year: string;
    description: string;
}

const awards: AwardItem[] = [
    {
        name: "Herman Hollerith Prize",
        org: "The Lawrenceville School",
        year: "May 2025",
        description: "Awarded for the highest degree of creativity and entrepreneurial application in computer science. Recognized for building a Python/React transcript analysis tool that automated academic auditing and was used by school administration."
    },
    {
        name: "Journal of Future Economists",
        org: "Federal Reserve Bank of New York",
        year: "2025",
        description: "Published in the 2025 Journal of Future Economists. Selected as one of the top 12 papers from approximately 195 submissions nationwide."
    },
    {
        name: "National Economics Challenge",
        org: "Council for Economic Education",
        year: "Apr 2024",
        description: "New Jersey State Champion and National Finalist. Led 4-person team to 1st place in NJ (David Ricardo Division). Tested on micro/macro theory and international trade."
    },
    {
        name: "President's Volunteer Service Award (Gold)",
        org: "President's Council on Service",
        year: "2024",
        description: "Recognized for 250+ hours of volunteer service, including logistics and operations support for community drives and pantry work."
    },
    {
        name: "Karl Bronson Prize",
        org: "The Lawrenceville School",
        year: "May 2025",
        description: "Presented to the student with the highest cumulative GPA in Griswold House."
    },
    {
        name: "Cum Laude Society",
        org: "The Lawrenceville School",
        year: "May 2025",
        description: "Top 10% of graduating class. Recognized for academic excellence across all disciplines."
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
            className="relative section-container py-12 px-4"
            onMouseMove={handleMouseMove}
        >
            <div className="px-4 mb-6">
                <p className="t-label text-gray-500 mb-2">Supporting signal</p>
                <h2 className="t-headline text-ink">
                    Honors &amp; Publications
                </h2>
            </div>

            {/* A list, not a card grid. Six identical bordered boxes cost ~500px
                and claimed the same visual weight as the work itself; as hairline
                rows they read as the supporting evidence they are, in a third of
                the height. The hover preview still carries the detail. */}
            <div className="px-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
                {awards.map((award, index) => (
                    <motion.div
                        key={index}
                        className="group relative flex items-baseline gap-3 py-2.5 border-t border-white/[0.07] cursor-none transition-colors hover:border-amber-500/40"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.04, duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                        data-tour={index === 0 ? "award-0" : undefined}
                    >
                        <span className="t-label t-num text-cyan-400 shrink-0">0{index + 1}</span>
                        <div className="min-w-0 flex-1">
                            <h3 className="t-meta font-semibold text-gray-300 group-hover:text-white transition-colors">
                                {award.name}
                            </h3>
                            <p className="t-tag text-gray-500">{award.org}</p>
                        </div>
                        <span className="t-label t-num text-gray-600 group-hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
                            {award.year}
                        </span>
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
                            y: mousePos.y - 24,
                        }}
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    >
                        <div>
                            <p className="t-title text-white mb-1">{awards[hoveredIndex].name}</p>
                            <p className="t-label text-cyan-400 mb-3">{awards[hoveredIndex].org}</p>
                            <p className="t-meta text-gray-400">
                                {awards[hoveredIndex].description}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
