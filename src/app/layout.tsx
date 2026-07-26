import type { Metadata } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import "./globals.css";

import ResumeDownload from "@/components/ResumeDownload";
import SmoothScroll from "@/components/SmoothScroll";

import { TerminalProvider } from "@/context/TerminalContext";
import GlobalBackground from "@/components/GlobalBackground";
import { TourWrapper } from "@/components/Tour";


// Archivo carries the whole proportional voice. Its width axis (62-125) is what
// makes a second display family unnecessary: the hero name runs expanded like a
// nameplate, body copy runs at normal width, same skeleton throughout.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Martian Mono appears only in small uppercase labels, run condensed (wdth 87.5)
// so tracked caps stay compact instead of sprawling.
const martianMono = Martian_Mono({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-martian-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roshan Shah — Finance + AI",
  description: "Economics student at UChicago building across finance, AI, aerospace, and simulation software. Summer analyst at Blue Oak Group. Interested in robotics, drone tech, and trading.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variables must live on <html>, not <body>. Tailwind declares
    // --font-sans on :root; if the next/font variables sat one level lower the
    // var() inside it would be unresolvable at that point and the whole token
    // would compute to the guaranteed-invalid value, silently falling back to
    // system-ui.
    <html lang="en" className={`dark ${archivo.variable} ${martianMono.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-background-dark text-text-main font-sans selection:bg-primary/30 selection:text-white">
        <TerminalProvider>
          <SmoothScroll>
            <TourWrapper>
              <GlobalBackground />
              {children}
              <ResumeDownload />
            </TourWrapper>
          </SmoothScroll>
        </TerminalProvider>
      </body>
    </html>
  );
}
