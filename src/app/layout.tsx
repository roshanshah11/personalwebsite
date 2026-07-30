import type { Metadata } from "next";
import { Bodoni_Moda, EB_Garamond, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

import ResumeDownload from "@/components/ResumeDownload";
import SmoothScroll from "@/components/SmoothScroll";

import { TerminalProvider } from "@/context/TerminalContext";
import GlobalBackground from "@/components/GlobalBackground";
import { TourWrapper } from "@/components/Tour";


// Three faces from one period argument, not three faces chosen for contrast.
//
// Bodoni Moda is a Didone: hairline serifs, extreme stroke contrast, the letter
// shapes cut for copperplate title pages. It carries the name and every heading
// and does nothing else — at label size its thins disappear.
//
// EB Garamond does all the reading, and it is here specifically for its oldstyle
// figures. On a page full of years and GPAs, lining numerals sit at cap height
// and shout; oldstyle numerals have ascenders and descenders and sit in the line
// like the letters around them, so 3.92 reads as prose rather than as data.
//
// Cormorant Garamond is a display Garamond — much lighter, much sharper, and it
// falls apart below about 16px, which is exactly why it is confined to the large
// italic subtitles and captions where that delicacy is the point.
//
// Notably absent: any monospace. Tracked-out uppercase mono was the single
// loudest generic-template tell on the old page, used in nine separate places.
// Each family requests only the styles actually referenced. Declaring both
// normal and italic on all three preloaded six webfont files to use three:
// nothing sets Bodoni or Garamond italic, and Cormorant is only ever italic
// (.t-quote, .t-gloss). next/font preloads by default, so those were three
// unused files on the critical path of a page that also boots a WebGL scene.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal"],
  // Bodoni Moda is optical-size variable (opsz 6–96). Without asking for the
  // axis, next/font pins it at the 11pt text master and `font-optical-sizing:
  // auto` on .t-display silently does nothing — so the hero name at up to 128px
  // renders with text-weight hairlines, on the one face whose entire character
  // is the contrast between hairline and stem.
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-garamond",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
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
    <html lang="en" className={`dark ${bodoni.variable} ${garamond.variable} ${cormorant.variable}`} suppressHydrationWarning>
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
