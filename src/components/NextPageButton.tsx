import Link from "next/link";

interface NextPageButtonProps {
    href: string;
    label: string;
}

const NextPageButton = ({ href, label }: NextPageButtonProps) => {
    return (
        <div className="flex justify-center py-12 w-full">
            <Link
                href={href}
                className="group flex flex-col items-center gap-3 text-text-muted hover:text-accent-cyan transition-all duration-300"
            >
                <span className="text-sm font-mono tracking-[0.2em] uppercase border-b border-transparent group-hover:border-accent-cyan pb-1 transition-all">
                    NEXT: {label}
                </span>
                <div className="animate-bounce text-accent-cyan opacity-70 group-hover:opacity-100 transition-opacity">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                    </svg>
                </div>
            </Link>
        </div>
    );
};

export default NextPageButton;
