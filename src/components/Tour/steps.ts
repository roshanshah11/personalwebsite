import { TourConfig, TourStep, TourChapter } from './types';

/**
 * =====================================================
 * TOUR SCRIPT
 * =====================================================
 *
 * Roshan talking you through the page while you look at it.
 *
 * Two things this script is not allowed to do again:
 *
 * 1. Open three separate steps with "Here are a little more about ...". Three
 *    identical run-ups in a row is the thing that made the tour read as
 *    generated. Each step starts on its own subject.
 *
 * 2. Narrate one thing while the spotlight frames another. `project-featured`
 *    described the HAL paper and pointed at `project-0`, which is Murmur.
 *    Every targetSelector below is checked against the actual array index in
 *    WorkSection, and the index is in the comment so it stays checkable.
 *
 * 3. End on a line built to be quotable. The pass that fixed (1) landed six
 *    steps on one: "before anyone opens a spreadsheet", "before anything
 *    expensive left the ground", "then find where it stops matching reality".
 *    Roshan read it and asked whether that was really how he talks. It was not.
 *    A voiceover that lands a closer every eight seconds is still performing,
 *    just with better taste than the version it replaced. Steps end on the
 *    fact, the number, or the list, and then stop.
 *
 * Durations are reading time, not typing time. The caption used to reveal
 * character by character at 20ms each, and `about-intro` needed 5,820ms of
 * that inside a 5,500ms step, so its last words were never once shown to
 * anybody. The reveal is gone; these numbers now only have to be long enough
 * to read the sentence and see what it points at.
 */

// =========================================
// CHAPTER DEFINITIONS
// =========================================
// startStepIndex is inclusive, endStepIndex exclusive.
export const tourChapters: TourChapter[] = [
    { id: 'intro', title: 'Start', startStepIndex: 0, endStepIndex: 1 },
    { id: 'about', title: 'About', startStepIndex: 1, endStepIndex: 3 },
    { id: 'experience', title: 'Experience', startStepIndex: 3, endStepIndex: 6 },
    { id: 'projects', title: 'Projects', startStepIndex: 6, endStepIndex: 9 },
    { id: 'awards', title: 'Awards', startStepIndex: 9, endStepIndex: 10 },
    { id: 'contact', title: 'Contact', startStepIndex: 10, endStepIndex: 11 },
];

// =========================================
// TOUR STEPS
// =========================================
export const tourSteps: TourStep[] = [
    // ===== INTRO =====
    {
        id: 'intro-welcome',
        chapter: 'intro',
        text:
            "hey, i'm roshan. i'll walk you through the site.\n\ncontrols are at the bottom, skip around or leave whenever.",
        targetSelector: '[data-tour="hero"]',
        action: 'scrollTo',
        durationMs: 6000,
        placement: 'top-center',
        camera: { zoomLevel: 1.0, padding: 0, easing: 'easeOut' },
    },

    // ===== ABOUT =====
    {
        id: 'about-intro',
        chapter: 'about',
        text:
            "i study econ at uchicago, and most of what i build is aerospace and simulation software, plus the technical side of investing.",
        targetSelector: '[data-tour="about"]',
        action: 'scrollTo',
        durationMs: 6500,
        placement: 'top-center',
        camera: { zoomLevel: 1.02, padding: 48, easing: 'easeInOut' },
    },
    {
        id: 'about-education',
        chapter: 'about',
        text:
            "uchicago for econ and data science, before that unc kenan-flagler. i covered tech for the portfolio management team, so i had to defend a buy or a sell on a real $120k fund.",
        targetSelector: '[data-tour="education"]',
        action: 'scrollTo',
        durationMs: 8500,
        placement: 'top-center',
        camera: { zoomLevel: 1.03, padding: 32, easing: 'spring' },
    },

    // ===== EXPERIENCE =====
    {
        id: 'experience-intro',
        chapter: 'experience',
        text:
            "this is the work, newest first. equity research, derivatives, venture diligence, drone hardware.",
        targetSelector: '[data-tour="experience"]',
        action: 'scrollTo',
        durationMs: 5500,
        placement: 'top-center',
        camera: { zoomLevel: 1.01, padding: 56, easing: 'easeInOut' },
    },
    {
        // experiences[0] — Blue Oak Group
        id: 'experience-featured',
        chapter: 'experience',
        text:
            "blue oak is where i am now, doing the coding side of sourcing and diligence. i built an ai workflow that scrapes broker listings and screens acquisition targets.",
        targetSelector: '[data-tour="experience-card-0"]',
        action: 'scrollTo',
        durationMs: 8000,
        placement: 'top-center',
        camera: { zoomLevel: 1.045, padding: 26, easing: 'spring' },
    },
    {
        // experiences[4] — Carolina SkyLab
        id: 'experience-skylab',
        chapter: 'experience',
        text:
            "carolina skylab, a two-fan tailsitter vtol for medical delivery. i did the cad assembly with gear-driven servos and ran ardupilot sitl sims on the control loop.",
        targetSelector: '[data-tour="experience-card-4"]',
        action: 'scrollTo',
        durationMs: 8000,
        placement: 'top-center',
        camera: { zoomLevel: 1.045, padding: 26, easing: 'spring' },
    },

    // ===== PROJECTS =====
    {
        id: 'projects-intro',
        chapter: 'projects',
        text:
            "none of this was assigned. a dictation app i wanted running locally on my mac, a rocket design and flight-review workbench, an order book that handles 1.8 million orders a second.",
        targetSelector: '[data-tour="projects"]',
        action: 'scrollTo',
        durationMs: 9000,
        placement: 'top-center',
        camera: { zoomLevel: 1.01, padding: 56, easing: 'easeInOut' },
    },
    {
        // projects[2] — AI and the HAL Revisited. Was pointed at project-0,
        // which is Murmur.
        id: 'project-featured',
        chapter: 'projects',
        text:
            "this one's a paper, not a repo. i argue that ai has mostly dissolved the old computational objection to central planning, and that what's left binding is institutional: oversight, concentrated power, accountability.",
        targetSelector: '[data-tour="project-2"]',
        action: 'scrollTo',
        durationMs: 10500,
        placement: 'top-center',
        camera: { zoomLevel: 1.05, padding: 22, easing: 'spring' },
    },
    {
        id: 'project-more',
        chapter: 'projects',
        text:
            "the rest are further out. krypop is my family's popcorn business and i wrote the checkout and subscription flow. vertexladder is a lock-free c++ matching engine, voicebraille was a speech-to-braille printer.",
        targetSelector: '[data-tour="projects"]',
        action: 'scrollTo',
        durationMs: 10000,
        placement: 'top-center',
        camera: { zoomLevel: 1.0, padding: 44, easing: 'easeOut' },
    },

    // ===== AWARDS =====
    {
        id: 'awards-intro',
        chapter: 'awards',
        text:
            "two of these i care about. the hollerith prize came from a transcript auditing tool the school actually put into use, and the fed's journal of future economists took the paper, one of twelve out of 195.",
        targetSelector: '[data-tour="awards"]',
        action: 'scrollTo',
        durationMs: 9500,
        placement: 'top-center',
        camera: { zoomLevel: 1.01, padding: 48, easing: 'easeInOut' },
    },

    // ===== CONTACT =====
    {
        id: 'contact-intro',
        chapter: 'contact',
        text:
            "that's everything. my email's here if you want to talk about any of it, or argue with the paper.",
        targetSelector: '[data-tour="footer"]',
        action: 'scrollTo',
        durationMs: 5500,
        placement: 'top-center',
        camera: { zoomLevel: 1.0, padding: 60, easing: 'easeInOut' },
    }
];

// =========================================
// CONFIG
// =========================================
export const tourConfig: TourConfig = {
    title: 'Roshan Shah Portfolio Tour',
    defaultDurationMs: 6000,
    chapters: tourChapters,
    steps: tourSteps,
};

/**
 * The real runtime, derived rather than asserted.
 *
 * PlayTourButton advertised "~45 second guided tour" next to a script that ran
 * 67.5 seconds, because the number was typed into the button by hand and the
 * script kept growing underneath it. Anything that quotes a duration reads it
 * from here instead, so the claim cannot drift from the thing it describes.
 */
export const tourTotalDurationMs = tourSteps.reduce((total, step) => total + step.durationMs, 0);

/** e.g. "about 1:37". Rounded to the nearest 5s: the tour is not a stopwatch. */
export function tourDurationLabel(): string {
    const seconds = Math.round(tourTotalDurationMs / 1000 / 5) * 5;
    if (seconds < 60) return `about ${seconds} seconds`;
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return `about ${minutes}:${rest.toString().padStart(2, '0')}`;
}
