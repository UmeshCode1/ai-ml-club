"use client";

import { useState, useEffect } from "react";

export function useStandalone() {
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if running in standalone mode (PWA/TWA)
        const checkStandalone = () => {
            const isStandaloneMode =
                window.matchMedia("(display-mode: standalone)").matches ||
                (window.navigator as any).standalone === true ||
                document.referrer.includes("android-app://"); // For TWA if needed

            setIsStandalone(isStandaloneMode);
        };

        checkStandalone();

        // Listen for changes (adaptive)
        const mediaQuery = window.matchMedia("(display-mode: standalone)");
        const handleChange = (e: MediaQueryListEvent) => setIsStandalone(e.matches);

        try {
            mediaQuery.addEventListener("change", handleChange);
        } catch (e) {
            // Safari < 14 support
            mediaQuery.addListener(handleChange);
        }

        return () => {
            try {
                mediaQuery.removeEventListener("change", handleChange);
            } catch (e) {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    return isStandalone;
}
