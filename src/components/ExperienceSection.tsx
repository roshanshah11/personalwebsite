"use client";

import { Canvas } from "@react-three/fiber";
import { useState, Suspense, useEffect, useRef } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import ExperienceScene from "./ExperienceScene";

interface Experience {
    company: string;
    role: string;
    date: string;
    shortDescription: string;
    fullDescription: string;
    metrics: { label: string; value: string; subtext?: string }[];
    techStack?: string;
    id: number;
    logo?: string;
}

const experiences: Experience[] = [
    {
        id: 1,
        company: "BLACK SWAN MANAGEMENT",
        role: "Researcher",
        date: "NOV 2025 – PRESENT",
        shortDescription: "Volatility and risk models for public markets. GARCH/rough volatility frameworks.",
        fullDescription: "Researching volatility and risk models for public markets, focusing on regime changes and catalysts. Developing volatility models blending regime-switching logic, distributional assumptions, and realized-vol tracking. Experimenting with GARCH/rough volatility frameworks.",
        metrics: [
            { label: "Models Built", value: "3", subtext: "(Volatility & Risk)" }
        ],
        techStack: "Python (GARCH / Rough Vol)"
    },
    {
        id: 2,
        company: "KENAN-FLAGLER CDR",
        role: "Research Assistant",
        date: "SEP 2025 – PRESENT",
        shortDescription: "Experimental design for behavioral studies. Cleaning and structuring raw behavioral data.",
        fullDescription: "Assisting with experimental design for behavioral studies. Managing study sessions and participant logistics. Cleaning and structuring raw behavioral data for analysis.",
        metrics: [
            { label: "Studies", value: "Behavioral", subtext: "(Experimental Design)" },
            { label: "Data", value: "Cleaning", subtext: "(Analysis Prep)" }
        ],
        logo: "/kenanflagler.jpeg"
    },
    {
        id: 3,
        company: "HITECH CORPORATION",
        role: "Marketing & Strategy Intern",
        date: "JUL 2025 – SEP 2025",
        shortDescription: "U.S. market entry strategy for $3.4M+ automotive plastics acquisition.",
        fullDescription: "Designed U.S. market entry strategy for a $3.4M+ automotive plastics acquisition. Built CRM-integrated lead pipeline targeting $50M+ TAM. Analyzed competitor pricing and distribution to recommend go-to-market strategy.",
        metrics: [
            { label: "Deal Size", value: "$3.4M", subtext: "(Acquisition Strategy)" },
            { label: "TAM Identified", value: "$50M+", subtext: "(Lead Pipeline)" }
        ],
        logo: "/Hitech.jpeg"
    },
    {
        id: 4,
        company: "CHAKLI CAPITAL LLC",
        role: "Summer Analyst",
        date: "MAY 2025 – JUL 2025",
        shortDescription: "Public-equity investing in AI and enterprise software. DCF, comps, TAM models.",
        fullDescription: "Supported public-equity investing in AI and enterprise software. Built DCF, trading comps, and TAM models supporting $20M+ capital allocation. Wrote sector memos on AI monetization and infrastructure cycles.",
        metrics: [
            { label: "Capital Deployed", value: "$20M+", subtext: "(Allocation Support)" },
            { label: "Focus", value: "AI / SaaS", subtext: "(Sector Analysis)" }
        ],
        logo: "/Chakli.png"
    },
    {
        id: 5,
        company: "DTV.AI",
        role: "Co-Founder",
        date: "MAY 2023 – FEB 2025",
        shortDescription: "Cost-analytics startup for retailers/CPG. Quantified margin improvements.",
        fullDescription: "Co-founded cost-analytics startup for retailers/CPG. Produced teardown reports identifying sourcing inefficiencies. Quantified 12–15% margin improvements, generating $40K+ B2B revenue.",
        metrics: [
            { label: "Margin Impact", value: "+15%", subtext: "(Cost Optimization)" },
            { label: "Revenue", value: "$40K+", subtext: "(B2B Generated)" }
        ],
        logo: "/DTV.AI logo.png"
    }
];

function ExperiencePopup({ exp, onClose }: { exp: Experience | null; onClose: () => void }) {
    if (!exp) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-black border border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header Bar */}
                <div className="h-10 border-b border-zinc-800 flex items-center justify-between px-4 bg-zinc-900/50">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors uppercase"
                    >
                        <span className="px-1.5 py-0.5 border border-zinc-700 rounded text-[10px]">[ ESC ]</span>
                        BACK
                    </button>
                    <div className="text-xs font-mono text-zinc-600">
                        Node: {exp.id} / 5
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-4xl font-bold text-zinc-800 tracking-tight uppercase">
                                    {exp.id < 10 ? `0${exp.id}` : exp.id}
                                </span>
                                <div className="h-px bg-zinc-800 flex-grow w-12" />
                            </div>
                            <div className="text-amber-500 font-mono text-sm mb-1 uppercase tracking-wider">
                                {exp.date}
                            </div>
                            <h2 className="text-3xl font-bold text-white uppercase tracking-wider leading-tight">
                                {exp.company}
                            </h2>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xs font-mono text-zinc-500 uppercase mb-2">Role</h3>
                            <p className="text-xl text-cyan-400 font-medium font-mono border-b border-zinc-800/50 pb-4 inline-block">{exp.role}</p>
                        </div>

                        <div>
                            <h3 className="text-xs font-mono text-zinc-500 uppercase mb-2">Description</h3>
                            <p className="text-zinc-300 leading-relaxed text-sm md:text-base border-l-2 border-zinc-800 pl-4 py-1">
                                {exp.fullDescription}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xs font-mono text-zinc-500 uppercase mb-3">Key Highlights</h3>
                                <div className="space-y-3">
                                    {exp.metrics.map((m, i) => (
                                        <div key={i} className="bg-zinc-900/30 p-3 border border-zinc-800/50 hover:border-amber-500/20 transition-colors">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <span className="text-xs text-zinc-400 uppercase tracking-tight">{m.label}</span>
                                                <span className="text-amber-400 font-mono font-bold">{m.value}</span>
                                            </div>
                                            {m.subtext && (
                                                <p className="text-[10px] text-zinc-600 font-mono uppercase text-right">
                                                    {m.subtext}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {exp.techStack && (
                                <div>
                                    <h3 className="text-xs font-mono text-zinc-500 uppercase mb-3">Tech Stack</h3>
                                    <div className="bg-zinc-900/30 p-3 border border-zinc-800/50">
                                        <p className="text-sm text-zinc-300 font-mono break-words">
                                            {exp.techStack}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function ExperienceSection() {
    const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => setIsMounted(true), []);

    // Use Framer Motion's useScroll to get native page scroll progress for this section
    // Only run after mount to avoid hydration issues
    const { scrollYProgress } = useScroll({
        target: isMounted ? sectionRef : undefined,
        offset: ["start start", "end end"]
    });

    // Update the scrollProgress state whenever the scroll progresses
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setScrollProgress(latest);
    });

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedExp(null);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    // If not mounted (SSR), show placeholder
    if (!isMounted) return <section ref={sectionRef} className="h-screen bg-black" id="experience" />;

    return (
        <section ref={sectionRef} className="relative h-[400vh] w-full bg-black" id="experience">
            {/* 3D Canvas Container - sticky so it stays while we scroll */}
            <div className="sticky top-0 h-screen w-full">

                {/* Title Overlay */}
                <div className="absolute top-10 left-10 z-10 pointer-events-none">
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4 opacity-50 mix-blend-difference">
                        Experience
                    </h2>
                    <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm max-w-xl">
                        <span className="w-2 h-2 bg-amber-500 animate-pulse" />
                        <span className="uppercase tracking-widest">Interactive 3D Timeline • Scroll to Explore</span>
                    </div>
                </div>

                {/* Scroll Progress Indicator */}
                <div className="absolute bottom-10 left-10 z-10 pointer-events-none">
                    <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-amber-500"
                            style={{ width: `${scrollProgress * 100}%` }}
                        />
                    </div>
                    <p className="text-xs text-zinc-600 font-mono mt-2">
                        {Math.round(scrollProgress * 100)}% explored
                    </p>
                </div>

                <Canvas camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 500 }} gl={{ antialias: true }}>
                    <Suspense fallback={null}>
                        <ExperienceScene
                            experiences={experiences}
                            onSelect={setSelectedExp}
                            scrollProgress={scrollProgress}
                        />
                    </Suspense>
                </Canvas>
            </div>

            {/* Popup behaves as modal on top of everything */}
            <AnimatePresence>
                {selectedExp && (
                    <ExperiencePopup exp={selectedExp} onClose={() => setSelectedExp(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
