"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface IntroAnimationProps {
    onComplete: () => void;
}

const TARGET_TEXT = "ROSHAN SHAH";
const SUB_TEXT = "FINANCE + AI";

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
    const [textRevealed, setTextRevealed] = useState(false);
    const [subTextRevealed, setSubTextRevealed] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [particles, setParticles] = useState<Array<{
        x: number[];
        y: number[];
        duration: number;
        delay: number;
        color: string;
        shadowSize: number;
    }>>([]);
    const [isMounted, setIsMounted] = useState(false);

    // Generate particles only on client side
    useEffect(() => {
        setIsMounted(true);
        const width = window.innerWidth;
        const height = window.innerHeight;

        const newParticles = [...Array(20)].map((_, i) => ({
            x: [
                Math.random() * width,
                Math.random() * width,
                Math.random() * width
            ],
            y: [
                Math.random() * height,
                Math.random() * height,
                Math.random() * height
            ],
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 2,
            color: i % 2 === 0 ? '#3b82f6' : '#D4AF37',
            shadowSize: 4 + Math.random() * 6
        }));

        setParticles(newParticles);
    }, []);

    // Cinematic Reveal Sequence
    useEffect(() => {
        const t1 = setTimeout(() => setTextRevealed(true), 300);
        const t2 = setTimeout(() => setSubTextRevealed(true), 1200);
        const t3 = setTimeout(() => setIsExiting(true), 3200);
        const t4 = setTimeout(onComplete, 4200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-background-dark flex flex-col items-center justify-center overflow-hidden"
            style={{ pointerEvents: isExiting ? 'none' : 'auto' }}
        >
            {/* Animated Background Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[150px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.3, 0.15],
                    rotate: [0, -90, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent-gold/15 rounded-full blur-[150px] pointer-events-none"
            />

            {/* Floating Particles */}
            {isMounted && particles.map((particle, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: particle.x[0],
                        y: particle.y[0],
                        opacity: 0
                    }}
                    animate={{
                        x: particle.x,
                        y: particle.y,
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: particle.delay
                    }}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                        background: particle.color,
                        boxShadow: `0 0 ${particle.shadowSize}px ${particle.color}`
                    }}
                />
            ))}

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center p-4 text-center">
                {/* Name with Split Effect */}
                <div className="mb-8 relative overflow-hidden">
                    {/* Glow Effect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: textRevealed ? [0.3, 0.6, 0.3] : 0,
                            scale: textRevealed ? [1, 1.2, 1] : 0.5
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-gradient-to-r from-primary/30 to-accent-gold/30 rounded-full blur-[80px]"
                    />

                    {/* Text Split Animation */}
                    <div className="relative z-10 flex flex-col md:flex-row gap-2 md:gap-4">
                        <motion.h1
                            initial={{ opacity: 0, x: -100, rotateY: -90 }}
                            animate={{
                                opacity: textRevealed ? 1 : 0,
                                x: textRevealed ? 0 : -100,
                                rotateY: textRevealed ? 0 : -90
                            }}
                            transition={{
                                duration: 1,
                                ease: [0.6, 0.05, 0.01, 0.9]
                            }}
                            className="text-5xl md:text-8xl font-bold font-mono tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
                            style={{
                                textShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            ROSHAN
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, x: 100, rotateY: 90 }}
                            animate={{
                                opacity: textRevealed ? 1 : 0,
                                x: textRevealed ? 0 : 100,
                                rotateY: textRevealed ? 0 : 90
                            }}
                            transition={{
                                duration: 1,
                                ease: [0.6, 0.05, 0.01, 0.9],
                                delay: 0.1
                            }}
                            className="text-5xl md:text-8xl font-bold font-mono tracking-tight bg-gradient-to-r from-gray-300 via-gray-100 to-white bg-clip-text text-transparent"
                            style={{
                                textShadow: '0 0 40px rgba(212, 175, 55, 0.3)',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            SHAH
                        </motion.h1>
                    </div>
                </div>

                {/* Subtitle with Line Reveal */}
                <div className="relative overflow-hidden">
                    {/* Accent Lines */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: subTextRevealed ? 1 : 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent origin-center"
                        style={{ transform: 'translateY(-50%)' }}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{
                            opacity: subTextRevealed ? 1 : 0,
                            y: subTextRevealed ? 0 : 20,
                            scale: subTextRevealed ? 1 : 0.8
                        }}
                        transition={{
                            duration: 1,
                            ease: [0.6, 0.05, 0.01, 0.9],
                            delay: 0.2
                        }}
                        className="relative z-10 px-8 py-4 backdrop-blur-sm"
                    >
                        <div className="text-lg md:text-2xl tracking-[0.4em] font-light bg-gradient-to-r from-accent-cyan via-primary to-accent-gold bg-clip-text text-transparent">
                            {SUB_TEXT}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: subTextRevealed ? 1 : 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-gold to-transparent origin-center"
                        style={{ transform: 'translateY(50%)' }}
                    />
                </div>

                {/* Pulsing Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: subTextRevealed ? [0.3, 0.8, 0.3] : 0,
                        scale: subTextRevealed ? [1, 1.1, 1] : 1
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                    className="mt-12 w-2 h-2 rounded-full bg-primary shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                />
            </div>
        </motion.div>
    );
};

export default IntroAnimation;
