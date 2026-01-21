"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ImageIcon, FolderOpen, ExternalLink, Filter, Calendar, Share2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { GalleryAlbum } from "@/lib/database";

interface GalleryPageClientProps {
    albums: GalleryAlbum[];
    driveLink: string;
}

type CategoryFilter = "all" | "Workshop" | "Competition" | "Expert Talk" | "Orientation";

export default function GalleryPageClient({ albums, driveLink }: GalleryPageClientProps) {
    const [filter, setFilter] = useState<CategoryFilter>("all");
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const checkDevice = () => setIsMobile(window.innerWidth < 640);
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    const animSettings = {
        duration: prefersReducedMotion ? 0 : (isMobile ? 0.3 : 0.5),
        delay: prefersReducedMotion ? 0 : (isMobile ? 0.05 : 0.08),
    };

    // Filter albums
    const filteredAlbums = filter === "all"
        ? albums
        : albums.filter(a => a.category === filter);

    // Get unique categories
    const categories = ["all", ...new Set(albums.map(a => a.category).filter(Boolean))] as CategoryFilter[];

    // Total photo count
    const totalPhotos = albums.reduce((sum, a) => sum + (a.photoCount || 0), 0);

    return (
        <div className="min-h-screen pt-20 sm:pt-24 md:pt-28 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none">
                <motion.div
                    className="h-full bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)]"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: animSettings.duration }}
                    className="text-center mb-12 flex flex-col items-center"
                >
                    <div className="flex flex-col gap-4 items-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--neon-lime)]/10 border border-[var(--neon-lime)]/20 w-fit">
                            <ImageIcon className="w-3.5 h-3.5 text-[var(--neon-lime-text)]" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--neon-lime-text)]">{albums.length} Active Albums</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter text-center">
                            Event <br /> Chronicle
                        </h1>
                        <div className="max-w-2xl mx-auto">
                            <BlurReveal
                                text="A factual record of our technical workshops, project exhibitions, and community activities. Documenting the collaborative progress and shared milestones of the AIML Club at Oriental College of Technology."
                                className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed font-medium text-center"
                                delay={0.4}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Main CTA Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: animSettings.duration, delay: 0.2 }}
                    className="mb-8"
                >
                    <Link href={driveLink} target="_blank" rel="noopener noreferrer" className="group block">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--neon-lime)]/5 via-[var(--electric-cyan)]/5 to-purple-500/5 border border-[var(--card-border)] hover:border-[var(--neon-lime)]/50 transition-all duration-500 p-5 sm:p-6 md:p-8">
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-lime)]/10 to-[var(--electric-cyan)]/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />

                            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[var(--neon-lime)] to-[var(--electric-cyan)] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                                    <FolderOpen className="w-7 h-7 sm:w-8 sm:h-8 text-black" />
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-[var(--neon-lime-text)] transition-colors">
                                        Open Full Media Drive
                                    </h2>
                                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                                        Browse all {totalPhotos}+ photos organized in separate event folders
                                    </p>
                                </div>
                                <div className="ml-auto">
                                    <MagneticButton>
                                        <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--neon-lime)] text-black font-black text-sm group-hover:shadow-[0_0_20px_var(--neon-lime)] transition-all cursor-pointer">
                                            <span>Browse</span>
                                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </MagneticButton>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: animSettings.duration, delay: 0.3 }}
                    className="flex overflow-x-auto pb-4 gap-4 no-scrollbar px-6 -mx-6 md:px-0 md:mx-0 flex-nowrap items-center min-w-full mb-8"
                >
                    {categories.map((cat) => (
                        <MagneticButton key={cat}>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setFilter(cat)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-[10px] font-black uppercase transition-all whitespace-nowrap border-2 flex-shrink-0 min-w-fit",
                                    filter === cat
                                        ? "bg-neutral-900 dark:bg-white text-white dark:text-black border-transparent"
                                        : "bg-white/80 dark:bg-neutral-900/80 text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-[var(--neon-lime)]"
                                )}
                            >
                                {cat === "all" ? "All Albums" : cat}
                            </motion.button>
                        </MagneticButton>
                    ))}
                </motion.div>

                {/* Albums Grid */}
                <AnimatePresence mode="popLayout">
                    {filteredAlbums.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
                        >
                            {filteredAlbums.map((album, index) => (
                                <motion.div
                                    key={album.$id || album.eventName}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: animSettings.duration, delay: Math.min(index * animSettings.delay, 0.3) }}
                                    whileHover={!isMobile ? { y: -5 } : {}}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        href={album.driveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block h-full"
                                    >
                                        <CardSpotlight
                                            containerClassName="rounded-xl sm:rounded-2xl border border-[var(--card-border)] overflow-hidden hover:border-[var(--neon-lime)]/50 hover:shadow-xl transition-all duration-300"
                                            className="p-0"
                                            color="rgba(0, 240, 255, 0.1)"
                                        >
                                            <div className="relative h-full overflow-hidden">
                                                {/* Poster Image */}
                                                <div className="aspect-[4/3] relative w-full overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
                                                    {album.posterUrl && (
                                                        <Image
                                                            src={album.posterUrl}
                                                            alt={album.eventName}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                        />
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                                    {/* Category Badge */}
                                                    {album.category && (
                                                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                                                            <span className="px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-medium bg-[var(--neon-lime)]/80 text-black">
                                                                {album.category}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Photo Count */}
                                                    {album.photoCount && album.photoCount > 0 && (
                                                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                                                            <span className="px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold bg-black/50 backdrop-blur-sm text-white flex items-center gap-1">
                                                                <ImageIcon className="w-3 h-3" />
                                                                {album.photoCount}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Title on Image */}
                                                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
                                                        <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 group-hover:text-[var(--neon-lime)] transition-colors">
                                                            {album.eventName}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-4 relative z-20">
                                                    {/* Date */}
                                                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[var(--electric-cyan-text)] font-semibold mb-2">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(album.eventDate).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric"
                                                        })}
                                                    </div>

                                                    {/* Description */}
                                                    {album.description && (
                                                        <p className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
                                                            {album.description}
                                                        </p>
                                                    )}

                                                    {/* Actions */}
                                                    <div className="flex items-center justify-between mt-auto">
                                                        <div className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-[var(--neon-lime-text)] group-hover:underline">
                                                            <span>View Album</span>
                                                            <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                        </div>
                                                        <button
                                                            className="p-1.5 rounded-full hover:bg-[var(--electric-cyan)]/10 text-neutral-400 hover:text-[var(--electric-cyan-text)] transition-colors"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                navigator.share({
                                                                    title: album.eventName,
                                                                    text: album.description,
                                                                    url: album.driveLink
                                                                }).catch(() => { });
                                                            }}
                                                        >
                                                            <Share2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardSpotlight>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-16 text-center"
                        >
                            <Filter className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mb-4" />
                            <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                                No albums found
                            </h3>
                            <button
                                onClick={() => setFilter("all")}
                                className="px-5 py-2 bg-[var(--neon-lime)] text-black rounded-full text-sm font-semibold"
                            >
                                View All
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: animSettings.duration, delay: 0.6 }}
                    className="mt-8 sm:mt-12 text-center"
                >
                    <div className="inline-flex flex-wrap justify-center gap-4 sm:gap-8 p-4 sm:p-6 rounded-2xl bg-white/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <div className="text-center px-3 sm:px-4">
                            <div className="text-xl sm:text-2xl font-bold text-[var(--neon-lime-text)]">{albums.length}</div>
                            <div className="text-[10px] sm:text-xs text-neutral-500">Albums</div>
                        </div>
                        <div className="w-px bg-neutral-200 dark:bg-neutral-700" />
                        <div className="text-center px-3 sm:px-4">
                            <div className="text-xl sm:text-2xl font-bold text-[var(--electric-cyan-text)]">{totalPhotos}+</div>
                            <div className="text-[10px] sm:text-xs text-neutral-500">Photos</div>
                        </div>
                        <div className="w-px bg-neutral-200 dark:bg-neutral-700" />
                        <div className="text-center px-3 sm:px-4">
                            <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">HD</div>
                            <div className="text-[10px] sm:text-xs text-neutral-500">Quality</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
