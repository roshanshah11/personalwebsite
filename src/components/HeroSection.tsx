"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import TextReveal from "./TextReveal";
import { useLenis } from "./SmoothScroll";

export default function HeroSection() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        // Auto-scroll after animation completion
        // Name animation finishes around 1.5s
        const timer = setTimeout(() => {
            lenis.scrollTo("#about", {
                duration: 2.5,
                easing: (t) => 1 - Math.pow(1 - t, 3) // Cubic ease out
            });
        }, 2500); // 2.5 seconds delay

        return () => clearTimeout(timer);
    }, [lenis]);

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    return (
        <section
            ref={sectionRef}
            data-tour="hero"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            <motion.div
                className="text-center z-10"
                style={isMounted ? { y, opacity, scale } : {}}
            >
                {/* Main Name */}
                <div className="overflow-hidden">
                    <TextReveal
                        text="ROSHAN SHAH"
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter"
                        delay={300}
                    />
                </div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-6"
                >
                    <div className="flex items-center justify-center gap-3">
                        <motion.div
                            className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                        />
                        <span className="text-sm md:text-base tracking-[0.3em] text-gray-400 font-mono">
                            FINANCE + AI
                        </span>
                        <motion.div
                            className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                        />
                    </div>
                </motion.div>

                {/* Brief tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.8 }}
                    className="mt-8 text-sm md:text-base text-gray-500 max-w-md mx-auto px-4"
                >
                    Quantitative researcher building volatility models, derivatives pricing systems,
                    and AI-driven financial infrastructure.
                </motion.p>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.2 }}
                    className="mt-16"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-xs text-gray-600 tracking-widest">SCROLL</span>
                        <div className="w-5 h-8 border border-gray-600 rounded-full flex justify-center pt-2">
                            <motion.div
                                animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-1 h-1 bg-amber-500 rounded-full"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                        left: `${20 + (i * 10)}%`,
                        top: `${30 + (i % 3) * 20}%`,
                        background: i % 2 === 0 ? "#D4AF37" : "#00D9FF",
                        boxShadow: `0 0 ${6 + i}px ${i % 2 === 0 ? "#D4AF37" : "#00D9FF"}`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, i % 2 === 0 ? 20 : -20, 0],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </section>
    );
}
