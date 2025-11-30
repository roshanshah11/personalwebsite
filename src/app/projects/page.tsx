import Link from "next/link";
import NextPageButton from "@/components/NextPageButton";

interface ProjectData {
    title: string;
    type: string;
    description: string;
    techStack?: string;
    role?: string;
    status?: string;
    details: { label: string; value: string }[];
    link?: { text: string; url: string };
    image?: string;
}

interface CategoryData {
    title: string;
    projects: ProjectData[];
}

const categories: CategoryData[] = [
    {
        title: "Quantitative Finance & Machine Learning",
        projects: [
            {
                title: "American Option Pricing Under Time-Varying Rough Volatility",
                type: "Research Paper",
                role: "Author & Researcher",
                status: "Working Paper (arXiv + SSRN)",
                description: "Developed a hybrid pricing framework for American options that integrates dynamic Hurst exponent forecasting, regime-switching volatility engines, and signature-kernel approximations. This approach achieves more stable, accurate, and computationally efficient pricing under rough volatility conditions compared to traditional models.",
                techStack: "Python (21.6%), Jupyter Notebook (74%), TensorFlow 2.14, XGBoost, PyTorch",
                details: [
                    { label: "MODELING", value: "Designed a multi-regime rough volatility model tailored for early-exercise derivatives." },
                    { label: "ENGINEERING", value: "Engineered an experimental pipeline analyzing pricing accuracy across moneyness, maturities, and volatility regimes." },
                    { label: "BENCHMARKING", value: "Benchmarked the hybrid model against classical finite-difference and rough volatility approaches." },
                    { label: "IMPACT", value: "Explores practical implications for volatility surface shape, early-exercise premiums, and stress scenarios." }
                ],
                link: { text: "READ PAPER", url: "https://arxiv.org/abs/2508.07151v2" }
            }
        ]
    },
    {
        title: "E-Commerce & Web Applications",
        projects: [
            {
                title: "Krypop",
                type: "DTC E-Commerce Platform",
                description: "A premium direct-to-consumer e-commerce platform for 'Krypop', a bold, globally-inspired popcorn brand. The site features a complete shopping experience with custom bundles, subscriptions, and a high-conversion checkout flow.",
                techStack: "Next.js, TypeScript, CSS",
                details: [
                    { label: "BRANDING", value: "Developed the 'Popcorn That Bites Back' identity, focusing on Indian/Asian fusion flavors like Spicy Sweet Fusion and Sichuan Pepper Buzz." },
                    { label: "FEATURES", value: "Full e-commerce functionality including cart management, discount codes, subscription models, and 'Spice Squad' email capture integration." },
                    { label: "GROWTH", value: "Optimized for conversion with social proof, bundle offers, and seamless mobile responsiveness." }
                ],
                link: { text: "VIEW LIVE SITE", url: "https://krypop.com" }
            }
        ]
    },
    {
        title: "Financial Technology & Trading Systems",
        projects: [
            {
                title: "VertexLadder",
                type: "High-Performance Order Book System",
                description: "A production-grade trading system with ultra-low latency order processing.",
                techStack: "C++ (97.6%), CMake, Boost.Asio, QuickFIX",
                details: [
                    { label: "Key Features", value: "Processes 1.8M+ orders/sec with <1μs latency, FIX 4.4 protocol support, lock-free concurrency with sharded SPSC queues, custom LIFO object pooling" },
                    { label: "Performance", value: "~2.5M ops/sec for order add/cancel, P99 latency of 0.67μs" },
                    { label: "Infrastructure", value: "Multi-threaded architecture, zero-allocation hot-path, cTrader integration" }
                ],
                link: { text: "VIEW REPO", url: "https://github.com/roshanshah11/vertexladder" }
            },

        ]
    },
    {
        title: "Educational Platforms",
        projects: [
            {
                title: "QuantVerse",
                type: "Interactive Quantitative Finance Learning Platform",
                description: "Comprehensive educational platform democratizing quantitative finance education.",
                techStack: "Next.js 15.3.3, TypeScript (85.5%), React 18.3.1, Supabase (PostgreSQL), Redis (Upstash), Tailwind CSS 3.4.17",
                details: [
                    { label: "Features", value: "Block-by-block lesson viewer with progress tracking, simulation-focused interactive blocks with real-time calculations, Interactive Curriculum Builder (ICB), Plotly.js visualizations, discussion forums, RSS financial news aggregation" },
                    { label: "Architecture", value: "Role-based access control (Student/Instructor/Admin), WebSocket for real-time updates, multi-layer caching strategy, Pyodide for client-side Python execution" },
                    { label: "Deployment", value: "Vercel with CI/CD" }
                ],
                link: { text: "VIEW LIVE SITE", url: "https://quantverse.vercel.app/" }
            },
            {
                title: "PEWP",
                type: "Universal Atmospheric Model & Weather Analysis System",
                description: "PEWP is a machine learning framework that forecasts temperature, pressure, and wind on exoplanets. It uses atmospheric data from Earth and Mars, then extrapolates to planets where only a few constants are known. By training on real, detailed data, the model can make informed predictions about environments far outside our reach.",
                techStack: "Python, scikit-learn, Pandas, NASA APIs",
                image: "/PEWP.jpg",
                details: [
                    { label: "INSPIRATION", value: "The contrast between Earth's steady rhythms and Mars' extreme fluctuations sparked the idea: if we can learn the language of weather from these two, can we translate it to worlds light-years away?" },
                    { label: "HOW WE BUILT IT", value: "We combined NASA Exoplanet Archive, Mars InSight, and Copernicus Earth data. After cleaning and resampling to create consistent datasets, we trained a Random Forest Regressor to predict atmospheric conditions." },
                    { label: "ACCOMPLISHMENTS", value: "Built a complete pipeline with high accuracy (R² = 0.9421). Successfully demonstrated that Earth and Mars data is sufficient to make informed forecasts about exoplanet atmospheres." },
                ],
                link: { text: "VIEW PRESENTATION", url: "https://devpost.com/software/pewp-predicting-exoplanet-weather-patterns" }
            },
            {
                title: "Lawrenceville Student Transcript Analysis Tool",
                type: "Academic Tool",
                description: "Academic performance analysis tool for parsing transcripts and checking graduation requirements.",
                techStack: "Python (93.9%), Flask backend, React/JavaScript frontend, Tailwind CSS",
                details: [
                    { label: "Features", value: "PDF transcript parsing, grade extraction, graduation requirement checking, dark/light mode, multi-student processing, CSV export" },
                    { label: "Deployment", value: "Live at lawrenceville.netlify.app" }
                ],
                link: { text: "VIEW LIVE SITE", url: "https://lawrenceville.netlify.app" }
            }
        ]
    }
];

export default function ProjectsPage() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-dark text-primary font-display">
            <div className="layout-container flex h-full grow flex-col p-4 md:p-8">
                <div className="flex flex-1 justify-center">
                    <div className="layout-content-container flex w-full max-w-[1600px] flex-1 flex-col">

                        {/* Header */}
                        <header className="mb-24 mt-8">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
                                <div>
                                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-accent-gold text-glow opacity-90">
                                        PROJECTS
                                    </h1>
                                    <p className="text-xl md:text-2xl text-text-muted mt-2 font-light tracking-wide">
                                        Selected works in quantitative finance, engineering, and web development.
                                    </p>
                                </div>
                                <div className="flex items-center gap-6 pb-2">
                                    <Link href="/" className="text-sm text-text-muted hover:text-primary transition-colors tracking-widest">[ ESC ] BACK</Link>
                                    <span className="text-sm text-text-muted tracking-widest">PAGE 1/1</span>
                                </div>
                            </div>
                        </header>

                        {(() => {
                            let globalProjectIndex = 0;
                            return categories.map((category, catIndex) => (
                                <div key={catIndex} className="mb-32 last:mb-0">
                                    <div className="flex items-center gap-4 mb-16">
                                        <div className="h-px bg-white/10 flex-grow"></div>
                                        <h2 className="text-xl md:text-2xl font-bold text-accent-cyan tracking-widest uppercase text-center px-4">
                                            {category.title}
                                        </h2>
                                        <div className="h-px bg-white/10 flex-grow"></div>
                                    </div>

                                    <div className="space-y-12">
                                        {category.projects.map((project, projIndex) => {
                                            globalProjectIndex++;
                                            const currentGlobalIndex = globalProjectIndex;
                                            const isEven = currentGlobalIndex % 2 === 0;

                                            return (
                                                <section
                                                    key={projIndex}
                                                    className="group relative border border-white/10 bg-white/[0.02] p-8 md:p-12 rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-black/50"
                                                >
                                                    {/* Watermark Number */}
                                                    <div className="absolute -top-10 -right-4 text-[10rem] md:text-[12rem] font-bold text-white/[0.02] select-none pointer-events-none font-mono leading-none z-0">
                                                        {String(currentGlobalIndex).padStart(2, '0')}
                                                    </div>

                                                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-16 items-start relative z-10">
                                                        {/* Title & Meta Column */}
                                                        <div className={`xl:col-span-5 space-y-8 ${isEven ? 'xl:order-last' : ''}`}>
                                                            <div>
                                                                <div className="flex items-center gap-3 mb-4">
                                                                    <span className="flex items-center justify-center w-8 h-8 rounded-full border border-accent-cyan/30 text-accent-cyan font-mono text-xs font-bold bg-accent-cyan/5">
                                                                        {String(currentGlobalIndex)}
                                                                    </span>
                                                                    <span className="text-accent-cyan font-mono text-xs tracking-widest block">
                                                                        {project.type.toUpperCase()}
                                                                    </span>
                                                                </div>
                                                                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight group-hover:text-accent-gold transition-colors duration-300">
                                                                    {project.title}
                                                                </h3>
                                                            </div>

                                                            <div className="space-y-4 p-6 rounded-xl bg-white/[0.03] border border-white/5">
                                                                {project.role && (
                                                                    <div className="mb-4 last:mb-0">
                                                                        <span className="block text-white mb-2 text-xs uppercase tracking-wider opacity-70">Role</span>
                                                                        <span className="text-text-muted text-sm font-mono leading-relaxed">{project.role}</span>
                                                                    </div>
                                                                )}
                                                                {project.status && (
                                                                    <div className="mb-4 last:mb-0">
                                                                        <span className="block text-white mb-2 text-xs uppercase tracking-wider opacity-70">Status</span>
                                                                        <span className="text-text-muted text-sm font-mono leading-relaxed">{project.status}</span>
                                                                    </div>
                                                                )}
                                                                {project.techStack && (
                                                                    <div>
                                                                        <span className="block text-white mb-2 text-xs uppercase tracking-wider opacity-70">Tech Stack</span>
                                                                        <span className="text-text-muted text-sm font-mono leading-relaxed">{project.techStack}</span>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {project.link && (
                                                                <a
                                                                    href={project.link.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 text-accent-cyan hover:text-white transition-colors font-bold tracking-wider border-b border-accent-cyan/30 pb-1 hover:border-white"
                                                                >
                                                                    {project.link.text} <span className="text-lg">↗</span>
                                                                </a>
                                                            )}

                                                            {project.image && (
                                                                <div className="border-t border-white/10 pt-8">
                                                                    <h4 className="text-sm font-bold text-white tracking-widest mb-6 uppercase flex items-center gap-2">
                                                                        <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
                                                                        Key Highlights
                                                                    </h4>
                                                                    <ul className="grid grid-cols-1 gap-6">
                                                                        {project.details.map((detail, detailIndex) => (
                                                                            <li key={detailIndex} className="group/item">
                                                                                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                                                                                    <span className="text-accent-gold font-mono text-xs uppercase whitespace-nowrap min-w-[120px] shrink-0 group-hover/item:text-white transition-colors">
                                                                                        {detail.label}
                                                                                    </span>
                                                                                    <p className="text-text-muted text-sm leading-relaxed">
                                                                                        {detail.value}
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Content Column */}
                                                        <div className="xl:col-span-7 space-y-10">
                                                            {project.image && (
                                                                <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                                                                    <img
                                                                        src={project.image}
                                                                        alt={project.title}
                                                                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="prose prose-invert max-w-none">
                                                                <p className="text-xl leading-relaxed text-text-main font-light">
                                                                    {project.description}
                                                                </p>
                                                            </div>

                                                            {!project.image && (
                                                                <div className="border-t border-white/10 pt-8">
                                                                    <h4 className="text-sm font-bold text-white tracking-widest mb-6 uppercase flex items-center gap-2">
                                                                        <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
                                                                        Key Highlights
                                                                    </h4>
                                                                    <ul className="grid grid-cols-1 gap-6">
                                                                        {project.details.map((detail, detailIndex) => (
                                                                            <li key={detailIndex} className="group/item">
                                                                                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                                                                                    <span className="text-accent-gold font-mono text-xs uppercase whitespace-nowrap min-w-[120px] shrink-0 group-hover/item:text-white transition-colors">
                                                                                        {detail.label}
                                                                                    </span>
                                                                                    <p className="text-text-muted text-sm leading-relaxed">
                                                                                        {detail.value}
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}


                                                        </div>
                                                    </div>
                                                </section>
                                            );
                                        })}
                                    </div>
                                </div>
                            ));
                        })()}

                        <div className="mt-12 mb-12">
                            <NextPageButton href="/awards" label="AWARDS" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
