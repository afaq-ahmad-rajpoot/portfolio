import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Nav from "@/components/ui/Nav";
import StatusBar from "@/components/ui/StatusBar";
import PageTransition from "@/components/ui/PageTransition";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackgroundGrid from "@/components/ui/BackgroundGrid";
import BootSequence from "@/components/ui/BootSequence";
import Konami from "@/components/ui/Konami";

export const metadata: Metadata = {
  title: "Afaq Ahmad :: Full Stack Developer",
  description:
    "Afaq Ahmad — Full Stack Developer based in Faisalabad, Pakistan. Next.js, React, TypeScript, FastAPI, Python. Building systems that scale, interfaces that feel.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Afaq Ahmad :: Full Stack Developer",
    description: "Building systems that scale, interfaces that feel.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="scanlines">
        <BackgroundGrid />
        <Cursor />
        <ScrollProgress />
        <Konami />
        <BootSequence />
        <SmoothScroll>
          <Nav />
          <main className="relative z-10 min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <StatusBar />
        </SmoothScroll>
      </body>
    </html>
  );
}
