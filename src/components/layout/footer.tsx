"use client";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { Send } from "lucide-react";
import { GradientBorder } from "@/components/ui/gradient-border";

export const Footer = () => {
    return (
        <footer className="w-full bg-white dark:bg-black border-t border-neutral-200/50 dark:border-white/10 relative pt-16 pb-8 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
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
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm">
                            Empowering students to innovate, implement, and inspire through AI & Machine Learning.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4">
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
                                        className="text-neutral-600 dark:text-neutral-400 hover:text-[var(--neon-lime-text)] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-6">Resources</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Suggestion Box", href: "/suggestions" },
                                { name: "Constitution", href: "/constitution" },
                                { name: "Media Drive", href: "https://drive.google.com/drive/folders/1-_byssQsFS1pw02iDxyt40_n2CdCBaOk?usp=sharing", external: true },
                                { name: "WhatsApp Channel", href: "https://whatsapp.com/channel/0029VbAthv38V0tfulumuV1D", external: true },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        target={link.external ? "_blank" : undefined}
                                        className="text-neutral-600 dark:text-neutral-400 hover:text-[var(--neon-lime-text)] transition-colors flex items-center gap-2"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter - New Addition */}
                    <GradientBorder
                        containerClassName="rounded-3xl shadow-lg"
                        className="p-6 bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-xl"
                        duration={10}
                    >
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Stay Updated</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 leading-relaxed">
                            Get the latest updates on events, workshops, and opportunities.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)]/50 transition-all"
                            />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)]/50 transition-all"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-3 rounded-xl font-bold text-sm text-[var(--background)] bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)] hover:opacity-90 hover:shadow-lg hover:shadow-[var(--neon-lime)]/20 transition-all flex items-center justify-center gap-2 group"
                            >
                                Subscribe
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </GradientBorder>
                </div>

                <div className="border-t border-neutral-200/50 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-center items-center gap-2">
                    <p className="text-neutral-600 dark:text-neutral-500 text-xs font-mono text-center">
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
