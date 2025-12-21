"use client";

import { motion } from "framer-motion";

interface Project {
    id: number;
    title: string;
    category: string;
    role: string;
    description: string;
    tech: string;
    link?: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "American Option Pricing",
        category: "Research",
        role: "Author & Researcher",
        description: "Formulated a novel hybrid pricing framework for American options, integrating dynamic Hurst exponent forecasting with regime-switching volatility engines. Engineered the model to achieve superior pricing stability under rough volatility conditions, outperforming traditional finite-difference methods.",
        tech: "Python • TensorFlow • XGBoost",
        link: "https://arxiv.org/abs/2508.07151v2",
    },
    {
        id: 2,
        title: "Krypop",
        category: "E-Commerce",
        role: "Founder",
        description: "Engineered a high-performance D2C e-commerce platform for 'Krypop'. Developed custom subscription management logic, optimized checkout flows for conversion, and built a performant, globally-inspired brand identity.",
        tech: "Next.js • TypeScript • Stripe",
        link: "https://krypop.com",
    },
    {
        id: 3,
        title: "VertexLadder",
        category: "FinTech",
        role: "Systems Engineer",
        description: "Engineered an ultra-low latency trading engine capable of processing 1.8M+ orders/sec. Optimized the hot-path for zero allocation and implemented lock-free concurrency using sharded SPSC queues for microsecond-level execution.",
        tech: "C++ • CMake • Boost.Asio",
        link: "https://github.com/roshanshah11/vertexladder",
    },
    {
        id: 4,
        title: "QuantVerse",
        category: "EdTech",
        role: "Lead Developer",
        description: "Developed a real-time educational platform intended to democratize quantitative finance. Architected the interactive lesson viewer and integrated Pyodide for secure, client-side Python code execution and simulation.",
        tech: "Next.js • Supabase • Redis",
        link: "https://quantverse.vercel.app/",
    },
    {
        id: 5,
        title: "PEWP",
        category: "ML / Space",
        role: "ML Engineer",
        description: "Trained a Universal Atmospheric Model to forecast weather on exoplanets. Engineered a machine learning pipeline that translates atmospheric data from Earth and Mars to predict temperature and pressure on distant worlds with 94% accuracy.",
        tech: "Python • Scikit-learn • NASA API",
        link: "https://devpost.com/software/pewp-predicting-exoplanet-weather-patterns",
    },
    {
        id: 6,
        title: "Transcript Analysis",
        category: "Internal Tool",
        role: "Sole Developer",
        description: "Automated the academic auditing process by building a custom PDF parsing engine. Developed the full-stack application used by administration to extract grades and verify graduation requirements from student transcripts.",
        tech: "Python • Flask • React",
        link: "https://lawrenceville.netlify.app",
    }
];

export default function ProjectsSection() {
    return (
        <section data-tour="projects" className="py-16 px-4 relative">
            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Section Title */}
                    <div className="lg:col-span-4">
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500 mb-3">
                            Projects
                        </h2>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Selected technical projects focusing on quantitative finance, high-performance systems, and full-stack engineering.
                        </p>
                    </div>

                    {/* Right: Project Items */}
                    <div className="lg:col-span-8 space-y-6">
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group"
                                data-tour={i === 0 ? "project-0" : undefined}
                            >
                                {/* Header Row */}
                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                                    <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                                        {project.link ? (
                                            <a href={project.link} target="_blank" rel="noreferrer" className="hover:underline">
                                                {project.title} ↗
                                            </a>
                                        ) : (
                                            project.title
                                        )}
                                    </h3>
                                    <span className="text-xs text-cyan-400 font-mono">{project.role}</span>
                                    <span className="text-[10px] text-gray-600 font-mono uppercase tracking-wider ml-auto">{project.category}</span>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-gray-400 leading-relaxed mb-2">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tech.split('•').map((tech, j) => (
                                        <span
                                            key={j}
                                            className="text-[10px] font-mono text-gray-500"
                                        >
                                            {tech.trim()}{j < project.tech.split('•').length - 1 && " ·"}
                                        </span>
                                    ))}
                                </div>

                                {/* Subtle divider */}
                                {i < projects.length - 1 && (
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
