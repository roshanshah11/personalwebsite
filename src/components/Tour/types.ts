// Tour System Type Definitions

/**
 * Tour state machine states
 */
export type TourState =
    | 'IDLE'
    | 'ENTERING'
    | 'PLAYING'
    | 'PAUSED'
    | 'COMPLETED'
    | 'EXITING';

/**
 * Chapter definition for tour segments
 */
export interface TourChapter {
    id: string;
    title: string;
    startStepIndex: number;
    endStepIndex: number;
}

/**
 * Camera/spotlight options for a step
 */
export interface CameraOptions {
    /** Zoom level (1 = normal, 1.05 = slight zoom) */
    zoomLevel?: number;
    /** Padding around the highlighted element in px */
    padding?: number;
    /** Easing function name */
    easing?: 'easeOut' | 'easeInOut' | 'spring';
    /** Duration of camera transition in ms */
    transitionMs?: number;
}

/**
 * Actions that a step can perform
 */
export type TourStepAction =
    | 'scrollTo'
    | 'click'
    | 'openModal'
    | 'openViewer'
    | 'closeViewer'
    | 'navigate'
    | 'wait'
    | 'highlightOnly';

/**
 * Step placement for captions
 */
export type CaptionPlacement =
    | 'bottom-center'
    | 'top-center'
    | 'left'
    | 'right'
    | 'near-target';

/**
 * Content viewer configuration
 */
export interface ViewerContent {
    type: 'pdf' | 'image' | 'video' | 'code';
    src: string;
    title?: string;
    language?: string; // For code syntax highlighting
}

/**
 * Preconditions for step execution
 */
export interface StepPreconditions {
    /** Required route path */
    route?: string;
    /** Element must exist */
    elementExists?: string;
    /** Custom validation function name */
    customCheck?: string;
}

/**
 * Individual tour step configuration
 */
export interface TourStep {
    /** Unique step identifier */
    id: string;
    /** Chapter this step belongs to */
    chapter: string;
    /** Narration text shown as caption */
    text: string;
    /** CSS selector for target element (use data-tour attributes) */
    targetSelector: string;
    /** Action to perform */
    action: TourStepAction;
    /** Duration in milliseconds */
    durationMs: number;
    /** Caption placement */
    placement: CaptionPlacement;
    /** Allow interaction with highlighted element */
    allowInteraction?: boolean;
    /** Camera/spotlight options */
    camera?: CameraOptions;
    /** Preconditions that must be met */
    preconditions?: StepPreconditions;
    /** Content to show in viewer (for openViewer action) */
    viewerContent?: ViewerContent;
    /** Optional verbose text for longer tour mode */
    verboseText?: string;
}

/**
 * Tour configuration
 */
export interface TourConfig {
    /** Tour title */
    title: string;
    /** Default step duration if not specified */
    defaultDurationMs: number;
    /** List of steps */
    steps: TourStep[];
    /** Chapter definitions */
    chapters: TourChapter[];
    /** Enable verbose mode (longer descriptions) */
    verboseMode?: boolean;
}

/**
 * Analytics event types
 */
export type TourAnalyticsEvent =
    | { type: 'tour_started' }
    | { type: 'tour_completed'; durationMs: number }
    | { type: 'tour_exited_early'; stepId: string; progress: number }
    | { type: 'chapter_completed'; chapterId: string }
    | { type: 'step_viewed'; stepId: string }
    | { type: 'step_skipped'; stepId: string; reason: string };

/**
 * Tour context value exposed to consumers
 */
export interface TourContextValue {
    // State
    state: TourState;
    currentStepIndex: number;
    currentStep: TourStep | null;
    currentChapter: TourChapter | null;
    elapsedTime: number; // Current playback time in ms
    progress: number; // 0-1
    isReducedMotion: boolean;
    isViewerOpen: boolean;
    viewerContent: ViewerContent | null;

    // Controls
    startTour: (startChapter?: string) => void;
    pauseTour: () => void;
    resumeTour: () => void;
    exitTour: () => void;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (index: number) => void;
    goToChapter: (chapterId: string) => void;
    seekTo: (progress: number) => void;
    openViewer: (content: ViewerContent) => void;
    closeViewer: () => void;

    // Config
    config: TourConfig | null;
    chapters: TourChapter[];
    totalDurationMs: number;
}
