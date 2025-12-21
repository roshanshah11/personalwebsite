'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
    TourState,
    TourStep,
    TourChapter,
    TourConfig,
    TourContextValue,
    ViewerContent,
    TourAnalyticsEvent
} from './types';
import { tourConfig } from './steps';

// Create context with default values
const TourContext = createContext<TourContextValue | null>(null);

export function useTour() {
    const context = useContext(TourContext);
    if (!context) {
        throw new Error('useTour must be used within a TourProvider');
    }
    return context;
}

// Optional hook that doesn't throw if outside provider
export function useTourOptional() {
    return useContext(TourContext);
}

interface TourProviderProps {
    children: React.ReactNode;
    onAnalyticsEvent?: (event: TourAnalyticsEvent) => void;
}

export function TourProvider({ children, onAnalyticsEvent }: TourProviderProps) {
    // Core state
    const [state, setState] = useState<TourState>('IDLE');
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [viewerContent, setViewerContent] = useState<ViewerContent | null>(null);

    // Refs for timing
    const lastFrameTimeRef = useRef<number>(0);
    const requestRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);
    const lenisRef = useRef<any>(null);
    const scrollYRef = useRef<number>(0);

    // Detect reduced motion preference
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // Config and derived state
    const config = tourConfig;
    const chapters = config.chapters;
    const steps = config.steps;

    const totalDurationMs = useMemo(() =>
        steps.reduce((acc: number, step: TourStep) => acc + step.durationMs, 0),
        [steps]
    );

    const currentStep = steps[currentStepIndex] ?? null;

    const currentChapter = useMemo(() => {
        if (!currentStep) return null;
        return chapters.find((ch: TourChapter) => ch.id === currentStep.chapter) ?? null;
    }, [currentStep, chapters]);

    const progress = useMemo(() => {
        if (totalDurationMs === 0) return 0;
        return Math.min(Math.max(elapsedTime / totalDurationMs, 0), 1);
    }, [elapsedTime, totalDurationMs]);

    // Analytics helper
    const emitEvent = useCallback((event: TourAnalyticsEvent) => {
        onAnalyticsEvent?.(event);
        console.log('[Tour Analytics]', event);
    }, [onAnalyticsEvent]);

    // Scroll locking - block user scroll but allow programmatic scrolling
    const lockScroll = useCallback(() => {
        // Save current scroll position
        scrollYRef.current = window.scrollY;

        // Block wheel events (user scroll)
        const blockScroll = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        // Block keyboard scroll (arrow keys, space, page up/down)
        const blockKeyScroll = (e: KeyboardEvent) => {
            const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'];
            // Don't block if it's for tour controls
            if (scrollKeys.includes(e.key) && !e.metaKey && !e.ctrlKey) {
                // Allow arrow keys for tour navigation (handled by KeyboardHandler)
                // But block default scroll behavior
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', blockScroll, { passive: false, capture: true });
        window.addEventListener('touchmove', blockScroll, { passive: false, capture: true });
        document.addEventListener('keydown', blockKeyScroll, { capture: true });

        // Store for cleanup
        (window as any).__tourScrollBlocker = blockScroll;
        (window as any).__tourKeyBlocker = blockKeyScroll;

        // Try to lock Lenis if available
        if (typeof window !== 'undefined' && (window as any).__lenis) {
            lenisRef.current = (window as any).__lenis;
            lenisRef.current.stop();
        }
    }, []);

    const unlockScroll = useCallback(() => {
        // Remove scroll blockers
        const blockScroll = (window as any).__tourScrollBlocker;
        const blockKeyScroll = (window as any).__tourKeyBlocker;

        if (blockScroll) {
            window.removeEventListener('wheel', blockScroll, { capture: true } as EventListenerOptions);
            window.removeEventListener('touchmove', blockScroll, { capture: true } as EventListenerOptions);
            delete (window as any).__tourScrollBlocker;
        }

        if (blockKeyScroll) {
            document.removeEventListener('keydown', blockKeyScroll, { capture: true } as EventListenerOptions);
            delete (window as any).__tourKeyBlocker;
        }

        // Resume Lenis
        if (lenisRef.current) {
            lenisRef.current.start();
            lenisRef.current = null;
        }
    }, []);

    // Helper: Calculate step index from time
    const getStepIndexAtTime = useCallback((timeMs: number) => {
        let accumulated = 0;
        for (let i = 0; i < steps.length; i++) {
            accumulated += steps[i].durationMs;
            if (accumulated > timeMs) return i;
        }
        return steps.length - 1;
    }, [steps]);

    // Execute step action - waits for target element with retries
    const executeStepAction = useCallback(async (step: TourStep) => {
        // Helper to wait for element to appear
        const waitForElement = async (selector: string, maxWaitMs = 2000): Promise<Element | null> => {
            const startTime = Date.now();
            while (Date.now() - startTime < maxWaitMs) {
                const el = document.querySelector(selector);
                if (el) return el;
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            return null;
        };

        const target = await waitForElement(step.targetSelector);

        // If still not found after waiting, proceed gracefully (don't block the tour)
        if (!target && step.action !== 'wait' && step.action !== 'highlightOnly') {
            // Silently continue - the spotlight will handle showing nothing
            return true;
        }

        switch (step.action) {
            case 'scrollTo':
                if (target) {
                    const rect = target.getBoundingClientRect();
                    const targetY = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);

                    // Try Lenis first (if available and active)
                    const lenis = (window as any).__lenis;
                    if (lenis && typeof lenis.scrollTo === 'function') {
                        // Temporarily enable Lenis for this scroll
                        lenis.start();
                        lenis.scrollTo(targetY, {
                            duration: isReducedMotion ? 0.1 : 1.2,
                            easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
                            onComplete: () => {
                                // Re-stop Lenis after scroll completes
                                lenis.stop();
                            }
                        });
                    } else {
                        // Fallback to native smooth scroll
                        window.scrollTo({
                            top: targetY,
                            behavior: isReducedMotion ? 'auto' : 'smooth'
                        });
                    }
                }
                break;
            case 'click':
                if (target && step.allowInteraction) {
                    (target as HTMLElement).click();
                }
                break;
            case 'openViewer':
                if (step.viewerContent) {
                    setViewerContent(step.viewerContent);
                    setIsViewerOpen(true);
                }
                break;
            case 'closeViewer':
                setIsViewerOpen(false);
                setViewerContent(null);
                break;
            case 'wait':
            case 'highlightOnly':
                // No additional action needed
                break;
        }

        return true;
    }, [isReducedMotion]);

    // Animation Frame Loop
    const animate = useCallback((time: number) => {
        if (state !== 'PLAYING') {
            requestRef.current = null;
            return;
        }

        if (lastFrameTimeRef.current !== 0) {
            const deltaTime = time - lastFrameTimeRef.current;

            setElapsedTime(prevTime => {
                const newTime = Math.min(prevTime + deltaTime, totalDurationMs);

                // Compare indices to trigger step changes
                const newIndex = getStepIndexAtTime(newTime);
                const prevIndex = getStepIndexAtTime(prevTime);

                if (newIndex !== prevIndex) {
                    setCurrentStepIndex(newIndex);
                }

                // Check for completion
                if (newTime >= totalDurationMs) {
                    setState('COMPLETED');
                    emitEvent({ type: 'tour_completed', durationMs: totalDurationMs });

                    // Auto-exit setup
                    setTimeout(() => {
                        setState('EXITING');
                        setTimeout(() => {
                            unlockScroll();
                            setIsViewerOpen(false);
                            setViewerContent(null);
                            setCurrentStepIndex(0);
                            setElapsedTime(0);
                            setState('IDLE');
                        }, isReducedMotion ? 100 : 800);
                    }, 1500);

                    return totalDurationMs;
                }

                return newTime;
            });
        }

        lastFrameTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }, [state, totalDurationMs, getStepIndexAtTime, emitEvent, unlockScroll, isReducedMotion]);

    // Handle state changes calling the loop
    useEffect(() => {
        if (state === 'PLAYING') {
            lastFrameTimeRef.current = performance.now();
            requestRef.current = requestAnimationFrame(animate);
        } else {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
                requestRef.current = null;
            }
            lastFrameTimeRef.current = 0;
        }

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [state, animate]);

    // Effect to handle step execution side effects (when index changes)
    useEffect(() => {
        if ((state !== 'PLAYING' && state !== 'PAUSED') || !currentStep) return;

        emitEvent({ type: 'step_viewed', stepId: currentStep.id });
        executeStepAction(currentStep);
    }, [currentStepIndex, currentStep, executeStepAction, emitEvent, state]);

    // Control functions
    const startTour = useCallback((startChapter?: string) => {
        let startTime = 0;

        if (startChapter) {
            const chapter = chapters.find((ch: TourChapter) => ch.id === startChapter);
            if (chapter) {
                // Calculate start time for this chapter
                startTime = steps.slice(0, chapter.startStepIndex)
                    .reduce((acc: number, s: TourStep) => acc + s.durationMs, 0);
                setCurrentStepIndex(chapter.startStepIndex);
            }
        }

        lockScroll();
        setElapsedTime(startTime);
        startTimeRef.current = Date.now();
        setState('ENTERING');

        emitEvent({ type: 'tour_started' });

        // Transition to playing after entry animation
        setTimeout(() => {
            setState('PLAYING');
        }, isReducedMotion ? 100 : 600);
    }, [lockScroll, chapters, steps, emitEvent, isReducedMotion]);

    const pauseTour = useCallback(() => {
        if (state === 'PLAYING') {
            setState('PAUSED');
        }
    }, [state]);

    const resumeTour = useCallback(() => {
        if (state === 'PAUSED') {
            setState('PLAYING');
        }
    }, [state]);

    const exitTour = useCallback(() => {
        if (state === 'IDLE') return;

        setState('EXITING');

        emitEvent({
            type: 'tour_exited_early',
            stepId: currentStep?.id ?? 'unknown',
            progress
        });

        setTimeout(() => {
            unlockScroll();
            setIsViewerOpen(false);
            setViewerContent(null);
            setCurrentStepIndex(0);
            setElapsedTime(0);
            setState('IDLE');
        }, isReducedMotion ? 100 : 400);
    }, [state, currentStep, progress, unlockScroll, emitEvent, isReducedMotion]);

    const nextStep = useCallback(() => {
        // Jump to start of next step
        const nextIndex = Math.min(currentStepIndex + 1, steps.length - 1);
        const nextTime = steps.slice(0, nextIndex).reduce((acc: number, s: TourStep) => acc + s.durationMs, 0);

        setElapsedTime(nextTime + 10); // Slight offset to ensure we land IN the step
        setCurrentStepIndex(nextIndex);
    }, [currentStepIndex, steps]);

    const prevStep = useCallback(() => {
        // Jump to start of previous step
        const prevIndex = Math.max(currentStepIndex - 1, 0);
        const prevTime = steps.slice(0, prevIndex).reduce((acc: number, s: TourStep) => acc + s.durationMs, 0);

        setElapsedTime(prevTime + 10);
        setCurrentStepIndex(prevIndex);
    }, [currentStepIndex, steps]);

    const goToStep = useCallback((index: number) => {
        if (index >= 0 && index < steps.length) {
            const time = steps.slice(0, index).reduce((acc: number, s: TourStep) => acc + s.durationMs, 0);
            setElapsedTime(time + 10);
            setCurrentStepIndex(index);
        }
    }, [steps]);

    const goToChapter = useCallback((chapterId: string) => {
        const chapter = chapters.find((ch: TourChapter) => ch.id === chapterId);
        if (chapter) {
            const time = steps.slice(0, chapter.startStepIndex).reduce((acc: number, s: TourStep) => acc + s.durationMs, 0);
            setElapsedTime(time + 10);
            setCurrentStepIndex(chapter.startStepIndex);
        }
    }, [chapters, steps]);

    const seekTo = useCallback((targetProgress: number) => {
        const clampedProgress = Math.max(0, Math.min(1, targetProgress));
        const targetTime = clampedProgress * totalDurationMs;

        setElapsedTime(targetTime);
        setCurrentStepIndex(getStepIndexAtTime(targetTime));

        // If not playing, we should still update the view
        if (state === 'PAUSED' || state === 'COMPLETED') {
            // Effect will handle step view update via index change
        }
    }, [totalDurationMs, getStepIndexAtTime, state]);

    const openViewer = useCallback((content: ViewerContent) => {
        setViewerContent(content);
        setIsViewerOpen(true);
    }, []);

    const closeViewer = useCallback(() => {
        setIsViewerOpen(false);
        setViewerContent(null);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            if (state !== 'IDLE') {
                unlockScroll();
            }
        };
    }, [unlockScroll, state]);

    const value: TourContextValue = {
        state,
        currentStepIndex,
        currentStep,
        currentChapter,
        elapsedTime,
        progress,
        isReducedMotion,
        isViewerOpen,
        viewerContent,
        startTour,
        pauseTour,
        resumeTour,
        exitTour,
        nextStep,
        prevStep,
        goToStep,
        goToChapter,
        seekTo,
        openViewer,
        closeViewer,
        config,
        chapters,
        totalDurationMs,
    };

    return (
        <TourContext.Provider value={value}>
            {children}
        </TourContext.Provider>
    );
}
