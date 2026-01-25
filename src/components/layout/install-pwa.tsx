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
        }
    }, [isInstallable, isInstalled, dismissed]);

    // Auto-dismiss after 15 seconds
    useEffect(() => {
        if (showBanner) {
            const timer = setTimeout(() => {
                setShowBanner(false);
            }, 15000);
            return () => clearTimeout(timer);
        }
    }, [showBanner]);

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
                    initial={{ y: -100, opacity: 0, x: -50, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, x: 0, scale: 1 }}
                    exit={{ y: -50, opacity: 0, scale: 0.9 }}
                    className="fixed top-4 left-4 z-[100] md:left-8 md:top-6 w-auto max-w-[320px] pointer-events-none"
                >
                    <div className="bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 pointer-events-auto relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-lime)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--neon-lime)] to-[var(--electric-cyan)] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,255,0,0.2)]">
                            <Smartphone className="w-5 h-5 text-black" />
                        </div>

                        <div className="flex-1 min-w-0 mr-1">
                            <h4 className="text-white font-bold text-xs tracking-tight">Check AIML App</h4>
                            <p className="text-neutral-400 text-[10px] leading-tight line-clamp-1">Install for offline access</p>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={handleInstall}
                                className="px-3 py-1.5 rounded-lg bg-[var(--neon-lime)] text-black text-[10px] font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_10px_rgba(212,255,0,0.3)] animate-pulse-neon whitespace-nowrap"
                            >
                                Install
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-500 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
