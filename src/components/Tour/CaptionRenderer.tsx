'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTourController } from './useTourController';

/** Plate height plus breathing room. Used to test a placement for collision. */
const PLATE_CLEARANCE = 210;
/** Top placement's offset, and the height the timeline controls own at the bottom. */
const TOP_INSET = 96;
const BOTTOM_INSET = 200;

/**
 * The narration plate.
 *
 * This used to be a rounded glass card with a 20px backdrop blur, a 135deg
 * gradient fill, an inset highlight, a drop shadow, an amber gradient progress
 * bar, and text that typed itself in one character at a time behind a blinking
 * block caret. On a page whose whole argument is engraved serif type on open
 * sky, that was a terminal window taped over the plate.
 *
 * What it is now: a ruled plate. Square, one hairline, the ground colour behind
 * it so the sentence stays readable over whatever it is covering, and a single
 * brass rule that fills with the step. The type comes from the system.
 *
 * The typing effect is gone, and not only on taste. At 20ms per character the
 * `about-intro` step needed 5,820ms of typing inside a 5,500ms step, so its
 * closing words were replaced before they were ever drawn. A reveal that can
 * outrun its own step is not a reveal.
 */
export function CaptionRenderer() {
    const {
        currentStep,
        currentStepIndex,
        totalSteps,
        currentChapter,
        stepProgress,
        isActive,
        isReducedMotion,
    } = useTourController();

    const authored = currentStep?.placement ?? 'bottom-center';

    // Every step is authored `top-center`, and the plate is 38rem of opaque
    // ground, so on any target that lands high in the frame the narration was
    // parked directly on top of the thing it was narrating — the Blue Oak card
    // was half-covered by the sentence describing it.
    //
    // This does not need to observe the scroll. `executeStepAction` centres the
    // target (`scrollY + rect.top - innerHeight/2 + rect.height/2`), so the
    // post-scroll geometry is knowable the moment the step starts: convert the
    // rect to document space, apply that same formula clamped to the real scroll
    // range, and read off where the target will come to rest. Deciding up front
    // means the plate never flips sides mid-step.
    const placement = useMemo(() => {
        if (typeof window === 'undefined' || !currentStep) return authored;
        if (authored !== 'top-center') return authored;

        const el = document.querySelector(currentStep.targetSelector);
        if (!el) return authored;

        const rect = el.getBoundingClientRect();
        const pad = currentStep.camera?.padding ?? 0;
        const maxScroll = Math.max(
            0,
            document.documentElement.scrollHeight - window.innerHeight
        );
        const wanted =
            window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;
        // Clamped, because the hero and the footer cannot be centred: the page
        // runs out before they get there, and assuming otherwise would put the
        // plate on the wrong side for the first and last steps.
        const settled = Math.min(Math.max(wanted, 0), maxScroll);

        const top = rect.top + window.scrollY - settled - pad;
        const bottom = top + rect.height + pad * 2;

        const freeAbove = top - TOP_INSET;
        const freeBelow = window.innerHeight - BOTTOM_INSET - bottom;

        if (freeAbove >= PLATE_CLEARANCE) return 'top-center';
        if (freeBelow >= PLATE_CLEARANCE) return 'bottom-center';
        // Neither side clears it: a tall target, or a short window. Take the
        // roomier side rather than always defaulting up, so the overlap that is
        // left is the smallest one available.
        return freeBelow > freeAbove ? 'bottom-center' : 'top-center';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep?.id, authored]);

    // Position and entrance for the current placement.
    //
    // The centring offset MUST be expressed as a framer value, never as
    // `transform` in the style prop: this is a motion.div, and framer writes its
    // own `transform` onto the node every frame, silently dropping whatever the
    // style prop set. That is what used to push every caption half its width off
    // centre — and since all eleven steps are `top-center`, that was every
    // caption on the site.
    //
    // So each placement pins one axis as a constant offset and animates the
    // other one in. Centred placements hold x at -50% and rise on y; the side
    // placements hold y at -50% and slide in on x.
    const getPlacement = (): {
        style: React.CSSProperties;
        rest: { x?: string | number; y?: string | number };
        from: { x?: string | number; y?: string | number };
        exit: { x?: string | number; y?: string | number };
    } => {
        switch (placement) {
            case 'bottom-center':
                return {
                    style: { bottom: `${BOTTOM_INSET}px`, left: '50%' },
                    rest: { x: '-50%', y: 0 },
                    from: { x: '-50%', y: 10 },
                    exit: { x: '-50%', y: -10 },
                };
            case 'left':
                return {
                    style: { top: '50%', left: '40px' },
                    rest: { x: 0, y: '-50%' },
                    from: { x: -10, y: '-50%' },
                    exit: { x: -10, y: '-50%' },
                };
            case 'right':
                return {
                    style: { top: '50%', right: '40px' },
                    rest: { x: 0, y: '-50%' },
                    from: { x: 10, y: '-50%' },
                    exit: { x: 10, y: '-50%' },
                };
            case 'top-center':
            case 'near-target':
            default:
                // near-target has never had its own geometry; it falls through
                // to top-center for legibility.
                return {
                    style: { top: `${TOP_INSET}px`, left: '50%' },
                    rest: { x: '-50%', y: 0 },
                    from: { x: '-50%', y: 8 },
                    exit: { x: '-50%', y: -8 },
                };
        }
    };

    if (!isActive) return null;

    const { style: placementStyle, rest, from, exit } = getPlacement();

    return (
        <AnimatePresence mode="wait">
            {currentStep && (
                <motion.div
                    key={currentStep.id}
                    className="fixed z-[10001] w-[min(38rem,calc(100vw-2rem))]"
                    style={placementStyle}
                    initial={{ opacity: 0, ...from }}
                    animate={{ opacity: 1, ...rest }}
                    exit={{ opacity: 0, ...exit }}
                    transition={{
                        duration: isReducedMotion ? 0.1 : 0.35,
                        ease: [0.2, 0.8, 0.2, 1],
                    }}
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <div
                        className="relative border border-rule"
                        style={{
                            // The ground itself, near-opaque. Not a tinted glass
                            // pane: the caption sits over body copy, so it needs
                            // to be a surface, and the one surface this system
                            // has is the ground colour.
                            backgroundColor: 'rgba(5, 8, 16, 0.94)',
                        }}
                    >
                        {/* Step progress, read off the tour clock rather than
                            animated on its own timer, so it stops when the tour
                            is paused and lands correctly after a seek. */}
                        <div
                            className="absolute top-0 left-0 h-px bg-brass"
                            style={{ width: `${stepProgress * 100}%` }}
                        />

                        <div className="px-6 pt-5 pb-4">
                            {/* pre-line preserves the stanza breaks steps.ts
                                writes into the narration; without it they
                                collapse to a single space. */}
                            <p
                                className="t-body text-ink/90"
                                style={{ whiteSpace: 'pre-line' }}
                            >
                                {currentStep.text}
                            </p>
                        </div>

                        <div className="px-6 pb-4 flex items-baseline gap-3 border-t border-hair pt-3">
                            <span className="t-label text-brass">
                                {currentChapter?.title ?? currentStep.chapter}
                            </span>
                            {/* Was printing `currentStep.id` here, so every
                                visitor read internal slugs like
                                "experience-featured" under the narration. */}
                            <span className="t-label t-num text-faint ml-auto">
                                {currentStepIndex + 1} / {totalSteps}
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
