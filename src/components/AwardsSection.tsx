"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Award {
    name: string;
    org: string;
    date: string;
    description: string;
    badge?: string;
}

const awards: Award[] = [
    {
        name: "Herman Hollerith Prize",
        org: "Lawrenceville",
        date: "May 2025",
        description: "Creativity in computer science application. Built transcript analysis tool used by dean.",
        badge: "WINNER"
    },
    {
        name: "NJ State Economics Champion",
        org: "CEE",
        date: "Apr 2024",
        description: "1st place David Ricardo Division. National Semifinals qualifier.",
        badge: "1ST PLACE"
    },
    {
        name: "Wharton Investment Comp",
        org: "UPenn",
        date: "Jan 2024",
        description: "Top 50 of 1,600+ global teams. $100K virtual portfolio.",
        badge: "SEMIFINALIST"
    },
    {
        name: "Most Innovative Idea",
        org: "Jerome Fisher",
        date: "Jul 2023",
        description: "VoiceBraille – portable speech-to-Braille printer prototype.",
        badge: "WINNER"
    },
    {
        name: "Journal of Future Economists",
        org: "Federal Reserve",
        date: "May 2025",
        description: "Top 12 nationally in High School Fed Challenge.",
        badge: "PUBLISHED"
    },
    {
        name: "Cum Laude Society",
        org: "Lawrenceville",
        date: "May 2025",
        description: "Top 10% of graduating class. GPA 3.92/4.00.",
        badge: "HONOR"
    }
];

export default function AwardsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <section ref={sectionRef} className="py-16 px-4 relative">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="mb-10"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-amber-400 tracking-tight">
                        AWARDS
                    </h2>
                    <p className="text-gray-500 mt-2 font-mono text-sm">
            // Recognition & achievements
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {awards.map((award, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group relative bg-white/[0.02] border border-white/10 rounded-lg p-4
                       hover:border-amber-500/30 hover:bg-white/[0.04] transition-all duration-300"
                        >
                            {/* Badge */}
                            {award.badge && (
                                <span className="absolute top-3 right-3 text-[9px] font-bold text-cyan-400 
                               bg-cyan-400/10 px-2 py-0.5 rounded-full">{award.badge}</span>
                            )}

                            <div className="pr-16">
                                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                                    {award.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-500">{award.org}</span>
                                    <span className="text-[10px] text-gray-600 font-mono">{award.date}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{award.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
