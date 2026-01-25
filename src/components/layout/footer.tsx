"use client";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { Send, Instagram, Linkedin, Github, Check, Loader2, Users, Link2, Smartphone, Share2, Globe } from "lucide-react";
import { GradientBorder } from "@/components/ui/gradient-border";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { createSubscription } from "@/lib/database";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import { useShareApp } from "@/hooks/use-share-app";

export const Footer = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const { share } = useShareApp();

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await createSubscription({
                name: name.trim(),
                email: email.trim(),
                ...(phone.trim() && { phone: phone.trim() })
            });
            setSuccess(true);
            setName("");
            setEmail("");
            setPhone("");
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error("Subscription error:", err);
            setError("Failed to subscribe. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="w-full bg-white dark:bg-black border-t border-neutral-200/50 dark:border-white/10 relative pt-12 sm:pt-16 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:pb-8 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-16">

                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-1 space-y-6 sm:space-y-8">
                        <div className="space-y-4">
                            <Link href="/" className="flex items-center gap-2 group relative">
                                <div className="relative w-10 h-10 transition-transform group-hover:scale-110 duration-500">
                                    <Image
                                        src="/logo-club.png"
                                        alt="AIML Club Logo"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                    <div className="absolute inset-0 bg-[var(--electric-cyan)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white relative overflow-hidden">
                                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">AIML CLUB</span>
                                    <span className="absolute left-0 top-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-[var(--neon-lime-text)]">AIML CLUB</span>
                                </span>
                            </Link>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[200px]">
                                Empowering students to innovate, implement, and inspire through AI.
                            </p>
                        </div>

                        {/* Distribution Actions Grouped Under Brand on Mobile/Desktop Column */}
                        <div className="flex flex-col gap-3 max-w-[220px]">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 mb-0.5 px-1">Ecosystem Hub</h4>
                            <div className="grid grid-cols-1 gap-2">
                                <InstallFooterItem />
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => share("apk")}
                                        className="px-3 py-3 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl text-[11px] font-black text-neutral-800 dark:text-neutral-300 hover:text-[var(--neon-lime-text)] hover:border-[var(--neon-lime)]/50 transition-all flex items-center justify-center gap-2 group active:scale-95"
                                    >
                                        <Share2 className="w-4 h-4 text-[var(--neon-lime-text)] group-hover:scale-110 transition-transform" />
                                        <span>APK</span>
                                    </button>
                                    <button
                                        onClick={() => share("web")}
                                        className="px-3 py-3 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl text-[11px] font-black text-neutral-800 dark:text-neutral-300 hover:text-[var(--neon-lime-text)] hover:border-[var(--neon-lime)]/50 transition-all flex items-center justify-center gap-2 group active:scale-95"
                                    >
                                        <Globe className="w-4 h-4 text-[var(--electric-cyan-text)] group-hover:scale-110 transition-transform" />
                                        <span>WEB</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white mb-4 sm:mb-6 uppercase tracking-widest text-[9px] opacity-70">Quick Links</h3>
                        <ul className="space-y-3 sm:space-y-4">
                            {[
                                { name: "Home", href: "/" },
                                { name: "Team", href: "/team" },
                                { name: "Events", href: "/events" },
                                { name: "Gallery", href: "/gallery" },
                                { name: "Blog", href: "/blog" },
                                { name: "Contact", href: "/contact" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-[var(--neon-lime-text)] transition-all hover:translate-x-1 inline-block"
                                        prefetch={true}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="col-span-1">
                        <h3 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white mb-4 sm:mb-6 uppercase tracking-widest text-[9px] opacity-70">Resources</h3>
                        <ul className="space-y-3 sm:space-y-4">
                            {[
                                { name: "Latest Updates", href: siteConfig.links.info, external: true },
                                { name: "Suggestion Box", href: "/suggestions" },
                                { name: "Constitution", href: "/constitution" },
                                { name: "Notion Workspace", href: "https://aimlcluboct.notion.site/Home-d08e0983dce94b2f81ca1b5082771061", external: true },
                                { name: "GitHub Org", href: "https://github.com/aimlcluboct", external: true },
                                { name: "Media Drive", href: siteConfig.links.drive, external: true },
                                { name: "WhatsApp Channel", href: siteConfig.links.whatsappChannel, external: true },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        target={link.external ? "_blank" : undefined}
                                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-[var(--neon-lime-text)] transition-all hover:translate-x-1 inline-block"
                                        prefetch={link.external ? false : true}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter - Full width on mobile */}
                    <div className="col-span-2 sm:col-span-2 lg:col-span-1">
                        <GradientBorder
                            id="newsletter"
                            containerClassName="rounded-[2rem] shadow-2xl"
                            className="p-6 sm:p-7 bg-[var(--card-bg)] border border-neutral-200 dark:border-white/10 transition-all duration-500"
                            duration={15}
                        >
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h3 className="font-black text-lg sm:text-xl text-neutral-900 dark:text-white group-hover:text-[var(--neon-lime-text)] transition-colors">Stay Updated</h3>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-medium">
                                        Join our ecosystem for the latest opportunities.
                                    </p>
                                </div>

                                <div className="w-10 h-0.5 bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)] rounded-full" />

                                {success ? (
                                    <div className="flex items-center gap-3 text-green-500 py-3 bg-green-500/5 rounded-2xl px-4 border border-green-500/10">
                                        <Check className="w-5 h-5" />
                                        <span className="text-sm font-bold">In the loop!</span>
                                    </div>
                                ) : (
                                    <form className="space-y-3" onSubmit={handleSubscribe}>
                                        {error && (
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{error}</p>
                                        )}
                                        <div className="space-y-2.5">
                                            <input
                                                type="text"
                                                placeholder="Your name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:border-[var(--neon-lime)]/50 focus:ring-1 focus:ring-[var(--neon-lime)]/30 transition-all font-medium"
                                            />
                                            <input
                                                type="email"
                                                placeholder="Your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:border-[var(--neon-lime)]/50 focus:ring-1 focus:ring-[var(--neon-lime)]/30 transition-all font-medium"
                                            />
                                            <input
                                                type="tel"
                                                placeholder="WhatsApp No. (optional)"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:border-[var(--neon-lime)]/50 focus:ring-1 focus:ring-[var(--neon-lime)]/30 transition-all font-medium"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full px-4 py-3.5 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)] hover:shadow-[0_10px_30px_rgba(212,255,0,0.2)] dark:hover:shadow-[0_10px_30px_rgba(212,255,0,0.1)] transition-all flex items-center justify-center gap-3 group disabled:opacity-70 active:scale-[0.98]"
                                        >
                                            {loading ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    Subscribe
                                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </GradientBorder>
                    </div>
                </div>

                {/* Connect Grid - Social Links */}
                <div className="mt-8 mb-6 pt-6 border-t border-neutral-200/50 dark:border-white/10">
                    <p className="text-center text-[11px] font-black uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mb-5 sm:mb-8">Connect Ecosystem</p>
                    <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 md:gap-5">
                        <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/40 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-white/5 hover:border-[var(--neon-lime)]/50 transition-all group active:scale-95 shadow-sm">
                            <Linkedin className="w-5 h-5 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] sm:text-xs font-bold text-neutral-600 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">LinkedIn</span>
                        </a>
                        <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/40 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-white/5 hover:border-[var(--neon-lime)]/50 transition-all group active:scale-95 shadow-sm">
                            <Github className="w-5 h-5 text-neutral-900 dark:text-white group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] sm:text-xs font-bold text-neutral-600 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">GitHub</span>
                        </a>
                        <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/40 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-white/5 hover:border-[var(--neon-lime)]/50 transition-all group active:scale-95 shadow-sm">
                            <Instagram className="w-5 h-5 text-[#E4405F] group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] sm:text-xs font-bold text-neutral-600 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">Official</span>
                        </a>
                        <a href={siteConfig.links.instagramPhotopia} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/40 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-white/5 hover:border-[var(--neon-lime)]/50 transition-all group active:scale-95 shadow-sm">
                            <Instagram className="w-5 h-5 text-[#833AB4] group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] sm:text-xs font-bold text-neutral-600 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">Photopia</span>
                        </a>
                        <a href={siteConfig.links.commudle} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/40 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-white/5 hover:border-[var(--neon-lime)]/50 transition-all group active:scale-95 shadow-sm">
                            <Users className="w-5 h-5 text-[#6366F1] group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] sm:text-xs font-bold text-neutral-600 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">Commudle</span>
                        </a>
                        <a href={siteConfig.links.whatsappChannel} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/40 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-white/5 hover:border-[var(--neon-lime)]/50 transition-all group active:scale-95 shadow-sm">
                            <WhatsAppIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] sm:text-xs font-bold text-neutral-600 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">Channel</span>
                        </a>
                        <a href={siteConfig.links.whatsappGroup} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/40 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-white/5 hover:border-[var(--neon-lime)]/50 transition-all group active:scale-95 shadow-sm">
                            <WhatsAppIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] sm:text-xs font-bold text-neutral-600 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">Group</span>
                        </a>
                        <a href={siteConfig.links.social} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/40 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-white/5 hover:border-[var(--neon-lime)]/50 transition-all group active:scale-95 shadow-sm">
                            <Link2 className="w-5 h-5 text-[var(--neon-lime)] group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] sm:text-xs font-bold text-neutral-600 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">Links</span>
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-200/50 dark:border-white/10 pt-6 sm:pt-8">
                    <div className="flex flex-col items-center gap-0 text-center">
                        <Link
                            href="/copyright"
                            className="text-neutral-500 dark:text-neutral-500 text-[11px] sm:text-xs font-mono hover:text-[var(--neon-lime-text)] transition-colors inline-block max-w-[90vw] leading-tight"
                        >
                            © {new Date().getFullYear()} - AI & Machine Learning Club OCT, Bhopal.
                        </Link>
                        <p className="text-neutral-400 dark:text-neutral-500 text-[11px] sm:text-xs font-mono leading-tight">
                            All rights reserved by{" "}
                            <a
                                href="https://www.linkedin.com/in/umesh-patel-5647b42a4/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-[var(--neon-lime-text)] hover:underline whitespace-nowrap transition-all"
                            >
                                Umesh Patel
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

function InstallFooterItem() {
    const { isInstalled, isInstallable } = usePWAInstall();
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
    }, []);

    if (isInstalled) return null;

    // Show if:
    // 1. Native isInstallable (Android/Chrome)
    // 2. OR it's an iOS device (we guide them to /download)
    if (!isInstallable && !isIOS) return null;

    return (
        <Link
            href="/download"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl text-[11px] font-black text-neutral-800 dark:text-neutral-300 hover:text-[var(--neon-lime-text)] hover:border-[var(--neon-lime)]/50 transition-all group active:scale-95"
        >
            <Smartphone className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Install App</span>
        </Link>
    );
}
