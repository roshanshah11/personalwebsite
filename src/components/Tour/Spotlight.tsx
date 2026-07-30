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

    // Track target element position.
    //
    // This runs inside a requestAnimationFrame loop for the whole tour, so it
    // fires ~60 times a second on a page that is also driving a WebGL
    // starfield. It used to hand setTargetRect a freshly allocated object every
    // one of those frames, and a new object is never Object.is-equal to the old
    // one, so React re-rendered the spotlight and every child on every single
    // frame whether or not the target had moved a pixel. Most frames of a tour
    // are stationary: the scroll finishes about a second into a step and then
    // nothing moves until the next one. Bailing out when the rect is unchanged
    // turns those frames back into a cheap measurement.
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
        const next = {
            top: rect.top - padding,
            left: rect.left - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2,
        };

        setTargetRect((prev) =>
            prev &&
                prev.top === next.top &&
                prev.left === next.left &&
                prev.width === next.width &&
                prev.height === next.height
                ? prev
                : next
        );
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

    // Calculate mask path for the cutout.
    //
    // Square. The cutout used to be a 12px-radius rounded rectangle built out of
    // four quadratic curves, framed by a 2px glowing border, four corner
    // brackets, three stacked box-shadows and an infinite pulse. That is a
    // sci-fi targeting reticle, and this page does not have one rounded corner
    // anywhere else on it.
    const getMaskPath = () => {
        if (!targetRect || windowSize.width === 0) {
            return `M 0 0 L ${windowSize.width} 0 L ${windowSize.width} ${windowSize.height} L 0 ${windowSize.height} Z`;
        }

        const { top, left, width, height } = targetRect;

        return `
            M 0 0
            L ${windowSize.width} 0
            L ${windowSize.width} ${windowSize.height}
            L 0 ${windowSize.height}
            Z
            M ${left} ${top}
            L ${left + width} ${top}
            L ${left + width} ${top + height}
            L ${left} ${top + height}
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
                    // The ground, not pure black. Black over a blue-black page
                    // reads as a hole punched in it.
                    fill="rgba(5, 8, 16, 0.86)"
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
                        {/* A hairline and four brass ticks, which is how the
                            rest of the page marks something. Every glow here
                            was written as a literal rgba(251,191,36,…) — the
                            retired Tailwind amber — so the frame survived the
                            palette change untouched and kept lighting the one
                            hue this design dropped. */}
                        <div className="absolute inset-0 border border-rule" />

                        {/* Corner ticks. Marks, not brackets: a short rule off
                            each corner, the way a plate registers a detail. */}
                        {[
                            { top: -1, left: -1, borderTop: true, borderLeft: true },
                            { top: -1, right: -1, borderTop: true, borderRight: true },
                            { bottom: -1, left: -1, borderBottom: true, borderLeft: true },
                            { bottom: -1, right: -1, borderBottom: true, borderRight: true },
                        ].map((tick, i) => (
                            <div
                                key={i}
                                className="absolute"
                                style={{
                                    top: tick.top,
                                    left: tick.left,
                                    right: tick.right,
                                    bottom: tick.bottom,
                                    width: 14,
                                    height: 14,
                                    borderTop: tick.borderTop ? '1px solid var(--color-brass)' : undefined,
                                    borderRight: tick.borderRight ? '1px solid var(--color-brass)' : undefined,
                                    borderBottom: tick.borderBottom ? '1px solid var(--color-brass)' : undefined,
                                    borderLeft: tick.borderLeft ? '1px solid var(--color-brass)' : undefined,
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

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
