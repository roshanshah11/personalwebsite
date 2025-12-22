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
            "I'm really interested in the intersection of Finance and AI, whether it be modeling stocks, building financial tools, or just learning about new tech in the startup space!!",
        targetSelector: '[data-tour="about"]',
        action: 'scrollTo',
        durationMs: 4500,
        placement: 'top-center',
        camera: { zoomLevel: 1.02, padding: 48, easing: 'easeInOut' },
    },
    {
        id: 'about-education',
        chapter: 'about',
        text:
            "I’m at UNC-Chapel Hill studying Business and Data Science right now! And graduated Lawrenceville in 2025. At UNC, I'm apart of the Portfolio Management Team, focusing on analyzing public companies in the technology space, and I am apart of the Quantitative Finance Association as apart of their Derivatives Team!  ",
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
            "At Black Swan, I am working at a hedge-fund incubator specializing in machine learning and event-driven investing. I am working on volatility modeling and writing reports on how to model different events from bankrupcies to M&As",
        targetSelector: '[data-tour="experience-card-0"]',
        action: 'scrollTo',
        durationMs: 6000,
        placement: 'top-center',
        camera: { zoomLevel: 1.045, padding: 26, easing: 'spring' },
    },
    {
        id: 'experience-featured-2',
        chapter: 'experience',
        text:
            "At Hitech, I worked on business development for a recent 3.4M acquisition and focused on US market entry strategies! Learned alot about the plastics manufacturing space and the supply chain ",
        targetSelector: '[data-tour="experience-card-2"]',
        action: 'scrollTo',
        durationMs: 6000,
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
        text: "I wrote a paper focusing on improving the computational and financial efficiencies of an American options pricing model created by Bayer et all (2024); I focused on creating a regime shiting hybrid model that adapts based off of different volility conditions and improved computational efficiencies with Random Fourier Features (RFF). Super cool stuff! ",
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