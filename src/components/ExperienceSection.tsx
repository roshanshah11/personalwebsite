"use client";

import { motion } from "framer-motion";

interface Experience {
    id: number;
    company: string;
    role: string;
    date: string;
    description: string;
    metrics?: { label: string; value: string }[];
    skills: string[];
}

const experiences: Experience[] = [
    {
        id: 1,
        company: "Black Swan Management",
        role: "Researcher",
        date: "Nov 2025 – Present",
        description: "Researching volatility and risk models for public markets, focusing on regime changes and catalysts. Developing volatility models blending regime-switching logic, distributional assumptions, and realized-vol tracking.",
        metrics: [
            { label: "Models Built", value: "3" }
        ],
        skills: ["Python", "GARCH", "Rough Vol"]
    },
    {
        id: 2,
        company: "Kenan-Flagler CDR",
        role: "Research Assistant",
        date: "Sep 2025 – Present",
        description: "Assisting with experimental design for behavioral studies. Managing study sessions and participant logistics. Cleaning and structuring raw behavioral data.",
        skills: ["Research Design", "Data Analysis", "Statistics"]
    },
    {
        id: 3,
        company: "Hitech Corporation",
        role: "Marketing & Strategy Intern",
        date: "Jul 2025 – Sep 2025",
        description: "Designed U.S. market entry strategy for a $3.4M+ automotive plastics acquisition. Built CRM-integrated lead pipeline targeting $50M+ TAM. Analyzed competitor pricing and distribution.",
        metrics: [
            { label: "Deal Size", value: "$3.4M" },
            { label: "TAM", value: "$50M+" }
        ],
        skills: ["Strategy", "CRM", "Market Analysis"]
    },
    {
        id: 4,
        company: "Chakli Capital LLC",
        role: "Summer Analyst",
        date: "May 2025 – Jul 2025",
        description: "Supported public-equity investing in AI and enterprise software. Built DCF, trading comps, and TAM models supporting $20M+ capital allocation. Wrote sector memos on AI monetization.",
        metrics: [
            { label: "Capital", value: "$20M+" },
            { label: "Focus", value: "AI/SaaS" }
        ],
        skills: ["DCF", "Comps", "Financial Modeling"]
    },
    {
        id: 5,
        company: "DTV.AI",
        role: "Co-Founder",
        date: "May 2023 – Feb 2025",
        description: "Co-founded cost-analytics startup for retailers/CPG. Produced teardown reports identifying sourcing inefficiencies. Quantified 12–15% margin improvements.",
        metrics: [
            { label: "Margin", value: "+15%" },
            { label: "Revenue", value: "$40K+" }
        ],
        skills: ["Startups", "B2B Sales", "Analytics"]
    }
];

export default function ExperienceSection() {
    return (
        <section data-tour="experience" className="py-16 px-4 relative">
            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Section Title */}
                    <div className="lg:col-span-4">
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500 mb-3">
                            Experience
                        </h2>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            A track record of building financial models, executing strategies, and analyzing data.
                        </p>
                    </div>

                    {/* Right: Experience Items */}
                    <div className="lg:col-span-8 space-y-6">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group"
                                data-tour={i === 0 ? "experience-card-0" : undefined}
                            >
                                {/* Header Row */}
                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                                    <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                                        {exp.company}
                                    </h3>
                                    <span className="text-xs text-cyan-400 font-mono">{exp.role}</span>
                                    <span className="text-[10px] text-gray-600 font-mono ml-auto">{exp.date}</span>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-gray-400 leading-relaxed mb-2">
                                    {exp.description}
                                </p>

                                {/* Skills & Metrics Row */}
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                    <div className="flex flex-wrap gap-1.5">
                                        {exp.skills.map((skill, j) => (
                                            <span
                                                key={j}
                                                className="text-[10px] font-mono text-gray-500"
                                            >
                                                {skill}{j < exp.skills.length - 1 && " ·"}
                                            </span>
                                        ))}
                                    </div>
                                    {exp.metrics && (
                                        <div className="flex gap-3 ml-auto">
                                            {exp.metrics.map((m, k) => (
                                                <span key={k} className="text-[10px] font-mono">
                                                    <span className="text-gray-600">{m.label}:</span>{" "}
                                                    <span className="text-amber-500">{m.value}</span>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Subtle divider */}
                                {i < experiences.length - 1 && (
                                    <div className="mt-5 border-b border-white/5" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
