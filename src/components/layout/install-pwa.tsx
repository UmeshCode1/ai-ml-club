"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);

            // Check if user has dismissed the prompt recently (e.g., within 7 days)
            const dismissedAt = localStorage.getItem("pwa-prompt-dismissed");
            if (dismissedAt) {
                const daysSince = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24);
                if (daysSince < 7) return;
            }

            // Show prompt after a small delay
            setTimeout(() => setShowPrompt(true), 5000);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            setDeferredPrompt(null);
            setShowPrompt(false);
        }
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem("pwa-prompt-dismissed", Date.now().toString());
    };

    return (
        <AnimatePresence>
            {showPrompt && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    className="fixed bottom-24 left-4 right-4 md:bottom-8 md:right-8 md:left-auto md:w-96 z-[9999]"
                >
                    <div className="relative overflow-hidden rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-2xl p-5">
                        {/* Glow Effect */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--neon-lime)]/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-start gap-4 relaitve z-10">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--neon-lime)]/20 to-[var(--electric-cyan)]/20 flex items-center justify-center border border-white/5 shrink-0">
                                <Download className="w-6 h-6 text-[var(--neon-lime)]" />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-white font-bold mb-1">Install App</h3>
                                <p className="text-sm text-neutral-400 mb-3 leading-relaxed">
                                    Add AIML Club to your home screen for the best experience.
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleInstall}
                                        className="flex-1 px-4 py-2 bg-[var(--neon-lime)] text-black text-sm font-bold rounded-lg hover:bg-[#bbe03d] transition-colors"
                                    >
                                        Install Now
                                    </button>
                                    <button
                                        onClick={handleDismiss}
                                        className="px-4 py-2 bg-white/5 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        Later
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleDismiss}
                                className="text-neutral-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
