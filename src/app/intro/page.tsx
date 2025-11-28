import Link from "next/link";
import NextPageButton from "@/components/NextPageButton";

export default function IntroPage() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-dark text-primary font-display">
            <div className="layout-container flex h-full grow flex-col p-4 md:p-8">
                <div className="flex flex-1 justify-center">
                    <div className="layout-content-container flex w-full max-w-[1600px] flex-1 flex-col">

                        {/* Header Section */}
                        <header className="mb-16 mt-8 border-b border-white/10 pb-8">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                                <div>
                                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-accent-amber text-glow opacity-90">
                                        LIFE_STORY
                                    </h1>
                                    <p className="text-xl md:text-2xl text-text-muted mt-2 font-light tracking-wide">
                                        The compilation of a student, builder, and researcher.
                                    </p>
                                </div>
                                <div className="flex items-center gap-6 pb-2">
                                    <Link href="/" className="text-sm text-text-muted hover:text-primary transition-colors tracking-widest">[ ESC ] BACK</Link>
                                    <span className="text-sm text-text-muted tracking-widest">PAGE 1/1</span>
                                </div>
                            </div>
                        </header>

                        {/* Editorial Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24">

                            {/* Main Content Column (Left - 8 cols) */}
                            <div className="lg:col-span-8 space-y-16">

                                {/* Who Am I Section */}
                                <section>
                                    <h2 className="text-accent-cyan text-sm font-bold tracking-[0.2em] mb-6 uppercase">
                                        // 01 — Who Am I?
                                    </h2>
                                    <p className="text-2xl md:text-3xl leading-relaxed text-text-main font-light">
                                        I'm a student at <span className="text-white font-medium border-b border-accent-amber/30">UNC Chapel Hill</span> studying Business Administration and Data Science.
                                        My interests lie at the intersection of <span className="text-accent-amber">Quantitative Finance</span>, <span className="text-accent-amber">AI</span>, and <span className="text-accent-amber">Entrepreneurship</span>.
                                    </p>
                                </section>

                                {/* Background Section */}
                                <section>
                                    <h2 className="text-accent-cyan text-sm font-bold tracking-[0.2em] mb-6 uppercase">
                                        // 02 — Background
                                    </h2>
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-lg md:text-xl leading-loose text-text-muted">
                                            I grew up fascinated by how systems work—whether it was taking apart computers or understanding market dynamics.
                                            At Lawrenceville, I led the Investment and Economics clubs, which sparked my passion for financial markets.
                                            Now, I'm focused on building tools that leverage data to solve complex problems.
                                        </p>
                                    </div>
                                </section>
                            </div>

                            {/* Sidebar Column (Right - 4 cols) */}
                            <div className="lg:col-span-4 mt-8 lg:mt-0">
                                <div className="sticky top-12">
                                    <div className="border-l-2 border-accent-purple/30 pl-8 py-2">
                                        <h2 className="text-accent-purple text-sm font-bold tracking-[0.2em] mb-8 uppercase">
                                            // Current Status
                                        </h2>

                                        <ul className="space-y-8">
                                            <li className="group">
                                                <span className="block text-xs text-text-muted font-mono mb-2">01 — WORK</span>
                                                <p className="text-lg text-white group-hover:text-accent-purple transition-colors duration-300">
                                                    Researching volatility models at <br />
                                                    <span className="font-bold">Black Swan Management</span>.
                                                </p>
                                            </li>
                                            <li className="group">
                                                <span className="block text-xs text-text-muted font-mono mb-2">02 — LEARNING</span>
                                                <p className="text-lg text-white group-hover:text-accent-purple transition-colors duration-300">
                                                    Exploring options strategies and market microstructure.
                                                </p>
                                            </li>
                                        </ul>

                                        <div className="mt-12 pt-12 border-t border-white/5">
                                            <p className="text-xs text-text-muted font-mono leading-relaxed">
                                                LAST UPDATED: <br />
                                                <span className="text-white">NOV 2025</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="mt-24 mb-12">
                            <NextPageButton href="/experience" label="EXPERIENCE" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
