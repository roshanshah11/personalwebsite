"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const leadership = [
    {
        title: "Economics Club",
        role: "President",
        desc: "NJ State Champions, National Finalists"
    },
    {
        title: "Investment Club",
        role: "President",
        desc: "Wharton Investment Comp Semifinals"
    }
];

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
                    {/* Leadership */}
                    <div>
                        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">
                            Leadership
                        </h3>
                        <div className="space-y-3">
                            {leadership.map((item, i) => (
                                <div key={i}>
                                    <p className="text-sm font-medium text-white">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.role} — {item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div data-tour="contact">
                        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">
                            Contact
                        </h3>
                        <div className="space-y-2">
                            <a href="mailto:roshah@unc.edu" className="block text-sm text-gray-400 hover:text-white transition-colors">
                                roshah@unc.edu
                            </a>
                            <a href="https://linkedin.com/in/roshan-shah11" target="_blank" className="block text-sm text-gray-400 hover:text-white transition-colors">
                                LinkedIn
                            </a>
                            <a href="https://github.com/roshanshah11" target="_blank" className="block text-sm text-gray-400 hover:text-white transition-colors">
                                GitHub
                            </a>
                        </div>
                    </div>

                    {/* Branding */}
                    <div>
                        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">
                            Built With
                        </h3>
                        <p className="text-xs text-gray-500">
                            Next.js · Three.js · Framer Motion
                        </p>
                        <p className="text-xs text-gray-600 mt-4">
                            © 2025 Roshan Shah
                        </p>
                    </div>
                </div>

                {/* Quote at Bottom */}
                <div className="mt-16 pt-8 border-t border-white/5">
                    <motion.p
                        className="text-base md:text-lg text-white text-center italic"
                        style={{ fontFamily: "'Georgia', 'Times New Roman', cursive" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        "There is nothing so practical as a good theory." — Kurt Lewin
                    </motion.p>
                </div>
            </div>
        </motion.footer>
    );
}
