"use client";

import { motion, AnimatePresence, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface Experience {
    company: string;
    role: string;
    date: string;
    description: string;
    metrics?: { label: string; value: string }[];
    skills: string[];
    featured?: boolean;
}

interface Project {
    title: string;
    category: string;
    role: string;
    description: string;
    tech: string;
    link?: string;
    featured?: boolean;
}

const experiences: Experience[] = [
    {
        company: "Blue Oak Group",
        role: "PE Summer Analyst",
        date: "May 2026 – present",
        description: "Building the technical side of sourcing and diligence, including an AI acquisition-sourcing and broker-scraper workflow. This is the coding-for-finance work I like most.",
        skills: ["Python", "AI Sourcing", "PE"],
        featured: true
    },
    {
        company: "Cofounders Capital",
        role: "Venture Capital Intern",
        date: "Jan 2026 – Sep 2026",
        description: "Evaluating seed-stage B2B SaaS investments for a $60M fund. Synthesizing diligence on 100+ companies across unit economics, market structure, and exit viability.",
        metrics: [{ label: "Fund", value: "$60M" }],
        skills: ["Venture Capital", "Diligence", "SaaS"],
        featured: true
    },
    {
        company: "UNC Portfolio Management Team",
        role: "Technology Sector Analyst",
        date: "Sep 2025 – Aug 2026",
        description: "TMT equity research for the Ewing-Schleeter Harris Fund ($120K AUM). Building DCF models, WACC calculations, and public comp analyses to develop buy/sell recommendations. 1 of 12 selected from 170+ applicants.",
        metrics: [{ label: "AUM", value: "$120K" }],
        skills: ["Equity Research", "DCF", "TMT"],
        featured: true
    },
    {
        company: "Kenan-Flagler CDR",
        role: "Research Assistant",
        date: "Oct 2025 – Sep 2026",
        description: "Supporting faculty and PhD research on behavioral decision-making. Designing experiments and analyzing participant data for academic publication.",
        skills: ["Behavioral Finance", "R", "Research Methods"]
    },
    {
        company: "Carolina SkyLab",
        role: "Engineer",
        date: "Jan 2026 – Aug 2026",
        description: "Building CAD assemblies and ArduPilot SITL closed-loop simulations for a medical-delivery VTOL drone.",
        skills: ["CAD", "ArduPilot", "VTOL"],
        featured: true
    },
    {
        company: "Quantitative Finance Association",
        role: "Derivatives Analyst",
        date: "Oct 2025 – Sep 2026",
        description: "Studying options pricing, volatility, Greeks, and hedging through peer-led technical work on real market data.",
        skills: ["Options Pricing", "Greeks", "Volatility"]
    },
    {
        company: "Hitech Corporation",
        role: "Strategy Intern",
        date: "Jul – Sep 2025",
        description: "Developed U.S. market entry thesis for a $3.4M+ automotive-plastics acquisition. Conducted competitive analysis and built financial projections for TAM sizing.",
        metrics: [{ label: "Deal", value: "$3.4M+" }],
        skills: ["M&A Strategy", "Market Analysis"]
    },
    {
        company: "Chakli Capital LLC",
        role: "Summer Analyst",
        date: "May – Jul 2025",
        description: "Supported public-equity investing focused on AI and enterprise software. Built valuation models (DCF, comps) and wrote sector memos on AI monetization trends.",
        metrics: [{ label: "Capital", value: "$20M+" }],
        skills: ["Equity Research", "Valuation"],
        featured: true
    },
    {
        company: "DTV.AI",
        role: "Co-Founder",
        date: "May 2023 – Feb 2025",
        description: "Built cost-analytics business serving retailers and CPG brands. Identified sourcing inefficiencies and quantified 12–15% margin improvement opportunities.",
        skills: ["Entrepreneurship", "Unit Economics"]
    }
];

const projects: Project[] = [
    {
        title: "AI and the HAL Revisited",
        category: "AI Governance",
        role: "Author",
        description: "Economics paper arguing that AI has weakened the computational constraint on planning, while the binding risks remain institutional: oversight failure, concentrated power, incentive gaming, and democratic accountability.",
        tech: "AI Governance • Political Economy • Institutional Design",
        link: "/ai-and-the-hal-revisited.pdf",
        featured: true,
    },
    {
        title: "American Option Pricing",
        category: "Research",
        role: "Author",
        description: "Novel hybrid pricing framework for American options integrating Hurst exponent forecasting with regime-switching volatility.",
        tech: "Python • TensorFlow • XGBoost",
        link: "https://arxiv.org/abs/2508.07151v2",
        featured: true,
    },
    {
        title: "VertexLadder",
        category: "FinTech",
        role: "Engineer",
        description: "Ultra-low latency trading engine (1.8M+ orders/sec). Lock-free concurrency with sharded SPSC queues.",
        tech: "C++ • Boost.Asio",
        link: "https://github.com/roshanshah11/vertexladder",
        featured: true,
    },
    {
        title: "VoiceBraille",
        category: "Engineering",
        role: "Team Lead",
        description: "Portable speech-to-Braille printer for deafblind accessibility. CAD prototyping, business modeling, and GTM targeting 200 schools/nonprofits. Won 'Most Innovative Idea' at Penn M&TSI.",
        tech: "SolidWorks • CAD • Business Modeling",
        featured: true,
    },
    {
        title: "Transcript Analysis",
        category: "Tool",
        role: "Developer",
        description: "Automated academic auditing via custom PDF parsing. Used by administration for transcript analysis.",
        tech: "Python • Flask • React",
        link: "https://lawrenceville.netlify.app",
    },
    {
        title: "Krypop",
        category: "E-Commerce",
        role: "Founder",
        description: "High-performance D2C e-commerce platform with custom subscription management and optimized checkout flows.",
        tech: "Next.js • TypeScript • Stripe",
        link: "https://krypop.com",
    },
    {
        title: "QuantVerse",
        category: "EdTech",
        role: "Lead Dev",
        description: "Real-time educational platform for quant finance with client-side Python execution via Pyodide.",
        tech: "Next.js • Supabase",
        link: "https://quantverse.vercel.app/",
    },
    {
        title: "PEWP",
        category: "ML/Space",
        role: "ML Engineer",
        description: "Universal Atmospheric Model forecasting exoplanet weather with 94% accuracy.",
        tech: "Python • Scikit-learn",
        link: "https://devpost.com/software/pewp-predicting-exoplanet-weather-patterns",
    },
    {
        title: "Murmur",
        category: "macOS",
        role: "Founder",
        description: "Open-source macOS dictation app in Swift, shipped via Homebrew and DMG. Active, production software.",
        tech: "Swift • macOS • Audio Processing",
        featured: true,
    },
];

// Interactive item with cursor tracking spotlight
function InteractiveItem({
    children,
    index,
    accentColor = "amber",
    dataTour
}: {
    children: React.ReactNode;
    index: number;
    accentColor?: "amber" | "cyan";
    dataTour?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const spotlightX = useSpring(mouseX, springConfig);
    const spotlightY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const glowColor = accentColor === "amber"
        ? "rgba(217, 119, 6, 0.15)"
        : "rgba(6, 182, 212, 0.15)";

    return (
        <motion.div
            ref={ref}
            data-tour={dataTour}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                delay: index * 0.06,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className="group relative py-5 px-3 -mx-3 rounded-lg overflow-hidden"
        >
            {/* Cursor-tracking spotlight */}
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: useTransform(
                        [spotlightX, spotlightY],
                        ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`
                    ),
                }}
            />

            {/* Hover highlight bar */}
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-500 to-transparent"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                    scaleY: isHovered ? 1 : 0,
                    opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

function ExperienceItem({ exp, index }: { exp: Experience; index: number }) {
    return (
        <InteractiveItem index={index} accentColor="amber" dataTour={`experience-card-${index}`}>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1.5">
                <h3 className="text-base md:text-lg font-bold text-white group-hover:text-amber-400 transition-colors duration-200">
                    {exp.company}
                </h3>
                <span className="text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors">{exp.role}</span>
                <span className="text-[11px] text-gray-600 font-mono ml-auto group-hover:text-gray-400 transition-colors">{exp.date}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-2 group-hover:text-gray-300 transition-colors">
                {exp.description}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 text-[11px] font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
                <span>{exp.skills.join(" · ")}</span>
                {exp.metrics && exp.metrics.map((m, k) => (
                    <motion.span
                        key={k}
                        className="text-amber-500/80 group-hover:text-amber-400 transition-colors"
                        whileHover={{ scale: 1.05 }}
                    >
                        {m.label}: {m.value}
                    </motion.span>
                ))}
            </div>
        </InteractiveItem>
    );
}

function ProjectItem({ project, index }: { project: Project; index: number }) {
    return (
        <InteractiveItem index={index} accentColor="cyan" dataTour={index === 0 ? "project-0" : undefined}>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1.5">
                <h3 className="text-base md:text-lg font-bold text-white group-hover:text-amber-400 transition-colors duration-200">
                    {project.link ? (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline inline-flex items-center gap-1"
                        >
                            {project.title}
                            <motion.span
                                className="text-xs opacity-50"
                                whileHover={{ x: 2, y: -2 }}
                            >
                                ↗
                            </motion.span>
                        </a>
                    ) : project.title}
                </h3>
                <span className="text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors">{project.role}</span>
                <span className="text-[11px] text-gray-600 font-mono uppercase ml-auto group-hover:text-gray-400 transition-colors">{project.category}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-2 group-hover:text-gray-300 transition-colors">
                {project.description}
            </p>
            <div className="text-[11px] font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
                {project.tech.split(/[•·]/).map(t => t.trim()).join(" · ")}
            </div>
        </InteractiveItem>
    );
}

export default function WorkSection() {
    const [showAll, setShowAll] = useState(false);
    const restCount = experiences.filter((e) => !e.featured).length;
    const remainingProjectCount = projects.filter((project) => !project.featured).length;

    // Scroll-driven tracing beam down the experience column
    const expRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: expProgress } = useScroll({
        target: expRef,
        offset: ["start 0.6", "end 0.5"],
    });
    const beamScale = useSpring(expProgress, { stiffness: 120, damping: 30, mass: 0.4 });

    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Experience Column */}
                    <div data-tour="experience">
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-amber-300 mb-8"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Experience
                        </motion.h2>
                        <div ref={expRef} className="relative pl-5">
                            {/* Tracing beam: static track + scroll-filled beam */}
                            <div className="absolute left-0 top-1 bottom-1 w-px bg-white/[0.06]" />
                            <motion.div
                                className="absolute left-0 top-1 bottom-1 w-px origin-top bg-gradient-to-b from-amber-300 via-amber-500 to-cyan-500/40"
                                style={{ scaleY: beamScale }}
                            />
                            <div className="space-y-0">
                                {experiences.map((exp, i) =>
                                    exp.featured ? (
                                        <ExperienceItem key={i} exp={exp} index={i} />
                                    ) : (
                                        <AnimatePresence key={i} initial={false}>
                                            {showAll && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 8 }}
                                                    transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                                                >
                                                    <ExperienceItem exp={exp} index={i} />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )
                                )}
                            </div>
                        </div>
                        {restCount > 0 && (
                            <button
                                onClick={() => setShowAll((v) => !v)}
                                className="group mt-4 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-gray-500 hover:text-amber-400 transition-colors"
                            >
                                <span>{showAll ? "show less" : `show ${restCount} more`}</span>
                                <motion.span
                                    animate={{ rotate: showAll ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                                    className="text-amber-500/70 group-hover:text-amber-400"
                                >
                                    ↓
                                </motion.span>
                            </button>
                        )}
                    </div>

                    {/* Projects Column */}
                    <div data-tour="projects">
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-amber-300 mb-8"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Projects
                        </motion.h2>
                        <div className="space-y-0">
                            {projects.map((project, i) =>
                                project.featured ? (
                                    <ProjectItem key={project.title} project={project} index={i} />
                                ) : (
                                    <AnimatePresence key={project.title} initial={false}>
                                        {showAll && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                                            >
                                                <ProjectItem project={project} index={i} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )
                            )}
                        </div>
                        {remainingProjectCount > 0 && (
                            <button
                                onClick={() => setShowAll((v) => !v)}
                                className="group mt-4 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-gray-500 hover:text-cyan-400 transition-colors"
                            >
                                <span>{showAll ? "show less" : `show ${remainingProjectCount} more`}</span>
                                <motion.span
                                    animate={{ rotate: showAll ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                                    className="text-cyan-500/70 group-hover:text-cyan-400"
                                >
                                    ↓
                                </motion.span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
