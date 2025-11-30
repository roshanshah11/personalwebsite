import Link from "next/link";
import NextPageButton from "@/components/NextPageButton";

interface ExperienceData {
    company: string;
    role: string;
    date: string;
    description: string;
    details: { label: string; value: string }[];
}

const experiences: ExperienceData[] = [
    {
        company: "BLACK SWAN MANAGEMENT",
        role: "Researcher",
        date: "Nov 2025 – Present",
        description: "Researching volatility and risk models for public markets, focusing on regime changes and catalysts. Developing volatility models blending regime-switching logic, distributional assumptions, and realized-vol tracking. Experimenting with GARCH/rough volatility frameworks.",
        details: [
            { label: "Models Built", value: "3 (Volatility & Risk)" },
            { label: "Tech Stack", value: "Python (GARCH / Rough Vol)" }
        ]
    },
    {
        company: "HITECH CORPORATION",
        role: "Marketing & Strategy Intern",
        date: "Jul 2025 – Sep 2025",
        description: "Designed U.S. market entry strategy for a $3.4M+ automotive plastics acquisition. Built CRM-integrated lead pipeline targeting $50M+ TAM. Analyzed competitor pricing and distribution to recommend go-to-market strategy.",
        details: [
            { label: "Deal Size", value: "$3.4M (Acquisition Strategy)" },
            { label: "TAM Identified", value: "$50M+ (Lead Pipeline)" }
        ]
    },
    {
        company: "CHAKLI CAPITAL LLC",
        role: "Summer Analyst",
        date: "May 2025 – Jul 2025",
        description: "Supported public-equity investing in AI and enterprise software. Built DCF, trading comps, and TAM models supporting $20M+ capital allocation. Wrote sector memos on AI monetization and infrastructure cycles.",
        details: [
            { label: "Capital Deployed", value: "$20M+ (Allocation Support)" },
            { label: "Focus", value: "AI / SaaS (Sector Analysis)" }
        ]
    },
    {
        company: "DTV.AI",
        role: "Co-Founder",
        date: "May 2023 – Feb 2025",
        description: "Co-founded cost-analytics startup for retailers/CPG. Produced teardown reports identifying sourcing inefficiencies. Quantified 12–15% margin improvements, generating $40K+ B2B revenue.",
        details: [
            { label: "Margin Impact", value: "+15% (Cost Optimization)" },
            { label: "Revenue", value: "$40K+ (B2B Generated)" }
        ]
    },
    {
        company: "KENAN-FLAGLER CDR",
        role: "Research Assistant",
        date: "Sep 2025 – Present",
        description: "Assisting with experimental design for behavioral studies. Managing study sessions and participant logistics. Cleaning and structuring raw behavioral data for analysis.",
        details: [
            { label: "Studies", value: "Behavioral (Experimental Design)" },
            { label: "Data", value: "Cleaning (Analysis Prep)" }
        ]
    }
];

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
                                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-accent-gold text-glow opacity-90">
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

                        <div className="space-y-12">
                            {experiences.map((exp, index) => {
                                const displayIndex = index + 1;
                                const isEven = displayIndex % 2 === 0;

                                return (
                                    <section
                                        key={index}
                                        className="group relative border border-white/10 bg-white/[0.02] p-8 md:p-12 rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-black/50"
                                    >
                                        {/* Watermark Number */}
                                        <div className="absolute -top-10 -right-4 text-[10rem] md:text-[12rem] font-bold text-white/[0.02] select-none pointer-events-none font-mono leading-none z-0">
                                            {String(displayIndex).padStart(2, '0')}
                                        </div>

                                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-16 items-start relative z-10">
                                            {/* Title & Meta Column */}
                                            <div className={`xl:col-span-5 space-y-8 ${isEven ? 'xl:order-last' : ''}`}>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="flex items-center justify-center w-8 h-8 rounded-full border border-accent-cyan/30 text-accent-cyan font-mono text-xs font-bold bg-accent-cyan/5">
                                                            {String(displayIndex)}
                                                        </span>
                                                        <span className="text-accent-cyan font-mono text-xs tracking-widest block">
                                                            {exp.date.toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight group-hover:text-accent-gold transition-colors duration-300">
                                                        {exp.company}
                                                    </h3>
                                                </div>

                                                <div className="space-y-4 p-6 rounded-xl bg-white/[0.03] border border-white/5">
                                                    <div className="mb-4 last:mb-0">
                                                        <span className="block text-white mb-2 text-xs uppercase tracking-wider opacity-70">Role</span>
                                                        <span className="text-text-muted text-sm font-mono leading-relaxed">{exp.role}</span>
                                                    </div>
                                                </div>


                                            </div>

                                            {/* Content Column */}
                                            <div className="xl:col-span-7 space-y-10">
                                                <div className="prose prose-invert max-w-none">
                                                    <p className="text-xl leading-relaxed text-text-main font-light">
                                                        {exp.description}
                                                    </p>
                                                </div>

                                                <div className="border-t border-white/10 pt-8">
                                                    <h4 className="text-sm font-bold text-white tracking-widest mb-6 uppercase flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
                                                        Key Highlights
                                                    </h4>
                                                    <ul className="grid grid-cols-1 gap-6">
                                                        {exp.details.map((detail, detailIndex) => (
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
                                            </div>
                                        </div>
                                    </section>
                                );
                            })}
                        </div>

                        {/* Additional Sections (Leadership, Education, Skills) */}
                        <div className="mt-12 border-t border-white/10 pt-24">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                                {/* Leadership */}
                                <div>
                                    <h2 className="text-accent-gold text-sm font-bold tracking-[0.2em] mb-8 uppercase">
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
                                    <h2 className="text-accent-gold text-sm font-bold tracking-[0.2em] mb-8 uppercase">
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
                                    <h2 className="text-accent-gold text-sm font-bold tracking-[0.2em] mb-8 uppercase">
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
