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
                    className="fixed bottom-0 left-0 right-0 z-[10002] px-4 pb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: isReducedMotion ? 0.1 : 0.4 }}
                >
                    {/* Main controls container */}
                    <div
                        className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.95) 0%, rgba(20, 20, 30, 0.95) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.4)',
                        }}
                    >
                        {/* Progress bar with chapter markers */}
                        <div
                            ref={progressBarRef}
                            className="relative h-2 bg-white/10 cursor-pointer group"
                            onMouseDown={handleMouseDown}
                        >
                            {/* Chapter markers */}
                            {chapters.map((chapter, i) => {
                                const chapterStart = tour.config?.steps
                                    .slice(0, chapter.startStepIndex)
                                    .reduce((acc, s) => acc + s.durationMs, 0) ?? 0;
                                const position = (chapterStart / totalDurationMs) * 100;

                                return (
                                    <div
                                        key={chapter.id}
                                        className="absolute top-0 bottom-0 w-0.5 bg-white/30"
                                        style={{ left: `${position}%` }}
                                        title={chapter.title}
                                    />
                                );
                            })}

                            {/* Progress fill */}
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-amber-500"
                                style={{ width: `${progress * 100}%` }}
                                transition={{ duration: isDragging ? 0 : 0.1 }}
                            />

                            {/* Playhead */}
                            <motion.div
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-400 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ left: `calc(${progress * 100}% - 8px)` }}
                            />
                        </div>

                        {/* Controls row */}
                        <div className="px-4 py-3 flex items-center justify-between gap-4">
                            {/* Left: Time display */}
                            <div className="flex items-center gap-2 min-w-[100px]">
                                <span className="text-xs font-mono text-white/60">{elapsedTime}</span>
                                <span className="text-xs text-white/30">/</span>
                                <span className="text-xs font-mono text-white/40">{totalTime}</span>
                            </div>

                            {/* Center: Playback controls */}
                            <div className="flex items-center gap-2">
                                {/* Previous */}
                                <button
                                    onClick={() => tour.prev()}
                                    className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                    aria-label="Previous step"
                                    disabled={currentStepIndex === 0}
                                >
                                    <SkipBack size={18} />
                                </button>

                                {/* Play/Pause/Replay */}
                                {isCompleted ? (
                                    <button
                                        onClick={() => tour.goToStep(0)}
                                        className="p-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black transition-colors"
                                        aria-label="Replay tour"
                                    >
                                        <RotateCcw size={20} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => tour.togglePlayPause()}
                                        className="p-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black transition-colors"
                                        aria-label={isPlaying ? 'Pause' : 'Play'}
                                    >
                                        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                                    </button>
                                )}

                                {/* Next */}
                                <button
                                    onClick={() => tour.next()}
                                    className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                    aria-label="Next step"
                                    disabled={currentStepIndex === totalSteps - 1}
                                >
                                    <SkipForward size={18} />
                                </button>
                            </div>

                            {/* Right: Chapter dropdown and close */}
                            <div className="flex items-center gap-2 min-w-[100px] justify-end">
                                {/* Chapter dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsChapterDropdownOpen(!isChapterDropdownOpen)}
                                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        <span className="truncate max-w-[80px]">{currentChapter?.title ?? 'Chapters'}</span>
                                        <ChevronDown size={14} className={`transition-transform ${isChapterDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isChapterDropdownOpen && (
                                            <motion.div
                                                className="absolute bottom-full right-0 mb-2 py-1 rounded-lg overflow-hidden min-w-[140px]"
                                                style={{
                                                    background: 'rgba(20, 20, 30, 0.98)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
                                                }}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                            >
                                                {chapters.map((chapter) => (
                                                    <button
                                                        key={chapter.id}
                                                        onClick={() => {
                                                            tour.goToChapter(chapter.id);
                                                            setIsChapterDropdownOpen(false);
                                                        }}
                                                        className={`w-full px-3 py-2 text-left text-xs transition-colors ${currentChapter?.id === chapter.id
                                                                ? 'text-amber-400 bg-amber-400/10'
                                                                : 'text-white/60 hover:text-white hover:bg-white/10'
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
                                    className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                    aria-label="Exit tour"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Step indicator */}
                        <div className="px-4 pb-3 flex items-center justify-center gap-1">
                            {Array.from({ length: totalSteps }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => tour.goToStep(i)}
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentStepIndex
                                            ? 'w-4 bg-amber-400'
                                            : i < currentStepIndex
                                                ? 'bg-amber-400/50'
                                                : 'bg-white/20'
                                        }`}
                                    aria-label={`Go to step ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Keyboard hints */}
                    <div className="max-w-4xl mx-auto mt-2 flex items-center justify-center gap-4 text-[10px] text-white/30 font-mono">
                        <span>Esc to exit</span>
                        <span>•</span>
                        <span>Space to pause</span>
                        <span>•</span>
                        <span>←/→ to step</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
