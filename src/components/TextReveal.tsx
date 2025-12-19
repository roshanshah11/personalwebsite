"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const chars = text.split("");
    const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <motion.div className="flex flex-wrap justify-center">
                {chars.map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{
                            opacity: 0,
                            y: 100,
                            rotateX: -90,
                            filter: "blur(10px)"
                        }}
                        animate={isVisible ? {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            filter: "blur(0px)"
                        } : {}}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.05,
                            ease: [0.6, 0.05, 0.01, 0.9],
                        }}
                        className="inline-block"
                        style={{
                            transformStyle: "preserve-3d",
                            whiteSpace: char === " " ? "pre" : "normal"
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}
