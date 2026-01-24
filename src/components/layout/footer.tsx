"use client";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { Send, Instagram, Linkedin, Github, Check, Loader2, Users, Link2 } from "lucide-react";
import { GradientBorder } from "@/components/ui/gradient-border";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { createSubscription } from "@/lib/database";

export const Footer = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

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
        <footer className="w-full bg-white dark:bg-black border-t border-neutral-200/50 dark:border-white/10 relative pt-12 sm:pt-16 pb-6 sm:pb-8 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-16">

                    {/* Brand Column - Full width on mobile */}
                    <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-4 sm:space-y-6">
                        <Link href="/" className="flex items-center gap-2 group relative">
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110 duration-500">
                                <Image
                                    src="/logo-club.png"
                                    alt="AIML Club Logo"
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                />
                                <div className="absolute inset-0 bg-[var(--electric-cyan)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <span className="font-bold text-lg sm:text-xl tracking-tight text-neutral-900 dark:text-white relative overflow-hidden">
                                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">AIML CLUB</span>
                                <span className="absolute left-0 top-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-[var(--neon-lime-text)]">AIML CLUB</span>
                            </span>
                        </Link>
                        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm">
                            Empowering students to innovate, implement, and inspire through AI & Machine Learning.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white mb-4 sm:mb-6">Quick Links</h3>
                        <ul className="space-y-2 sm:space-y-3">
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
                                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-[var(--neon-lime-text)] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="col-span-1">
                        <h3 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white mb-4 sm:mb-6">Resources</h3>
                        <ul className="space-y-2 sm:space-y-3">
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
                                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-[var(--neon-lime-text)] transition-colors"
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
                            containerClassName="rounded-2xl sm:rounded-3xl shadow-lg"
                            className="p-4 sm:p-6 bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-xl"
                            duration={10}
                        >
                            <h3 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white mb-3 sm:mb-4">Stay Updated</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                                Get the latest updates on events and opportunities.
                            </p>

                            {success ? (
                                <div className="flex items-center gap-2 text-green-500 py-3">
                                    <Check className="w-5 h-5" />
                                    <span className="text-sm font-medium">Thanks for subscribing!</span>
                                </div>
                            ) : (
                                <form className="space-y-2 sm:space-y-3" onSubmit={handleSubscribe}>
                                    {error && (
                                        <p className="text-red-500 text-xs">{error}</p>
                                    )}
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)]/50 transition-all"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)]/50 transition-all"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="WhatsApp No. (optional)"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)]/50 transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)] hover:opacity-90 hover:shadow-lg hover:shadow-[var(--neon-lime)]/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                                                Subscribing...
                                            </>
                                        ) : (
                                            <>
                                                Subscribe
                                                <Send className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </GradientBorder>
                    </div>
                </div>

                {/* Connect Grid - Social Links */}
                <div className="mt-8 mb-6 pt-6 border-t border-neutral-200/50 dark:border-white/10">
                    <p className="text-center text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-4 sm:mb-6">Connect with us</p>
                    <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
                        <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-neutral-100 dark:bg-neutral-800/50 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-neutral-700 hover:border-[var(--neon-lime)]/50 transition-all group">
                            <Linkedin className="w-4 h-4 text-[#0A66C2] group-hover:text-[var(--neon-lime-text)]" />
                            <span className="text-[9px] sm:text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">LinkedIn</span>
                        </a>
                        <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-neutral-100 dark:bg-neutral-800/50 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-neutral-700 hover:border-[var(--neon-lime)]/50 transition-all group">
                            <Github className="w-4 h-4 text-neutral-900 dark:text-white group-hover:text-[var(--neon-lime-text)]" />
                            <span className="text-[9px] sm:text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">GitHub</span>
                        </a>
                        <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-neutral-100 dark:bg-neutral-800/50 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-neutral-700 hover:border-[var(--neon-lime)]/50 transition-all group">
                            <Instagram className="w-4 h-4 text-[#E4405F] group-hover:text-[var(--neon-lime-text)]" />
                            <span className="text-[9px] sm:text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">Official</span>
                        </a>
                        <a href={siteConfig.links.instagramPhotopia} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-neutral-100 dark:bg-neutral-800/50 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-neutral-700 hover:border-[var(--neon-lime)]/50 transition-all group">
                            <Instagram className="w-4 h-4 text-[#833AB4] group-hover:text-[var(--neon-lime-text)]" />
                            <span className="text-[9px] sm:text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">Photopia</span>
                        </a>
                        <a href={siteConfig.links.commudle} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-neutral-100 dark:bg-neutral-800/50 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-neutral-700 hover:border-[var(--neon-lime)]/50 transition-all group">
                            <Users className="w-4 h-4 text-[#6366F1] group-hover:text-[var(--neon-lime-text)]" />
                            <span className="text-[9px] sm:text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">Commudle</span>
                        </a>
                        <a href={siteConfig.links.whatsappChannel} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-neutral-100 dark:bg-neutral-800/50 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-neutral-700 hover:border-[var(--neon-lime)]/50 transition-all group">
                            <WhatsAppIcon className="w-4 h-4" />
                            <span className="text-[9px] sm:text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">Channel</span>
                        </a>
                        <a href={siteConfig.links.whatsappGroup} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-neutral-100 dark:bg-neutral-800/50 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-neutral-700 hover:border-[var(--neon-lime)]/50 transition-all group">
                            <WhatsAppIcon className="w-4 h-4" />
                            <span className="text-[9px] sm:text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">Group</span>
                        </a>
                        <a href={siteConfig.links.social} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-neutral-100 dark:bg-neutral-800/50 hover:bg-[var(--neon-lime)]/10 border border-neutral-200 dark:border-neutral-700 hover:border-[var(--neon-lime)]/50 transition-all group">
                            <Link2 className="w-4 h-4 text-[var(--neon-lime)] group-hover:text-[var(--neon-lime-text)]" />
                            <span className="text-[9px] sm:text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)]">All Links</span>
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-200/50 dark:border-white/10 pt-6 sm:pt-8">
                    <p className="text-neutral-500 dark:text-neutral-500 text-[10px] sm:text-xs font-mono text-center">
                        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved by{" "}
                        <a
                            href="https://www.linkedin.com/in/umesh-patel-5647b42a4/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[var(--neon-lime-text)] hover:underline"
                        >
                            Umesh Patel
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};
