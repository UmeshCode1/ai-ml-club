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
import { ThemeColorUpdater } from "@/components/layout/theme-color-updater";
import { ScrollToTop } from "@/components/layout/scroll-to-top";


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
  description: "The premier offline community for AI & Machine Learning at Oriental College of Technology, Bhopal. Focused on on-campus learning, workshops, and student innovation.",
  keywords: ["AI", "ML", "Artificial Intelligence", "Machine Learning", "Data Science", "Bhopal", "OCT", "College Club"],
  authors: [{ name: "Umesh Patel", url: "https://github.com/UmeshCode1" }],
  creator: "Umesh Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aimlclub.tech",
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/aiml-club-logo-new.png", type: "image/png" },
    ],
    apple: [
      { url: "/pwa-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AIML Club",
  },
};

export const viewport: Viewport = {
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = theme === 'dark' || (theme === 'system' && supportDarkMode) || (!theme && supportDarkMode);
                  const color = isDark ? '#050505' : '#F8FAFC';
                  
                  // Inject theme-color
                  let meta = document.querySelector('meta[name="theme-color"]');
                  if (!meta) {
                    meta = document.createElement('meta');
                    meta.name = 'theme-color';
                    document.head.appendChild(meta);
                  }
                  meta.content = color;
                  
                  // Force black-translucent for edge-to-edge blending
                  let appleMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
                  if (!appleMeta) {
                    appleMeta = document.createElement('meta');
                    appleMeta.name = 'apple-mobile-web-app-status-bar-style';
                    document.head.appendChild(appleMeta);
                  }
                  appleMeta.content = 'black-translucent';
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className={cn(
        "min-h-screen font-sans antialiased bg-[var(--background)] overflow-x-hidden relative",
        inter.variable,
        jetbrainsMono.variable
      )}>
        <Providers>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(function(reg) {
                      // Check for updates whenever the app is brought to foreground
                      document.addEventListener('visibilitychange', () => {
                        if (document.visibilityState === 'visible') {
                          reg.update();
                        }
                      });

                      // Periodic check every 1 hour
                      setInterval(() => {
                        reg.update();
                      }, 3600000);
                    });
                  });

                  // Automatically reload when a new service worker takes control
                  let refreshing = false;
                  navigator.serviceWorker.addEventListener('controllerchange', () => {
                    if (!refreshing) {
                      refreshing = true;
                      window.location.reload();
                    }
                  });
                }
              `,
            }}
          />
          <GlobalScrollProgress />
          <SmoothScroll>
            {/* Global Holographic Noise Texture */}
            <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('/noise.png')] bg-repeat" />

            <AppwritePing />
            {/* <InstallPWA /> Removed per user request */}
            <ScrollToTop />
            <PreLoader />
            <GlobalBackground />
            <ThemeColorUpdater />
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
        </Providers>
      </body>
    </html>
  );
}
