"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ProfileImage3D() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative w-full aspect-[3/4] max-w-[280px] mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ perspective: 1000 }}
        >
            {/* Main Image Container */}
            <motion.div
                className="relative w-full h-full rounded-2xl overflow-hidden"
                animate={{
                    rotateY: isHovered ? 5 : 0,
                    rotateX: isHovered ? -5 : 0,
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Profile Image */}
                <img
                    src="/profile.jpeg"
                    alt="Roshan Shah"
                    className="w-full h-full object-cover"
                />

                {/* Scanline Effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                    }}
                />

                {/* Moving Scan Line */}
                <motion.div
                    className="absolute left-0 right-0 h-[2px] bg-cyan-400/60"
                    animate={{
                        top: ["0%", "100%", "0%"],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        boxShadow: "0 0 20px 4px rgba(0, 217, 255, 0.4)",
                    }}
                />

                {/* Hover Glitch Effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                        opacity: isHovered ? [0, 0.1, 0] : 0,
                    }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    style={{
                        background: "linear-gradient(90deg, rgba(255,0,0,0.1), rgba(0,255,255,0.1), rgba(255,0,0,0.1))",
                        mixBlendMode: "screen",
                    }}
                />

                {/* Vignette */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
                    }}
                />

                {/* Border */}
                <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
            </motion.div>

            {/* Glow Effect */}
            <div
                className="absolute inset-0 -z-10 opacity-50 blur-[40px] rounded-2xl"
                style={{
                    background: "linear-gradient(135deg, rgba(0, 217, 255, 0.3), rgba(212, 175, 55, 0.2))",
                }}
            />
        </motion.div>
    );
}
