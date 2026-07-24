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
            "Hey, I am roshan! Hope you enjoy this quick walkthrough of my portfolio!\n\n\n\nControls are at the bottom of the screen!",
        targetSelector: '[data-tour="hero"]',
        action: 'scrollTo',
        durationMs: 3500,
        placement: 'top-center',
        camera: { zoomLevel: 1.0, padding: 0, easing: 'easeOut' },
    },

    // ===== ABOUT =====
    {
        id: 'about-intro',
        chapter: 'about',
        text:
            "I'm a sophomore at UChicago studying economics. Most of my time goes to projects in aerospace and simulation software, plus the technical side of investing. Robotics, drone tech, and trading are the problems I keep coming back to, usually where finance, AI, and hardware run into each other.",
        targetSelector: '[data-tour="about"]',
        action: 'scrollTo',
        durationMs: 5500,
        placement: 'top-center',
        camera: { zoomLevel: 1.02, padding: 48, easing: 'easeInOut' },
    },
    {
        id: 'about-education',
        chapter: 'about',
        text:
            "I'm heading to the University of Chicago to study Economics and Data Science, after transferring from UNC Kenan-Flagler where I kept a 4.0 in Honors Carolina. Before that I graduated Lawrenceville in 2025. At UNC I analyzed public tech companies on the Portfolio Management Team and worked options and Greeks with the Quantitative Finance Association's derivatives team.",
        targetSelector: '[data-tour="education"]',
        action: 'scrollTo',
        durationMs: 8000,
        placement: 'top-center',
        camera: { zoomLevel: 1.03, padding: 32, easing: 'spring' },
    },


    // ===== EXPERIENCE =====
    {
        id: 'experience-intro',
        chapter: 'experience',
        text:
            "Here are a little more details about my profressional experiences, ranging from quantitative research to business development!",
        targetSelector: '[data-tour="experience"]',
        action: 'scrollTo',
        durationMs: 4500,
        placement: 'top-center',
        camera: { zoomLevel: 1.01, padding: 56, easing: 'easeInOut' },
    },
    {
        id: 'experience-featured',
        chapter: 'experience',
        text:
            "Right now I'm a PE Summer Analyst at Blue Oak Group, where I do a lot of the coding. I built an AI acquisition-sourcing and broker-scraper workflow to find and screen targets. It's the technical-finance work I like most.",
        targetSelector: '[data-tour="experience-card-0"]',
        action: 'scrollTo',
        durationMs: 7000,
        placement: 'top-center',
        camera: { zoomLevel: 1.045, padding: 26, easing: 'spring' },
    },
    {
        id: 'experience-skylab',
        chapter: 'experience',
        text:
            "At Carolina SkyLab I was an engineer building a 2 fan tail sitter VTOL drone. Full CAD assembly with gear driven servo actuation, plus ArduPilot SITL closed loop flight control sims for a medical delivery UAV.",
        targetSelector: '[data-tour="experience-card-4"]',
        action: 'scrollTo',
        durationMs: 6500,
        placement: 'top-center',
        camera: { zoomLevel: 1.045, padding: 26, easing: 'spring' },
    },


    // ===== PROJECTS =====
    {
        id: 'projects-intro',
        chapter: 'projects',
        text:
            "Here are a little more about the projects that I have worked on! I try to just have fun with these, nothing specific but whatever im interested in!",
        targetSelector: '[data-tour="projects"]',
        action: 'scrollTo',
        durationMs: 6500,
        placement: 'top-center',
        camera: { zoomLevel: 1.01, padding: 56, easing: 'easeInOut' },
    },
    {
        id: 'project-featured',
        chapter: 'projects',
        text: "My latest paper, AI and the HAL Revisited, argues that AI weakens the computational constraint on central planning, but the real risks remain institutional: oversight failure, concentrated power, incentive gaming, and democratic accountability.",
        targetSelector: '[data-tour="project-0"]',
        action: 'scrollTo',
        durationMs: 8500,
        placement: 'top-center',
        camera: { zoomLevel: 1.05, padding: 22, easing: 'spring' },
    },
    {
        id: 'project-more',
        chapter: 'projects',
        text:
            "I also built Krypop: a full stack website for my family's popcorn small business! I also have worked on other projects, from a low latency financial order book to other data science projects!  ",
        targetSelector: '[data-tour="projects"]',
        action: 'scrollTo',
        durationMs: 7500,
        placement: 'top-center',
        camera: { zoomLevel: 1.0, padding: 44, easing: 'easeOut' },
    },

    // ===== AWARDS =====
    {
        id: 'awards-intro',
        chapter: 'awards',
        text: "Here are a little more about some of the awards I have received, focused on economics and computer science!",
        targetSelector: '[data-tour="awards"]',
        action: 'scrollTo',
        durationMs: 6000,
        placement: 'top-center',
        camera: { zoomLevel: 1.01, padding: 48, easing: 'easeInOut' },
    },

    // ===== CONTACT =====
    {
        id: 'contact-intro',
        chapter: 'contact',
        text:
            "That's a little about me! \n\nIf you’re working on something or want to learn more about me, feel free to email me and we can talk!",
        targetSelector: '[data-tour="footer"]',
        action: 'scrollTo',
        durationMs: 4000,
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
