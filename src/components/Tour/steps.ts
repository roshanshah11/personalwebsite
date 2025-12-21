import { TourConfig, TourStep, TourChapter } from './types';

/**
 * =====================================================
 * TOUR SCRIPT
 * =====================================================
 *
 * This is meant to feel like I’m walking you through the site
 * while you’re looking at it.
 */

// =========================================
// CHAPTER DEFINITIONS
// =========================================
export const tourChapters: TourChapter[] = [
    { id: 'intro', title: 'Welcome', startStepIndex: 0, endStepIndex: 1 },
    { id: 'about', title: 'About', startStepIndex: 1, endStepIndex: 4 },
    { id: 'experience', title: 'Experience', startStepIndex: 4, endStepIndex: 6 },
    { id: 'projects', title: 'Projects', startStepIndex: 6, endStepIndex: 9 },
    { id: 'awards', title: 'Awards', startStepIndex: 9, endStepIndex: 11 },
    { id: 'contact', title: 'Contact', startStepIndex: 11, endStepIndex: 12 },
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
            "Hey, I am roshan! Hope you enjoy this quick walk through of my portfolio!\n\nControls at the bottom of the screen!",
        targetSelector: '[data-tour="hero"]',
        action: 'highlightOnly',
        durationMs: 5500,
        placement: 'top-center',
        camera: { zoomLevel: 1.0, padding: 0, easing: 'easeOut' },
    },

    // ===== ABOUT =====
    {
        id: 'about-intro',
        chapter: 'about',
        text:
            "I spend a lot of time thinking about markets and building systems around them. Usually it starts with some math, turns into code, and then I see if it actually holds up once things get messy.",
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
            "I’m at UNC studying Business and Data Science. I like having both — business helps me understand how markets are structured, and data science gives me the tools to test whether the theory is actually useful.",
        targetSelector: '[data-tour="education"]',
        action: 'scrollTo',
        durationMs: 7000,
        placement: 'top-center',
        camera: { zoomLevel: 1.03, padding: 32, easing: 'spring' },
    },
    {
        id: 'about-skills',
        chapter: 'about',
        text:
            "Stack-wise, I try to stay practical. Python when I’m experimenting, C++ when performance matters, and React when I’m building tools people actually have to use.",
        targetSelector: '[data-tour="skills"]',
        action: 'highlightOnly',
        durationMs: 6500,
        placement: 'top-center',
        camera: { zoomLevel: 1.02, padding: 40, easing: 'easeOut' },
    },

    // ===== EXPERIENCE =====
    {
        id: 'experience-intro',
        chapter: 'experience',
        text:
            "This section is where I’ve tried to apply ideas outside the classroom. It’s less about titles and more about what broke, what didn’t, and what I learned from it.",
        targetSelector: '[data-tour="experience"]',
        action: 'scrollTo',
        durationMs: 6500,
        placement: 'top-center',
        camera: { zoomLevel: 1.01, padding: 56, easing: 'easeInOut' },
    },
    {
        id: 'experience-featured',
        chapter: 'experience',
        text:
            "At Black Swan, I work on volatility modeling. A lot of the focus is avoiding models that look great in backtests but fall apart when regimes shift — figuring out where the assumptions quietly fail.",
        targetSelector: '[data-tour="experience-card-0"]',
        action: 'highlightOnly',
        durationMs: 8000,
        placement: 'top-center',
        camera: { zoomLevel: 1.045, padding: 26, easing: 'spring' },
    },

    // ===== PROJECTS =====
    {
        id: 'projects-intro',
        chapter: 'projects',
        text:
            "These are projects I actually own end to end. Not class assignments — things where I had to deal with the math, the code, and the consequences of design decisions.",
        targetSelector: '[data-tour="projects"]',
        action: 'scrollTo',
        durationMs: 6500,
        placement: 'top-center',
        camera: { zoomLevel: 1.01, padding: 56, easing: 'easeInOut' },
    },
    {
        id: 'project-featured',
        chapter: 'projects',
        text:
            "This one’s an American options paper.\n\nI started it because standard pricing models felt too brittle once volatility stopped behaving nicely. I wanted something that could adapt when the assumptions didn’t.",
        targetSelector: '[data-tour="project-0"]',
        action: 'highlightOnly',
        durationMs: 8500,
        placement: 'top-center',
        camera: { zoomLevel: 1.05, padding: 22, easing: 'spring' },
    },
    {
        id: 'project-more',
        chapter: 'projects',
        text:
            "VertexLadder and QuantVerse are more on the builder side. Full-stack apps where the hard part isn’t writing code — it’s making something reliable enough that other people can actually use it.",
        targetSelector: '[data-tour="projects"]',
        action: 'highlightOnly',
        durationMs: 7500,
        placement: 'top-center',
        camera: { zoomLevel: 1.0, padding: 44, easing: 'easeOut' },
    },

    // ===== AWARDS =====
    {
        id: 'awards-intro',
        chapter: 'awards',
        text:
            "These are here mostly for context. They’re not the point of the site — just a quick signal that I’ve been doing this stuff consistently.",
        targetSelector: '[data-tour="awards"]',
        action: 'scrollTo',
        durationMs: 6000,
        placement: 'top-center',
        camera: { zoomLevel: 1.01, padding: 48, easing: 'easeInOut' },
    },
    {
        id: 'award-featured',
        chapter: 'awards',
        text:
            "The Hollerith Prize was about creative CS. The NJ Econ Championship came from spending a lot of time with theory before trying to stress-test it with data.",
        targetSelector: '[data-tour="award-0"]',
        action: 'highlightOnly',
        durationMs: 7000,
        placement: 'top-center',
        camera: { zoomLevel: 1.03, padding: 30, easing: 'spring' },
    },

    // ===== CONTACT =====
    {
        id: 'contact-intro',
        chapter: 'contact',
        text:
            "That’s the walkthrough.\n\nIf you’re working on something hard or interesting, I’d genuinely like to hear about it.",
        targetSelector: '[data-tour="footer"]',
        action: 'scrollTo',
        durationMs: 6000,
        placement: 'top-center',
        camera: { zoomLevel: 1.0, padding: 60, easing: 'easeInOut' },
    },
    {
        id: 'contact-cta',
        chapter: 'contact',
        text:
            "Email or LinkedIn works. Short message is totally fine.",
        targetSelector: '[data-tour="contact"]',
        action: 'highlightOnly',
        durationMs: 6000,
        placement: 'top-center',
        allowInteraction: true,
        camera: { zoomLevel: 1.02, padding: 28, easing: 'easeOut' },
    },
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