"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    // Only render once the document can actually scroll.
    //
    // framer's progress helper returns 1, not 0, when the range it is
    // measuring has zero length (`to - from === 0 ? 1 : ...`). So on any page
    // shorter than the viewport, scrollYProgress is 1 from the first frame and
    // the bar paints permanently, fully complete — a "you have read
    // everything" signal on a page with nothing to read past. Starting at
    // false also avoids a flash of full bar before the first measurement.
    const [isScrollable, setIsScrollable] = useState(false);

    useEffect(() => {
        const el = document.documentElement;
        const measure = () => setIsScrollable(el.scrollHeight > el.clientHeight + 1);

        measure();
        window.addEventListener("resize", measure);
        // Content can grow after mount (images, lazy sections, the tour), so
        // watch the document rather than measuring once.
        const observer = new ResizeObserver(measure);
        observer.observe(el);

        return () => {
            window.removeEventListener("resize", measure);
            observer.disconnect();
        };
    }, []);

    if (!isScrollable) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-cyan-400 to-amber-500 origin-left z-50"
            style={{ scaleX: scrollYProgress }}
        />
    );
}
