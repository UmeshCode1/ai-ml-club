"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, BookOpen, Users, Settings, Share2, Home, Calendar, Menu } from "lucide-react";
import { useHaptic } from "@/hooks/use-haptic";
import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export function BottomNav() {
    const pathname = usePathname();
    const { trigger } = useHaptic();
    const { theme, setTheme } = useTheme();
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Events", href: "/events", icon: Calendar },
        { name: "Learn", href: "/resources", icon: BookOpen },
        { name: "Team", href: "/team", icon: Users },
        { name: "More", href: "#", icon: Menu, action: () => setIsMoreOpen(true) },
    ];

    return (
        <>
            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 hidden standalone:block pb-[env(safe-area-inset-bottom)] bg-white/90 dark:bg-[#050505]/90 backdrop-blur-xl border-t border-black/5 dark:border-white/10">
                <div className="flex justify-around items-center h-16">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <button
                                key={item.name}
                                onClick={(e) => {
                                    trigger();
                                    if (item.action) {
                                        e.preventDefault();
                                        item.action();
                                    } else if (item.href) {
                                        // Next Link handling manually if needed or just wrapping
                                    }
                                }}
                                className="relative flex flex-col items-center justify-center w-full h-full gap-1 active:scale-90 transition-transform duration-200"
                            >
                                {item.href !== "#" ? (
                                    <Link href={item.href} className="flex flex-col items-center justify-center w-full h-full">
                                        <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-[var(--neon-lime)]/10 text-[var(--neon-lime-text)]' : 'text-neutral-500 dark:text-neutral-400'}`}>
                                            <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                                        </div>
                                        <span className={`text-[10px] font-medium leading-none mt-1 ${isActive ? 'text-[var(--neon-lime-text)] font-bold' : 'text-neutral-500'}`}>
                                            {item.name}
                                        </span>
                                    </Link>
                                ) : (
                                    <div className="flex flex-col items-center justify-center w-full h-full">
                                        <div className={`p-1.5 rounded-xl transition-colors ${isMoreOpen ? 'bg-[var(--neon-lime)]/10 text-[var(--neon-lime-text)]' : 'text-neutral-500 dark:text-neutral-400'}`}>
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <span className={`text-[10px] font-medium leading-none mt-1 ${isMoreOpen ? 'text-[var(--neon-lime-text)]' : 'text-neutral-500'}`}>
                                            {item.name}
                                        </span>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* More Menu Sheet */}
            <AnimatePresence>
                {isMoreOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMoreOpen(false)}
                            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm hidden standalone:block"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-[#0A0A0A] rounded-t-[2rem] p-6 pb-12 hidden standalone:block border-t border-white/10"
                        >
                            <div className="w-12 h-1.5 bg-neutral-200 dark:bg-white/10 rounded-full mx-auto mb-8" />

                            <div className="grid grid-cols-2 gap-4">
                                <Link
                                    href="/constitution"
                                    onClick={() => { setIsMoreOpen(false); trigger(); }}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-100 dark:bg-white/5 active:scale-95 transition-transform"
                                >
                                    <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-500">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-neutral-900 dark:text-white">Constitution</h3>
                                        <p className="text-xs text-neutral-500">Club Charter</p>
                                    </div>
                                </Link>

                                <Link
                                    href="/suggestions"
                                    onClick={() => { setIsMoreOpen(false); trigger(); }}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-100 dark:bg-white/5 active:scale-95 transition-transform"
                                >
                                    <div className="p-3 rounded-full bg-pink-500/10 text-pink-500">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-neutral-900 dark:text-white">Suggestions</h3>
                                        <p className="text-xs text-neutral-500">Feedback Box</p>
                                    </div>
                                </Link>

                                <Link
                                    href="/contact"
                                    onClick={() => { setIsMoreOpen(false); trigger(); }}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-100 dark:bg-white/5 active:scale-95 transition-transform"
                                >
                                    <div className="p-3 rounded-full bg-purple-500/10 text-purple-500">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-neutral-900 dark:text-white">Contact Us</h3>
                                        <p className="text-xs text-neutral-500">Get in Touch</p>
                                    </div>
                                </Link>

                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => {
                                            setTheme(theme === "dark" ? "light" : "dark");
                                            trigger();
                                        }}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-100 dark:bg-white/5 active:scale-95 transition-transform w-full"
                                    >
                                        <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
                                            <Settings className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-bold text-neutral-900 dark:text-white">Appearance</h3>
                                            <p className="text-xs text-neutral-500">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                                        </div>
                                    </button>
                                </div>

                                <Link
                                    href="/download"
                                    onClick={() => { setIsMoreOpen(false); trigger(); }}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-100 dark:bg-white/5 active:scale-95 transition-transform col-span-2"
                                >
                                    <div className="p-3 rounded-full bg-green-500/10 text-green-500">
                                        <Share2 className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-neutral-900 dark:text-white">Share / Install</h3>
                                        <p className="text-xs text-neutral-500">Spread the word</p>
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
