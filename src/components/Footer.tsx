"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Footer() {
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const command = input.trim().toUpperCase();
            if (command === "CONTACT" || command === "MSG") {
                router.push("/contact");
            } else if (command === "HOME" || command === "MENU") {
                router.push("/");
            } else if (command === "EXP" || command === "EXPERIENCE") {
                router.push("/experience");
            }
            setInput("");
        }
    };

    // Focus input on click anywhere in the footer command area
    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <footer className="w-full flex-shrink-0">

            {/* Command Line */}
            <div
                className="bg-black/80 px-2 py-1 flex items-center text-sm cursor-text"
                onClick={focusInput}
            >
                <span className="text-text-muted">COMMAND:</span>
                <span className="ml-2 text-primary">/home/rohan_shah</span>
                <span className="text-text-muted mx-1">$</span>
                <div className="relative flex-grow">
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full bg-transparent border-none outline-none text-primary uppercase caret-transparent"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                    {/* Custom Blinking Cursor positioned at the end of text */}
                    <span
                        className="absolute top-0 h-4 w-2 bg-primary blinking-cursor pointer-events-none"
                        style={{ left: `${input.length}ch` }}
                    ></span>
                </div>
            </div>
        </footer>
    );
}
