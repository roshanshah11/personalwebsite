'use client';

import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { useTourController } from './useTourController';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Play Tour button - the entry point for starting the tour
 * Positioned in the bottom-right corner with a cinematic style
 */
export function PlayTourButton() {
    const tour = useTourController();
    const searchParams = useSearchParams();
    const [isHovered, setIsHovered] = useState(false);
    const [hasAutoStarted, setHasAutoStarted] = useState(false);

    // Handle URL params for auto-start
    useEffect(() => {
        if (hasAutoStarted) return;

        const tourParam = searchParams.get('tour');
        const chapterParam = searchParams.get('chapter');

        if (tourParam === '1') {
            setHasAutoStarted(true);
            // Small delay to let the page render first
            setTimeout(() => {
                tour.start(chapterParam ?? undefined);
            }, 1000);
        }
    }, [searchParams, tour.start, hasAutoStarted]);

    // Don't show button when tour is active
    if (tour.isActive) return null;

    return (
        <motion.button
            onClick={() => tour.start()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed bottom-6 right-6 z-50 group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            aria-label="Play portfolio tour"
        >
            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
                    filter: 'blur(15px)',
                    transform: 'scale(1.5)',
                }}
            />

            {/* Button content */}
            <motion.div
                className="relative flex items-center gap-3 px-5 py-3 rounded-full overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, rgba(20, 20, 25, 0.95) 0%, rgba(30, 30, 40, 0.95) 100%)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Animated shimmer */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent)',
                    }}
                    animate={{
                        x: ['-100%', '200%'],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                />

                {/* Icon */}
                <motion.div
                    className="relative"
                    animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.4 }}
                >
                    <Play
                        size={18}
                        className="text-amber-400 fill-amber-400/50"
                    />
                </motion.div>

                {/* Text */}
                <span className="relative text-sm font-medium text-white/90 whitespace-nowrap">
                    Quick walkthrough here
                </span>

                {/* Sparkle icon */}
                <Sparkles
                    size={14}
                    className="relative text-amber-400/60 group-hover:text-amber-400 transition-colors"
                />
            </motion.div>

            {/* Tooltip */}
            <motion.div
                className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg text-xs text-white/80 whitespace-nowrap pointer-events-none"
                style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(10px)',
                }}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
            >
                ~45 second guided tour
            </motion.div>
        </motion.button>
    );
}
