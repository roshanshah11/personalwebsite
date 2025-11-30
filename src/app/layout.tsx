import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CommandBar from "@/components/CommandBar";
import ResumeDownload from "@/components/ResumeDownload";
import { TerminalProvider } from "@/context/TerminalContext";


const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roshan Shah - Quantitative Finance + AI Research",
  description: "Business + Data Science student at UNC Chapel Hill focused on quantitative finance, volatility modeling, and building products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background-dark text-text-main font-sans selection:bg-primary/30 selection:text-white`}>
        <TerminalProvider>
          {children}
          <ResumeDownload />
          <div className="fixed bottom-0 left-0 right-0 z-50">
            <CommandBar />
          </div>
        </TerminalProvider>
      </body>
    </html>
  );
}
