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
            {/* No frame, no ticks, no coordinate mark. The name sits on open sky
                and the starfield is the composition — the only thing the chrome
                was ever containing was empty space that didn't need containing. */}
            <motion.div
                // w-full/px-4 are load-bearing, not cosmetic: as a shrink-to-fit
                // flex child this box sized to its content, so the name's
                // flex-wrap had no boundary to wrap against and simply ran off
                // the right edge of a phone.
                className="text-center z-10 w-full max-w-full px-4"
                style={isMounted ? { y, opacity, scale } : {}}
            >
                {/* Main Name. The blue text-shadow is gone: a Didone's whole
                    character is the contrast between hairline and stem, and a
                    35px glow fills exactly the gaps that contrast lives in. */}
                <motion.div
                    className="overflow-hidden"
                    style={{ x: driftX, y: driftY }}
                >
                    <TextReveal
                        text="ROSHAN SHAH"
                        className="t-display"
                        delay={300}
                    />
                </motion.div>

                {/* Subtitle. Was an amber rule and a cyan rule flanking mono caps —
                    both accents firing at once, on the two words meant to be the
                    quietest thing under the name. Now one brass rule, centred. */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-7 flex flex-col items-center gap-4"
                >
                    <motion.div
                        className="h-px w-14 bg-brass/75 origin-center"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                    />
                    <span className="t-eyebrow text-dim">
                        Finance + AI
                    </span>
                </motion.div>

                {/* Brief tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.8 }}
                    className="mt-7 t-gloss text-dim text-[clamp(1.05rem,1.9vw,1.35rem)] max-w-[42ch] mx-auto px-4"
                >
                    building where finance, ai, and hardware meet, from public markets
                    to aerospace and simulation software.
                </motion.p>

                {/* Scroll indicator. The rounded pill with a bouncing amber dot was
                    a stock component; a hairline dropping off the plate edge says
                    the same thing in the page's own vocabulary. */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.2 }}
                    className="mt-12 flex flex-col items-center gap-3"
                >
                    <span className="t-label text-faint">Scroll</span>
                    <div className="relative h-14 w-px bg-hair overflow-hidden">
                        <motion.div
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-x-0 h-7 bg-gradient-to-b from-transparent via-brass/70 to-transparent"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
