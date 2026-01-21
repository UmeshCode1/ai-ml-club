"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GradientBorder } from "@/components/ui/gradient-border";
import { useState, useEffect, useCallback, useMemo } from "react";

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
    const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set([0]));

    // Preload images
    const preloadImage = useCallback((index: number) => {
        if (images.length === 0 || imagesLoaded.has(index)) return;
        const img = new window.Image();
        img.src = images[index].url;
        img.onload = () => {
            setImagesLoaded(prev => new Set([...prev, index]));
        };
    }, [images, imagesLoaded]);

    // Auto-rotate images every 3 seconds
    useEffect(() => {
        if (images.length <= 1) return;

        // Preload first few images on mount
        images.slice(0, Math.min(3, images.length)).forEach((_, idx) => preloadImage(idx));

        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => {
                const next = (prev + 1) % images.length;
                preloadImage((next + 1) % images.length); // Preload next
                return next;
            });
        }, 3000);

        return () => clearInterval(timer);
    }, [images.length, images, preloadImage]);

    // Memoize image list to prevent unnecessary re-renders
    const imageList = useMemo(() => images.length > 0 ? images : [
        { $id: 'fallback', name: 'Club Moments', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop' }
    ], [images]);

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
                            The AI &amp; Machine Learning Club at Oriental College of Technology is a student-driven ecosystem dedicated to exploring the frontiers of Artificial Intelligence.
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

                                {/* Image Carousel - Crossfade with stable base layer to prevent flicker */}
                                <div className="absolute inset-0 z-0">
                                    {/* Solid background to prevent bleed-through */}
                                    <div className="absolute inset-0 bg-neutral-950" />

                                    <div className="relative w-full h-full">
                                        {/* Overlay Gradient for readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent z-10" />

                                        {/* Base layer - always shows current image at full opacity */}
                                        <div className="absolute inset-0">
                                            <Image
                                                src={imageList[currentImageIndex]?.url || imageList[0]?.url}
                                                alt={imageList[currentImageIndex]?.name || "Club Moments"}
                                                fill
                                                className="object-cover opacity-70"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                priority
                                                unoptimized
                                            />
                                        </div>

                                        {/* Transition layer - fades in/out on top of base */}
                                        {imageList.map((img, idx) => (
                                            <div
                                                key={img.$id}
                                                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                                                style={{
                                                    opacity: idx === currentImageIndex ? 1 : 0,
                                                    zIndex: idx === currentImageIndex ? 2 : 1,
                                                }}
                                            >
                                                <Image
                                                    src={img.url}
                                                    alt={img.name || "Club Moments"}
                                                    fill
                                                    className="object-cover opacity-70"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    priority={idx === 0}
                                                    unoptimized
                                                />
                                            </div>
                                        ))}
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
