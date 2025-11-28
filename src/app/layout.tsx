import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CommandBar from "@/components/CommandBar";
import ResumeDownload from "@/components/ResumeDownload";
import { TerminalProvider } from "@/context/TerminalContext";


const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
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
      <body className={`${ibmPlexMono.variable} antialiased`}>
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
