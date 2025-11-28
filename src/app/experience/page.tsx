import Link from "next/link";
import ExperienceStats from "@/components/ExperienceStats";
import NextPageButton from "@/components/NextPageButton";

export default function ExperiencePage() {
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
                                        EXPERIENCE
                                    </h1>
                                    <p className="text-xl md:text-2xl text-text-muted mt-2 font-light tracking-wide">
                                        A timeline of professional work and leadership.
                                    </p>
                                </div>
                                <div className="flex items-center gap-6 pb-2">
                                    <Link href="/" className="text-sm text-text-muted hover:text-primary transition-colors tracking-widest">[ ESC ] BACK</Link>
                                    <span className="text-sm text-text-muted tracking-widest">PAGE 1/1</span>
                                </div>
                            </div>
                        </header>

                        {/* Timeline Section */}
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-amber/50 via-white/10 to-transparent md:-translate-x-1/2"></div>

                            {/* Experience Item 1: Black Swan */}
                            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24 group">
                                {/* Left Side (Date & Company) */}
                                <div className="md:text-right pl-12 md:pl-0 md:pr-12 relative">
                                    <div className="absolute left-[16px] md:left-auto md:right-[-6px] top-2 w-2 h-2 rounded-full bg-accent-amber ring-4 ring-background-dark md:translate-x-1/2"></div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-accent-amber transition-colors">BLACK SWAN MANAGEMENT</h3>
                                    <p className="text-text-muted font-mono mt-1">Nov 2025 – Present</p>
                                </div>
                                {/* Right Side (Role & Details) */}
                                <div className="pl-12 md:pl-12">
                                    <h4 className="text-xl text-accent-cyan font-bold tracking-wide mb-4">Researcher</h4>
                                    <p className="text-text-main leading-relaxed mb-6 max-w-xl">
                                        Researching volatility and risk models for public markets, focusing on regime changes and catalysts.
                                        Developing volatility models blending regime-switching logic, distributional assumptions, and realized-vol tracking.
                                        Experimenting with GARCH/rough volatility frameworks.
                                    </p>
                                    <div className="opacity-80">
                                        <ExperienceStats stats={[
                                            { label: "Models Built", value: "3", subtext: "Volatility & Risk" },
                                            { label: "Tech Stack", value: "Python", subtext: "GARCH / Rough Vol" }
                                        ]} />
                                    </div>
                                </div>
                            </div>

                            {/* Experience Item 2: Hitech Corporation */}
                            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24 group">
                                {/* Left Side (Role & Details - Swapped for ZigZag effect on Desktop? No, sticking to consistent side for readability, but can swap if requested. Let's keep consistent layout: Date/Company Left, Details Right for timeline clarity) */}
                                <div className="md:text-right pl-12 md:pl-0 md:pr-12 relative">
                                    <div className="absolute left-[16px] md:left-auto md:right-[-6px] top-2 w-2 h-2 rounded-full bg-white/30 group-hover:bg-accent-cyan transition-colors ring-4 ring-background-dark md:translate-x-1/2"></div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">HITECH CORPORATION</h3>
                                    <p className="text-text-muted font-mono mt-1">Jul 2025 – Sep 2025</p>
                                </div>
                                <div className="pl-12 md:pl-12">
                                    <h4 className="text-xl text-accent-cyan font-bold tracking-wide mb-4">Marketing & Strategy Intern</h4>
                                    <p className="text-text-main leading-relaxed mb-6 max-w-xl">
                                        Designed U.S. market entry strategy for a $3.4M+ automotive plastics acquisition.
                                        Built CRM-integrated lead pipeline targeting $50M+ TAM.
                                        Analyzed competitor pricing and distribution to recommend go-to-market strategy.
                                    </p>
                                    <div className="opacity-80">
                                        <ExperienceStats stats={[
                                            { label: "Deal Size", value: "$3.4M", subtext: "Acquisition Strategy" },
                                            { label: "TAM Identified", value: "$50M+", subtext: "Lead Pipeline" }
                                        ]} />
                                    </div>
                                </div>
                            </div>

                            {/* Experience Item 3: Chakli Capital */}
                            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24 group">
                                <div className="md:text-right pl-12 md:pl-0 md:pr-12 relative">
                                    <div className="absolute left-[16px] md:left-auto md:right-[-6px] top-2 w-2 h-2 rounded-full bg-white/30 group-hover:bg-accent-cyan transition-colors ring-4 ring-background-dark md:translate-x-1/2"></div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">CHAKLI CAPITAL LLC</h3>
                                    <p className="text-text-muted font-mono mt-1">May 2025 – Jul 2025</p>
                                </div>
                                <div className="pl-12 md:pl-12">
                                    <h4 className="text-xl text-accent-cyan font-bold tracking-wide mb-4">Summer Analyst</h4>
                                    <p className="text-text-main leading-relaxed mb-6 max-w-xl">
                                        Supported public-equity investing in AI and enterprise software.
                                        Built DCF, trading comps, and TAM models supporting $20M+ capital allocation.
                                        Wrote sector memos on AI monetization and infrastructure cycles.
                                    </p>
                                    <div className="opacity-80">
                                        <ExperienceStats stats={[
                                            { label: "Capital Deployed", value: "$20M+", subtext: "Allocation Support" },
                                            { label: "Focus", value: "AI / SaaS", subtext: "Sector Analysis" }
                                        ]} />
                                    </div>
                                </div>
                            </div>

                            {/* Experience Item 4: DTV.ai */}
                            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24 group">
                                <div className="md:text-right pl-12 md:pl-0 md:pr-12 relative">
                                    <div className="absolute left-[16px] md:left-auto md:right-[-6px] top-2 w-2 h-2 rounded-full bg-white/30 group-hover:bg-accent-cyan transition-colors ring-4 ring-background-dark md:translate-x-1/2"></div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">DTV.AI</h3>
                                    <p className="text-text-muted font-mono mt-1">May 2023 – Feb 2025</p>
                                </div>
                                <div className="pl-12 md:pl-12">
                                    <h4 className="text-xl text-accent-cyan font-bold tracking-wide mb-4">Co-Founder</h4>
                                    <p className="text-text-main leading-relaxed mb-6 max-w-xl">
                                        Co-founded cost-analytics startup for retailers/CPG.
                                        Produced teardown reports identifying sourcing inefficiencies.
                                        Quantified 12–15% margin improvements, generating $40K+ B2B revenue.
                                    </p>
                                    <div className="opacity-80">
                                        <ExperienceStats stats={[
                                            { label: "Margin Impact", value: "+15%", subtext: "Cost Optimization" },
                                            { label: "Revenue", value: "$40K+", subtext: "B2B Generated" }
                                        ]} />
                                    </div>
                                </div>
                            </div>

                            {/* Experience Item 5: Kenan-Flagler */}
                            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24 group">
                                <div className="md:text-right pl-12 md:pl-0 md:pr-12 relative">
                                    <div className="absolute left-[16px] md:left-auto md:right-[-6px] top-2 w-2 h-2 rounded-full bg-white/30 group-hover:bg-accent-cyan transition-colors ring-4 ring-background-dark md:translate-x-1/2"></div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">KENAN-FLAGLER CDR</h3>
                                    <p className="text-text-muted font-mono mt-1">Sep 2025 – Present</p>
                                </div>
                                <div className="pl-12 md:pl-12">
                                    <h4 className="text-xl text-accent-cyan font-bold tracking-wide mb-4">Research Assistant</h4>
                                    <p className="text-text-main leading-relaxed mb-6 max-w-xl">
                                        Assisting with experimental design for behavioral studies.
                                        Managing study sessions and participant logistics.
                                        Cleaning and structuring raw behavioral data for analysis.
                                    </p>
                                    <div className="opacity-80">
                                        <ExperienceStats stats={[
                                            { label: "Studies", value: "Behavioral", subtext: "Experimental Design" },
                                            { label: "Data", value: "Cleaning", subtext: "Analysis Prep" }
                                        ]} />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Additional Sections (Leadership, Education, Skills) */}
                        <div className="mt-12 border-t border-white/10 pt-24">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                                {/* Leadership */}
                                <div>
                                    <h2 className="text-accent-amber text-sm font-bold tracking-[0.2em] mb-8 uppercase">
                                        // Leadership
                                    </h2>
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">Economics Club</h3>
                                            <p className="text-text-muted text-sm font-mono mb-2">President</p>
                                            <p className="text-text-main leading-relaxed text-sm">
                                                Led team to NJ State Champions and National Finalists. Organized practices, lectures, and competition prep.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">Investment Club</h3>
                                            <p className="text-text-muted text-sm font-mono mb-2">President</p>
                                            <p className="text-text-main leading-relaxed text-sm">
                                                Led team to Wharton Investment Competition Semifinals. Oversaw stock pitches and portfolio decisions.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Education */}
                                <div>
                                    <h2 className="text-accent-amber text-sm font-bold tracking-[0.2em] mb-8 uppercase">
                                        // Education
                                    </h2>
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">UNC Chapel Hill</h3>
                                            <p className="text-text-muted text-sm font-mono mb-2">Kenan-Flagler Business School</p>
                                            <p className="text-text-main leading-relaxed text-sm">
                                                B.S. Business Administration + Data Science.
                                                Assured Enrollment. Portfolio Management Team (TMT), Quant Finance Assoc.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">The Lawrenceville School</h3>
                                            <p className="text-text-muted text-sm font-mono mb-2">Cum Laude (GPA 3.92/4.00)</p>
                                            <p className="text-text-main leading-relaxed text-sm">
                                                Herman Hollerith Prize (Entrepreneurship+CS), McClellan Society.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div>
                                    <h2 className="text-accent-amber text-sm font-bold tracking-[0.2em] mb-8 uppercase">
                                        // Capabilities
                                    </h2>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-accent-cyan font-bold text-sm tracking-wider mb-4">LANGUAGES</h4>
                                            <ul className="space-y-2 text-text-muted text-sm font-mono">
                                                <li>Python</li>
                                                <li>R</li>
                                                <li>C++</li>
                                                <li>SQL</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-accent-cyan font-bold text-sm tracking-wider mb-4">FINANCE</h4>
                                            <ul className="space-y-2 text-text-muted text-sm font-mono">
                                                <li>DCF / Comps</li>
                                                <li>Volatility Models</li>
                                                <li>Derivatives</li>
                                                <li>Market Microstructure</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-accent-cyan font-bold text-sm tracking-wider mb-4">DATA</h4>
                                            <ul className="space-y-2 text-text-muted text-sm font-mono">
                                                <li>Pandas / NumPy</li>
                                                <li>Scikit-Learn</li>
                                                <li>Tableau</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-accent-cyan font-bold text-sm tracking-wider mb-4">WEB</h4>
                                            <ul className="space-y-2 text-text-muted text-sm font-mono">
                                                <li>Next.js</li>
                                                <li>React</li>
                                                <li>Tailwind</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="mt-24 mb-12">
                            <NextPageButton href="/projects" label="PROJECTS" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
