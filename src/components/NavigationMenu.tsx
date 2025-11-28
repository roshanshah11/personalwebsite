import Link from "next/link";

const NavigationMenu = () => {
    return (
        <nav className="w-full max-w-md mx-auto mt-8 border border-text-muted/30 p-4 glass-panel relative">
            {/* Swirly Arrow & Text (Desktop) */}
            <div className="absolute -left-48 -top-10 hidden md:flex flex-col items-end pointer-events-none">
                <span className="text-accent-cyan font-handwriting text-sm mb-1 rotate-[-12deg] w-40 text-right animate-pulse">
                    if you're stuck, start here!!
                </span>
                <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent-cyan">
                    <path
                        d="M10 40 C 40 10, 70 10, 110 30"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="5 5"
                        className="animate-dash"
                    />
                    <path d="M105 25 L 110 30 L 100 33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <div className="flex flex-col gap-2">
                <Link href="/intro" className="group flex items-center justify-between hover:bg-primary/10 p-2 transition-colors rounded relative">
                    {/* Mobile Arrow (Simple) */}
                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 md:hidden text-accent-cyan animate-bounce">
                        ➜
                    </div>

                    <span className="text-accent-amber font-bold">0) INTRO</span>
                    <span className="text-primary group-hover:text-white">&lt;GO&gt;</span>
                </Link>
                <Link href="/experience" className="group flex items-center justify-between hover:bg-primary/10 p-2 transition-colors rounded">
                    <span className="text-accent-amber font-bold">1) EXPERIENCE</span>
                    <span className="text-primary group-hover:text-white">&lt;GO&gt;</span>
                </Link>
                <Link href="/projects" className="group flex items-center justify-between hover:bg-primary/10 p-2 transition-colors rounded">
                    <span className="text-accent-amber font-bold">2) PROJECTS</span>
                    <span className="text-primary group-hover:text-white">&lt;GO&gt;</span>
                </Link>
                <Link href="/awards" className="group flex items-center justify-between hover:bg-primary/10 p-2 transition-colors rounded">
                    <span className="text-accent-amber font-bold">3) AWARDS</span>
                    <span className="text-primary group-hover:text-white">&lt;GO&gt;</span>
                </Link>
                <Link href="/contact" className="group flex items-center justify-between hover:bg-primary/10 p-2 transition-colors rounded">
                    <span className="text-accent-amber font-bold">4) CONTACT</span>
                    <span className="text-primary group-hover:text-white">&lt;GO&gt;</span>
                </Link>
            </div>
        </nav>
    );
};

export default NavigationMenu;
