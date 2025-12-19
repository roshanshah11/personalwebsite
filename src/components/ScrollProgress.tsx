"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-cyan-400 to-amber-500 origin-left z-50"
            style={{ scaleX: scrollYProgress }}
        />
    );
}
