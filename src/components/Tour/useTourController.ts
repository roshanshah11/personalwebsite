'use client';

import { useTour, useTourOptional } from './TourProvider';

/**
 * Primary hook for controlling the tour from anywhere in the app
 * Must be used within TourProvider
 */
export function useTourController() {
    const context = useTour();

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
