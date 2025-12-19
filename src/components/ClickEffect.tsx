"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickParticle {
    id: number;
    x: number;
    y: number;
}

export default function ClickEffect() {
    const [particles, setParticles] = useState<ClickParticle[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const id = Date.now();
            setParticles((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);

            // Remove particle after animation
            setTimeout(() => {
                setParticles((prev) => prev.filter((p) => p.id !== id));
            }, 1000);
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{
                            x: particle.x - 20,
                            y: particle.y - 20,
                            scale: 0,
                            opacity: 1
                        }}
                        animate={{
                            scale: [0, 1.5, 2],
                            opacity: [1, 0.5, 0]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute w-10 h-10"
                    >
                        {/* Outer ring */}
                        <div className="absolute inset-0 border border-amber-500/50 rounded-full" />
                        {/* Inner dot */}
                        <motion.div
                            initial={{ scale: 1 }}
                            animate={{ scale: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 m-auto w-2 h-2 bg-amber-500 rounded-full"
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
