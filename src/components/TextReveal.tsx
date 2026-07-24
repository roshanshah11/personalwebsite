"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export default function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
    const chars = text.split("");
    const [isVisible, setIsVisible] = useState(false);
    const [revealed, setRevealed] = useState(0);
    const [tick, setTick] = useState(0);
    const [reduced, setReduced] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setReduced(rm);
        if (rm) {
            // No kinetic decode: show the name plainly
            setIsVisible(true);
            setRevealed(chars.length);
            return;
        }
        const startTimer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(startTimer);
    }, [delay, chars.length]);

    // Lock characters left-to-right once the entrance starts
    useEffect(() => {
        if (!isVisible || reduced) return;
        const revealId = setInterval(() => {
            setRevealed((r) => {
                if (r >= chars.length) {
                    clearInterval(revealId);
                    return r;
                }
                return r + 1;
            });
        }, 90);
        return () => clearInterval(revealId);
    }, [isVisible, reduced, chars.length]);

    // Re-roll the scramble glyphs until every character is locked
    useEffect(() => {
        if (!isVisible || reduced || revealed >= chars.length) return;
        const scrambleId = setInterval(() => setTick((t) => t + 1), 45);
        return () => clearInterval(scrambleId);
    }, [isVisible, reduced, revealed, chars.length]);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div className="flex flex-wrap justify-center">
                {chars.map((char, index) => {
                    const isSpace = char === " ";
                    const locked = reduced || index < revealed;
                    const glyph = isSpace
                        ? " "
                        : locked
                            ? char
                            : SCRAMBLE[(index * 7 + tick) % SCRAMBLE.length];
                    return (
                        <motion.span
                            key={index}
                            initial={reduced ? false : { opacity: 0, y: 80, rotateX: -90, filter: "blur(8px)" }}
                            animate={isVisible ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" } : {}}
                            transition={{
                                duration: 0.7,
                                delay: reduced ? 0 : index * 0.04,
                                ease: [0.6, 0.05, 0.01, 0.9],
                            }}
                            whileHover={reduced ? undefined : { scale: 1.18, y: -6, color: "#FBBF24" }}
                            className={`inline-block ${locked ? "" : "text-cyan-400/80"}`}
                            style={{
                                transformStyle: "preserve-3d",
                                whiteSpace: isSpace ? "pre" : "normal",
                            }}
                        >
                            {glyph}
                        </motion.span>
                    );
                })}
            </div>
        </div>
    );
}
