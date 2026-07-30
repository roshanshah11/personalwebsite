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
                            {/* A rule top and bottom, where the letterbox bars
                                used to be. Those were 24px and 100px of solid
                                black clamped over a live starfield to signal
                                "cinematic", which mostly signalled that the
                                sky had been switched off for the duration. */}
                            {!isReducedMotion && (
                                <>
                                    <motion.div
                                        className="absolute top-0 left-0 right-0 h-px bg-rule"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isExiting || isCompleted ? 0 : 1 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    />
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-px bg-rule"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isExiting || isCompleted ? 0 : 1 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
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

                        {/* There was a HelpButton here: a circular glass button
                            top-left that opened a 288px panel explaining that
                            the pause button pauses and the next button skips,
                            with a 💡 emoji tip at the bottom. Four labelled
                            icons and a one-line hints row under the timeline
                            already say all of it. Chrome explaining chrome. */}

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
                                    {/* Was a 60px ✨ emoji spring-scaling in over
                                        "Thanks for watching!". Now the closing
                                        line is just a line, set the way the
                                        rest of the page sets a line. */}
                                    <div className="text-center px-6">
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ delay: 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                                            className="w-24 h-px bg-brass mx-auto mb-5"
                                        />
                                        <motion.p
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="t-gloss text-ink text-[1.35rem]"
                                        >
                                            that's it. thanks for looking.
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
