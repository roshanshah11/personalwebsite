"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ProfileImage3D from "./ProfileImage3D";

const education = [
    {
        school: "The University of Chicago",
        program: "BA Economics + Data Science spec",
        degree: "Minor: Entrepreneurship & Innovation (Sep 2026–2029)",
        details: "Formerly UNC Kenan-Flagler Business School (4.0 GPA, Honors Carolina)"
    },
    {
        school: "The Lawrenceville School",
        program: "High School (GPA 3.92/4.00)",
        details: "Herman Hollerith Prize, Cum Laude Society, McClellan Society"
    }
];

const skills = {
    languages: ["Python", "Swift", "JS/TS", "SQL"],
    skills: [
        "DCF / Comps",
        "Equity Research",
        "Venture Diligence",
        "AI / Technical Systems",
        "PCB",
        "KiCad",
        "SolidWorks",
        "Fusion360",
        "soldering"
    ],
    interests: ["Robotics", "Drone Tech", "Trading", "Poker", "Football", "Traveling", "Reading", "AI governance", "Tabla", "Photography"]
};

export default function AboutSection() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const timer = window.setTimeout(() => setIsMounted(true), 0);
        return () => window.clearTimeout(timer);
    }, []);
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const textX = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    return (
        <section id="about" ref={sectionRef} data-tour="about" className="py-16 px-4 relative">
            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-12 items-start">
                    {/* Left: portrait, then the contact list beneath it. The links
                        used to sit at the bottom of the right-hand column, which
                        left the whole left column empty below the photograph —
                        about six hundred pixels of nothing on a desktop. Moving
                        them here fills that column and puts the plate portrait and
                        the ways to reach the person in it side by side. */}
                    <motion.div
                        className="order-1 lg:col-start-1 lg:row-start-1 lg:col-span-3"
                        style={isMounted ? { scale: imageScale, opacity: textOpacity } : {}}
                    >
                        <ProfileImage3D />
                    </motion.div>

                    {/* Contact. Explicitly ordered rather than left to source order:
                        stacked on a phone the whole left column comes first, which
                        would have put five links above the sentence explaining who
                        they belong to. Third on mobile, second on desktop. */}
                    <motion.nav
                        className="order-3 lg:order-none lg:col-start-1 lg:row-start-2 lg:col-span-3 lg:mt-7 border-t border-rule pt-4 max-w-[264px] mx-auto lg:mx-0 w-full"
                        style={isMounted ? { opacity: textOpacity } : {}}
                    >
                        <p className="t-label text-faint mb-1.5">Reach</p>
                        <ul className="list-none">
                            {[
                                { label: "UChicago Email", href: "mailto:rashah@uchicago.edu" },
                                { label: "Gmail", href: "mailto:roshah2007@gmail.com" },
                                { label: "LinkedIn", href: "https://www.linkedin.com/in/roshan-shah11/", external: true },
                                { label: "GitHub", href: "https://github.com/roshanshah11", external: true },
                                { label: "Resume", href: "/roshan_shah_resume.pdf", external: true, note: "pdf" },
                            ].map(({ label, href, external, note }) => (
                                <li key={label} className="border-b border-hair last:border-b-0">
                                    <a
                                        href={href}
                                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                        // Colour alone is not a focus indicator:
                                        // it is invisible to anyone with a colour
                                        // vision deficiency and easy to lose on a
                                        // dim screen. The ring is kept and tuned
                                        // to the palette rather than suppressed.
                                        className="t-body flex items-baseline gap-2 py-1.5 text-ink/85 transition-colors hover:text-brass focus-visible:text-brass focus-visible:outline focus-visible:outline-1 focus-visible:outline-brass focus-visible:outline-offset-4"
                                    >
                                        {label}
                                        {note && <span className="t-gloss text-faint text-[0.85rem] ml-auto">{note}</span>}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.nav>

                    {/* Right: Bio Content */}
                    <motion.div
                        className="order-2 lg:order-none lg:col-start-4 lg:row-start-1 lg:row-span-2 lg:col-span-9 space-y-8"
                        style={isMounted ? { x: textX, opacity: textOpacity } : {}}
                    >
                        {/* Bio — short on every screen. The name used to be amber
                            and bold; at Garamond's stroke contrast a colour swap
                            alone carries the emphasis, and it keeps the accent
                            budget for the one place it earns its keep. */}
                        <div className="space-y-5">
                            <p className="t-body measure text-ink/85 text-[clamp(1.09rem,1.5vw,1.22rem)]">
                                hey, i'm <span className="text-ink">roshan</span>. sophomore at uchicago studying econ, interested in aerospace, simulation, and the technical side of investing at blue oak.
                            </p>

                            {/* Focus + personality chips — mobile only. Rounded pills
                                in two competing accents became a ruled inline list:
                                same terms, same order, no containers. */}
                            <ul className="flex flex-wrap items-baseline gap-x-4 gap-y-1 md:hidden border-t border-hair pt-3 list-none">
                                {[
                                    { label: "robotics", lead: true },
                                    { label: "drone tech", lead: true },
                                    { label: "trading", lead: true },
                                    { label: "finance + ai", lead: false },
                                    { label: "tabla", lead: false },
                                    { label: "poker", lead: false },
                                ].map(({ label, lead }) => (
                                    <li
                                        key={label}
                                        className={`t-tag flex items-baseline gap-1.5 ${lead ? "text-ink" : "text-dim"}`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`text-[0.45em] -translate-y-[0.25em] ${lead ? "text-brass" : "text-faint"}`}
                                        >
                                            ●
                                        </span>
                                        {label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Education. Two rounded, bordered, tinted cards became two
                            columns off a single rule, divided by one hairline. The
                            grouping was never coming from the boxes — it was coming
                            from the fact that they sit side by side. */}
                        <div
                            data-tour="education"
                            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 border-t border-rule pt-4"
                        >
                            {education.map((edu, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={i > 0 ? "md:pl-8 lg:pl-12 md:border-l md:border-hair" : ""}
                                >
                                    <p className="t-label text-faint mb-1.5">{i === 0 ? "Present" : "Prior"}</p>
                                    <h4 className="t-title text-ink">{edu.school}</h4>
                                    <p className="t-gloss text-dim text-[1.02rem] mt-1">{edu.program}</p>
                                    {edu.degree && <p className="t-meta text-ink/70 mt-2.5">{edu.degree}</p>}
                                    {edu.details && <p className="t-meta text-faint mt-1">{edu.details}</p>}
                                </motion.div>
                            ))}
                        </div>

                        {/* Skills Grid — desktop only; mobile uses the list above.
                            Headings used to render the raw object keys verbatim,
                            lowercase and unstyled; they are titled here instead.
                            The markers are weighted: brass for what you lead
                            with, faint for the rest. */}
                        <div
                            data-tour="skills"
                            className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-x-8 lg:gap-x-12 border-t border-rule pt-4"
                        >
                            {([
                                ["Languages", skills.languages, 2],
                                ["Skills", skills.skills, 3],
                                ["Interests", skills.interests, 3],
                            ] as const).map(([heading, items, lead], i) => (
                                <motion.div
                                    key={heading}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className={i > 0 ? "md:pl-8 lg:pl-12 md:border-l md:border-hair" : ""}
                                >
                                    <h4 className="t-label text-faint mb-2">{heading}</h4>
                                    <ul className="list-none">
                                        {items.map((item, j) => (
                                            <li
                                                key={item}
                                                className={`t-tag flex items-baseline gap-2 ${j < lead ? "text-ink" : "text-ink/80"}`}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={`shrink-0 -translate-y-[0.25em] ${j < lead ? "text-brass text-[0.5em]" : "text-faint text-[0.42em]"}`}
                                                >
                                                    ●
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
