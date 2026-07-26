"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const openTo = ["Public markets", "Venture capital", "Finance + AI", "Technical systems", "Investing"];

export default function FooterSection() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

    return (
        <motion.footer
            ref={sectionRef}
            data-tour="footer"
            className="py-20 px-4 border-t border-white/5"
            style={isMounted ? { opacity, y } : {}}
        >
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {/* Open To */}
                    <div>
                        <h3 className="t-label text-amber-400 mb-4">
                            Open To
                        </h3>
                        <div className="space-y-3">
                            {openTo.map((item, i) => (
                                <div key={i}>
                                    <p className="t-meta font-medium text-white">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                        <div data-tour="contact">
                            <h3 className="t-label text-amber-400 mb-4">
                                Contact
                            </h3>
                            <div className="space-y-2">
                                <a href="mailto:rashah@uchicago.edu" className="block t-meta font-semibold text-amber-400 hover:text-amber-300 transition-colors">
                                    rashah@uchicago.edu (Primary)
                                </a>
                                <a href="mailto:roshah2007@gmail.com" className="block t-meta text-gray-400 hover:text-white transition-colors">
                                    roshah2007@gmail.com
                                </a>
                                <a href="https://linkedin.com/in/roshan-shah11" target="_blank" className="block t-meta text-gray-400 hover:text-white transition-colors">
                                    LinkedIn
                                </a>
                                <a href="https://github.com/roshanshah11" target="_blank" className="block t-meta text-gray-400 hover:text-white transition-colors">
                                    GitHub
                                </a>
                            </div>
                        </div>

                    {/* Branding */}
                    <div>
                        <h3 className="t-label text-amber-400 mb-4">
                            Built With
                        </h3>
                        <p className="t-tag text-gray-500">
                            Next.js · Three.js · Framer Motion · GSAP · Lenis
                        </p>
                        <p className="t-tag text-gray-500 mt-4">
                            Star positions from the{" "}
                            <a
                                href="https://codeberg.org/astronexus/hyg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-dotted hover:text-gray-400 transition-colors"
                            >
                                HYG database
                            </a>
                            , CC BY-SA 4.0
                        </p>
                        <p className="t-tag text-gray-500 mt-4">
                            © 2024-present Roshan Shah
                        </p>
                    </div>
                </div>

                {/* Quote at Bottom */}
                <div className="mt-16 pt-8 border-t border-white/5">
                    {/* Pull quote. The one place a third face is allowed: a serif
                        italic marks these as borrowed words, not the site's own
                        voice. The attribution steps down to a label. */}
                    <motion.blockquote
                        className="text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="t-quote max-w-[34ch] mx-auto text-white/90">
                            There is nothing so practical as a good theory.
                        </p>
                        <footer className="t-label text-gray-500 mt-3">Kurt Lewin</footer>
                    </motion.blockquote>
                </div>
            </div>
        </motion.footer>
    );
}
