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

        // Also update the manifest theme_color if possible (optional but good for some browsers)
        // Note: Browsers usually don't re-read manifest after load, but changing meta is effective.
    }, [resolvedTheme]);

    return null;
}
