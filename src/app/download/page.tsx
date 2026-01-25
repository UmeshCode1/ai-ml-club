"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Smartphone, Download, Apple, Share, PlusSquare, ArrowRight, CheckCircle2, QrCode, Globe, Info, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GradientBorder } from "@/components/ui/gradient-border";
import Image from "next/image";

export default function DownloadPage() {
    const [platform, setPlatform] = useState<"android" | "ios" | "desktop">("desktop");
    const [detectedPlatform, setDetectedPlatform] = useState<"android" | "ios" | "desktop" | null>(null);

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
                                        Detecting Device... Recommended
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
                                        <p className="text-neutral-400">Download the official high-performance APK for the best mobile experience.</p>

                                        <div className="space-y-4 pt-4">
                                            <div className="flex items-center gap-3 text-sm text-neutral-300">
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                <span>Direct APK Installation</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-neutral-300">
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                <span>Instant Update Support</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-neutral-300">
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                <span>Low Storage Footprint (~2MB)</span>
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            <a href={siteConfig.links.apk} download>
                                                <MagneticButton>
                                                    <div className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-[var(--neon-lime)] text-black font-black rounded-3xl group shadow-[0_20px_40px_rgba(212,255,0,0.3)] hover:scale-[1.03] transition-all cursor-pointer">
                                                        <Download className="w-6 h-6 group-hover:bounce" />
                                                        <span>Download APK Now</span>
                                                    </div>
                                                </MagneticButton>
                                            </a>
                                            <p className="text-center text-[10px] text-neutral-500 mt-4 px-4 uppercase tracking-tighter">
                                                Latest Build: v1.0.2 • Verified by AIML Debug Lab
                                            </p>
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
                                        <h2 className="text-3xl font-black">iOS • iPhone / iPad</h2>
                                        <p className="text-neutral-400">Install the AIML Club portal as a native app on your home screen for the full 120Hz experience.</p>

                                        <div className="pt-2">
                                            <div className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white text-black font-black rounded-3xl group shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:scale-[1.03] transition-all cursor-default border border-white/20">
                                                <Apple className="w-6 h-6" />
                                                <span>Add to Home Screen</span>
                                            </div>
                                            <p className="text-center text-[10px] text-neutral-500 mt-4 px-4 uppercase tracking-tighter">
                                                Zero-Install Technology • Requires Safari
                                            </p>
                                        </div>

                                        <div className="bg-white/5 rounded-3xl p-6 space-y-5 border border-white/5 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <Apple className="w-16 h-16" />
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-xs font-black flex-shrink-0">01</div>
                                                <p className="text-sm text-neutral-300">Tap the <Share className="w-4 h-4 inline mx-1 text-blue-400" /> <strong>Share</strong> icon in the Safari bottom bar.</p>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-xs font-black flex-shrink-0">02</div>
                                                <p className="text-sm text-neutral-300">Scroll down and select <PlusSquare className="w-4 h-4 inline mx-1 text-[var(--neon-lime-text)]" /> <strong>Add to Home Screen</strong>.</p>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-xs font-black flex-shrink-0">03</div>
                                                <p className="text-sm text-neutral-300">Confirm by tapping <strong>Add</strong> in the top right corner.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center gap-3 text-[var(--neon-lime-text)] animate-pulse">
                                            <Info className="w-4 h-4" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">No App Store Account Required</span>
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
                                        <h2 className="text-3xl font-black">Scan to Install</h2>
                                        <p className="text-neutral-400">Open your phone&apos;s camera and scan the code below to install the app on your mobile device instantly.</p>

                                        <div className="flex justify-center py-4">
                                            <div className="p-6 bg-white rounded-3xl shadow-2xl relative group">
                                                <Image
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://aimlclub.tech/download&bgcolor=ffffff&color=050505&margin=2&qzone=1`}
                                                    alt="Scan to Download"
                                                    width={250}
                                                    height={250}
                                                    className="rounded-xl group-hover:scale-105 transition-transform duration-500 shadow-xl"
                                                />
                                                <div className="absolute inset-x-0 bottom-2 text-center pointer-events-none">
                                                    <span className="text-[10px] font-black text-black/30 uppercase tracking-[0.4em]">AIML CLUB SECURE</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center gap-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                            <Apple className="w-6 h-6" />
                                            <Smartphone className="w-6 h-6" />
                                            <Globe className="w-6 h-6" />
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
        </div>
    );
}

// Simple internal Link proxy to handle external/internal safely
function Link({ href, children, ...props }: { href: string; children: React.ReactNode;[key: string]: any }) {
    if (href.startsWith("http")) {
        return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
    }
    return <a href={href} {...props}>{children}</a>;
}
