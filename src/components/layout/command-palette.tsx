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
        <div className="fixed inset-0 z-[100] bg-neutral-950/80 backdrop-blur-sm flex items-start justify-center pt-[20vh] animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative">
                <div className="flex items-center border-b border-neutral-200 dark:border-neutral-800 px-3">
                    <Search className="w-5 h-5 text-neutral-500 mr-2" />
                    <Command.Input
                        className="w-full bg-transparent border-none p-4 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-0"
                        placeholder="Type a command or search..."
                    />
                    <button onClick={() => setOpen(false)} className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <Command.List className="max-h-[300px] overflow-y-auto p-2">
                    <Command.Empty className="p-4 text-center text-neutral-500">No results found.</Command.Empty>

                    <Command.Group heading="Navigation" className="text-neutral-500 text-xs font-bold mb-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:uppercase">
                        {siteConfig.nav.map((item) => (
                            <Command.Item
                                key={item.path}
                                onSelect={() => runCommand(() => router.push(item.path))}
                                className="flex items-center gap-2 px-2 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white cursor-pointer transition-colors aria-selected:bg-neutral-100 aria-selected:text-black dark:aria-selected:bg-neutral-900 dark:aria-selected:text-white"
                            >
                                {item.name === "Home" && <Rocket className="w-4 h-4" />}
                                {item.name === "Events" && <Calendar className="w-4 h-4" />}
                                {item.name === "Team" && <Users className="w-4 h-4" />}
                                {item.name === "Projects" && <Folder className="w-4 h-4" />}
                                <span className="text-sm font-medium ml-2">{item.name} Page</span>
                            </Command.Item>
                        ))}
                    </Command.Group>

                    <Command.Group heading="Systems" className="text-neutral-500 text-xs font-bold mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:uppercase">
                        <Command.Item
                            onSelect={() => runCommand(() => {
                                fireConfetti();
                                alert("VICE PRESIDENT ACCESS GRANTED: Umesh Patel 🪙");
                            })}
                            className="flex items-center gap-2 px-2 py-2 rounded-lg text-yellow-600 dark:text-yellow-500 hover:bg-yellow-500/10 cursor-pointer transition-colors aria-selected:bg-yellow-500/10"
                        >
                            <UserCheck className="w-4 h-4" />
                            <span className="text-sm font-medium ml-2">Access VP Credentials</span>
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => {
                                window.open(siteConfig.links.commudle, "_blank");
                            })}
                            className="flex items-center gap-2 px-2 py-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 cursor-pointer transition-colors aria-selected:bg-blue-500/10"
                        >
                            <Rocket className="w-4 h-4" />
                            <span className="text-sm font-medium ml-2">Join Community Portal</span>
                        </Command.Item>
                    </Command.Group>
                </Command.List>

                <div className="border-t border-neutral-200 dark:border-neutral-800 p-2 flex justify-between items-center text-[10px] text-neutral-500 px-3 bg-neutral-50 dark:bg-neutral-950">
                    <span>Navigation</span>
                    <div className="flex gap-2">
                        <span className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-1 rounded">↑↓</span>
                        <span>to navigate</span>
                        <span className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-1 rounded">↵</span>
                        <span>to select</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
