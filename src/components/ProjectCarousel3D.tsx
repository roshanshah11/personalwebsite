"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Project {
    id: number;
    title: string;
    category: string;
    role?: string;
    status?: string;
    description: string;
    tech: string;
    link?: string;
    color: string;
    image?: string;
    highlights?: { title: string; content: string }[];
    fullDescription?: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "American Option Pricing",
        category: "Research Paper",
        role: "Author & Researcher",
        status: "Working Paper (arXiv + SSRN)",
        description: "A hybrid pricing framework integrating dynamic Hurst exponent forecasting with regime-switching volatility engines. Achieves superior accuracy and stability under rough volatility conditions compared to traditional finite-difference methods.",
        tech: "Python, TensorFlow, XGBoost",
        link: "https://arxiv.org/abs/2508.07151v2",
        color: "#00D9FF",
        fullDescription: "Developed a hybrid pricing framework for American options that integrates dynamic Hurst exponent forecasting, regime-switching volatility engines, and signature-kernel approximations. This approach achieves more stable, accurate, and computationally efficient pricing under rough volatility conditions compared to traditional models.",
        highlights: [
            { title: "MODELING", content: "Designed a multi-regime rough volatility model tailored for early-exercise derivatives." },
            { title: "ENGINEERING", content: "Engineered an experimental pipeline analyzing pricing accuracy across moneyness, maturities, and volatility regimes." },
            { title: "BENCHMARKING", content: "Benchmarked the hybrid model against classical finite-difference and rough volatility approaches." },
            { title: "IMPACT", content: "Explores practical implications for volatility surface shape, early-exercise premiums, and stress scenarios." }
        ]
    },
    {
        id: 2,
        title: "Krypop",
        category: "E-Commerce",
        role: "Founder & Developer",
        description: "Premium D2C e-commerce platform for globally-inspired popcorn. Features a high-conversion checkout flow, custom bundle builders, and subscription management for the 'Spice Squad' community.",
        tech: "Next.js, TypeScript, Stripe",
        link: "https://krypop.com",
        color: "#ef4444",
        fullDescription: "A premium direct-to-consumer e-commerce platform for 'Krypop', a bold, globally-inspired popcorn brand. The site features a complete shopping experience with custom bundles, subscriptions, and a high-conversion checkout flow.",
        highlights: [
            { title: "BRANDING", content: "Developed the 'Popcorn That Bites Back' identity, focusing on Indian/Asian fusion flavors." },
            { title: "FEATURES", content: "Full e-commerce functionality including cart management, discount codes, subscription models, and email capture." },
            { title: "GROWTH", content: "Optimized for conversion with social proof, bundle offers, and seamless mobile responsiveness." }
        ]
    },
    {
        id: 3,
        title: "VertexLadder",
        category: "FinTech",
        role: "Systems Engineer",
        description: "Ultra-low latency trading system processing 1.8M+ orders/sec with <1μs wire-to-wire latency. Built with lock-free concurrency and custom memory allocators for high-frequency trading environments.",
        tech: "C++, CMake, Boost.Asio",
        link: "https://github.com/roshanshah11/vertexladder",
        color: "#D4AF37",
        fullDescription: "A production-grade trading system with ultra-low latency order processing. Designed for high-frequency trading environments requiring microsecond-level execution.",
        highlights: [
            { title: "PERFORMANCE", content: "Processes 1.8M+ orders/sec with <1μs latency. ~2.5M ops/sec for order add/cancel." },
            { title: "INFRASTRUCTURE", content: "Multi-threaded architecture, zero-allocation hot-path, lock-free concurrency with sharded SPSC queues." },
            { title: "PROTOCOL", content: "Full FIX 4.4 protocol support and cTrader integration." }
        ]
    },
    {
        id: 4,
        title: "QuantVerse",
        category: "EdTech",
        role: "Lead Developer",
        description: "Interactive educational platform democratizing quantitative finance. Features simulation-based learning blocks, real-time curriculum building, and in-browser Python execution via Pyodide.",
        tech: "Next.js, Supabase, Redis",
        link: "https://quantverse.vercel.app/",
        color: "#3b82f6",
        fullDescription: "Comprehensive educational platform democratizing quantitative finance education through simulation-focused interactive learning.",
        highlights: [
            { title: "FEATURES", content: "Block-by-block lesson viewer, real-time interactive calculations, and Interactive Curriculum Builder (ICB)." },
            { title: "ARCHITECTURE", content: "Role-based access control, WebSocket for real-time updates, multi-layer caching, and Pyodide for client-side Python." },
            { title: "STACK", content: "Next.js 15, Supabase (PostgreSQL), Redis (Upstash) and Tailwind CSS." }
        ]
    },
    {
        id: 5,
        title: "PEWP",
        category: "ML / Space",
        role: "ML Engineer",
        description: "Universal Atmospheric Model forecasting exoplanet weather conditions. Trained on Earth & Mars data to predict temperature and pressure on distant worlds with 94% accuracy.",
        tech: "Python, Scikit-learn, NASA API",
        link: "https://devpost.com/software/pewp-predicting-exoplanet-weather-patterns",
        color: "#10b981",
        image: "/PEWP.jpg",
        fullDescription: "Universal Atmospheric Model & Weather Analysis System. A machine learning framework that forecasts temperature, pressure, and wind on exoplanets using Earth and Mars atmospheric data.",
        highlights: [
            { title: "INSPIRATION", content: "Translating the language of weather from Earth/Mars to worlds light-years away." },
            { title: "METHODOLOGY", content: "Combined NASA Exoplanet Archive, Mars InSight, and Copernicus Earth data to train a Random Forest Regressor." },
            { title: "RESULTS", content: "Achieved high accuracy (R² = 0.9421), demonstrating that solar system data can inform exoplanet forecasts." }
        ]
    },
    {
        id: 6,
        title: "Transcript Analysis",
        category: "Academic Tool",
        role: "Sole Developer",
        description: "Automated transcript auditing tool used by administration. Parses PDF transcripts to extract grades, verify graduation requirements, and generate insight reports for the Dean of Students.",
        tech: "Python, Flask, React",
        link: "https://lawrenceville.netlify.app",
        color: "#8b5cf6",
        fullDescription: "Academic performance analysis tool built for The Lawrenceville School to parse PDF transcripts and automatically audit graduation requirements.",
        highlights: [
            { title: "FEATURES", content: "PDF transcript parsing, grade extraction, graduation requirement checking, and CSV export." },
            { title: "USAGE", content: "Used by the Dean of Students for student analysis and insight." },
            { title: "STACK", content: "Python (94%), Flask backend, React frontend." }
        ]
    }
];

export default function ProjectCarousel3D() {
    const [isMounted, setIsMounted] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    useEffect(() => setIsMounted(true), []);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const cardCount = projects.length;
    const anglePerCard = 360 / cardCount;

    // Offset rotation by half the angle per card to show 2 at a time in the front (left/right)
    const rotation = useTransform(scrollYProgress, [0, 1], [-anglePerCard / 2, -360 - anglePerCard / 2]);

    // Slightly increased radius for better visibility
    const radius = 500;

    const selectedProject = projects.find(p => p.id === selectedId);

    return (
        <div ref={containerRef} className="relative h-[300vh] w-full">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden perspective-[1200px] px-4">

                {/* Section Title - Aligned with Experience/Awards style */}
                <div className="max-w-6xl mx-auto w-full absolute top-20 z-20 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-amber-400 tracking-tight">
                            PROJECTS
                        </h2>
                        <p className="text-gray-500 mt-2 font-mono text-sm pl-1">
                            // Research, trading & clinical ML
                        </p>
                    </motion.div>
                </div>

                {/* 3D Scene Container - Slightly larger footprint */}
                <motion.div
                    className="relative w-[420px] h-[270px]"
                    style={isMounted ? {
                        rotateY: rotation,
                        transformStyle: "preserve-3d"
                    } : {}}
                >
                    {projects.map((project, index) => {
                        const angle = index * anglePerCard;

                        return (
                            <motion.div
                                key={project.id}
                                className="absolute inset-0 border border-white/10 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md cursor-pointer group hover:border-amber-500/50 transition-colors overflow-hidden"
                                onClick={() => setSelectedId(project.id)}
                                style={isMounted ? {
                                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                    transformStyle: "preserve-3d",
                                    boxShadow: `0 0 40px -10px ${project.color}30`,
                                } : {}}
                            >
                                {/* Background Image & Overlay */}
                                <div className="absolute inset-0 z-0">
                                    {project.image && (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                                        />
                                    )}
                                    <div className={`absolute inset-0 ${project.image ? 'bg-black/80' : 'bg-black/90'} transition-colors duration-300`} />
                                </div>

                                {/* Card Content */}
                                <div className="relative z-10 pointer-events-none">
                                    <div className="flex justify-between items-center mb-4">
                                        <span
                                            className="text-[10px] font-mono px-2 py-1 rounded-full uppercase tracking-wider"
                                            style={{ backgroundColor: `${project.color}20`, color: project.color }}
                                        >
                                            {project.category}
                                        </span>
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{project.title}</h3>
                                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{project.description}</p>
                                </div>

                                <div className="relative z-10 mt-4 pointer-events-none">
                                    <div className="w-full h-px bg-white/10 mb-3" />
                                    <p className="text-[10px] text-gray-500 font-mono truncate">{project.tech}</p>
                                    <p className="text-[10px] text-amber-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        CLICK TO VIEW DETAILS →
                                    </p>
                                </div>

                                {/* Backface visibility hider */}
                                <div
                                    className="absolute inset-0 bg-black rounded-xl z-0"
                                    style={{ transform: "rotateY(180deg) translateZ(1px)", backfaceVisibility: "hidden" }}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Instructions */}
                <div className="absolute top-8 text-center w-full z-10 pointer-events-none">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                        Scroll to explore • Click for details
                    </span>
                </div>
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedId && selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            layoutId={`project-${selectedProject.id}`}
                            className="w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >
                            {/* Header Gradient */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />

                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-10"
                            >
                                ✕
                            </button>

                            <div className="p-8">
                                <div className="flex flex-wrap gap-3 mb-6">
                                    <span
                                        className="text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider"
                                        style={{ backgroundColor: `${selectedProject.color}20`, color: selectedProject.color }}
                                    >
                                        {selectedProject.category}
                                    </span>
                                    {selectedProject.status && (
                                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-gray-400">
                                            {selectedProject.status}
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedProject.title}</h2>
                                <p className="text-lg text-gray-400 mb-6">{selectedProject.role}</p>

                                <div className="prose prose-invert max-w-none mb-8">
                                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                        {selectedProject.fullDescription}
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    {selectedProject.highlights?.map((highlight, idx) => (
                                        <div key={idx} className="bg-white/[0.03] p-4 rounded-lg border border-white/5">
                                            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2 font-mono">
                                                {highlight.title}
                                            </h4>
                                            <p className="text-xs text-gray-400 leading-relaxed">
                                                {highlight.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-white/10 pt-6 flex justify-between items-center">
                                    <div className="text-xs font-mono text-gray-500">
                                        {selectedProject.tech}
                                    </div>
                                    <a
                                        href={selectedProject.link}
                                        target="_blank"
                                        className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors text-sm font-bold uppercase tracking-wider"
                                    >
                                        View Project ↗
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
