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
 * Creates an SVG mask that darkens everything except the target
 */
export function Spotlight() {
    const { currentStep, isActive, isPlaying, isPaused, isReducedMotion, isEntering, isExiting } = useTourController();
    const [targetRect, setTargetRect] = useState<SpotlightRect | null>(null);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const observerRef = useRef<ResizeObserver | null>(null);
    const rafRef = useRef<number>(0);

    // Get camera settings from current step
    const camera = currentStep?.camera ?? { zoomLevel: 1, padding: 20, easing: 'easeOut' };
    const padding = camera.padding ?? 20;
    const zoomLevel = isReducedMotion ? 1 : (camera.zoomLevel ?? 1);

    // Update window size
    useEffect(() => {
        const updateSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Track target element position - waits for element to appear
    const updateTargetRect = useCallback(() => {
        if (!currentStep?.targetSelector) {
            setTargetRect(null);
            return;
        }

        const element = document.querySelector(currentStep.targetSelector);
        if (!element) {
            // Element not found yet - keep previous rect (element may be loading/scrolling)
            // Don't log warnings - this is expected during transitions
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

        // Initial update
        updateTargetRect();

        // ResizeObserver for target size changes
        if (currentStep?.targetSelector) {
            const element = document.querySelector(currentStep.targetSelector);
            if (element) {
                observerRef.current = new ResizeObserver(() => {
                    updateTargetRect();
                });
                observerRef.current.observe(element);
            }
        }

        // RAF loop for smooth position updates during animations
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

    // Don't render if not active
    if (!isActive) return null;

    // Transition settings based on reduced motion
    const transition = isReducedMotion
        ? { duration: 0.1 }
        : camera.easing === 'spring'
            ? { type: 'spring' as const, stiffness: 100, damping: 20 }
            : { duration: 0.5, ease: 'easeInOut' as const };

    // Calculate mask path for the cutout
    const getMaskPath = () => {
        if (!targetRect || windowSize.width === 0) {
            // Full dark overlay when no target
            return `M 0 0 L ${windowSize.width} 0 L ${windowSize.width} ${windowSize.height} L 0 ${windowSize.height} Z`;
        }

        const { top, left, width, height } = targetRect;
        const borderRadius = 16;

        // Outer rectangle (full screen) - clockwise
        // Inner rectangle (cutout) - counter-clockwise with rounded corners
        return `
      M 0 0 
      L ${windowSize.width} 0 
      L ${windowSize.width} ${windowSize.height} 
      L 0 ${windowSize.height} 
      Z
      M ${left + borderRadius} ${top}
      L ${left + width - borderRadius} ${top}
      Q ${left + width} ${top} ${left + width} ${top + borderRadius}
      L ${left + width} ${top + height - borderRadius}
      Q ${left + width} ${top + height} ${left + width - borderRadius} ${top + height}
      L ${left + borderRadius} ${top + height}
      Q ${left} ${top + height} ${left} ${top + height - borderRadius}
      L ${left} ${top + borderRadius}
      Q ${left} ${top} ${left + borderRadius} ${top}
      Z
    `;
    };

    return (
        <AnimatePresence>
            {isActive && (
                <>
                    {/* Dark overlay with cutout */}
                    <motion.svg
                        className="fixed inset-0 pointer-events-none z-[9998]"
                        width={windowSize.width}
                        height={windowSize.height}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: isReducedMotion ? 0.1 : 0.3 }}
                    >
                        {/* Background blur filter */}
                        <defs>
                            <filter id="backdrop-blur" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation={isReducedMotion ? 0 : 2} />
                            </filter>
                        </defs>

                        {/* Dark vignette overlay with cutout */}
                        <motion.path
                            d={getMaskPath()}
                            fill="rgba(0, 0, 0, 0.85)"
                            fillRule="evenodd"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={transition}
                        />
                    </motion.svg>

                    {/* Glow effect around target */}
                    {targetRect && (
                        <motion.div
                            className="fixed pointer-events-none z-[9997]"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{
                                opacity: 1,
                                scale: zoomLevel,
                                top: targetRect.top,
                                left: targetRect.left,
                                width: targetRect.width,
                                height: targetRect.height,
                            }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={transition}
                            style={{
                                borderRadius: 16,
                                boxShadow: isReducedMotion
                                    ? '0 0 0 2px rgba(212, 175, 55, 0.5)'
                                    : `
                    0 0 0 2px rgba(212, 175, 55, 0.4),
                    0 0 30px rgba(212, 175, 55, 0.15),
                    0 0 60px rgba(212, 175, 55, 0.1),
                    inset 0 0 30px rgba(212, 175, 55, 0.05)
                  `,
                            }}
                        />
                    )}

                    {/* Vignette gradient overlay for cinematic effect */}
                    <motion.div
                        className="fixed inset-0 pointer-events-none z-[9996]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: isReducedMotion ? 0.1 : 0.5 }}
                        style={{
                            background: isReducedMotion ? 'transparent' : `
                radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.3) 100%)
              `,
                        }}
                    />

                    {/* Interactive layer - allows clicking highlighted element if allowInteraction is true */}
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
            )}
        </AnimatePresence>
    );
}
