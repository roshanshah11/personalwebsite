'use client';
import { Suspense } from 'react';

import { TourProvider, TourOverlay, PlayTourButton, RocketPromo } from '@/components/Tour';

interface TourWrapperProps {
    children: React.ReactNode;
}

/**
 * Client-side wrapper for the Tour system
 * Provides tour context and renders tour UI components
 */
export function TourWrapper({ children }: TourWrapperProps) {
    return (
        // No onAnalyticsEvent handler. The one that used to be here only
        // console.log'd every tour event to the visitor's own devtools, which
        // is not analytics, it is noise in someone else's console. TourProvider
        // still emits the events; wire a real destination here when there is
        // one to wire.
        <TourProvider>
            {children}
            <TourOverlay />
            <RocketPromo />
            <Suspense fallback={null}>
                <PlayTourButton />
            </Suspense>
        </TourProvider>
    );
}
