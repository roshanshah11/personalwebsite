'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTourController } from './useTourController';
import { Spotlight } from './Spotlight';
import { CaptionRenderer } from './CaptionRenderer';
import { TimelineControls } from './TimelineControls';
import { KeyboardHandler } from './KeyboardHandler';
import { ContentViewerModal } from './ContentViewerModal';

/**
 * Main Tour Overlay - the fullscreen cinematic layer
 * Combines all tour visual components
 */
export function TourOverlay() {
    const { isActive, isEntering, isExiting, isCompleted, isReducedMotion, state } = useTourController();

    // Magical exit transition settings
    const exitTransition = {
        duration: isReducedMotion ? 0.2 : 0.8,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number], // smooth ease out (cubic-bezier)
    };

    return (
        <>
            {/* Keyboard handler (always mounted when active) */}
            <KeyboardHandler />

            <AnimatePresence>
                {isActive && (
                    <>
                        {/* Entry/exit animation container */}
                        <motion.div
                            className="fixed inset-0 z-[9995] pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: isExiting || isCompleted ? 0 : 1,
                                scale: isExiting || isCompleted ? 1.05 : 1,
                                filter: isExiting || isCompleted ? 'blur(10px)' : 'blur(0px)',
                            }}
                            exit={{
                                opacity: 0,
                                scale: 1.05,
                                filter: 'blur(10px)',
                            }}
                            transition={isExiting || isCompleted ? exitTransition : {
                                duration: isReducedMotion ? 0.1 : 0.5,
                                ease: 'easeInOut'
                            }}
                        >
                            {/* Cinematic letterbox bars for dramatic effect */}
                            {!isReducedMotion && (
                                <>
                                    <motion.div
                                        className="absolute top-0 left-0 right-0 bg-black"
                                        initial={{ height: 0 }}
                                        animate={{ height: isEntering ? 40 : (isExiting || isCompleted ? 0 : 24) }}
                                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                                    />
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 bg-black"
                                        initial={{ height: 0 }}
                                        animate={{ height: isEntering ? 40 : (isExiting || isCompleted ? 0 : 100) }}
                                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                                    />
                                </>
                            )}
                        </motion.div>

                        {/* Spotlight overlay - fade out on exit */}
                        <motion.div
                            animate={{
                                opacity: isExiting || isCompleted ? 0 : 1,
                            }}
                            transition={exitTransition}
                        >
                            <Spotlight />
                        </motion.div>

                        {/* Captions - fade out on exit */}
                        <motion.div
                            animate={{
                                opacity: isExiting || isCompleted ? 0 : 1,
                                y: isExiting || isCompleted ? -20 : 0,
                            }}
                            transition={exitTransition}
                        >
                            <CaptionRenderer />
                        </motion.div>

                        {/* Content viewer modal */}
                        <ContentViewerModal />

                        {/* Timeline controls - fade out on exit */}
                        <motion.div
                            animate={{
                                opacity: isExiting || isCompleted ? 0 : 1,
                                y: isExiting || isCompleted ? 50 : 0,
                            }}
                            transition={exitTransition}
                        >
                            <TimelineControls />
                        </motion.div>

                        {/* Tour completion message */}
                        <AnimatePresence>
                            {isCompleted && (
                                <motion.div
                                    className="fixed inset-0 z-[10010] flex items-center justify-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="text-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                            className="text-6xl mb-4"
                                        >
                                            ✨
                                        </motion.div>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-2xl text-white font-bold"
                                        >
                                            Thanks for watching!
                                        </motion.p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Focus trap element */}
                        <FocusTrap />
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

/**
 * Focus trap to prevent tabbing to underlying page elements
 */
function FocusTrap() {
    const { isActive, exit } = useTourController();

    if (!isActive) return null;

    return (
        <>
            {/* Start sentinel */}
            <div
                tabIndex={0}
                onFocus={() => {
                    // When focus reaches start, send it back to the end
                    const closeButton = document.querySelector('[aria-label="Exit tour"]');
                    if (closeButton) {
                        (closeButton as HTMLElement).focus();
                    }
                }}
                className="fixed top-0 left-0 w-0 h-0 overflow-hidden"
                aria-hidden="true"
            />

            {/* End sentinel */}
            <div
                tabIndex={0}
                onFocus={() => {
                    // When focus reaches end, send it back to the start (play button)
                    const playButton = document.querySelector('[aria-label="Pause"], [aria-label="Play"]');
                    if (playButton) {
                        (playButton as HTMLElement).focus();
                    }
                }}
                className="fixed bottom-0 right-0 w-0 h-0 overflow-hidden"
                aria-hidden="true"
            />
        </>
    );
}
