// Tour System - barrel exports

// Provider and context
export { TourProvider, useTour, useTourOptional } from './TourProvider';

// Controller hook
export { useTourController, useTourControllerOptional } from './useTourController';

// UI Components
export { TourOverlay } from './TourOverlay';
export { PlayTourButton } from './PlayTourButton';
export { TourWrapper } from './TourWrapper';
export { Spotlight } from './Spotlight';
export { CaptionRenderer } from './CaptionRenderer';
export { TimelineControls } from './TimelineControls';
export { ContentViewerModal } from './ContentViewerModal';
export { KeyboardHandler } from './KeyboardHandler';
export { HelpButton } from './HelpButton';
export { RocketPromo } from './RocketPromo';

// Config
export { tourConfig } from './steps';

// Types
export type {
    TourState,
    TourStep,
    TourChapter,
    TourConfig,
    TourContextValue,
    CameraOptions,
    CaptionPlacement,
    ViewerContent,
    TourStepAction,
    TourAnalyticsEvent,
} from './types';
