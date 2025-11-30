import Link from "next/link";
import NextPageButton from "@/components/NextPageButton";

export default function AwardsPage() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-dark text-primary font-display">
            <div className="layout-container flex h-full grow flex-col p-4 md:p-8">
                <div className="flex flex-1 justify-center">
                    <div className="layout-content-container flex w-full max-w-[1600px] flex-1 flex-col">

                        {/* Header */}
                        <header className="mb-16 mt-8">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
                                <div>
                                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-accent-gold text-glow opacity-90">
                                        AWARDS
                                    </h1>
                                    <p className="text-xl md:text-2xl text-text-muted mt-2 font-light tracking-wide">
                                        Recognition for academic and extracurricular excellence.
                                    </p>
                                </div>
                                <div className="flex items-center gap-6 pb-2">
                                    <Link href="/" className="text-sm text-text-muted hover:text-primary transition-colors tracking-widest">[ ESC ] BACK</Link>
                                    <span className="text-sm text-text-muted tracking-widest">PAGE 1/1</span>
                                </div>
                            </div>
                        </header>

                        {/* Awards Table/List */}
                        <div className="flex flex-col">
                            {/* Table Header (Desktop only) */}
                            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-4 border-b border-white/20 text-xs font-mono tracking-widest text-text-muted uppercase">
                                <div className="col-span-3">Award Name</div>
                                <div className="col-span-3">Institution</div>
                                <div className="col-span-2">Date</div>
                                <div className="col-span-4">Details</div>
                            </div>

                            {/* Award Rows */}
                            <div className="divide-y divide-white/5">

                                {/* Row 1 */}
                                <div className="group md:grid md:grid-cols-12 md:gap-4 p-4 md:py-8 hover:bg-white/5 transition-colors duration-200 items-start">
                                    <div className="col-span-3 mb-2 md:mb-0">
                                        <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">Herman Hollerith Prize</h3>
                                        <span className="inline-block md:hidden text-xs text-accent-cyan font-bold mt-1">WINNER</span>
                                    </div>
                                    <div className="col-span-3 mb-2 md:mb-0 text-text-muted group-hover:text-white transition-colors">
                                        The Lawrenceville School
                                    </div>
                                    <div className="col-span-2 mb-4 md:mb-0 font-mono text-sm text-text-muted">
                                        May 2024
                                    </div>
                                    <div className="col-span-4 text-text-main text-sm leading-relaxed">
                                        Awarded to the student who exhibits the most creativity, ingenuity, or entrepreneurial flair in the application of computer science. Recognized for building a Transcript analysis tool used by dean of students for student analysis and insight.
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="group md:grid md:grid-cols-12 md:gap-4 p-4 md:py-8 hover:bg-white/5 transition-colors duration-200 items-start">
                                    <div className="col-span-3 mb-2 md:mb-0">
                                        <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">NJ State Economics Champion</h3>
                                        <span className="inline-block md:hidden text-xs text-accent-cyan font-bold mt-1">1ST PLACE</span>
                                    </div>
                                    <div className="col-span-3 mb-2 md:mb-0 text-text-muted group-hover:text-white transition-colors">
                                        Council for Economic Education
                                    </div>
                                    <div className="col-span-2 mb-4 md:mb-0 font-mono text-sm text-text-muted">
                                        Apr 2024
                                    </div>
                                    <div className="col-span-4 text-text-main text-sm leading-relaxed">
                                        Led 4-person team to 1st place in NJ (David Ricardo Division). Qualified for National Semifinals. Tested on micro/macro theory and international trade.
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="group md:grid md:grid-cols-12 md:gap-4 p-4 md:py-8 hover:bg-white/5 transition-colors duration-200 items-start">
                                    <div className="col-span-3 mb-2 md:mb-0">
                                        <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">Wharton Investment Comp</h3>
                                        <span className="inline-block md:hidden text-xs text-accent-cyan font-bold mt-1">SEMIFINALIST</span>
                                    </div>
                                    <div className="col-span-3 mb-2 md:mb-0 text-text-muted group-hover:text-white transition-colors">
                                        Wharton School (UPenn)
                                    </div>
                                    <div className="col-span-2 mb-4 md:mb-0 font-mono text-sm text-text-muted">
                                        Jan 2024
                                    </div>
                                    <div className="col-span-4 text-text-main text-sm leading-relaxed">
                                        Top 50 out of 1,600+ global teams. Managed $100K virtual portfolio. Pitched long-term strategy focusing on semiconductor supply chains.
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="group md:grid md:grid-cols-12 md:gap-4 p-4 md:py-8 hover:bg-white/5 transition-colors duration-200 items-start">
                                    <div className="col-span-3 mb-2 md:mb-0">
                                        <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">Most Innovative Idea</h3>
                                        <span className="inline-block md:hidden text-xs text-accent-cyan font-bold mt-1">WINNER</span>
                                    </div>
                                    <div className="col-span-3 mb-2 md:mb-0 text-text-muted group-hover:text-white transition-colors">
                                        Jerome Fisher Program (UPenn)
                                    </div>
                                    <div className="col-span-2 mb-4 md:mb-0 font-mono text-sm text-text-muted">
                                        Jul 2023
                                    </div>
                                    <div className="col-span-4 text-text-main text-sm leading-relaxed">
                                        Awarded for "VoiceBraille" – a portable speech-to-Braille printer. Developed prototype and business plan during the Management & Technology Summer Institute.
                                    </div>
                                </div>

                                {/* Row 5 */}
                                <div className="group md:grid md:grid-cols-12 md:gap-4 p-4 md:py-8 hover:bg-white/5 transition-colors duration-200 items-start">
                                    <div className="col-span-3 mb-2 md:mb-0">
                                        <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">McClellan Society</h3>
                                        <span className="inline-block md:hidden text-xs text-accent-cyan font-bold mt-1">SERVICE</span>
                                    </div>
                                    <div className="col-span-3 mb-2 md:mb-0 text-text-muted group-hover:text-white transition-colors">
                                        The Lawrenceville School
                                    </div>
                                    <div className="col-span-2 mb-4 md:mb-0 font-mono text-sm text-text-muted">
                                        2021 – 2024
                                    </div>
                                    <div className="col-span-4 text-text-main text-sm leading-relaxed">
                                        Given to students with 400+ hours of community service. Recognized for tutoring in Trenton public schools and organizing campus cleanups.
                                    </div>
                                </div>

                                {/* Row 6 */}
                                <div className="group md:grid md:grid-cols-12 md:gap-4 p-4 md:py-8 hover:bg-white/5 transition-colors duration-200 items-start">
                                    <div className="col-span-3 mb-2 md:mb-0">
                                        <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">Cum Laude Society</h3>
                                        <span className="inline-block md:hidden text-xs text-accent-cyan font-bold mt-1">HONOR</span>
                                    </div>
                                    <div className="col-span-3 mb-2 md:mb-0 text-text-muted group-hover:text-white transition-colors">
                                        The Lawrenceville School
                                    </div>
                                    <div className="col-span-2 mb-4 md:mb-0 font-mono text-sm text-text-muted">
                                        May 2024
                                    </div>
                                    <div className="col-span-4 text-text-main text-sm leading-relaxed">
                                        Top 10% of graduating class. Recognized for academic excellence across all disciplines (GPA 3.92/4.00).
                                    </div>
                                </div>

                                {/* Row 7 */}
                                <div className="group md:grid md:grid-cols-12 md:gap-4 p-4 md:py-8 hover:bg-white/5 transition-colors duration-200 items-start">
                                    <div className="col-span-3 mb-2 md:mb-0">
                                        <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">Journal of Future Economists</h3>
                                        <span className="inline-block md:hidden text-xs text-accent-cyan font-bold mt-1">PUBLISHED</span>
                                    </div>
                                    <div className="col-span-3 mb-2 md:mb-0 text-text-muted group-hover:text-white transition-colors">
                                        Federal Reserve Bank
                                    </div>
                                    <div className="col-span-2 mb-4 md:mb-0 font-mono text-sm text-text-muted">
                                        May 2024
                                    </div>
                                    <div className="col-span-4 text-text-main text-sm leading-relaxed">
                                        Selected as one of the top 12 teams nationally in the High School Fed Challenge. Research published highlighting excellence in monetary policy.
                                        <div className="mt-3">
                                            <a
                                                href="/2025-journal-of-future-economists.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-gold transition-colors font-mono text-xs uppercase tracking-wider"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                View Publication
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="mt-24 mb-12">
                            <NextPageButton href="/contact" label="CONTACT" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
