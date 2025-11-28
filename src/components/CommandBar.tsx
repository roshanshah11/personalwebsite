"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTerminal } from '../context/TerminalContext';
import { useRouter, usePathname } from 'next/navigation';

const CommandBar = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const { navigate } = useTerminal();
    const router = useRouter(); // Keep router for direct non-animated navigation if needed, or for 'home' command logic
    const pathname = usePathname();

    useEffect(() => {
        const transitions: Record<string, { loading: string, done: string }> = {
            '/': { loading: 'RETURNING TO HOME...', done: 'RETURNED TO HOME' },
            '/intro': { loading: 'INITIATING SEQUENCE TO INTRO...', done: 'NAVIGATION COMPLETE: INTRO' },
            '/projects': { loading: 'INITIATING SEQUENCE TO PROJECTS...', done: 'NAVIGATION COMPLETE: PROJECTS' },
            '/awards': { loading: 'INITIATING SEQUENCE TO AWARDS...', done: 'NAVIGATION COMPLETE: AWARDS' },
            '/contact': { loading: 'INITIATING SEQUENCE TO CONTACT...', done: 'NAVIGATION COMPLETE: CONTACT' },
            '/experience': { loading: 'INITIATING SEQUENCE TO EXPERIENCE...', done: 'NAVIGATION COMPLETE: EXPERIENCE' },
        };

        const current = transitions[pathname || ''];
        if (current && output === current.loading) {
            const timer = setTimeout(() => {
                setOutput(current.done);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [pathname, output]);

    const handleCommand = (cmd: string) => {
        const parts = cmd.trim().split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        switch (command) {
            case 'help':
                setOutput('AVAILABLE COMMANDS: HELP, [PAGE], LS, CLEAR, HOME');
                break;
            case 'ls':
                setOutput('PAGES: HOME, INTRO, EXPERIENCE, PROJECTS, AWARDS, CONTACT');
                break;
            case 'goto':
            case 'cd':
                if (args.length > 0) {
                    const page = args[0].toLowerCase();
                    if (['contact', 'experience', 'projects', 'awards', 'intro'].includes(page)) {
                        navigate(`/${page}`);
                        setOutput(`INITIATING SEQUENCE TO ${page.toUpperCase()}...`);
                    } else if (page === 'home' || page === '/') {
                        navigate('/');
                        setOutput('RETURNING TO HOME...');
                    } else {
                        setOutput(`ERROR: PAGE '${page}' NOT FOUND`);
                    }
                } else {
                    setOutput('USAGE: [PAGE] OR GOTO [PAGE]');
                }
                break;
            case 'home':
                navigate('/');
                setOutput('RETURNING TO HOME...');
                break;
            case 'intro':
                navigate('/intro');
                setOutput('INITIATING SEQUENCE TO INTRO...');
                break;
            case 'projects':
                navigate('/projects');
                setOutput('INITIATING SEQUENCE TO PROJECTS...');
                break;
            case 'awards':
                navigate('/awards');
                setOutput('INITIATING SEQUENCE TO AWARDS...');
                break;
            case 'contact':
                navigate('/contact');
                setOutput('INITIATING SEQUENCE TO CONTACT...');
                break;
            case 'experience':
                navigate('/experience');
                setOutput('INITIATING SEQUENCE TO EXPERIENCE...');
                break;
            case 'clear':
                setOutput('');
                break;
            case '':
                break;
            default:
                // Check if the command matches a page name directly
                if (['contact', 'experience', 'projects', 'awards', 'intro'].includes(command)) {
                    navigate(`/${command}`);
                    setOutput(`INITIATING SEQUENCE TO ${command.toUpperCase()}...`);
                } else {
                    setOutput(`ERROR: COMMAND '${command}' NOT RECOGNIZED`);
                }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    // Auto-focus on mount and add global keyboard shortcut
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            // Focus on '/' or 'Ctrl+K'
            if (e.key === '/' || (e.ctrlKey && e.key === 'k')) {
                // Prevent default only if we're not already in an input
                if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    inputRef.current?.focus();
                }
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

    return (
        <div className="w-full bg-background-light border-b border-primary/20 px-4 py-2 flex flex-col md:flex-row items-center gap-4 text-sm font-mono z-40 shadow-md">
            <div className="flex-grow flex items-center w-full md:w-auto">
                <span className="text-primary font-bold mr-3 text-glow whitespace-nowrap">COMMAND &gt;</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value.toUpperCase())}
                    onKeyDown={handleKeyDown}
                    className="bg-background-dark border border-primary/30 text-white flex-grow uppercase placeholder-white/20 font-medium px-2 py-1 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                    placeholder="TYPE 'HELP' FOR COMMANDS..."
                    autoFocus
                />
            </div>

            {output && (
                <div className="text-accent-amber text-xs md:text-sm animate-slide-up whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] md:max-w-md">
                    {output}
                </div>
            )}

            <div className="hidden md:flex items-center gap-4 text-xs font-medium text-text-muted whitespace-nowrap">
                <span>QUICK: HELP | HOME | INTRO | EXPERIENCE | PROJECTS | AWARDS | CONTACT</span>
            </div>
        </div>
    );
};

export default CommandBar;
