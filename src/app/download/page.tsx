"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Smartphone, Download, Apple, Share, PlusSquare, ArrowRight, CheckCircle2, QrCode, Globe, Info, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SeoOnly, AppOnly } from "@/components/layout/dual-view";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GradientBorder } from "@/components/ui/gradient-border";
import Image from "next/image";
import { usePWAInstall } from "@/hooks/use-pwa-install";

export default function DownloadPage() {
    const { install, isInstallable, isInstalled } = usePWAInstall();
    const [platform, setPlatform] = useState<"android" | "ios" | "desktop">("desktop");
    const [detectedPlatform, setDetectedPlatform] = useState<"android" | "ios" | "desktop" | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        const detect = () => {
            const ua = navigator.userAgent.toLowerCase();
            let detected: "android" | "ios" | "desktop" = "desktop";
            if (/android/.test(ua)) detected = "android";
            else if (/iphone|ipad|ipod/.test(ua)) detected = "ios";

            setPlatform(detected);
            setDetectedPlatform(detected);
        };

        // Use a micro-task to avoid cascading render lint during mount
        const timer = setTimeout(detect, 0);
        return () => clearTimeout(timer);
    }, []);

    const handleDownloadQR = async () => {
        if (isDownloading) return;
        setIsDownloading(true);
        try {
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=https://aimlclub.tech/download&bgcolor=ffffff&color=050505&margin=2&qzone=1`;
            const response = await fetch(qrUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "aiml-club-installer-qr.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download QR:", error);
            alert("External resource blocked by browser. Please long-press the QR to save.");
        } finally {
            setIsDownloading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="relative min-h-screen pt-32 pb-20 px-4 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--neon-lime)]/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-[var(--electric-cyan)]/10 blur-[100px] rounded-full" />
            </div>

            <SeoOnly>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
                        >
                            <Smartphone className="w-4 h-4 text-[var(--neon-lime-text)]" />
                            <span className="text-sm font-bold tracking-wider uppercase">Native Experience</span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
                        >
                            Get the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)]">AIML Club App</span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed"
                        >
                            Stay connected with the club wherever you go. Get instant event notifications, resource access, and offline support.
                        </motion.p>
                    </div>

                    {/* Main Content: Tabs/Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                        {/* Primary Platform Card */}
                        <motion.div variants={itemVariants}>
                            <GradientBorder
                                duration={10}
                                className="bg-[var(--card-bg)] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl h-full"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className="p-4 rounded-2xl bg-white/5">
                                        {platform === "android" ? <Smartphone className="w-8 h-8 text-[var(--neon-lime)]" /> :
                                            platform === "ios" ? <Apple className="w-8 h-8 text-white" /> :
                                                <Globe className="w-8 h-8 text-[var(--electric-cyan)]" />}
                                    </div>
                                    {detectedPlatform === platform && (
                                        <div className="px-3 py-1 rounded-full bg-[var(--neon-lime)]/20 text-[var(--neon-lime-text)] text-xs font-black uppercase tracking-widest animate-pulse">
                                            Detected Recommended
                                        </div>
                                    )}
                                </div>

                                <AnimatePresence mode="wait">
                                    {platform === "android" && (
                                        <motion.div
                                            key="android"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <h2 className="text-3xl font-black">Android App</h2>
                                            <p className="text-neutral-400">Install the app natively for better performance, or download the high-performance APK.</p>

                                            <div className="flex flex-col gap-4">
                                                {/* PWA Install Button for Android/Chrome */}
                                                {(isInstallable || isInstalled) ? (
                                                    <button
                                                        onClick={install}
                                                        className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-[var(--neon-lime)] text-black font-black rounded-3xl group shadow-[0_20px_40px_rgba(212,255,0,0.3)] hover:scale-[1.03] transition-all cursor-pointer"
                                                    >
                                                        <PlusSquare className="w-6 h-6" />
                                                        <span>{isInstalled ? "Open App" : "Install App"}</span>
                                                    </button>
                                                ) : null}

                                                <div className="grid grid-cols-2 gap-4 pt-2">
                                                    <a href={siteConfig.links.apk} download="aiml-club.apk" className="flex-1">
                                                        <MagneticButton>
                                                            <div className="w-full h-full flex items-center justify-center gap-3 px-4 py-4 bg-white/5 border border-white/10 text-white font-black rounded-[1.5rem] group hover:bg-white/10 hover:scale-[1.03] transition-all cursor-pointer">
                                                                <Download className="w-5 h-5 text-[var(--neon-lime-text)]" />
                                                                <span className="text-xs">APK File</span>
                                                            </div>
                                                        </MagneticButton>
                                                    </a>
                                                    <a href={siteConfig.links.aab} download="aiml-club.aab" className="flex-1">
                                                        <MagneticButton>
                                                            <div className="w-full h-full flex items-center justify-center gap-3 px-4 py-4 bg-white/5 border border-white/10 text-white font-black rounded-[1.5rem] group hover:bg-white/10 hover:scale-[1.03] transition-all cursor-pointer">
                                                                <Download className="w-5 h-5 text-[var(--electric-cyan-text)]" />
                                                                <span className="text-xs">AAB Build</span>
                                                            </div>
                                                        </MagneticButton>
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="space-y-4 pt-2">
                                                <div className="flex items-center gap-3 text-xs text-neutral-400">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    <span>Instant Update Support</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-neutral-400">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    <span>Verified Safe Ecosystem</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {platform === "ios" && (
                                        <motion.div
                                            key="ios"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <h2 className="text-3xl font-black">iOS • Apple</h2>
                                            <p className="text-neutral-400">Install the AIML Club portal as a native app on your home screen for the full immersive experience.</p>

                                            <div className="pt-2">
                                                <button
                                                    onClick={install}
                                                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white text-black font-black rounded-3xl group shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:scale-[1.03] transition-all border border-white/20"
                                                >
                                                    <Apple className="w-6 h-6" />
                                                    <span>Quick Install Guide</span>
                                                </button>
                                            </div>

                                            <div className="bg-white/5 rounded-3xl p-6 space-y-4 border border-white/5 relative overflow-hidden group">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black flex-shrink-0">01</div>
                                                    <p className="text-xs text-neutral-400 leading-normal">Open in <strong>Safari</strong> (Native Browser)</p>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black flex-shrink-0">02</div>
                                                    <p className="text-xs text-neutral-400 leading-normal">Tap the <Share className="w-3 h-3 inline mx-0.5 text-blue-400" /> <strong>Share</strong> icon.</p>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black flex-shrink-0">03</div>
                                                    <p className="text-xs text-neutral-400 leading-normal">Select <PlusSquare className="w-3 h-3 inline mx-0.5 text-[var(--neon-lime-text)]" /> <strong>Add to Home Screen</strong>.</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {platform === "desktop" && (
                                        <motion.div
                                            key="desktop"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            {isInstallable && !isInstalled ? (
                                                <>
                                                    <h2 className="text-3xl font-black">Desktop App</h2>
                                                    <p className="text-neutral-400">Install AIML Club on your PC/Laptop for quick access from your desktop or taskbar.</p>
                                                    <button
                                                        onClick={install}
                                                        className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-[var(--electric-cyan)] text-black font-black rounded-3xl group shadow-[0_20px_40px_rgba(34,211,238,0.2)] hover:scale-[1.03] transition-all cursor-pointer"
                                                    >
                                                        <Download className="w-6 h-6" />
                                                        <span>Install Web App</span>
                                                    </button>
                                                    <div className="relative h-[1px] bg-white/10 my-8">
                                                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--card-bg)] px-4 text-[10px] text-neutral-600 font-bold uppercase tracking-[0.3em]">OR SCAN MOBILE</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <h2 className="text-3xl font-black text-center">Scan to Install</h2>
                                            )}

                                            <div className="flex flex-col items-center gap-4 pt-2">
                                                <div className="p-5 bg-white rounded-3xl shadow-2xl relative group">
                                                    <Image
                                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://aimlclub.tech/download&bgcolor=ffffff&color=050505&margin=2&qzone=1`}
                                                        alt="Scan to Download"
                                                        width={200}
                                                        height={200}
                                                        className="rounded-xl group-hover:scale-105 transition-transform duration-500 shadow-xl"
                                                    />
                                                </div>
                                                <button
                                                    onClick={handleDownloadQR}
                                                    disabled={isDownloading}
                                                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest disabled:opacity-50"
                                                >
                                                    <QrCode className="w-3.5 h-3.5 text-[var(--neon-lime-text)]" />
                                                    {isDownloading ? "Saving..." : "Get QR Code"}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </GradientBorder>
                        </motion.div>

                        {/* Secondary Info / Alternative Card */}
                        <div className="space-y-8">
                            {/* More Info Card */}
                            <motion.div variants={itemVariants}>
                                <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors">
                                    <h3 className="text-xl font-black mb-4 flex items-center gap-3">
                                        <ShieldCheck className="w-6 h-6 text-green-400" />
                                        Privacy First
                                    </h3>
                                    <p className="text-sm text-neutral-400 leading-relaxed">
                                        Our mobile apps are open-source and do not track your location or personal data. Built for students, by students.
                                    </p>
                                    <Link href="https://github.com/aimlcluboct" target="_blank" className="inline-flex items-center gap-2 mt-4 text-xs font-bold text-[var(--electric-cyan-text)] hover:underline">
                                        View Source Code <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Switch Platform Link */}
                            <motion.div variants={itemVariants} className="px-4">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 mb-6">Explore Other Platforms</h4>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: "android", icon: Smartphone, label: "Android" },
                                        { id: "ios", icon: Apple, label: "iOS" },
                                        { id: "desktop", icon: QrCode, label: "Scan" }
                                    ].map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => setPlatform(p.id as "android" | "ios" | "desktop")}
                                            className={`flex flex-col items-center gap-2 p-4 rounded-3xl border transition-all ${platform === p.id ? "bg-[var(--neon-lime)]/10 border-[var(--neon-lime)]/50 text-[var(--neon-lime-text)]" : "bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10"}`}
                                        >
                                            <p.icon className="w-5 h-5" />
                                            <span className="text-[10px] font-bold">{p.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Troubleshooting */}
                            <motion.div variants={itemVariants} className="bg-gradient-to-br from-black to-neutral-900 border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                    <Info className="w-12 h-12" />
                                </div>
                                <h3 className="text-lg font-black mb-3">Having Trouble?</h3>
                                <p className="text-sm text-neutral-500 mb-4">If the app isn&apos;t installing correctly, ensure your browser is up to date or visit our technical docs.</p>
                                <Link href="/contact" className="text-xs font-bold px-5 py-3 bg-white/10 rounded-full inline-block hover:bg-white/20 transition-colors">
                                    Contact Support
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </SeoOnly>
            {/* App View */}
            <AppOnly>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <div className="w-20 h-20 rounded-3xl bg-green-500/10 flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-black mb-2">You&apos;re All Set!</h1>
                    <p className="text-neutral-400 max-w-xs mb-8">
                        You are currently using the native version of the AIML Club App.
                    </p>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5 w-full max-w-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-neutral-500">Current Version</span>
                            <span className="text-sm font-bold font-mono">v1.0.2</span>
                        </div>
                        <div className="flex justify-between items-center text-green-500">
                            <span className="text-sm">Status</span>
                            <span className="text-sm font-bold flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Active
                            </span>
                        </div>
                    </div>
                </div>
            </AppOnly>
        </div>
    );
}

// Simple internal Link proxy to handle external/internal safely
function Link({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
    if (href.startsWith("http")) {
        return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
    }
    return <a href={href} {...props}>{children}</a>;
}
