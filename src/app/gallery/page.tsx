"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { ExternalLink, FolderOpen, Image as ImageIcon, Calendar, Users, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";

// Event folders available in Drive
const eventFolders = [
    { name: "Expert Talk - Coding Thinker", icon: Users, date: "Aug 2025" },
    { name: "DSPL Session & Workshop", icon: Calendar, date: "Sep 2025" },
    { name: "Apfity Competition", icon: Trophy, date: "Oct 2025" },
    { name: "Codify Competition", icon: Trophy, date: "Nov 2025" },
    { name: "Expert Talk - Reinforcement Learning", icon: Users, date: "Nov 2025" },
    { name: "WordPress Tour Workshop", icon: Calendar, date: "Dec 2025" },
    { name: "Core Team Orientation", icon: Users, date: "Dec 2025" },
];

export default function GalleryPage() {
    const driveLink = siteConfig.links.drive;

    return (
        <div className="min-h-screen pt-20 sm:pt-24 md:pt-28 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring" }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--neon-lime)]/10 border border-[var(--neon-lime)]/30 rounded-full mb-4"
                    >
                        <ImageIcon className="w-4 h-4 text-[var(--neon-lime-text)]" />
                        <span className="text-xs font-semibold text-[var(--neon-lime-text)]">Event Photos & Media</span>
                    </motion.div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-neutral-50 dark:to-neutral-500 mb-3 sm:mb-4">
                        Media Gallery
                    </h1>
                    <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
                        Explore photos and memories from all our events, organized by event
                    </p>
                </motion.div>

                {/* Main CTA Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8 sm:mb-12"
                >
                    <Link
                        href={driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                    >
                        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[var(--neon-lime)]/5 via-[var(--electric-cyan)]/5 to-purple-500/5 border border-[var(--card-border)] hover:border-[var(--neon-lime)]/50 transition-all duration-500 p-6 sm:p-8 md:p-10">
                            {/* Animated Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-lime)]/10 to-[var(--electric-cyan)]/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />

                            {/* Floating Sparkles */}
                            <motion.div
                                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6"
                            >
                                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--neon-lime)]/30" />
                            </motion.div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[var(--neon-lime)] to-[var(--electric-cyan)] flex items-center justify-center shadow-2xl shadow-[var(--neon-lime)]/20 group-hover:scale-110 transition-transform duration-300">
                                        <FolderOpen className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-[var(--neon-lime-text)] transition-colors">
                                        Open Media Drive
                                    </h2>
                                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-4">
                                        Browse all event photos organized in separate folders. High-quality images from workshops, competitions, and more!
                                    </p>
                                    <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[var(--neon-lime)] text-black font-semibold text-sm sm:text-base group-hover:shadow-lg group-hover:shadow-[var(--neon-lime)]/30 transition-all">
                                        <span>Browse Gallery</span>
                                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Event Folders Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-4 sm:mb-6 text-center">
                        Available Event Folders
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {eventFolders.map((folder, index) => (
                            <motion.div
                                key={folder.name}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href={driveLink}
                                    target="_blank"
                                    className="block p-4 rounded-xl bg-white/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-[var(--neon-lime)]/50 transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-[var(--neon-lime)]/10 flex items-center justify-center group-hover:bg-[var(--neon-lime)]/20 transition-colors">
                                            <folder.icon className="w-5 h-5 text-[var(--neon-lime-text)]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white truncate group-hover:text-[var(--neon-lime-text)] transition-colors">
                                                {folder.name}
                                            </h4>
                                            <p className="text-xs text-neutral-500">{folder.date}</p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="mt-8 sm:mt-12 text-center"
                >
                    <div className="inline-flex flex-wrap justify-center gap-4 sm:gap-8 p-4 sm:p-6 rounded-2xl bg-white/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <div className="text-center px-4">
                            <div className="text-2xl sm:text-3xl font-bold text-[var(--neon-lime-text)]">{eventFolders.length}+</div>
                            <div className="text-xs sm:text-sm text-neutral-500">Event Folders</div>
                        </div>
                        <div className="w-px bg-neutral-200 dark:bg-neutral-700 hidden sm:block" />
                        <div className="text-center px-4">
                            <div className="text-2xl sm:text-3xl font-bold text-[var(--electric-cyan-text)]">100+</div>
                            <div className="text-xs sm:text-sm text-neutral-500">Photos</div>
                        </div>
                        <div className="w-px bg-neutral-200 dark:bg-neutral-700 hidden sm:block" />
                        <div className="text-center px-4">
                            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">HD</div>
                            <div className="text-xs sm:text-sm text-neutral-500">Quality</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
