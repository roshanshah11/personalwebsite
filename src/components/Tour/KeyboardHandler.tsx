'use client';

import { useEffect } from 'react';
import { useTourController } from './useTourController';

/**
 * Keyboard handler for tour controls
 * Space: pause/resume
 * Escape: exit tour
 * ArrowLeft: previous step
 * ArrowRight: next step
 */
export function KeyboardHandler() {
    const tour = useTourController();

    useEffect(() => {
        if (!tour.isActive) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent default for tour keys
            if (['Space', 'Escape', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }

            switch (e.code) {
                case 'Space':
                    tour.togglePlayPause();
                    break;
                case 'Escape':
                    tour.exit();
                    break;
                case 'ArrowLeft':
                    tour.prev();
                    break;
                case 'ArrowRight':
                    tour.next();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [tour.isActive, tour.togglePlayPause, tour.exit, tour.prev, tour.next]);

    // This component renders nothing, just handles events
    return null;
}
