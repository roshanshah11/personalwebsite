"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface Project {
    title: string;
    type: string;
    description: string;
    tech: string;
    link?: string;
    metrics?: { label: string; value: string }[];
}

const projects: Project[] = [
    {
        title: "American Option Pricing",
        type: "Research Paper",
        description: "Hybrid pricing framework integrating dynamic Hurst exponent forecasting, regime-switching volatility, and signature-kernel approximations.",
        tech: "Python, TensorFlow, PyTorch",
        link: "https://arxiv.org/abs/2508.07151v2",
        metrics: [
            { label: "Status", value: "arXiv + SSRN" },
            { label: "Framework", value: "Hybrid ML" }
        ]
    },
    {
        title: "VertexLadder",
        type: "Trading System",
        description: "Production-grade order book with ultra-low latency. 1.8M+ orders/sec with <1μs latency.",
        tech: "C++, Boost.Asio, QuickFIX",
        link: "https://github.com/roshanshah11/vertexladder",
        metrics: [
            { label: "Latency", value: "<1μs" },
            { label: "Throughput", value: "1.8M/sec" }
        ]
    },
    {
        title: "QuantVerse",
        type: "EdTech Platform",
        description: "Interactive quantitative finance education with simulations, Plotly visualizations, and Python execution.",
        tech: "Next.js, TypeScript, Supabase",
        link: "https://quantverse.vercel.app/",
        metrics: [
            { label: "Stack", value: "Full-Stack" },
            { label: "Features", value: "Interactive" }
        ]
    },
    {
        title: "Krypop",
        type: "E-Commerce",
        description: "Premium DTC platform for globally-inspired popcorn brand. Complete shopping experience with subscriptions.",
        tech: "Next.js, TypeScript, CSS",
        link: "https://krypop.com",
        metrics: [
            { label: "Type", value: "DTC" },
            { label: "Features", value: "Subscriptions" }
        ]
    },
    {
        title: "PEWP",
        type: "ML Framework",
        description: "Exoplanet weather forecasting using Earth/Mars atmospheric data. Random Forest with R² = 0.9421.",
        tech: "Python, scikit-learn, NASA APIs",
        link: "https://devpost.com/software/pewp-predicting-exoplanet-weather-patterns",
        metrics: [
            { label: "Accuracy", value: "R² 0.94" },
            { label: "Data", value: "NASA" }
        ]
    }
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <motion.div
                className="relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 
                   rounded-xl p-5 overflow-hidden h-full"
                animate={{
                    rotateY: isHovered ? 5 : 0,
                    rotateX: isHovered ? -5 : 0,
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Type badge */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider px-2 py-1 
                          bg-cyan-400/10 rounded-full">{project.type}</span>
                    <span className="text-xs text-gray-600">↗</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-tight">
                    {project.title}
                </h3>

                <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-2">
                    {project.description}
                </p>

                <p className="text-[10px] text-gray-600 font-mono mt-3">{project.tech}</p>

                {/* Metrics */}
                {project.metrics && (
                    <div className="flex gap-3 mt-3 pt-3 border-t border-white/5">
                        {project.metrics.map((m, i) => (
                            <div key={i} className="flex-1">
                                <p className="text-[9px] text-gray-600 uppercase">{m.label}</p>
                                <p className="text-xs font-bold text-white">{m.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Hover gradient */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-cyan-500/10 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </motion.a>
    );
}

export default function ProjectsSection() {
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
                        PROJECTS
                    </h2>
                    <p className="text-gray-500 mt-2 font-mono text-sm">
            // Quantitative finance, engineering, web dev
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
