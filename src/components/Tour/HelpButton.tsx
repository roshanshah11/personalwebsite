'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HelpCircle, X, Pause, Play, SkipForward, SkipBack } from 'lucide-react';
import { useTourController } from './useTourController';

/**
 * Help button with detailed tour instructions
 * Positioned at top-left corner during the tour
 */
export function HelpButton() {
    const { isActive, isExiting, isCompleted, isReducedMotion } = useTourController();
    const [isOpen, setIsOpen] = useState(false);

    if (!isActive || isExiting || isCompleted) return null;

    return (
        <>
            {/* Help button - top left corner */}
            <motion.button
                className="fixed top-4 left-4 z-[10005] p-2.5 rounded-full backdrop-blur-md border transition-colors"
                style={{
                    background: isOpen
                        ? 'rgba(251, 191, 36, 0.2)'
                        : 'rgba(10, 10, 15, 0.8)',
                    borderColor: isOpen
                        ? 'rgba(251, 191, 36, 0.5)'
                        : 'rgba(255, 255, 255, 0.15)',
                }}
                onClick={() => setIsOpen(!isOpen)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: isReducedMotion ? 0.1 : 0.3, delay: 0.5 }}
                aria-label={isOpen ? "Close help" : "Show tour help"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? (
                    <X size={18} className="text-amber-400" />
                ) : (
                    <HelpCircle size={18} className="text-white/70 hover:text-white" />
                )}
            </motion.button>

            {/* Help panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed top-16 left-4 z-[10004] w-72 rounded-xl overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.98) 0%, rgba(20, 20, 30, 0.98) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                        }}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: isReducedMotion ? 0.1 : 0.2 }}
                    >
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-white/10">
                            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                <HelpCircle size={14} className="text-amber-400" />
                                Tour Controls
                            </h3>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-4">
                            {/* Keyboard shortcuts */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-medium text-white/60 uppercase tracking-wider">
                                    Keyboard Shortcuts
                                </h4>
                                <div className="space-y-1.5">
                                    <KeyboardShortcut
                                        keys={['Esc']}
                                        label="Exit tour anytime"
                                    />
                                    <KeyboardShortcut
                                        keys={['Space']}
                                        label="Pause / Resume"
                                    />
                                    <KeyboardShortcut
                                        keys={['←']}
                                        label="Previous step"
                                    />
                                    <KeyboardShortcut
                                        keys={['→']}
                                        label="Next step"
                                    />
                                </div>
                            </div>

                            {/* Playback controls */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-medium text-white/60 uppercase tracking-wider">
                                    Playback Controls
                                </h4>
                                <div className="space-y-1.5">
                                    <ControlHint
                                        icon={<Pause size={12} />}
                                        label="Click pause to stop at any moment"
                                    />
                                    <ControlHint
                                        icon={<Play size={12} />}
                                        label="Click play to resume the tour"
                                    />
                                    <ControlHint
                                        icon={<SkipBack size={12} />}
                                        label="Go back to previous section"
                                    />
                                    <ControlHint
                                        icon={<SkipForward size={12} />}
                                        label="Skip to next section"
                                    />
                                </div>
                            </div>

                            {/* Timeline tip */}
                            <div className="pt-2 border-t border-white/10">
                                <p className="text-[11px] text-white/50 leading-relaxed">
                                    💡 <span className="text-white/70">Tip:</span> Click anywhere on the progress bar to jump to that point in the tour.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Close overlay when clicking outside */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[10003]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

/**
 * Keyboard shortcut display component
 */
function KeyboardShortcut({ keys, label }: { keys: string[]; label: string }) {
    return (
        <div className="flex items-center justify-between text-xs">
            <span className="text-white/70">{label}</span>
            <div className="flex items-center gap-1">
                {keys.map((key, i) => (
                    <kbd
                        key={i}
                        className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] font-mono text-amber-400"
                    >
                        {key}
                    </kbd>
                ))}
            </div>
        </div>
    );
}

/**
 * Control hint with icon
 */
function ControlHint({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-2 text-xs text-white/70">
            <span className="text-amber-400/80">{icon}</span>
            <span>{label}</span>
        </div>
    );
}
