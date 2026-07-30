'use client';

import { useTour, useTourOptional } from './TourProvider';

/**
 * Primary hook for controlling the tour from anywhere in the app
 * Must be used within TourProvider
 */
export function useTourController() {
    const context = useTour();

    // How far through the *current step* the tour clock is, 0 to 1.
    //
    // The caption's progress rule used to be a framer animation from 0% to 100%
    // over `durationMs`, started when the step mounted. That is an independent
    // clock: it kept filling while the tour was paused, and after a seek it
    // restarted from zero no matter where in the step you landed. Reading the
    // real elapsed time means the rule is always showing the thing it claims to
    // be showing.
    const steps = context.config?.steps ?? [];
    const stepStartMs = steps
        .slice(0, context.currentStepIndex)
        .reduce((total, step) => total + step.durationMs, 0);
    const stepDurationMs = context.currentStep?.durationMs ?? 0;
    const stepProgress = stepDurationMs > 0
        ? Math.min(Math.max((context.elapsedTime - stepStartMs) / stepDurationMs, 0), 1)
        : 0;

    return {
        // State
        isActive: context.state !== 'IDLE',
        isPlaying: context.state === 'PLAYING',
        isPaused: context.state === 'PAUSED',
        isCompleted: context.state === 'COMPLETED',
        isEntering: context.state === 'ENTERING',
        isExiting: context.state === 'EXITING',
        state: context.state,

        // Current position
        currentStep: context.currentStep,
        currentStepIndex: context.currentStepIndex,
        currentChapter: context.currentChapter,
        progress: context.progress,
        elapsedTime: context.elapsedTime,
        stepProgress,
        totalSteps: context.config?.steps.length ?? 0,

        // Settings
        isReducedMotion: context.isReducedMotion,

        // Viewer state
        isViewerOpen: context.isViewerOpen,
        viewerContent: context.viewerContent,

        // Controls
        start: context.startTour,
        pause: context.pauseTour,
        resume: context.resumeTour,
        exit: context.exitTour,
        togglePlayPause: () => {
            if (context.state === 'PLAYING') {
                context.pauseTour();
            } else if (context.state === 'PAUSED') {
                context.resumeTour();
            }
        },
        next: context.nextStep,
        prev: context.prevStep,
        goToStep: context.goToStep,
        goToChapter: context.goToChapter,
        seekTo: context.seekTo,

        // Viewer controls
        openViewer: context.openViewer,
        closeViewer: context.closeViewer,

        // Metadata
        chapters: context.chapters,
        totalDurationMs: context.totalDurationMs,
        config: context.config,
    };
}

/**
 * Safe hook that returns null if outside TourProvider
 * Useful for components that may or may not be in tour context
 */
export function useTourControllerOptional() {
    const context = useTourOptional();

    if (!context) return null;

    return {
        isActive: context.state !== 'IDLE',
        isPlaying: context.state === 'PLAYING',
        state: context.state,
        currentStep: context.currentStep,
        progress: context.progress,
        start: context.startTour,
        exit: context.exitTour,
        chapters: context.chapters,
    };
}
