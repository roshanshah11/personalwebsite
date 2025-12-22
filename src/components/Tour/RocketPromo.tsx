'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useTourController } from './useTourController';

// LocalStorage key for persisting rocket dismissal
const ROCKET_DISMISSED_KEY = 'portfolio-tour-rocket-dismissed';

type Point = { x: number; y: number };

/**
 * Cubic Bezier curve interpolation (4 control points)
 * Returns point on curve at time t (0-1)
 */
function cubicBezier(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    return {
        x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
        y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
    };
}

/**
 * Calculate tangent angle on cubic bezier at time t
 */
function cubicBezierTangent(p0: Point, p1: Point, p2: Point, p3: Point, t: number): number {
    const u = 1 - t;
    // First derivative of cubic bezier
    const dx = 3 * u * u * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x);
    const dy = 3 * u * u * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y);
    return Math.atan2(dy, dx) * (180 / Math.PI);
}

/**
 * Animated Rocket Ship that flies around the screen
 * Smooth curved flight paths with C1 tangent continuity
 */
export function RocketPromo() {
    const tour = useTourController();
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenDismissed, setHasBeenDismissed] = useState(false);

    // Position and rotation state
    const [position, setPosition] = useState({ x: -150, y: 400 });
    const [rotation, setRotation] = useState(-45);

    // Cubic Bezier curve with 4 control points for smooth C1 continuity
    const curveRef = useRef({
        p0: { x: -150, y: 400 } as Point,
        p1: { x: 0, y: 350 } as Point,
        p2: { x: 200, y: 300 } as Point,
        p3: { x: 400, y: 400 } as Point,
        t: 0,
    });

    // Track current velocity angle for continuity
    const velocityAngleRef = useRef(-30); // degrees

    const isMounted = useRef(true);
    const animationRef = useRef<number | null>(null);
    const keySequenceRef = useRef('');

    // Check if rocket was previously dismissed or walkthrough completed
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const dismissed = localStorage.getItem(ROCKET_DISMISSED_KEY);
            if (dismissed === 'true') {
                setHasBeenDismissed(true);
            }
        }
    }, []);

    // Secret keyboard command: type 'rocket' anywhere to reset and show rocket again
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleKeyDown = (e: KeyboardEvent) => {
            keySequenceRef.current += e.key.toLowerCase();
            // Keep only last 6 characters
            if (keySequenceRef.current.length > 6) {
                keySequenceRef.current = keySequenceRef.current.slice(-6);
            }
            // Check for 'rocket' sequence
            if (keySequenceRef.current === 'rocket') {
                localStorage.removeItem(ROCKET_DISMISSED_KEY);
                setHasBeenDismissed(false);
                keySequenceRef.current = '';
                console.log('🚀 Rocket reset! It will appear in 5 seconds...');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Also hide rocket if tour was completed
    useEffect(() => {
        if (tour.isCompleted) {
            setHasBeenDismissed(true);
            if (typeof window !== 'undefined') {
                localStorage.setItem(ROCKET_DISMISSED_KEY, 'true');
            }
        }
    }, [tour.isCompleted]);

    // Generate random point within viewport with wrap-around support
    const randomPoint = useCallback((): Point => {
        if (typeof window === 'undefined') return { x: 400, y: 300 };
        const padding = 100;
        return {
            x: padding + Math.random() * (window.innerWidth - padding * 2),
            y: padding + Math.random() * (window.innerHeight - padding * 2),
        };
    }, []);

    // Generate a new cubic bezier curve with C1 continuity
    // The first control point is placed along current velocity direction
    const generateNewCurve = useCallback(() => {
        const current = curveRef.current;
        const currentAngle = velocityAngleRef.current;
        const angleRad = currentAngle * (Math.PI / 180);

        // Start from end of previous curve
        const startPoint = current.p3;

        // P1: Continue along current heading for smooth entry (C1 continuity)
        const entryDistance = 80 + Math.random() * 60; // 80-140px along current heading
        const p1: Point = {
            x: startPoint.x + Math.cos(angleRad) * entryDistance,
            y: startPoint.y + Math.sin(angleRad) * entryDistance,
        };

        // End point: random location
        const endPoint = randomPoint();

        // P2: Control point near end, influences approach angle
        // Add some randomness for varied curves
        const dx = endPoint.x - startPoint.x;
        const dy = endPoint.y - startPoint.y;
        const approachAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.2; // ±0.6 rad variance
        const approachDistance = 100 + Math.random() * 80;
        const p2: Point = {
            x: endPoint.x - Math.cos(approachAngle) * approachDistance,
            y: endPoint.y - Math.sin(approachAngle) * approachDistance,
        };

        curveRef.current = {
            p0: startPoint,
            p1: p1,
            p2: p2,
            p3: endPoint,
            t: 0,
        };
    }, [randomPoint]);

    // Animation loop - smooth cubic bezier curve following
    useEffect(() => {
        if (!isVisible || tour.isActive || hasBeenDismissed) {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            return;
        }

        const speed = 0.006; // Progress per frame - smooth speed
        let lastTime = performance.now();

        const animate = (currentTime: number) => {
            if (!isMounted.current) return;

            const deltaTime = Math.min((currentTime - lastTime) / 16.67, 3);
            lastTime = currentTime;

            const curve = curveRef.current;
            curve.t += speed * deltaTime;

            // Generate new curve when we complete current one
            if (curve.t >= 1) {
                // Update velocity angle for next curve's C1 continuity
                velocityAngleRef.current = cubicBezierTangent(curve.p0, curve.p1, curve.p2, curve.p3, 0.99);
                generateNewCurve();
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            // Get position and rotation from cubic bezier curve
            const pos = cubicBezier(curve.p0, curve.p1, curve.p2, curve.p3, curve.t);
            const angle = cubicBezierTangent(curve.p0, curve.p1, curve.p2, curve.p3, curve.t);

            setPosition(pos);
            setRotation(angle);

            animationRef.current = requestAnimationFrame(animate);
        };

        // Initialize first curve
        generateNewCurve();
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isVisible, tour.isActive, hasBeenDismissed, generateNewCurve]);

    // Initialize with 5-second delay
    useEffect(() => {
        if (tour.isActive || hasBeenDismissed) return;

        isMounted.current = true;

        const timer = setTimeout(() => {
            if (isMounted.current && !tour.isActive && !hasBeenDismissed) {
                setIsVisible(true);
            }
        }, 5000);

        return () => {
            isMounted.current = false;
            clearTimeout(timer);
        };
    }, [tour.isActive, hasBeenDismissed]);

    // Handle click - start tour
    const handleClick = () => {
        setHasBeenDismissed(true);
        setIsVisible(false);
        if (typeof window !== 'undefined') {
            localStorage.setItem(ROCKET_DISMISSED_KEY, 'true');
        }
        tour.start();
    };

    // Handle dismiss (right-click)
    const handleDismiss = (e: React.MouseEvent) => {
        e.preventDefault();
        setHasBeenDismissed(true);
        setIsVisible(false);
        if (typeof window !== 'undefined') {
            localStorage.setItem(ROCKET_DISMISSED_KEY, 'true');
        }
    };

    if (tour.isActive || !isVisible) return null;

    // Counter-rotation for label
    const labelRotation = -rotation - 90;

    return (
        <AnimatePresence>
            <div
                className="pointer-events-none"
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 99999,
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        left: position.x,
                        top: position.y,
                        transform: `translate(-50%, -50%) rotate(${rotation + 90}deg)`,
                    }}
                >
                    <motion.button
                        className="relative pointer-events-auto cursor-pointer"
                        onClick={handleClick}
                        onContextMenu={handleDismiss}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Start portfolio tour"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        style={{ outline: 'none', border: 'none', background: 'none' }}
                    >
                        {/* Unified Rocket SVG - cohesive single design with integrated flame */}
                        <svg
                            width="80"
                            height="120"
                            viewBox="0 0 80 120"
                            fill="none"
                            style={{
                                filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.5))',
                            }}
                        >
                            <defs>
                                {/* Rocket body gradient */}
                                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#C9D1D9" />
                                    <stop offset="30%" stopColor="#F0F3F6" />
                                    <stop offset="70%" stopColor="#F0F3F6" />
                                    <stop offset="100%" stopColor="#A8B2BC" />
                                </linearGradient>
                                {/* Nose cone gradient */}
                                <linearGradient id="noseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#DC2626" />
                                    <stop offset="50%" stopColor="#EF4444" />
                                    <stop offset="100%" stopColor="#B91C1C" />
                                </linearGradient>
                                {/* Window gradient */}
                                <radialGradient id="windowGrad" cx="30%" cy="30%">
                                    <stop offset="0%" stopColor="#7DD3FC" />
                                    <stop offset="100%" stopColor="#0369A1" />
                                </radialGradient>
                                {/* Fin gradient */}
                                <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#1E40AF" />
                                </linearGradient>
                                {/* Flame gradient */}
                                <linearGradient id="flameGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                                    <stop offset="0%" stopColor="#FEF3C7" />
                                    <stop offset="20%" stopColor="#FCD34D" />
                                    <stop offset="50%" stopColor="#F97316" />
                                    <stop offset="80%" stopColor="#DC2626" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                                <linearGradient id="flameInner" x1="50%" y1="0%" x2="50%" y2="100%">
                                    <stop offset="0%" stopColor="#FFFFFF" />
                                    <stop offset="30%" stopColor="#FEF08A" />
                                    <stop offset="70%" stopColor="#FB923C" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>

                            {/* Animated Flame - outer */}
                            <motion.ellipse
                                cx="40"
                                cy="95"
                                rx="12"
                                ry="22"
                                fill="url(#flameGrad)"
                                style={{ transformOrigin: '40px 85px' }}
                                animate={{
                                    scaleY: [1, 1.27, 0.91, 1.18, 1],
                                    scaleX: [1, 0.83, 1.17, 0.92, 1],
                                    opacity: [0.9, 1, 0.85, 1, 0.9],
                                }}
                                transition={{
                                    duration: 0.15,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            {/* Animated Flame - inner core */}
                            <motion.ellipse
                                cx="40"
                                cy="90"
                                rx="6"
                                ry="15"
                                fill="url(#flameInner)"
                                style={{ transformOrigin: '40px 82px' }}
                                animate={{
                                    scaleY: [1, 1.33, 0.87, 1.2, 1],
                                    scaleX: [1, 0.83, 1.17, 0.83, 1],
                                }}
                                transition={{
                                    duration: 0.12,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Left Fin */}
                            <path
                                d="M20 65 L10 85 L25 78 Z"
                                fill="url(#finGrad)"
                            />
                            {/* Right Fin */}
                            <path
                                d="M60 65 L70 85 L55 78 Z"
                                fill="url(#finGrad)"
                            />

                            {/* Rocket Body */}
                            <path
                                d="M40 8 
                                   C25 8 22 25 22 40
                                   L22 70
                                   C22 75 28 80 40 80
                                   C52 80 58 75 58 70
                                   L58 40
                                   C58 25 55 8 40 8Z"
                                fill="url(#bodyGrad)"
                                stroke="#9CA3AF"
                                strokeWidth="0.5"
                            />

                            {/* Nose Cone */}
                            <path
                                d="M40 2 C30 2 25 12 25 18 L40 12 L55 18 C55 12 50 2 40 2Z"
                                fill="url(#noseGrad)"
                            />

                            {/* Window */}
                            <circle cx="40" cy="38" r="10" fill="url(#windowGrad)" />
                            <circle cx="36" cy="34" r="3" fill="rgba(255,255,255,0.6)" />

                            {/* Detail bands */}
                            <rect x="28" y="60" width="24" height="4" rx="2" fill="#DC2626" />
                            <rect x="30" y="55" width="20" height="3" rx="1.5" fill="#FCD34D" />

                            {/* Engine nozzle */}
                            <path
                                d="M32 78 L32 85 C32 88 48 88 48 85 L48 78"
                                fill="#6B7280"
                                stroke="#4B5563"
                                strokeWidth="0.5"
                            />
                        </svg>

                        {/* "Click me!" label - counter-rotated to stay readable */}
                        <motion.div
                            className="absolute whitespace-nowrap pointer-events-none"
                            style={{
                                left: '50%',
                                bottom: '-25px',
                                transform: `translateX(-50%) rotate(${labelRotation}deg)`,
                            }}
                            animate={{
                                opacity: [0.8, 1, 0.8],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <span
                                className="text-sm font-bold px-3 py-1.5 rounded-full"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.92) 0%, rgba(20, 20, 30, 0.95) 100%)',
                                    color: '#FCD34D',
                                    textShadow: '0 0 10px rgba(252, 211, 77, 0.6)',
                                    border: '1px solid rgba(251, 191, 36, 0.3)',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                Click me!
                            </span>
                        </motion.div>
                    </motion.button>
                </div>
            </div>
        </AnimatePresence>
    );
}
