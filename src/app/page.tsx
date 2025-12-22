"use client";



import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import AwardsHoverPreview from "@/components/AwardsHoverPreview";
import FooterSection from "@/components/FooterSection";
import ClickEffect from "@/components/ClickEffect";
import ScrollProgress from "@/components/ScrollProgress";
import ShaderBackground from "@/components/ShaderBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white selection:bg-amber-500/20">
      {/* Scroll progress indicator */}
      <ScrollProgress />
      <ShaderBackground />

      {/* Click effect overlay */}
      <ClickEffect />

      {/* Content sections - continuous scroll */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <WorkSection />

        {/* New Awards Hover Section */}
        <AwardsHoverPreview />

        <FooterSection />
      </div>
    </main>
  );
}
