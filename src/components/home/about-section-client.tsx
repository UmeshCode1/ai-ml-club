"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GradientBorder } from "@/components/ui/gradient-border";
import { useState, useEffect, useCallback } from "react";

const tags = [
    "Workshops",
    "Hackathons",
    "Research",
    "Networking"
];

interface AboutSectionClientProps {
    images: { $id: string; name: string; url: string }[];
}

export function AboutSectionClient({ images }: AboutSectionClientProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload next image
    const preloadImage = useCallback((index: number) => {
        if (images.length === 0) return;
        const nextIndex = (index + 1) % images.length;
        const img = new window.Image();
        img.src = images[nextIndex].url;
    }, [images]);

    // Auto-rotate images every 3 seconds with smooth transition
    useEffect(() => {
        if (images.length <= 1) return;

        // Preload first few images on mount
        images.slice(0, 3).forEach((_, idx) => preloadImage(idx));

        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => {
                const next = (prev + 1) % images.length;
                preloadImage(next); // Preload next image
                return next;
            });
        }, 3000); // 3 seconds per image

        return () => clearInterval(timer);
    }, [images.length, images, preloadImage]);

    // Current image URL
    const currentImage = images.length > 0
        ? images[currentImageIndex].url
        : "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop";

    return (
        <section className="py-24 md:py-32 relative z-10 bg-transparent overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-start"
                    >
                        {/* EST Badge */}
                        <div className="inline-block px-4 py-1.5 rounded-full border border-[var(--neon-lime)]/40 bg-[var(--neon-lime)]/5 text-[var(--neon-lime-text)] text-xs font-bold uppercase tracking-widest mb-8">
                            EST. 2025
                        </div>

                        {/* Title */}
                        <h2 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-8 tracking-tight">
                            About <span className="text-[var(--neon-lime-text)]">AIML Club</span>
                        </h2>

                        {/* Paragraphs */}
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                            The AI & Machine Learning Club at Oriental College of Technology is a student-driven ecosystem dedicated to exploring the frontiers of Artificial Intelligence.
                        </p>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
                            We don&apos;t just learn; we build. From workshops and hackathons to real-world projects, we provide the platform for students to turn theoretical knowledge into practical innovation.
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-3">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-5 py-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:border-[var(--neon-lime)] hover:text-[var(--neon-lime-text)] transition-colors cursor-default"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Content - Club Moments Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full aspect-video md:aspect-[4/3] lg:aspect-square max-h-[500px]"
                    >
                        <GradientBorder
                            containerClassName="w-full h-full rounded-3xl"
                            className="w-full h-full bg-[#050505] p-1 flex flex-col relative overflow-hidden"
                            borderWidth={1}
                            duration={10}
                        >
                            {/* Top Gradient Line (Progress Bar look) */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--neon-lime)] to-transparent opacity-50" />

                            {/* Inner Terminal Content */}
                            <div className="relative w-full h-full rounded-[20px] bg-neutral-950/50 flex flex-col justify-end p-8 overflow-hidden group">

                                {/* Background Grid */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />

                                {/* Image Carousel with Smooth Crossfade */}
                                <div className="absolute inset-0 z-0">
                                    <div className="relative w-full h-full">
                                        {/* Overlay Gradient for readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent z-10" />

                                        {/* Loading Placeholder */}
                                        {!isLoaded && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                                                <div className="w-8 h-8 border-2 border-[var(--neon-lime)] border-t-transparent rounded-full animate-spin" />
                                            </div>
                                        )}

                                        {/* Smooth Crossfade Images */}
                                        <AnimatePresence mode="sync">
                                            <motion.div
                                                key={currentImageIndex}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                                className="absolute inset-0"
                                            >
                                                <Image
                                                    src={currentImage}
                                                    alt="Club Moments"
                                                    fill
                                                    className="object-cover opacity-70"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    priority={currentImageIndex === 0}
                                                    onLoad={() => setIsLoaded(true)}
                                                    unoptimized
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className="relative z-10">
                                    <div className="w-8 h-1 bg-[var(--neon-lime)] mb-4 shadow-[0_0_10px_var(--neon-lime)]" />
                                    <h3 className="text-2xl font-bold text-white mb-1">Club Moments</h3>
                                    <p className="text-sm text-neutral-400">Capturing our journey of innovation</p>
                                </div>

                            </div>
                        </GradientBorder>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
