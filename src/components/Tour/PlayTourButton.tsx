'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useTourController } from './useTourController';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { tourDurationLabel } from './steps';

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
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            aria-label="Play portfolio tour"
        >
            {/* Button content.
                Was a rounded-full gradient pill with a radial glow behind it, a
                shimmer sweeping across it on a 2.5s infinite loop, a pulsing
                play glyph, and a Sparkles icon. A sparkle emoji-icon on a
                copperplate star atlas is the single most on-the-nose tell in
                the repo, and it was doing no work: nothing about the tour is
                magical, it is a person talking over a scroll. */}
            <motion.div
                className="relative flex items-center gap-2.5 px-3 py-2.5 md:px-4 border border-brass/40"
                style={{ backgroundColor: 'rgba(5, 8, 16, 0.92)' }}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            >
                <Play size={14} className="text-brass shrink-0" />

                <span className="hidden sm:inline t-label text-ink/85 whitespace-nowrap">
                    Walkthrough
                </span>
            </motion.div>

            {/* Tooltip. The duration is read from the script, not typed in
                here: this said "~45 second guided tour" above a tour that ran
                67.5 seconds, because the script kept growing and the number
                did not. */}
            <motion.div
                className="absolute bottom-full right-0 mb-2 px-2.5 py-1 t-label text-dim whitespace-nowrap pointer-events-none border border-rule"
                style={{ backgroundColor: 'rgba(5, 8, 16, 0.94)' }}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
            >
                {tourDurationLabel()}, narrated
            </motion.div>
        </motion.button>
    );
}
