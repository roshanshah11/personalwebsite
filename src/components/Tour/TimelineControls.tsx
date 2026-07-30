'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTourController } from './useTourController';
import { useState, useRef, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, X, RotateCcw, ChevronDown } from 'lucide-react';

/**
 * Video-like timeline controls at the bottom of the screen
 * Features: play/pause, progress bar, chapter markers, chapter dropdown
 */
export function TimelineControls() {
    const tour = useTourController();
    const [isChapterDropdownOpen, setIsChapterDropdownOpen] = useState(false);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const {
        isActive,
        isPlaying,
        isPaused,
        isCompleted,
        isReducedMotion,
        progress,
        currentStep,
        currentStepIndex,
        totalSteps,
        currentChapter,
        chapters,
        totalDurationMs,
    } = tour;

    // Handle progress bar click/drag
    const handleProgressInteraction = useCallback((e: React.MouseEvent | MouseEvent) => {
        if (!progressBarRef.current) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const newProgress = x / rect.width;
        tour.seekTo(newProgress);
    }, [tour.seekTo]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        handleProgressInteraction(e);

        const handleMouseMove = (e: MouseEvent) => {
            handleProgressInteraction(e);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    // Format time display
    const formatTime = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const currentTimeMs = progress * totalDurationMs;
    const elapsedTime = formatTime(currentTimeMs);
    const totalTime = formatTime(totalDurationMs);

    if (!isActive) return null;

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    className="fixed bottom-0 left-0 right-0 z-[10002] px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: isReducedMotion ? 0.1 : 0.4 }}
                >
                    {/* Main controls container.
                        Was a rounded-2xl glass slab: 135deg gradient fill, 20px
                        backdrop blur, white hairline, drop shadow. Now the
                        ground with a rule on it, matching every other surface
                        the page draws. */}
                    <div
                        className="max-w-3xl mx-auto border border-rule"
                        style={{ backgroundColor: 'rgba(5, 8, 16, 0.94)' }}
                    >
                        {/* Progress bar with chapter markers */}
                        <div
                            ref={progressBarRef}
                            className="relative h-1.5 bg-white/[0.07] cursor-pointer group"
                            onMouseDown={handleMouseDown}
                        >
                            {/* Chapter markers */}
                            {chapters.map((chapter) => {
                                const chapterStart = tour.config?.steps
                                    .slice(0, chapter.startStepIndex)
                                    .reduce((acc, s) => acc + s.durationMs, 0) ?? 0;
                                const position = (chapterStart / totalDurationMs) * 100;

                                return (
                                    <div
                                        key={chapter.id}
                                        className="absolute top-0 bottom-0 w-px bg-white/25"
                                        style={{ left: `${position}%` }}
                                        title={chapter.title}
                                    />
                                );
                            })}

                            {/* Progress fill */}
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-brass"
                                style={{ width: `${progress * 100}%` }}
                                transition={{ duration: isDragging ? 0 : 0.1 }}
                            />

                            {/* Playhead */}
                            <motion.div
                                className="absolute top-0 bottom-0 w-px bg-ink opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ left: `${progress * 100}%` }}
                            />
                        </div>

                        {/* Controls row */}
                        <div className="px-4 py-3 flex items-center justify-between gap-4">
                            {/* Left: Time display */}
                            <div className="flex items-baseline gap-1.5 min-w-[90px]">
                                <span className="t-label t-num text-ink/70">{elapsedTime}</span>
                                <span className="t-label text-faint">/</span>
                                <span className="t-label t-num text-faint">{totalTime}</span>
                            </div>

                            {/* Center: Playback controls */}
                            <div className="flex items-center gap-1">
                                {/* Previous */}
                                <button
                                    onClick={() => tour.prev()}
                                    className="p-2 text-dim hover:text-ink disabled:opacity-30 disabled:hover:text-dim transition-colors"
                                    aria-label="Previous step"
                                    disabled={currentStepIndex === 0}
                                >
                                    <SkipBack size={16} />
                                </button>

                                {/* Play/Pause/Replay. Was a filled amber circle
                                    with black glyphs, the one loud object in
                                    the frame. Brass on the ground, square. */}
                                {isCompleted ? (
                                    <button
                                        onClick={() => tour.goToStep(0)}
                                        className="p-2.5 border border-brass/50 text-brass hover:bg-brass/10 transition-colors"
                                        aria-label="Replay tour"
                                    >
                                        <RotateCcw size={18} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => tour.togglePlayPause()}
                                        className="p-2.5 border border-brass/50 text-brass hover:bg-brass/10 transition-colors"
                                        aria-label={isPlaying ? 'Pause' : 'Play'}
                                    >
                                        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                                    </button>
                                )}

                                {/* Next */}
                                <button
                                    onClick={() => tour.next()}
                                    className="p-2 text-dim hover:text-ink disabled:opacity-30 disabled:hover:text-dim transition-colors"
                                    aria-label="Next step"
                                    disabled={currentStepIndex === totalSteps - 1}
                                >
                                    <SkipForward size={16} />
                                </button>
                            </div>

                            {/* Right: Chapter dropdown and close */}
                            <div className="flex items-center gap-1 min-w-[90px] justify-end">
                                {/* Chapter dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsChapterDropdownOpen(!isChapterDropdownOpen)}
                                        className="flex items-center gap-1.5 px-2 py-1 t-label text-dim hover:text-ink transition-colors"
                                    >
                                        <span className="truncate max-w-[80px]">{currentChapter?.title ?? 'Chapters'}</span>
                                        <ChevronDown size={12} className={`transition-transform ${isChapterDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isChapterDropdownOpen && (
                                            <motion.div
                                                className="absolute bottom-full right-0 mb-2 py-1 min-w-[140px] border border-rule"
                                                style={{ backgroundColor: 'rgba(5, 8, 16, 0.98)' }}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 6 }}
                                            >
                                                {chapters.map((chapter) => (
                                                    <button
                                                        key={chapter.id}
                                                        onClick={() => {
                                                            tour.goToChapter(chapter.id);
                                                            setIsChapterDropdownOpen(false);
                                                        }}
                                                        className={`w-full px-3 py-1.5 text-left t-meta transition-colors ${currentChapter?.id === chapter.id
                                                            ? 'text-brass'
                                                            : 'text-dim hover:text-ink'
                                                            }`}
                                                    >
                                                        {chapter.title}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Close button */}
                                <button
                                    onClick={() => tour.exit()}
                                    className="p-2 text-dim hover:text-ink transition-colors"
                                    aria-label="Exit tour"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Step indicator. Ticks on a rule, not a row of pills. */}
                        <div className="px-4 pb-3 flex items-end justify-center gap-1">
                            {Array.from({ length: totalSteps }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => tour.goToStep(i)}
                                    className={`w-4 transition-all ${i === currentStepIndex
                                        ? 'h-2.5 bg-brass'
                                        : i < currentStepIndex
                                            ? 'h-1.5 bg-brass/40'
                                            : 'h-1.5 bg-white/15'
                                        }`}
                                    aria-label={`Go to step ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Keyboard hints */}
                    <div className="max-w-3xl mx-auto mt-2 flex items-center justify-center gap-3 t-label text-faint">
                        <span>Esc to exit</span>
                        <span aria-hidden="true">·</span>
                        <span>Space to pause</span>
                        <span aria-hidden="true">·</span>
                        <span>←/→ to step</span>
                        <span aria-hidden="true">·</span>
                        <span>click the bar to jump</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
