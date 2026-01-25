"use client";
import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search, Rocket, Users, Calendar, Folder, UserCheck, X } from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/config/site";

export const CommandPalette = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // Toggle with Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    const fireConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-neutral-950/80 backdrop-blur-sm flex items-start justify-center pt-[20vh] animate-in fade-in duration-200 p-4">
            <div className="w-full max-w-lg bg-white dark:bg-[#050505] border border-neutral-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative">
                <div className="flex items-center border-b border-neutral-200 dark:border-white/10 px-4">
                    <Search className="w-5 h-5 text-neutral-500 mr-2" />
                    <Command.Input
                        className="w-full bg-transparent border-none py-5 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-0 font-medium"
                        placeholder="Type a command or search..."
                    />
                    <button onClick={() => setOpen(false)} className="p-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <Command.List className="max-h-[350px] overflow-y-auto p-3 hide-scrollbar">
                    <Command.Empty className="p-6 text-center text-neutral-500 text-sm font-medium">No results found.</Command.Empty>

                    <Command.Group heading="Navigation" className="text-neutral-400 dark:text-neutral-500 text-[10px] font-black uppercase tracking-[0.25em] mb-3 px-2">
                        {siteConfig.nav.map((item) => (
                            <Command.Item
                                key={item.path}
                                onSelect={() => runCommand(() => router.push(item.path))}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white cursor-pointer transition-all aria-selected:bg-neutral-100 dark:aria-selected:bg-white/5 aria-selected:text-black dark:aria-selected:text-white group"
                            >
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-white/5 group-hover:bg-[var(--neon-lime)]/20 transition-all">
                                    {item.name === "Home" && <Rocket className="w-4 h-4" />}
                                    {item.name === "Events" && <Calendar className="w-4 h-4" />}
                                    {item.name === "Team" && <Users className="w-4 h-4" />}
                                    {item.name === "Projects" && <Folder className="w-4 h-4" />}
                                    {!["Home", "Events", "Team", "Projects"].includes(item.name) && <Rocket className="w-4 h-4" />}
                                </div>
                                <span className="text-sm font-bold">{item.name} Page</span>
                            </Command.Item>
                        ))}
                    </Command.Group>

                    <Command.Group heading="Systems" className="text-neutral-400 dark:text-neutral-500 text-[10px] font-black uppercase tracking-[0.25em] mt-3 mb-3 px-2">
                        <Command.Item
                            onSelect={() => runCommand(() => {
                                fireConfetti();
                                alert("VICE PRESIDENT ACCESS GRANTED: Umesh Patel 🪙");
                            })}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl text-yellow-600 dark:text-yellow-500 hover:bg-yellow-500/10 cursor-pointer transition-all aria-selected:bg-yellow-500/10 group"
                        >
                            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-yellow-500/5 group-hover:bg-yellow-500/20 transition-all">
                                <UserCheck className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold">Access VP Credentials</span>
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => {
                                window.open(siteConfig.links.commudle, "_blank");
                            })}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 cursor-pointer transition-all aria-selected:bg-blue-500/10 group"
                        >
                            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/5 group-hover:bg-blue-500/20 transition-all">
                                <Rocket className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold">Join Community Portal</span>
                        </Command.Item>
                    </Command.Group>
                </Command.List>

                <div className="border-t border-neutral-200 dark:border-white/10 p-3 flex justify-between items-center text-[10px] text-neutral-500 px-4 bg-neutral-50 dark:bg-[#080808]">
                    <span className="font-mono tracking-tighter uppercase opacity-70">Navigation</span>
                    <div className="flex gap-3 font-mono">
                        <span className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 px-1.5 rounded-md">↑↓</span>
                        <span>to navigate</span>
                        <span className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 px-1.5 rounded-md">↵</span>
                        <span>to select</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
