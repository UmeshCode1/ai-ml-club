"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Interface for the non-standard beforeinstallprompt event.
 */
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Hook to manage PWA installation logic.
 * Handles the beforeinstallprompt event and provides a triggered install function.
 */
export function usePWAInstall() {
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [platform, setPlatform] = useState<{ isIOS: boolean; isChrome: boolean }>({ isIOS: false, isChrome: false });

    useEffect(() => {
        // Platform detection logic
        const ua = navigator.userAgent;
        const isIOS = /iPad|iPhone|iPod/.test(ua) && !((window as any).MSStream);
        const isChrome = /Chrome/.test(ua) && /Google Inc/.test(navigator.vendor);

        // Subtle delay to avoid React render cycle warnings
        const platformTimer = setTimeout(() => setPlatform({ isIOS, isChrome }), 0);

        const handleBeforeInstallPrompt = (e: Event) => {
            // Prevent automatic prompt to stay in control of the UX
            e.preventDefault();
            // Store the event so it can be called later
            setInstallPrompt(e as BeforeInstallPromptEvent);
            setIsInstallable(true);
        };

        const handleAppInstalled = () => {
            setIsInstalled(true);
            setIsInstallable(false);
            setInstallPrompt(null);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);

        // Check if already in standalone mode
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
            (navigator as Navigator & { standalone?: boolean }).standalone;

        if (isStandalone) {
            setTimeout(() => setIsInstalled(true), 0);
        }

        // Feature: For iOS, we can't show a native prompt, so we mark it as 
        // "installable" to show our custom instruction banner.
        if (isIOS && !isStandalone) {
            setTimeout(() => setIsInstallable(true), 0);
        }

        return () => {
            clearTimeout(platformTimer);
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    /**
     * Triggers the PWA installation or shows instructions for iOS.
     */
    const install = useCallback(async (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.log("PWA: Attempting installation...", {
            hasPrompt: !!installPrompt,
            isIOS: platform.isIOS,
            isInstallable,
            isInstalled
        });

        if (platform.isIOS) {
            alert("To install: tap the Share button and then 'Add to Home Screen' 😊");
            return;
        }

        if (!installPrompt) {
            console.warn("PWA: No install prompt available.");
            // Fallback for when the prompt is missing but user clicked Install
            alert("To install manually: Tap the browser menu (⋮) and select 'Install app' or 'Add to Home Screen'.");
            return;
        }

        try {
            await installPrompt.prompt();
            const { outcome } = await installPrompt.userChoice;

            setInstallPrompt(null);
            setIsInstallable(false);
        } catch (error) {
            alert("Installation failed. Please try adding to home screen manually from the browser menu.");
        }
    }, [installPrompt, platform.isIOS, isInstallable, isInstalled]);

    return { isInstallable, isInstalled, install };
}
