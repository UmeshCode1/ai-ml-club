"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Mail, Linkedin, Github } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { GradientBorder } from "@/components/ui/gradient-border";

// Mock data
const teamMembers = [
    { name: "Prince Kumar", role: "President", image: "" },
    { name: "Shambhavi Mishra", role: "Vice President", image: "" },
    { name: "Ankit Sharma", role: "Tech Lead", image: "" },
    { name: "Riya Patel", role: "Event Lead", image: "" },
    { name: "Aryan Gupta", role: "Creative Lead", image: "" },
];

export function TeamSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    };

    return (
        <section className="py-24 bg-transparent relative z-10 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="inline-block px-3 py-1 rounded-full bg-[var(--neon-lime)]/10 text-[var(--neon-lime-text)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--neon-lime)]/20">
                    The Visionaries
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
                    Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--electric-cyan-text)] to-[var(--neon-lime-text)]">Team</span>
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-16">
                    The passionate individuals driving innovation and excellence at OCT.
                </p>

                {/* Carousel UI */}
                <div className="relative max-w-6xl mx-auto flex items-center justify-center gap-2 md:gap-8">

                    {/* Prev Button */}
                    <button
                        onClick={prevSlide}
                        className="p-2 md:p-4 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-neutral-200 dark:border-white/10 hover:bg-[var(--electric-cyan)] hover:text-black hover:border-[var(--electric-cyan)] transition-all z-20 text-neutral-600 dark:text-neutral-300"
                        aria-label="Previous Member"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex-1 overflow-visible relative min-h-[450px] flex items-center justify-center">
                        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
                            <AnimatePresence mode="popLayout">
                                {teamMembers.map((member, index) => {
                                    // Calculate relative position logic
                                    // This simple logic works well for small lists
                                    let offset = index - activeIndex;
                                    if (offset < -2) offset += teamMembers.length;
                                    if (offset > 2) offset -= teamMembers.length;

                                    // For standard carousel feel with wrap-around
                                    /* 
                                       We need to know if this specific index is 'active', 'prev', or 'next'
                                       in a circular buffer sense relative to activeIndex.
                                    */
                                    const isActive = index === activeIndex;
                                    const isPrev = index === (activeIndex - 1 + teamMembers.length) % teamMembers.length;
                                    const isNext = index === (activeIndex + 1) % teamMembers.length;

                                    // Determine visibility
                                    if (!isActive && !isPrev && !isNext) return null;

                                    // Responsive config
                                    const xOffset = isMobile ? (isActive ? 0 : 0) : (isActive ? 0 : (isPrev ? -280 : 280));
                                    const scale = isActive ? 1 : 0.8;
                                    const opacity = isActive ? 1 : (isMobile ? 0 : 0.4);
                                    const zIndex = isActive ? 10 : 0;

                                    // On mobile, only show active. Prev/Next hidden to save space or simulated behind
                                    if (isMobile && !isActive) return null;

                                    return (
                                        <motion.div
                                            key={member.name}
                                            initial={false}
                                            animate={{
                                                x: xOffset,
                                                scale: scale,
                                                opacity: opacity,
                                                zIndex: zIndex,
                                                filter: isActive ? 'blur(0px)' : 'blur(4px)',
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-64 md:w-80`}
                                        >
                                            <div className="relative group w-full aspect-[4/5] mb-6">
                                                <GradientBorder
                                                    containerClassName={`w-full h-full rounded-3xl transition-all duration-500 ${isActive ? 'shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.05)]' : ''}`}
                                                    className="bg-[var(--card-bg)] backdrop-blur-xl rounded-3xl flex items-center justify-center overflow-hidden"
                                                    borderWidth={isActive ? 2 : 1}
                                                    duration={isActive ? 4 : 10}
                                                >
                                                    {member.image ? (
                                                        <Image
                                                            src={member.image}
                                                            alt={member.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                                                            <span className="text-4xl font-bold text-neutral-300 dark:text-neutral-700">
                                                                {member.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Social Overlay (Only on Active) */}
                                                    {isActive && (
                                                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/60 backdrop-blur-md flex justify-center gap-4">
                                                            <button className="p-2 rounded-full bg-white text-black hover:bg-[var(--neon-lime)] transition-colors">
                                                                <Linkedin className="w-4 h-4" />
                                                            </button>
                                                            <button className="p-2 rounded-full bg-white text-black hover:bg-[var(--electric-cyan)] transition-colors">
                                                                <Github className="w-4 h-4" />
                                                            </button>
                                                            <button className="p-2 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors">
                                                                <Mail className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </GradientBorder>
                                            </div>

                                            <div className="text-center">
                                                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
                                                    {member.name}
                                                </h3>
                                                <span className={`text-sm tracking-widest uppercase font-semibold ${isActive ? 'text-[var(--neon-lime-text)]' : 'text-neutral-500'}`}>
                                                    {member.role}
                                                </span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={nextSlide}
                        className="p-2 md:p-4 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-neutral-200 dark:border-white/10 hover:bg-[var(--neon-lime)] hover:text-black hover:border-[var(--neon-lime)] transition-all z-20 text-neutral-600 dark:text-neutral-300"
                        aria-label="Next Member"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                </div>
            </div>
        </section>
    );
}
