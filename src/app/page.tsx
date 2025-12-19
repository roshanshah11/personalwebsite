"use client";

import SmoothScroll from "@/components/SmoothScroll";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectCarousel3D from "@/components/ProjectCarousel3D";
import AwardsHoverPreview from "@/components/AwardsHoverPreview";
import FooterSection from "@/components/FooterSection";
import ClickEffect from "@/components/ClickEffect";
import ScrollProgress from "@/components/ScrollProgress";
import ShaderBackground from "@/components/ShaderBackground";

export default function Home() {
  return (
    <SmoothScroll>
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
          <ExperienceSection />

          {/* New 3D Carousel Section */}
          <section className="py-20 relative z-10">
            <ProjectCarousel3D />
          </section>

          {/* New Awards Hover Section */}
          <AwardsHoverPreview />

          <FooterSection />
        </div>
      </main>
    </SmoothScroll>
  );
}
