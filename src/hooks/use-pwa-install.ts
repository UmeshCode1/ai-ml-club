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
            console.log("PWA: [Event] beforeinstallprompt captured");
            // Prevent automatic prompt to stay in control of the UX
            e.preventDefault();
            // Store the event so it can be called later
            setInstallPrompt(e as BeforeInstallPromptEvent);
            setIsInstallable(true);
        };

        const handleAppInstalled = () => {
            console.log("PWA: [Event] appinstalled - Installation success");
            setIsInstalled(true);
            setIsInstallable(false);
            setInstallPrompt(null);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);

        // Check if already in standalone mode
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
        if (isStandalone) {
            console.log("PWA: App is already running in standalone mode");
            setTimeout(() => setIsInstalled(true), 0);
        }

        // Feature: For iOS, we can't show a native prompt, so we mark it as 
        // "installable" to show our custom instruction banner.
        if (isIOS && !isStandalone) {
            console.log("PWA: iOS detected - Enabling instruction mode");
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
    const install = useCallback(async () => {
        console.log("PWA: [Action] install() triggered", {
            hasPrompt: !!installPrompt,
            isIOS: platform.isIOS,
            isInstallable,
            isInstalled
        });

        if (platform.isIOS) {
            // Native prompt is unavailable on iOS; show instructions instead.
            alert("To install AIML Club: Tap the 'Share' icon in Safari and select 'Add to Home Screen' 📲");
            return;
        }

        if (!installPrompt) {
            console.warn("PWA: [Warning] No installation prompt available. Checking constraints...");
            if (isInstalled) {
                console.log("PWA: App is already installed.");
            } else {
                console.log("PWA: Browser might not support the BeforeInstallPrompt API or the Manifest criteria weren't met (HTTPS, Icons, SW).");
            }
            return;
        }

        try {
            console.log("PWA: [Action] Opening native installation dialog");
            await installPrompt.prompt();
            const { outcome } = await installPrompt.userChoice;
            console.log(`PWA: [Response] User ${outcome} the installation`);

            // Cleanup after use
            setInstallPrompt(null);
            setIsInstallable(false);
        } catch (error) {
            console.error("PWA: [Error] Installation failed:", error);
        }
    }, [installPrompt, platform.isIOS, isInstallable, isInstalled]);

    return { isInstallable, isInstalled, install };
}
