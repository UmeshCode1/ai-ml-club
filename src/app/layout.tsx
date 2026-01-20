import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/layout/command-palette";
import { PreLoader } from "@/components/layout/pre-loader";
import { Providers } from "@/components/layout/providers";
import { GlobalBackground } from "@/components/layout/global-background";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";
import { AppwritePing } from "@/components/layout/appwrite-ping";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "AIML Club OCT - AI & Machine Learning Club | Bhopal",
    template: `%s | AIML Club OCT`,
  },
  description: "AIML Club OCT (AI & Machine Learning Club) at Oriental College of Technology, Bhopal. India's leading student-driven AI ecosystem for workshops, hackathons, and real-world AI/ML projects. Join AIML Club OCT community today!",
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: "AIML Club OCT",
  publisher: "AIML Club",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: "AIML Club - AI & Machine Learning Club | OCT Bhopal",
    description: "AIML Club - India's leading student-driven AI & Machine Learning ecosystem at Oriental College of Technology, Bhopal. Join workshops, hackathons, and real-world AI projects.",
    siteName: "AIML Club",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "AIML Club - AI & Machine Learning Club OCT Bhopal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIML Club - AI & Machine Learning Club",
    description: "AIML Club at OCT Bhopal - India's leading student AI community",
    images: [siteConfig.ogImage],
    creator: "@aimlcluboct",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/aiml-club-logo-new.png", type: "image/png" },
    ],
    shortcut: "/aiml-club-logo-new.png",
    apple: "/aiml-club-logo-new.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, jetbrainsMono.variable, spaceGrotesk.variable, "bg-background text-foreground antialiased selection:bg-[#D4FF00] selection:text-black")}>
        <SmoothScroll>
          <Providers>
            <AppwritePing />
            <GlobalBackground />
            <PreLoader />
            <CommandPalette />
            <MagneticCursor />
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </Providers>
        </SmoothScroll>
      </body>
    </html>
  );
}
