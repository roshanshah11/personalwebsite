"use client";

import { motion } from "framer-motion";

/**
 * Portrait.
 *
 * Was a rounded-3xl square with a cyan scan line sweeping down it, an RGB glitch
 * flicker on hover, and a blurred cyan-to-gold glow bleeding out behind — three
 * separate effects, none of which the photograph needed, all of which announced
 * themselves before the face did.
 *
 * It is now squared off inside a hairline rule, in full colour, so it reads as a
 * photograph on the page rather than as an effect. The only treatment left is a
 * touch of contrast and saturation, which is grading, not a filter.
 */
export default function ProfileImage3D() {
    return (
        <motion.figure
            className="relative w-full max-w-[264px] mx-auto lg:mx-0 m-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
        >
            <div
                className="relative aspect-[4/5] overflow-hidden border border-rule"
                style={{ backgroundColor: "#0B1220" }}
            >
                <img
                    src="/profile.jpeg"
                    alt="Roshan Shah"
                    className="w-full h-full object-cover"
                    style={{
                        objectPosition: "28% 8%",
                        transform: "scale(1.28)",
                        transformOrigin: "center 15%",
                        filter: "contrast(1.04) saturate(1.02)",
                    }}
                />
            </div>
        </motion.figure>
    );
}
