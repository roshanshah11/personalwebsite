"use client";

import dynamic from "next/dynamic";

// Dynamic import for ShaderBackground to avoid SSR issues with Three.js
const ShaderBackground = dynamic(
    () => import("@/components/ShaderBackground"),
    { ssr: false }
);

export default function GlobalBackground() {
    return <ShaderBackground />;
}
