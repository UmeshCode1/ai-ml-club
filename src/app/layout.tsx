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
  // JSON-LD Organization Schema for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://aimlclub.tech/#organization",
    "name": "AI & Machine Learning Club - OCT",
    "alternateName": ["AIML Club", "AIML Club OCT", "AI ML Club", "AIML Club Bhopal"],
    "url": "https://aimlclub.tech",
    "logo": "https://aimlclub.tech/aiml-club-logo-new.png",
    "description": "AIML Club OCT - India's leading student-driven AI ecosystem at Oriental College of Technology, Bhopal.",
    "email": "aimlcluboct@gmail.com",
    "telephone": "+91-6299200082",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Oriental College of Technology",
      "addressLocality": "Bhopal",
      "addressRegion": "Madhya Pradesh",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.linkedin.com/company/aimlcluboct",
      "https://github.com/aimlcluboct",
      "https://www.instagram.com/aimlcluboct",
      "https://www.instagram.com/photopia_",
      "https://www.commudle.com/communities/ai-ml-club",
      "https://linktr.ee/aimlcluboct",
      "https://whatsapp.com/channel/0029VbAthv38V0tfulumuV1D",
      "https://info.aimlclub.tech",
      "https://codify.aimlclub.tech",
      "https://social.aimlclub.tech"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
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
