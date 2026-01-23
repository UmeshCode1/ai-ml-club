import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/layout/providers";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/layout/command-palette";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";
import { AppwritePing } from "@/components/layout/appwrite-ping";
import { GlobalScrollProgress } from "@/components/layout/global-scroll-progress";
import { RouteTransition } from "@/components/layout/route-transition";
import { PreLoader } from "@/components/layout/pre-loader";
import { GlobalBackground } from "@/components/layout/global-background";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "AI & Machine Learning Club | Oriental College of Technology",
    template: "%s | AI & Machine Learning Club",
  },
  description: "Official club of Oriental College of Technology, Bhopal, focused on Artificial Intelligence and Machine Learning exploration, education, and community building.",
  keywords: ["AI", "ML", "Artificial Intelligence", "Machine Learning", "Data Science", "Bhopal", "OCT", "College Club"],
  authors: [{ name: "Umesh Patel", url: "https://github.com/Umesh-Patel-1" }],
  creator: "Umesh Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aimlclub.in",
    title: "AI & Machine Learning Club",
    description: "Official club of Oriental College of Technology, Bhopal",
    siteName: "AI & Machine Learning Club",
    images: [
      {
        url: "/aiml-club-logo-new.png",
        width: 512,
        height: 512,
        alt: "AIML Club Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Machine Learning Club",
    description: "Official club of Oriental College of Technology, Bhopal",
    creator: "@Umesh_Patel_1",
    images: ["/aiml-club-logo-new.png"],
  },
  icons: {
    icon: [
      { url: "/aiml-club-logo-new.png", type: "image/png" },
    ],
    apple: [
      { url: "/aiml-club-logo-new.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={cn(
        "min-h-screen font-sans antialiased bg-[var(--background)] overflow-x-hidden relative",
        inter.variable,
        jetbrainsMono.variable
      )}>
        <Providers>
          <GlobalScrollProgress />
          <SmoothScroll>
            {/* Global Holographic Noise Texture */}
            <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('/noise.png')] bg-repeat" />

            <AppwritePing />
            <ScrollToTop />
            <PreLoader />
            <GlobalBackground />
            <Navbar />

            <main className="relative min-h-screen">
              <RouteTransition>
                {children}
              </RouteTransition>
            </main>

            <Footer />
            <CommandPalette />
            <MagneticCursor />
          </SmoothScroll>
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
