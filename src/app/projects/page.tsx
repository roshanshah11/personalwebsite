import Link from "next/link";
import NextPageButton from "@/components/NextPageButton";

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
                                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-accent-amber text-glow opacity-90">
                                        PROJECTS
                                    </h1>
                                    <p className="text-xl md:text-2xl text-text-muted mt-2 font-light tracking-wide">
                                        Selected works in quantitative finance and engineering.
                                    </p>
                                </div>
                                <div className="flex items-center gap-6 pb-2">
                                    <Link href="/" className="text-sm text-text-muted hover:text-primary transition-colors tracking-widest">[ ESC ] BACK</Link>
                                    <span className="text-sm text-text-muted tracking-widest">PAGE 1/1</span>
                                </div>
                            </div>
                        </header>

                        {/* Project 1: American Option Pricing */}
                        <section className="group mb-32">
                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24 items-start">
                                {/* Left: Title & Meta (4 cols) */}
                                <div className="xl:col-span-4 space-y-8 sticky top-12">
                                    <div>
                                        <span className="text-accent-cyan font-mono text-xs tracking-widest mb-4 block">01 — RESEARCH PAPER</span>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight group-hover:text-accent-amber transition-colors duration-300">
                                            American Option Pricing Under Time-Varying Rough Volatility
                                        </h2>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-text-muted text-sm font-mono">
                                            <span className="block text-white mb-1">ROLE</span>
                                            Author & Researcher
                                        </p>
                                        <p className="text-text-muted text-sm font-mono">
                                            <span className="block text-white mb-1">STATUS</span>
                                            Working Paper (arXiv + SSRN)
                                        </p>
                                    </div>

                                    <a
                                        href="https://arxiv.org/abs/2508.07151v2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-accent-cyan hover:text-white transition-colors font-bold tracking-wider border-b border-accent-cyan/30 pb-1 hover:border-white"
                                    >
                                        READ PAPER <span className="text-lg">↗</span>
                                    </a>
                                </div>

                                {/* Right: Content (8 cols) */}
                                <div className="xl:col-span-8 space-y-12">
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-xl md:text-2xl leading-relaxed text-text-main font-light">
                                            Developed a hybrid pricing framework for American options that integrates dynamic Hurst exponent forecasting, regime-switching volatility engines, and signature-kernel approximations.
                                        </p>
                                        <p className="text-lg text-text-muted leading-relaxed mt-6">
                                            This approach achieves more stable, accurate, and computationally efficient pricing under rough volatility conditions compared to traditional models.
                                        </p>
                                    </div>

                                    <div className="border-t border-white/10 pt-8">
                                        <h3 className="text-sm font-bold text-white tracking-widest mb-6 uppercase">Key Highlights</h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <li className="space-y-2">
                                                <span className="text-accent-purple font-mono text-xs">MODELING</span>
                                                <p className="text-text-muted text-sm leading-relaxed">
                                                    Designed a multi-regime rough volatility model tailored for early-exercise derivatives.
                                                </p>
                                            </li>
                                            <li className="space-y-2">
                                                <span className="text-accent-purple font-mono text-xs">ENGINEERING</span>
                                                <p className="text-text-muted text-sm leading-relaxed">
                                                    Engineered an experimental pipeline analyzing pricing accuracy across moneyness, maturities, and volatility regimes.
                                                </p>
                                            </li>
                                            <li className="space-y-2">
                                                <span className="text-accent-purple font-mono text-xs">BENCHMARKING</span>
                                                <p className="text-text-muted text-sm leading-relaxed">
                                                    Benchmarked the hybrid model against classical finite-difference and rough volatility approaches.
                                                </p>
                                            </li>
                                            <li className="space-y-2">
                                                <span className="text-accent-purple font-mono text-xs">IMPACT</span>
                                                <p className="text-text-muted text-sm leading-relaxed">
                                                    Explores practical implications for volatility surface shape, early-exercise premiums, and stress scenarios.
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Divider */}
                        <div className="w-full h-px bg-white/10 mb-32"></div>

                        {/* Project 2: VoiceBraille */}
                        <section className="group mb-32">
                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24 items-start">
                                {/* Left: Content (8 cols) - SWAPPED for ZigZag */}
                                <div className="xl:col-span-8 space-y-12 order-2 xl:order-1">
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-xl md:text-2xl leading-relaxed text-text-main font-light">
                                            Led the design of a portable, speech-to-Braille printing device integrating voice capture, onboard processing, and a compact mechanical Braille output mechanism.
                                        </p>
                                        <p className="text-lg text-text-muted leading-relaxed mt-6">
                                            Aimed at increasing accessibility for the visually impaired in educational settings, reducing the cost and bulk of traditional Braille embossers.
                                        </p>
                                    </div>

                                    <div className="border-t border-white/10 pt-8">
                                        <h3 className="text-sm font-bold text-white tracking-widest mb-6 uppercase">Key Highlights</h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <li className="space-y-2">
                                                <span className="text-accent-purple font-mono text-xs">LEADERSHIP</span>
                                                <p className="text-text-muted text-sm leading-relaxed">
                                                    Led a 4-person team through concept generation, mechanical prototyping, and system design.
                                                </p>
                                            </li>
                                            <li className="space-y-2">
                                                <span className="text-accent-purple font-mono text-xs">PROTOTYPING</span>
                                                <p className="text-text-muted text-sm leading-relaxed">
                                                    Built CAD prototypes in SolidWorks to validate mechanical feasibility of the printing head.
                                                </p>
                                            </li>
                                            <li className="space-y-2">
                                                <span className="text-accent-purple font-mono text-xs">BUSINESS</span>
                                                <p className="text-text-muted text-sm leading-relaxed">
                                                    Modeled costs, manufacturing workflows, and unit economics for a targeted launch across ~200 schools.
                                                </p>
                                            </li>
                                            <li className="space-y-2">
                                                <span className="text-accent-purple font-mono text-xs">RECOGNITION</span>
                                                <p className="text-text-muted text-sm leading-relaxed">
                                                    Awarded “Most Innovative Idea” at Penn’s M&TSI program.
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Right: Title & Meta (4 cols) - SWAPPED for ZigZag */}
                                <div className="xl:col-span-4 space-y-8 sticky top-12 order-1 xl:order-2 xl:text-right">
                                    <div>
                                        <span className="text-accent-cyan font-mono text-xs tracking-widest mb-4 block">02 — HARDWARE PRODUCT</span>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight group-hover:text-accent-amber transition-colors duration-300">
                                            VoiceBraille
                                        </h2>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-text-muted text-sm font-mono">
                                            <span className="block text-white mb-1">ROLE</span>
                                            Project Lead
                                        </p>
                                        <p className="text-text-muted text-sm font-mono">
                                            <span className="block text-white mb-1">CONTEXT</span>
                                            UPenn M&TSI
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="mt-12 mb-12">
                            <NextPageButton href="/contact" label="CONTACT" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
