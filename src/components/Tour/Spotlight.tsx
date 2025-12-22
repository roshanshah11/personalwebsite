'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTourController } from './useTourController';

interface SpotlightRect {
    top: number;
    left: number;
    width: number;
    height: number;
}

/**
 * Spotlight component that highlights a target element with a cinematic cutout effect
 * Uses fade transitions between steps - no sliding animations
 */
export function Spotlight() {
    const { currentStep, isActive, isReducedMotion } = useTourController();
    const [targetRect, setTargetRect] = useState<SpotlightRect | null>(null);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isTransitioning, setIsTransitioning] = useState(false);
    const prevStepIdRef = useRef<string | null>(null);
    const observerRef = useRef<ResizeObserver | null>(null);
    const rafRef = useRef<number>(0);

    // Get camera settings from current step
    const camera = currentStep?.camera ?? { zoomLevel: 1, padding: 20, easing: 'easeOut' };
    const padding = camera.padding ?? 20;

    // Update window size
    useEffect(() => {
        const updateSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Detect step changes and trigger transition
    useEffect(() => {
        if (currentStep?.id !== prevStepIdRef.current) {
            setIsTransitioning(true);
            const timeout = setTimeout(() => {
                setIsTransitioning(false);
            }, 150); // Brief fade out before fade in
            prevStepIdRef.current = currentStep?.id ?? null;
            return () => clearTimeout(timeout);
        }
    }, [currentStep?.id]);

    // Track target element position
    const updateTargetRect = useCallback(() => {
        if (!currentStep?.targetSelector) {
            setTargetRect(null);
            return;
        }

        const element = document.querySelector(currentStep.targetSelector);
        if (!element) {
            return;
        }

        const rect = element.getBoundingClientRect();
        setTargetRect({
            top: rect.top - padding,
            left: rect.left - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2,
        });
    }, [currentStep?.targetSelector, padding]);

    // Setup ResizeObserver and RAF for smooth tracking
    useEffect(() => {
        if (!isActive) return;

        updateTargetRect();

        if (currentStep?.targetSelector) {
            const element = document.querySelector(currentStep.targetSelector);
            if (element) {
                observerRef.current = new ResizeObserver(() => {
                    updateTargetRect();
                });
                observerRef.current.observe(element);
            }
        }

        let running = true;
        const loop = () => {
            if (!running) return;
            updateTargetRect();
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);

        return () => {
            running = false;
            cancelAnimationFrame(rafRef.current);
            observerRef.current?.disconnect();
        };
    }, [isActive, currentStep?.targetSelector, updateTargetRect]);

    if (!isActive) return null;

    // Calculate mask path for the cutout
    const getMaskPath = () => {
        if (!targetRect || windowSize.width === 0) {
            return `M 0 0 L ${windowSize.width} 0 L ${windowSize.width} ${windowSize.height} L 0 ${windowSize.height} Z`;
        }

        const { top, left, width, height } = targetRect;
        const r = 12; // border radius

        return `
            M 0 0 
            L ${windowSize.width} 0 
            L ${windowSize.width} ${windowSize.height} 
            L 0 ${windowSize.height} 
            Z
            M ${left + r} ${top}
            L ${left + width - r} ${top}
            Q ${left + width} ${top} ${left + width} ${top + r}
            L ${left + width} ${top + height - r}
            Q ${left + width} ${top + height} ${left + width - r} ${top + height}
            L ${left + r} ${top + height}
            Q ${left} ${top + height} ${left} ${top + height - r}
            L ${left} ${top + r}
            Q ${left} ${top} ${left + r} ${top}
            Z
        `;
    };

    const showHighlight = targetRect && !isTransitioning;

    return (
        <>
            {/* Dark overlay with cutout - always present */}
            <motion.svg
                className="fixed inset-0 pointer-events-none z-[9998]"
                width={windowSize.width}
                height={windowSize.height}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <motion.path
                    d={getMaskPath()}
                    fill="rgba(0, 0, 0, 0.85)"
                    fillRule="evenodd"
                />
            </motion.svg>

            {/* Highlight frame - fades in/out with step changes */}
            <AnimatePresence mode="wait">
                {showHighlight && (
                    <motion.div
                        key={currentStep?.id ?? 'highlight'}
                        className="fixed pointer-events-none z-[9999]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: isReducedMotion ? 0.1 : 0.25,
                            ease: 'easeOut'
                        }}
                        style={{
                            top: targetRect.top,
                            left: targetRect.left,
                            width: targetRect.width,
                            height: targetRect.height,
                        }}
                    >
                        {/* Main border frame */}
                        <div
                            className="absolute inset-0"
                            style={{
                                borderRadius: 12,
                                border: '2px solid rgba(251, 191, 36, 0.9)',
                                boxShadow: isReducedMotion ? 'none' : `
                                    0 0 20px rgba(251, 191, 36, 0.4),
                                    0 0 40px rgba(251, 191, 36, 0.2),
                                    inset 0 0 30px rgba(251, 191, 36, 0.05)
                                `,
                            }}
                        />

                        {/* Corner brackets */}
                        {!isReducedMotion && (
                            <>
                                {/* Top-left */}
                                <div
                                    className="absolute"
                                    style={{
                                        top: -3,
                                        left: -3,
                                        width: 24,
                                        height: 24,
                                        borderTop: '3px solid #fbbf24',
                                        borderLeft: '3px solid #fbbf24',
                                        borderTopLeftRadius: 8,
                                    }}
                                />
                                {/* Top-right */}
                                <div
                                    className="absolute"
                                    style={{
                                        top: -3,
                                        right: -3,
                                        width: 24,
                                        height: 24,
                                        borderTop: '3px solid #fbbf24',
                                        borderRight: '3px solid #fbbf24',
                                        borderTopRightRadius: 8,
                                    }}
                                />
                                {/* Bottom-left */}
                                <div
                                    className="absolute"
                                    style={{
                                        bottom: -3,
                                        left: -3,
                                        width: 24,
                                        height: 24,
                                        borderBottom: '3px solid #fbbf24',
                                        borderLeft: '3px solid #fbbf24',
                                        borderBottomLeftRadius: 8,
                                    }}
                                />
                                {/* Bottom-right */}
                                <div
                                    className="absolute"
                                    style={{
                                        bottom: -3,
                                        right: -3,
                                        width: 24,
                                        height: 24,
                                        borderBottom: '3px solid #fbbf24',
                                        borderRight: '3px solid #fbbf24',
                                        borderBottomRightRadius: 8,
                                    }}
                                />
                            </>
                        )}

                        {/* Subtle pulse animation on glow */}
                        {!isReducedMotion && (
                            <motion.div
                                className="absolute inset-[-4px]"
                                animate={{
                                    boxShadow: [
                                        '0 0 20px rgba(251, 191, 36, 0.3)',
                                        '0 0 35px rgba(251, 191, 36, 0.5)',
                                        '0 0 20px rgba(251, 191, 36, 0.3)',
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                style={{
                                    borderRadius: 16,
                                    pointerEvents: 'none',
                                }}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Vignette overlay */}
            {!isReducedMotion && (
                <motion.div
                    className="fixed inset-0 pointer-events-none z-[9995]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.2) 100%)',
                    }}
                />
            )}

            {/* Interactive layer */}
            {targetRect && currentStep?.allowInteraction && (
                <div
                    className="fixed z-[10000]"
                    style={{
                        top: targetRect.top,
                        left: targetRect.left,
                        width: targetRect.width,
                        height: targetRect.height,
                        pointerEvents: 'auto',
                    }}
                />
            )}
        </>
    );
}
