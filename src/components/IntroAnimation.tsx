"use client";

import { useState, useEffect, useRef } from "react";

interface IntroAnimationProps {
    onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
    const [lines, setLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState("");
    const [showDownload, setShowDownload] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [waitingForUser, setWaitingForUser] = useState(false);
    const [userProceeded, setUserProceeded] = useState(false);
    const [isPixelating, setIsPixelating] = useState(false);

    // The sequence of text to type out
    const sequencePart1 = [
        "Hi! My name is Roshan and welcome to my website!",
        "A little about me...",
        "I study Business & Data Science at UNC Chapel Hill.",
        "I am interested in Quantitative Finance, Investment Banking, and Entrepreneurship.",
        "Explore the website to learn more about me !!!!"
    ];

    const sequencePart2 = [
        "Initializing portfolio..."
    ];

    const typeLine = async (text: string) => {
        for (let j = 0; j <= text.length; j++) {
            setCurrentLine(text.slice(0, j));
            await new Promise((r) => setTimeout(r, 30));
        }
        // Wait a bit after finishing the line
        await new Promise((r) => setTimeout(r, 400));
        setLines((prev) => [...prev, text]);
        setCurrentLine("");
        // Extra pause between lines
        await new Promise((r) => setTimeout(r, 100));
    };

    useEffect(() => {
        const runSequence = async () => {
            // Initial delay
            await new Promise((r) => setTimeout(r, 800));

            // Run Part 1
            for (const text of sequencePart1) {
                await typeLine(text);
            }

            // Wait for user interaction
            setWaitingForUser(true);
        };

        runSequence();
    }, []);

    useEffect(() => {
        if (userProceeded) {
            const runPart2 = async () => {
                setWaitingForUser(false);

                // Run Part 2
                for (const text of sequencePart2) {
                    await typeLine(text);
                }

                // Start "Download" phase
                setShowDownload(true);

                const totalSteps = 50;
                for (let i = 0; i <= totalSteps; i++) {
                    setProgress(Math.floor((i / totalSteps) * 100));
                    await new Promise((r) => setTimeout(r, Math.random() * 20 + 10));
                }

                await new Promise((r) => setTimeout(r, 500));

                // Start pixelate transition
                setIsPixelating(true);

                // Wait for pixelate animation
                await new Promise((r) => setTimeout(r, 1500));

                setIsComplete(true);
                onComplete();
            };
            runPart2();
        }
    }, [userProceeded, onComplete]);

    if (isComplete) {
        return null;
    }

    return (
        <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono text-base md:text-lg p-0 md:p-4 ${isPixelating ? 'animate-pixelate' : ''}`}>
            {/* Maximized Terminal Window */}
            <div className="w-full h-full md:h-[95vh] md:w-[95vw] bg-black md:rounded-lg shadow-2xl overflow-hidden border border-neutral-800 flex flex-col">

                {/* MacOS Terminal Header (Monochrome) */}
                <div className="bg-neutral-900 px-4 py-3 flex items-center gap-2 border-b border-neutral-800">
                    <div className="w-3 h-3 rounded-full bg-neutral-600"></div>
                    <div className="w-3 h-3 rounded-full bg-neutral-600"></div>
                    <div className="w-3 h-3 rounded-full bg-neutral-600"></div>
                    <div className="flex-1 text-center text-neutral-500 text-xs font-sans tracking-wide">roshan — -zsh — 120x40</div>
                </div>

                {/* Terminal Content */}
                <div className="flex-1 p-6 md:p-10 text-neutral-200 font-mono overflow-y-auto">

                    {/* History of typed lines */}
                    {lines.map((line, index) => (
                        <div key={index} className="mb-4">
                            <span className="text-neutral-500 mr-3">➜</span>
                            <span className="text-neutral-500 mr-3">~</span>
                            <span className="text-white">{line}</span>
                        </div>
                    ))}

                    {/* Current typing line (if not downloading yet and not waiting) */}
                    {!showDownload && !waitingForUser && (
                        <div className="mb-4">
                            <span className="text-neutral-500 mr-3">➜</span>
                            <span className="text-neutral-500 mr-3">~</span>
                            <span className="text-white">{currentLine}</span>
                            <span className="animate-pulse inline-block w-2.5 h-5 bg-white align-middle ml-1"></span>
                        </div>
                    )}

                    {/* User Interaction Prompt */}
                    {waitingForUser && (
                        <div className="mb-4 mt-8">
                            <div className="text-neutral-400 mb-4">Continue to portfolio?</div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setUserProceeded(true)}
                                    className="px-6 py-2 border border-neutral-600 hover:bg-neutral-800 hover:border-neutral-400 text-white transition-colors duration-200"
                                >
                                    [Y] Yes
                                </button>
                                <button
                                    onClick={() => {
                                        // Optional: Handle "No" case, maybe just stay or show a message
                                        alert("Session terminated. (Just kidding, click Yes!)");
                                    }}
                                    className="px-6 py-2 border border-neutral-800 text-neutral-600 hover:text-neutral-400 transition-colors duration-200"
                                >
                                    [N] No
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Download Progress */}
                    {showDownload && (
                        <div className="mt-8 text-white max-w-2xl">
                            <div className="mb-2 text-neutral-400">Downloading assets...</div>
                            <div className="w-full bg-neutral-800 h-6 rounded-sm overflow-hidden border border-neutral-700">
                                <div
                                    className="h-full bg-white transition-all duration-75 ease-out"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="mt-2 text-sm text-neutral-500 font-mono flex justify-between">
                                <span>{progress}% Complete</span>
                                <span>[{progress === 100 ? "DONE" : "LOADING"}]</span>
                            </div>

                            {progress === 100 && (
                                <div className="mt-4 text-white animate-pulse">
                                    &gt; Launching interface...
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
