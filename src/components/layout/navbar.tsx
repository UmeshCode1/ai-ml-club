"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePWAInstall } from "@/hooks/use-pwa-install";

import { Variants } from "framer-motion";
import { Menu, X, ChevronDown, MessageSquare, Book, HardDrive, MessageCircle, PenTool, NotebookText, Github, Smartphone } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MagneticButton } from "@/components/ui/magnetic-button";

import { siteConfig } from "@/config/site";
import { useHaptic } from "@/hooks/use-haptic";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const pathname = usePathname();
    const { trigger } = useHaptic();
    const { scrollToId } = useSmoothScroll();

    // Custom nav links for this layout
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Team", path: "/team" },
        { name: "Events", path: "/events" },
        { name: "Gallery", path: "/gallery" },
        {
            name: "Resources",
            path: "#",
            children: [
                { name: "Latest Updates", path: siteConfig.links.info, external: true, icon: MessageSquare },
                { name: "Suggestion Box", path: "/suggestions", icon: MessageSquare },
                { name: "Constitution", path: "/constitution", icon: Book },
                { name: "Notion Workspace", path: "https://aimlcluboct.notion.site/Home-d08e0983dce94b2f81ca1b5082771061", external: true, icon: NotebookText },
                { name: "GitHub Org", path: "https://github.com/aimlcluboct", external: true, icon: Github },
                { name: "Media Drive", path: "https://drive.google.com/drive/folders/155hvNMdI83jLOUUZs4U7WaivtRdFsqb4?usp=sharing", external: true, icon: HardDrive },
                { name: "WhatsApp Channel", path: "https://whatsapp.com/channel/0029VbAthv38V0tfulumuV1D", external: true, icon: MessageCircle },
                { name: "Blog", path: "/blog", icon: PenTool }
            ]
        },
        { name: "Contact", path: "/contact" },
    ];

    const dropdownVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 15,
            scale: 0.95,
            transition: {
                staggerChildren: 0.03,
                staggerDirection: -1,
                ease: [0.16, 1, 0.3, 1]
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -10, y: 5 },
        visible: { opacity: 1, x: 0, y: 0 }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.2 }}
            className="fixed top-5 inset-x-0 mx-auto w-max max-w-[calc(100vw-2rem)] md:max-w-max z-50 px-2 sm:px-0"
        >
            <div className="flex items-center gap-3 md:gap-4 px-3 sm:px-4 h-12 sm:h-14 rounded-full border border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300">

                {/* Logos & Identity */}
                <Link href="/" className="flex items-center gap-3 md:gap-4 pr-4 group">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src="/aiml-club-logo-new.png"
                                alt="AIML Club"
                                fill
                                sizes="48px"
                                priority
                                className="object-contain"
                            />
                        </div>
                        <div className="h-8 w-[1px] bg-black/10 dark:bg-white/10" />
                        <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src="/college-logo-new.png"
                                alt="OCT Bhopal"
                                fill
                                sizes="48px"
                                priority
                                className="object-contain drop-shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-col">
                        <span className="font-bold text-base leading-none text-neutral-900 dark:text-white tracking-tight group-hover:text-[var(--neon-lime-text)] transition-colors mb-0.5">
                            AIML CLUB
                        </span>
                        <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium tracking-wide leading-none">
                            Oriental College Of Technology, Bhopal
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav Items */}
                <div className="hidden md:flex items-center px-4 gap-1">
                    {navLinks.map((item) => {
                        const isActive = pathname === item.path || (item.children && item.children.some(child => pathname === child.path));

                        if (item.children) {
                            return (
                                <div
                                    key={item.name}
                                    className="relative group"
                                    onMouseEnter={() => setHoveredPath(item.name)}
                                    onMouseLeave={() => setHoveredPath(null)}
                                >
                                    <button
                                        className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${isActive ? "text-[var(--neon-lime-text)]" : "text-neutral-600 dark:text-neutral-400 hover:text-[var(--neon-lime-text)]"}`}
                                    >
                                        {item.name}
                                        <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredPath === item.name ? "rotate-180" : ""}`} />
                                    </button>

                                    <AnimatePresence>
                                        {hoveredPath === item.name && (
                                            <motion.div
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                variants={dropdownVariants}
                                                className="absolute top-full left-0 w-64 pt-4"
                                            >
                                                <div className="bg-white/80 dark:bg-[#0b0b0b]/90 border border-neutral-200 dark:border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl flex flex-col gap-1 overflow-hidden">
                                                    {item.children.map(child => (
                                                        <motion.div key={child.path} variants={itemVariants}>
                                                            <Link
                                                                href={child.path}
                                                                target={child.external ? "_blank" : undefined}
                                                                className="group/item flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                                                            >
                                                                <div className="flex-shrink-0 p-2 rounded-lg bg-neutral-100 dark:bg-white/5 group-hover/item:bg-[var(--neon-lime)]/20 transition-colors">
                                                                    <child.icon className="w-4 h-4 text-neutral-500 group-hover/item:text-[var(--neon-lime-text)] transition-colors" />
                                                                </div>
                                                                <div>
                                                                    <span className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover/item:text-neutral-900 dark:group-hover/item:text-white transition-colors">
                                                                        {child.name}
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onMouseEnter={() => setHoveredPath(item.path)}
                                onMouseLeave={() => setHoveredPath(null)}
                                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${isActive ? "text-[var(--neon-lime-text)]" : "text-neutral-600 dark:text-neutral-400 hover:text-[var(--neon-lime-text)]"}`}
                            >
                                {hoveredPath === item.path && (
                                    <motion.span
                                        layoutId="navbar-hover"
                                        className="absolute inset-0 bg-white/10 dark:bg-white/5 rounded-full -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {isActive && (
                                    <span className="absolute inset-x-2 -bottom-1 h-px bg-gradient-to-r from-transparent via-[var(--neon-lime-text)] to-transparent opacity-50" />
                                )}
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pl-4 border-l border-white/10 ml-2">
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                    </div>
                    <MagneticButton>
                        <button
                            onClick={() => scrollToId("newsletter", 2500)}
                            className="hidden md:flex relative overflow-hidden items-center px-6 py-2.5 text-sm font-bold text-[var(--background)] bg-[var(--neon-lime)] rounded-full group hover:shadow-[0_0_20px_var(--neon-lime)] transition-shadow duration-300"
                        >
                            <span className="relative z-10">Join</span>
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />
                        </button>
                    </MagneticButton>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => { setIsOpen(!isOpen); trigger(); }}
                        className="md:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:text-[var(--neon-lime-text)]"
                        aria-label="Toggle mobile menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Dropdown (Floating below) */}
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, y: 20, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(10px)" }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            mass: 0.8
                        }}
                        className="fixed top-[70px] inset-x-6 z-40"
                    >
                        <div className="relative overflow-hidden bg-white/95 dark:bg-neutral-900/95 border-2 border-neutral-200 dark:border-white/10 rounded-[2.5rem] p-4 shadow-[0_30px_60px_rgba(0,0,0,0.3)] backdrop-blur-3xl max-h-[70vh] overflow-y-auto hide-scrollbar">
                            {/* Technical Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

                            <div className="relative z-10 flex flex-col gap-2">
                                {navLinks.map((item, idx) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 + idx * 0.04 }}
                                    >
                                        {item.children ? (
                                            <div className="px-4 py-4 mb-2">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="h-[1px] w-4 bg-[var(--neon-lime)]/50" />
                                                    <span className="text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.3em]">{item.name}</span>
                                                </div>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {item.children.map(child => (
                                                        <Link
                                                            key={child.path}
                                                            href={child.path}
                                                            target={child.external ? "_blank" : undefined}
                                                            onClick={() => { setIsOpen(false); trigger(); }}
                                                            className="group flex items-center gap-5 px-5 py-4 text-base font-bold text-neutral-800 dark:text-neutral-100 hover:text-[var(--neon-lime-text)] hover:bg-black/5 dark:hover:bg-white/5 rounded-3xl transition-all"
                                                        >
                                                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-2xl bg-neutral-100 dark:bg-white/5 group-hover:bg-[var(--neon-lime)]/20 transition-all group-hover:scale-110 shadow-sm">
                                                                <child.icon className="w-5 h-5 text-neutral-500 dark:text-neutral-400 group-hover:text-[var(--neon-lime-text)] transition-colors" />
                                                            </div>
                                                            {child.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.path}
                                                onClick={() => { setIsOpen(false); trigger(); }}
                                                className="block px-8 py-5 text-lg font-black text-neutral-900 dark:text-white hover:text-[var(--neon-lime-text)] hover:bg-black/5 dark:hover:bg-white/5 rounded-[2rem] transition-all"
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Mobile Actions Section */}
                            <div className="mt-6 p-4 pt-6 border-t border-neutral-200 dark:border-white/10 flex flex-col gap-4 relative z-10">
                                <InstallMenuItem />
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        trigger();
                                        scrollToId("newsletter", 2500);
                                    }}
                                    className="w-full relative overflow-hidden flex items-center justify-center px-8 py-5 text-lg font-black text-black bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)] rounded-[2rem] group active:scale-[0.96] transition-transform shadow-[0_10px_20px_rgba(212,255,0,0.2)]"
                                >
                                    <span className="relative z-10 drop-shadow-sm">Join the Club</span>
                                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent z-0" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

function InstallMenuItem() {
    const { install, isInstalled, isInstallable } = usePWAInstall();
    const { trigger } = useHaptic();

    // Hides if:
    // 1. Already installed
    // 2. Not installable yet (browser hasn't fired event)
    if (isInstalled || !isInstallable) return null;

    return (
        <button
            onClick={() => {
                trigger();
                install();
            }}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 text-base font-black text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-white/5 border-2 border-neutral-200 dark:border-white/10 rounded-2xl hover:bg-neutral-200 dark:hover:bg-white/10 active:scale-[0.98] transition-all font-mono shadow-sm"
        >
            <Smartphone className="w-5 h-5" />
            <span>Install App</span>
        </button>
    );
}
