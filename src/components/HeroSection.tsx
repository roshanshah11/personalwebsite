"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import TextReveal from "./TextReveal";
import { useLenis } from "./SmoothScroll";

export default function HeroSection() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const timer = window.setTimeout(() => setIsMounted(true), 0);
        return () => window.clearTimeout(timer);
    }, []);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Pointer parallax for the hero name: the title drifts a few pixels against
    // the cursor, echoing the depth of the starfield behind it. Spring-smoothed,
    // and skipped entirely under prefers-reduced-motion (no listener attached).
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const driftX = useSpring(pointerX, { stiffness: 60, damping: 18 });
    const driftY = useSpring(pointerY, { stiffness: 60, damping: 18 });
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (window.matchMedia("(pointer: coarse)").matches) return;
        const onMove = (e: MouseEvent) => {
            pointerX.set(((e.clientX / window.innerWidth) * 2 - 1) * 10);
            pointerY.set(((e.clientY / window.innerHeight) * 2 - 1) * 8);
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, [pointerX, pointerY]);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        // Auto-scroll after animation completion
        const timer = setTimeout(() => {
            lenis.scrollTo("#about", {
                duration: 2.5,
                easing: (t: number) => 1 - Math.pow(1 - t, 3)
            });
        }, 2500);

        return () => clearTimeout(timer);
    }, [lenis]);

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    return (
        <section
            ref={sectionRef}
            data-tour="hero"
            // Deliberately short of a full viewport. At 100vh the hero was a
            // closed door: nothing below it was visible, so the page had to
            // auto-scroll to prove it had content. At 78vh the top of About
            // peeks in and the scroll becomes the visitor's idea.
            className="relative min-h-[78vh] min-h-[78dvh] flex flex-col items-center justify-center overflow-hidden"
        >
            <motion.div
                className="text-center z-10"
                style={isMounted ? { y, opacity, scale } : {}}
            >
                {/* Main Name */}
                <motion.div
                    className="overflow-hidden [text-shadow:0_0_35px_rgba(59,130,246,0.28)]"
                    style={{ x: driftX, y: driftY }}
                >
                    <TextReveal
                        text="ROSHAN SHAH"
                        className="t-display"
                        delay={300}
                    />
                </motion.div>

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
                        <span className="t-eyebrow text-sm text-gray-400">
                            Finance + AI
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
                    className="mt-8 t-body text-gray-400 max-w-[40ch] mx-auto px-4"
                >
                    building where finance, ai, and hardware meet, from public markets
                    to aerospace and simulation software.
                </motion.p>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.2 }}
                    className="mt-10"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="t-label text-gray-500">Scroll</span>
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
