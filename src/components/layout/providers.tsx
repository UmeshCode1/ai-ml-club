"use client";

import { ThemeProvider } from "next-themes";
import React, { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    // Remove no-transitions class after mount to enable smooth theme switching
    useEffect(() => {
        // Small delay to ensure styles are applied
        const timer = requestAnimationFrame(() => {
            document.documentElement.classList.remove('no-transitions');
        });
        return () => cancelAnimationFrame(timer);
    }, []);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}
