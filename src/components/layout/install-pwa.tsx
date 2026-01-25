"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePWAInstall } from "@/hooks/use-pwa-install";

export function InstallPWA() {
    const { isInstallable, isInstalled, install } = usePWAInstall();
    const [showBanner, setShowBanner] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Only show if installable and not already installed/dismissed
        if (isInstallable && !isInstalled && !dismissed) {
            const timer = setTimeout(() => {
                setShowBanner(true);
                // Subtle haptic feedback when banner appears
                if (window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate([20, 30, 20]);
                }
            }, 3000);
            return () => clearTimeout(timer);
        } else if (showBanner) {
            setTimeout(() => setShowBanner(false), 0);
        }
    }, [isInstallable, isInstalled, dismissed, showBanner]);

    const handleInstall = async () => {
        // Haptic feedback on click
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
        await install();
    };

    const handleDismiss = () => {
        setShowBanner(false);
        setDismissed(true);
        // Save dismissal in session storage to not annoy user in same session
        sessionStorage.setItem("pwa-dismissed", "true");
    };

    useEffect(() => {
        if (sessionStorage.getItem("pwa-dismissed") === "true") {
            setTimeout(() => setDismissed(true), 0);
        }
    }, []);

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] md:bottom-6 md:left-auto md:right-8 md:max-w-sm md:p-0 md:pb-0 pointer-events-none"
                >
                    <div className="bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 pointer-events-auto relative overflow-hidden group">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-lime)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--neon-lime)] to-[var(--electric-cyan)] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(212,255,0,0.3)]">
                            <Smartphone className="w-6 h-6 text-black" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-white font-bold text-sm tracking-tight">AIML Club App</h4>
                            <p className="text-neutral-400 text-xs line-clamp-1">Install to build and innovate offline.</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleInstall}
                                className="px-4 py-2 rounded-xl bg-[var(--neon-lime)] text-black text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(212,255,0,0.4)] animate-pulse-neon"
                            >
                                Install
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="p-2 rounded-xl hover:bg-white/5 text-neutral-500 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
