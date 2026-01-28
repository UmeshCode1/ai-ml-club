"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GradientBorder } from "@/components/ui/gradient-border";
import { useState, useEffect, useMemo } from "react";

const tags = [
    "Applied Research",
    "Competitive Engineering",
    "Technical Workshops",
    "Strategic Networking"
];

interface AboutSectionClientProps {
    images: { $id: string; name: string; url: string }[];
}

const CrossfadeImage = ({ src, alt, isActive, priority }: { src: string; alt: string; isActive: boolean; priority: boolean }) => (
    <div
        className="absolute inset-0 transition-opacity duration-[800ms] ease-in-out will-change-opacity"
        style={{ opacity: isActive ? 1 : 0 }}
    >
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            priority={priority}
            loading={priority ? undefined : "lazy"}
        />
    </div>
);

export function AboutSectionClient({ images }: AboutSectionClientProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [nextImageIndex, setNextImageIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Memoize image list to prevent unnecessary re-renders
    const imageList = useMemo(() => images.length > 0 ? images : [
        { $id: 'fallback', name: 'Club Moments', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop' }
    ], [images]);

    // Auto-rotate images with smooth crossfade
    useEffect(() => {
        if (imageList.length <= 1) return;

        const rotateTrigger = setInterval(() => {
            setIsTransitioning(true);
            const next = (currentImageIndex + 1) % imageList.length;
            setNextImageIndex(next);

            // Wait for transition before updating current
            setTimeout(() => {
                setCurrentImageIndex(next);
                setIsTransitioning(false);
            }, 800);
        }, 5000); // 5s for even better stability

        return () => clearInterval(rotateTrigger);
    }, [imageList.length, currentImageIndex, imageList]);

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
                        <h2 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-8 tracking-tighter">
                            Technical Leadership <br />
                            <span className="text-[var(--neon-lime-text)]">&amp; Research</span>
                        </h2>

                        {/* Paragraphs */}
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed font-medium">
                            The AI &amp; Machine Learning Club is the flagship technical body of Oriental College of Technology (OCT), Bhopal. Founded on the principles of academic rigor and industrial application, we serve as a structured environment for the next generation of engineers and researchers.
                        </p>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed font-medium">
                            Our methodology emphasizes learning through building and collaborative research. By fostering an environment of technical discipline and intent, we bridge the gap between classroom theory and real-world machine learning deployment.
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
                            className="w-full h-full bg-neutral-950 p-1 flex flex-col relative overflow-hidden"
                            borderWidth={1}
                            duration={10}
                        >
                            {/* Inner Terminal Content */}
                            <div className="relative w-full h-full rounded-[20px] bg-neutral-950 overflow-hidden">

                                {/* Solid background - prevents any bleed-through */}
                                <div className="absolute inset-0 bg-neutral-950 z-0" />

                                {/* Background Grid */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none z-[1]" />

                                {/* Image Container with stable layers */}
                                <div className="absolute inset-0 z-[2]">
                                    {/* Current Image */}
                                    <CrossfadeImage
                                        src={imageList[currentImageIndex]?.url || imageList[0]?.url}
                                        alt={imageList[currentImageIndex]?.name || "Club Moments"}
                                        isActive={!isTransitioning}
                                        priority={currentImageIndex === 0} // Only first image in the whole lifecycle gets priority
                                    />

                                    {/* Next Image (fades in during transition) */}
                                    {isTransitioning && (
                                        <CrossfadeImage
                                            src={imageList[nextImageIndex]?.url || imageList[0]?.url}
                                            alt={imageList[nextImageIndex]?.name || "Club Moments"}
                                            isActive={true}
                                            priority={false}
                                        />
                                    )}

                                    {/* Dim overlay - reduces brightness and prevents flash */}
                                    <div className="absolute inset-0 bg-neutral-950/40 z-[3]" />
                                </div>

                                {/* Gradient Overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent z-[4]" />

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-[5]">
                                    <div className="w-8 h-1 bg-[var(--neon-lime)] mb-4 shadow-[0_0_10px_var(--neon-lime)]" />
                                    <h3 className="text-xl sm:text-2xl font-black text-white mb-1 tracking-tight">Practical Implementation</h3>
                                    <p className="text-xs sm:text-sm text-neutral-400 font-medium lowercase tracking-wider">Mentorship and collaboration in a focused academic setting.</p>

                                    {/* Image indicator dots */}
                                    {imageList.length > 1 && (
                                        <div className="flex gap-1.5 mt-4">
                                            {imageList.slice(0, 6).map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex
                                                        ? 'bg-[var(--neon-lime)] w-4'
                                                        : 'bg-neutral-600'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>
                        </GradientBorder>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

