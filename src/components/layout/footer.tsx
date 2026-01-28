"use client";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { Send, Instagram, Linkedin, Github, Check, Loader2, Users, Link2, Smartphone, Share2, Globe } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { createSubscription } from "@/lib/database";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import { useShareApp } from "@/hooks/use-share-app";
import { motion } from "framer-motion";

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
        <footer className="w-full bg-white dark:bg-[#030303] border-t border-neutral-200/50 dark:border-white/5 relative pt-12 sm:pt-16 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:pb-8 transition-colors duration-700 overflow-hidden transform-gpu standalone:hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Main Footer Grid - Adaptive per device */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 lg:gap-12 mb-10 sm:mb-16">

                    {/* Brand Column - Centered on Mobile, Left on Desktop */}
                    <div className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8">
                        <div className="space-y-4 flex flex-col items-center lg:items-start">
                            <Link href="/" className="flex items-center gap-3 group relative transform-gpu">
                                <div className="relative w-12 h-12 transition-transform group-hover:scale-110 duration-500">
                                    <Image
                                        src="/logo-club.png"
                                        alt="AIML Club Logo"
                                        width={48}
                                        height={48}
                                        className="object-contain"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-[var(--electric-cyan)]/20 dark:bg-[var(--electric-cyan)]/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <span className="font-black text-2xl tracking-tighter text-neutral-900 dark:text-white relative overflow-hidden">
                                    <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">AIML CLUB</span>
                                    <span className="absolute left-0 top-0 inline-block transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-[var(--neon-lime-text)]">AIML CLUB</span>
                                </span>
                            </Link>
                            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[240px]">
                                Empowering students to innovate, implement, and inspire through AI.
                            </p>
                        </div>

                        {/* Ecosystem Hub - Premium Touch Targets */}
                        <div className="flex flex-col gap-4 w-full max-w-[300px]">
                            <div className="flex items-center gap-3 px-1">
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-neutral-100 dark:via-white/5 to-transparent lg:hidden" />
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-600 whitespace-nowrap">Ecosystem Hub</h4>
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-neutral-100 dark:via-white/5 to-transparent lg:hidden" />
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <InstallFooterItem />
                                <div className="grid grid-cols-2 gap-3">
                                    <motion.button
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => share("apk")}
                                        className="relative group h-12 overflow-hidden rounded-2xl transform-gpu"
                                    >
                                        <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/5 transition-colors group-hover:border-[var(--neon-lime)]/40" />
                                        <div className="relative h-full flex items-center justify-center gap-2.5 px-4">
                                            <div className="p-1.5 rounded-lg bg-[var(--neon-lime)]/10 text-[var(--neon-lime-text)] group-hover:bg-[var(--neon-lime)] group-hover:text-black transition-all">
                                                <Share2 className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-[10px] font-black text-neutral-800 dark:text-neutral-300 tracking-[0.15em] uppercase">APK</span>
                                        </div>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => share("web")}
                                        className="relative group h-12 overflow-hidden rounded-2xl transform-gpu"
                                    >
                                        <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/5 transition-colors group-hover:border-[var(--electric-cyan)]/40" />
                                        <div className="relative h-full flex items-center justify-center gap-2.5 px-4">
                                            <div className="p-1.5 rounded-lg bg-[var(--electric-cyan)]/10 text-[var(--electric-cyan-text)] group-hover:bg-[var(--electric-cyan)] group-hover:text-black transition-all">
                                                <Globe className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-[10px] font-black text-neutral-800 dark:text-neutral-300 tracking-[0.15em] uppercase">WEB</span>
                                        </div>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-600 mb-6 px-1">Quick Links</h3>
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
                                        className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-[var(--neon-lime-text)] transition-all hover:translate-x-1 duration-300 transform-gpu"
                                        prefetch={true}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-600 mb-6 px-1">Resources</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Updates", href: "/updates", external: false },
                                { name: "Suggestions", href: "/suggestions" },
                                { name: "Constitution", href: "/constitution" },
                                { name: "Notion", href: "/resources/notion", external: false },
                                { name: "GitHub", href: "/resources/github", external: false },
                                { name: "Drive", href: "/resources/media-drive", external: false },
                                { name: "Channel", href: "/resources/whatsapp-channel", external: false },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        target={link.external ? "_blank" : undefined}
                                        className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-[var(--neon-lime-text)] transition-all hover:translate-x-1 duration-300 transform-gpu"
                                        prefetch={link.external ? false : true}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter - Mobile Friendly */}
                    <div className="col-span-2 lg:col-span-1 w-full">
                        <div className="relative group p-6 sm:p-7 rounded-[2.5rem] bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-white/5 overflow-hidden transition-all duration-700 transform-gpu">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--neon-lime)]/5 rounded-full blur-3xl" />

                            <div className="relative space-y-4">
                                <div className="space-y-1">
                                    <h3 className="font-black text-xl text-neutral-900 dark:text-white">Stay Updated</h3>
                                    <p className="text-neutral-500 dark:text-neutral-500 text-xs font-medium leading-relaxed">
                                        Join our technical ecosystem for the latest opportunities.
                                    </p>
                                </div>

                                {success ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex items-center gap-3 text-green-500 py-3 bg-green-500/5 rounded-2xl px-4 border border-green-500/10"
                                    >
                                        <Check className="w-5 h-5" />
                                        <span className="text-sm font-bold uppercase tracking-tight">In the loop!</span>
                                    </motion.div>
                                ) : (
                                    <form className="space-y-3" onSubmit={handleSubscribe}>
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[var(--neon-lime)]/50 transition-all font-bold tracking-tight"
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[var(--neon-lime)]/50 transition-all font-bold tracking-tight"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full h-12 rounded-2xl font-black text-xs text-black bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)] shadow-lg shadow-[var(--neon-lime)]/10 hover:shadow-[var(--neon-lime)]/20 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 transform-gpu"
                                        >
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>SUBSCRIBE <Send className="w-3.5 h-3.5" /></>}
                                        </button>
                                    </form>
                                )}
                                {error && (
                                    <p className="text-xs font-bold text-red-500 pl-4">{error}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Connect ecosystem - Adaptive */}
                <div className="mt-8 mb-8 pt-8 border-t border-neutral-200/50 dark:border-white/5">
                    <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-700 mb-8">Connect Ecosystem</p>
                    <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
                        {[
                            { name: "LinkedIn", icon: Linkedin, color: "#0A66C2", href: siteConfig.links.linkedin },
                            { name: "GitHub", icon: Github, color: "var(--neon-lime-text)", href: siteConfig.links.github },
                            { name: "Official", icon: Instagram, color: "#E4405F", href: siteConfig.links.instagram },
                            { name: "Photopia", icon: Instagram, color: "#833AB4", href: siteConfig.links.instagramPhotopia },
                            { name: "Commudle", icon: Users, color: "#6366F1", href: siteConfig.links.commudle },
                            { name: "Channel", icon: WhatsAppIcon, color: "#25D366", href: siteConfig.links.whatsappChannel },
                            { name: "Group", icon: WhatsAppIcon, color: "#25D366", href: siteConfig.links.whatsappGroup },
                            { name: "Links", icon: Link2, color: "var(--electric-cyan-text)", href: siteConfig.links.social },
                        ].map((social) => (
                            <motion.a
                                key={social.name}
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.96 }}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-white/5 hover:border-[var(--neon-lime)]/30 transition-all group transform-gpu"
                            >
                                <social.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" style={{ color: social.color }} />
                                <span className="text-[10px] font-black tracking-wider text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">{social.name}</span>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar - Ultra Clean */}
                <div className="border-t border-neutral-200/50 dark:border-white/5 pt-8">
                    <div className="flex flex-col items-center text-center space-y-2">
                        <Link
                            href="/copyright"
                            className="text-neutral-500 dark:text-neutral-600 text-[10px] sm:text-xs font-mono hover:text-[var(--neon-lime-text)] transition-colors"
                        >
                            © {new Date().getFullYear()} - AI & Machine Learning Club OCT, Bhopal.
                        </Link>
                        <p className="text-neutral-400 dark:text-neutral-700 text-[10px] sm:text-xs font-mono">
                            Architected by{" "}
                            <a
                                href="https://www.linkedin.com/in/umesh-patel-5647b42a4/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-black text-neutral-600 dark:text-neutral-400 hover:text-[var(--neon-lime-text)] transition-all"
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
        const checkIOS = () => {
            if (typeof window !== "undefined") {
                setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
            }
        };
        checkIOS();
    }, []);

    if (isInstalled) return null;
    if (!isInstallable && !isIOS) return null;

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full transform-gpu"
        >
            <Link
                href="/download"
                className="relative group overflow-hidden block w-full rounded-2xl h-12"
            >
                <div className="absolute inset-0 bg-neutral-900 group-hover:bg-neutral-800 transition-colors" />
                <div className="relative h-full flex items-center justify-center gap-3 px-4">
                    <div className="p-1.5 rounded-lg bg-white/10">
                        <Smartphone className="w-3.5 h-3.5 text-[var(--neon-lime)]" />
                    </div>
                    <span className="text-[10px] font-black text-white tracking-[0.2em] uppercase">Install Mobile App</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
        </motion.div>
    );
}

