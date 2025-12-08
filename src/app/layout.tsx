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
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: "AIML Club OCT",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@aimlcluboct",
  },
  icons: {
    icon: "/aiml-club-logo-new.png",
    shortcut: "/aiml-club-logo-new.png",
    apple: "/aiml-club-logo-new.png",
  },
  metadataBase: new URL(siteConfig.url),
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
            <GlobalBackground />
            <PreLoader />
            <CommandPalette />
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
