"use client";

import { useEffect } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {

        // Skip smooth scroll on mobile for better performance
        const isMobile = window.innerWidth < 768 ||
            ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0);

        if (isMobile) return;

        // Dynamic import Lenis only when needed
        let lenis: InstanceType<typeof import('lenis').default> | null = null;
        let rafId: number;

        import('lenis').then((Lenis) => {
            lenis = new Lenis.default({
                duration: 1.2, // Reduced from 1.5 for snappier feel
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            });

            function raf(time: number) {
                lenis?.raf(time);
                rafId = requestAnimationFrame(raf);
            }

            rafId = requestAnimationFrame(raf);
        });

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            lenis?.destroy();
        };
    }, []);

    return <>{children}</>;
}

