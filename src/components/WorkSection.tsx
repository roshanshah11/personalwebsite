"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface Experience {
    company: string;
    role: string;
    date: string;
    description: string;
    metrics?: { label: string; value: string }[];
    skills: string[];
}

interface Project {
    title: string;
    category: string;
    role: string;
    description: string;
    tech: string;
    link?: string;
}

const experiences: Experience[] = [
    {
        company: "Blue Oak Group",
        role: "PE Summer Analyst",
        date: "May 2026 – present",
        description: "Building the technical side of sourcing and diligence, including an AI acquisition-sourcing and broker-scraper workflow. This is the coding-for-finance work I like most.",
        skills: ["Python", "AI Sourcing", "PE"]
    },
    {
        company: "Cofounders Capital",
        role: "Venture Capital Intern",
        date: "Jan 2026 – Sep 2026",
        description: "Evaluating seed-stage B2B SaaS investments for a $60M fund. Synthesizing diligence on 100+ companies across unit economics, market structure, and exit viability.",
        metrics: [{ label: "Fund", value: "$60M" }],
        skills: ["Venture Capital", "Diligence", "SaaS"]
    },
    {
        company: "UNC Portfolio Management Team",
        role: "Technology Sector Analyst",
        date: "Sep 2025 – Aug 2026",
        description: "TMT equity research for the Ewing-Schleeter Harris Fund ($120K AUM). Building DCF models, WACC calculations, and public comp analyses to develop buy/sell recommendations. 1 of 12 selected from 170+ applicants.",
        metrics: [{ label: "AUM", value: "$120K" }],
        skills: ["Equity Research", "DCF", "TMT"]
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
        skills: ["CAD", "ArduPilot", "VTOL"]
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
        skills: ["Equity Research", "Valuation"]
    },
    {
        company: "DTV.AI",
        role: "Co-Founder",
        date: "May 2023 – Feb 2025",
        description: "Built cost-analytics business serving retailers and CPG brands. Identified sourcing inefficiencies and quantified 12–15% margin improvement opportunities.",
        skills: ["Entrepreneurship", "Unit Economics"]
    },
    {
        company: "Murmur",
        role: "Founder",
        date: "Shipped (2025)",
        description: "Shipped open-source macOS dictation app in Swift (Homebrew + DMG). Active, production software.",
        skills: ["Swift", "macOS", "Audio Processing"]
    },
    {
        company: "Parcel",
        role: "Developer",
        date: "Active",
        description: "AI-native underwriting for tax-lien buyers. Full Next.js repo, YC demo candidate, active development.",
        skills: ["Next.js", "AI", "Underwriting"]
    },
    {
        company: "Broker Scraper",
        role: "Developer",
        date: "Active",
        description: "Broker-scraper workflow for Blue Oak Group PE fund. Real codebase for acquisition sourcing.",
        skills: ["Python", "Scraping", "Data Pipelines"]
    },
    {
        company: "Networking OS",
        role: "Founder",
        date: "Shipped",
        description: "Electron/React/SQLite desktop app for 206-firm cold outreach campaign. Shipped with production deployment.",
        skills: ["Electron", "React", "SQLite", "DevOps"]
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
    },
    {
        title: "American Option Pricing",
        category: "Research",
        role: "Author",
        description: "Novel hybrid pricing framework for American options integrating Hurst exponent forecasting with regime-switching volatility.",
        tech: "Python • TensorFlow • XGBoost",
        link: "https://arxiv.org/abs/2508.07151v2",
    },
    {
        title: "VertexLadder",
        category: "FinTech",
        role: "Engineer",
        description: "Ultra-low latency trading engine (1.8M+ orders/sec). Lock-free concurrency with sharded SPSC queues.",
        tech: "C++ • Boost.Asio",
        link: "https://github.com/roshanshah11/vertexladder",
    },
    {
        title: "VoiceBraille",
        category: "Engineering",
        role: "Team Lead",
        description: "Portable speech-to-Braille printer for deafblind accessibility. CAD prototyping, business modeling, and GTM targeting 200 schools/nonprofits. Won 'Most Innovative Idea' at Penn M&TSI.",
        tech: "SolidWorks • CAD • Business Modeling",
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
            className="group relative py-3.5 px-3 -mx-3 rounded-lg overflow-hidden"
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

export default function WorkSection() {
    return (
        <section id="projects" className="py-16 px-4 relative">
            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Experience Column */}
                    <div data-tour="experience">
                        <motion.h2
                            className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500 mb-8"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Experience
                        </motion.h2>
                        <div className="space-y-0">
                            {experiences.map((exp, i) => (
                                <InteractiveItem key={i} index={i} accentColor="amber" dataTour={`experience-card-${i}`}>
                                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
                                        <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors duration-200">
                                            {exp.company}
                                        </h3>
                                        <span className="text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors">{exp.role}</span>
                                        <span className="text-[10px] text-gray-600 font-mono ml-auto group-hover:text-gray-400 transition-colors">{exp.date}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed mb-1.5 group-hover:text-gray-300 transition-colors">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-x-3 text-[10px] font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
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
                            ))}
                        </div>
                    </div>

                    {/* Projects Column */}
                    <div data-tour="projects">
                        <motion.h2
                            className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500 mb-8"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Projects
                        </motion.h2>
                        <div className="space-y-0">
                            {projects.map((project, i) => (
                                <InteractiveItem key={i} index={i} accentColor="cyan" dataTour={i === 0 ? "project-0" : undefined}>
                                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
                                        <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors duration-200">
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
                                        <span className="text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors">{project.role}</span>
                                        <span className="text-[10px] text-gray-600 font-mono uppercase ml-auto group-hover:text-gray-400 transition-colors">{project.category}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed mb-1.5 group-hover:text-gray-300 transition-colors">
                                        {project.description}
                                    </p>
                                    <div className="text-[10px] font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
                                        {project.tech.split(/[•·]/).map(t => t.trim()).join(" · ")}
                                    </div>
                                </InteractiveItem>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
