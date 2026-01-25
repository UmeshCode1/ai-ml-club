"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

/**
 * Component to dynamically update the theme-color meta tag
 * to match the user's manual theme selection.
 */
export function ThemeColorUpdater() {
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        const themeColor = resolvedTheme === "dark" ? "#050505" : "#F8FAFC";

        // Update the theme-color meta tag
        let meta = document.querySelector('meta[name="theme-color"]');

        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'theme-color');
            document.head.appendChild(meta);
        }

        meta.setAttribute('content', themeColor);

        // Update Apple status bar style for PWA
        let appleMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
        if (!appleMeta) {
            appleMeta = document.createElement('meta');
            appleMeta.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
            document.head.appendChild(appleMeta);
        }
        appleMeta.setAttribute('content', resolvedTheme === "dark" ? "black-translucent" : "default");
    }, [resolvedTheme]);

    return null;
}
