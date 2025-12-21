'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTourController } from './useTourController';
import { CaptionPlacement } from './types';
import { useEffect, useState, useRef } from 'react';

/**
 * Cinematic caption renderer with film-like subtitles
 * Supports positioning near target or bottom-center
 */
export function CaptionRenderer() {
    const { currentStep, isActive, isReducedMotion } = useTourController();
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const typeIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const text = currentStep?.text ?? '';
    const placement = currentStep?.placement ?? 'bottom-center';

    // Typing effect (if not reduced motion)
    useEffect(() => {
        if (typeIntervalRef.current) {
            clearInterval(typeIntervalRef.current);
        }

        if (!text) {
            setDisplayText('');
            return;
        }

        if (isReducedMotion) {
            // Skip typing effect for reduced motion
            setDisplayText(text);
            return;
        }

        setIsTyping(true);
        setDisplayText('');

        let index = 0;
        const typeSpeed = 20; // ms per character

        typeIntervalRef.current = setInterval(() => {
            if (index < text.length) {
                setDisplayText(text.slice(0, index + 1));
                index++;
            } else {
                setIsTyping(false);
                if (typeIntervalRef.current) {
                    clearInterval(typeIntervalRef.current);
                }
            }
        }, typeSpeed);

        return () => {
            if (typeIntervalRef.current) {
                clearInterval(typeIntervalRef.current);
            }
        };
    }, [text, isReducedMotion]);

    // Skip typing when clicking/pressing space
    const skipTyping = () => {
        if (isTyping && typeIntervalRef.current) {
            clearInterval(typeIntervalRef.current);
            setDisplayText(text);
            setIsTyping(false);
        }
    };

    // Get position styles based on placement
    const getPositionStyles = (): React.CSSProperties => {
        switch (placement) {
            case 'bottom-center':
                return {
                    bottom: '200px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                };
            case 'top-center':
                return {
                    top: '120px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                };
            case 'left':
                return {
                    top: '50%',
                    left: '40px',
                    transform: 'translateY(-50%)',
                };
            case 'right':
                return {
                    top: '50%',
                    right: '40px',
                    transform: 'translateY(-50%)',
                };
            case 'near-target':
            default:
                // Default to top-center for better visibility
                return {
                    top: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                };
        }
    };

    if (!isActive) return null;

    return (
        <AnimatePresence mode="wait">
            {currentStep && (
                <motion.div
                    key={currentStep.id}
                    className="fixed z-[10001] max-w-2xl px-4"
                    style={getPositionStyles()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                        duration: isReducedMotion ? 0.1 : 0.4,
                        ease: 'easeOut'
                    }}
                    onClick={skipTyping}
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {/* Caption background */}
                    <div
                        className="relative rounded-xl overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.95) 0%, rgba(20, 20, 30, 0.95) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
                        }}
                    >
                        {/* Progress indicator bar */}
                        <motion.div
                            className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{
                                duration: (currentStep.durationMs ?? 5000) / 1000,
                                ease: 'linear'
                            }}
                        />

                        {/* Text content */}
                        <div className="px-6 py-4">
                            <p
                                className="text-base md:text-lg text-white/90 font-medium leading-relaxed"
                                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                            >
                                {displayText}
                                {isTyping && (
                                    <motion.span
                                        className="inline-block w-0.5 h-5 bg-amber-400 ml-0.5 align-middle"
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    />
                                )}
                            </p>
                        </div>

                        {/* Chapter indicator */}
                        <div className="px-6 pb-3 flex items-center gap-2">
                            <span className="text-[10px] uppercase tracking-widest text-amber-400/70 font-mono">
                                {currentStep.chapter}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-[10px] text-white/40 font-mono">
                                {currentStep.id}
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
