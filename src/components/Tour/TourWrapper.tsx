'use client';
import { Suspense } from 'react';

import { TourProvider, TourOverlay, PlayTourButton } from '@/components/Tour';

interface TourWrapperProps {
    children: React.ReactNode;
}

/**
 * Client-side wrapper for the Tour system
 * Provides tour context and renders tour UI components
 */
export function TourWrapper({ children }: TourWrapperProps) {
    return (
        <TourProvider
            onAnalyticsEvent={(event) => {
                // Analytics hook - can be connected to your analytics provider
                console.log('[Tour Analytics]', event);

                // Example: send to analytics
                // if (typeof window !== 'undefined' && window.gtag) {
                //   window.gtag('event', event.type, event);
                // }
            }}
        >
            {children}
            <TourOverlay />
            <Suspense fallback={null}>
                <PlayTourButton />
            </Suspense>
        </TourProvider>
    );
}
