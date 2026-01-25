"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Mail, Linkedin, Github, Instagram, X, Users, GraduationCap } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { GradientBorder } from "@/components/ui/gradient-border";

interface TeamMember {
    name: string;
    role: string;
    image?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    email?: string;
    team?: string;
    enrollmentNo?: string;
}

interface TeamSectionProps {
    members?: TeamMember[];
    autoSlideInterval?: number; // in milliseconds
}

// Default fallback if no members provided
const DEFAULT_MEMBERS: TeamMember[] = [
    { name: "Loading...", role: "Team Member", image: "" },
];

export function TeamSection({ members = DEFAULT_MEMBERS, autoSlideInterval = 2500 }: TeamSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Use provided members or default
    const teamMembers = members.length > 0 ? members : DEFAULT_MEMBERS;

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Auto-slide functionality
    useEffect(() => {
        if (isPaused || teamMembers.length <= 1) return;

        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % teamMembers.length);
        }, autoSlideInterval);

        return () => clearInterval(timer);
    }, [teamMembers.length, autoSlideInterval, isPaused]);

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    }, [teamMembers.length]);

    const prevSlide = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    }, [teamMembers.length]);

    const handleMemberClick = (member: TeamMember) => {
        setSelectedMember(member);
        setIsPaused(true);
    };

    const closeModal = () => {
        setSelectedMember(null);
        setIsPaused(false);
    };

    return (
        <section
            className="py-24 bg-transparent relative z-10 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
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
                                    let offset = index - activeIndex;
                                    if (offset < -2) offset += teamMembers.length;
                                    if (offset > 2) offset -= teamMembers.length;

                                    const isActive = index === activeIndex;
                                    const isPrev = index === (activeIndex - 1 + teamMembers.length) % teamMembers.length;
                                    const isNext = index === (activeIndex + 1) % teamMembers.length;

                                    if (!isActive && !isPrev && !isNext) return null;

                                    const xOffset = isMobile ? (isActive ? 0 : 0) : (isActive ? 0 : (isPrev ? -280 : 280));
                                    const scale = isActive ? 1 : 0.8;
                                    const opacity = isActive ? 1 : (isMobile ? 0 : 0.4);
                                    const zIndex = isActive ? 10 : 0;

                                    if (isMobile && !isActive) return null;

                                    const initials = member.name.split(" ").map(n => n[0]).join("").slice(0, 2);

                                    return (
                                        <motion.div
                                            key={member.name + index}
                                            initial={false}
                                            animate={{
                                                x: xOffset,
                                                scale: scale,
                                                opacity: opacity,
                                                zIndex: zIndex,
                                                filter: isActive ? 'blur(0px)' : 'blur(4px)',
                                            }}
                                            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                                            className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-64 md:w-80 ${isActive ? 'cursor-pointer' : ''} will-change-transform`}
                                            onClick={() => isActive && handleMemberClick(member)}
                                        >
                                            <div className="relative group w-full aspect-[4/5] mb-6">
                                                <GradientBorder
                                                    containerClassName={`w-full h-full rounded-3xl transition-all duration-500 ${isActive ? 'shadow-[0_0_50px_rgba(0,0,0,0.15)] dark:shadow-[0_0_50px_rgba(var(--neon-lime-rgb),0.15)] scale-[1.02]' : 'opacity-60 scale-95'}`}
                                                    className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-3xl flex items-center justify-center overflow-hidden border border-neutral-200 dark:border-white/10 group-hover:border-[var(--neon-lime)]/50 transition-colors duration-500"
                                                    borderWidth={isActive ? 1.5 : 0}
                                                    duration={isActive ? 3 : 10}
                                                >
                                                    {/* Noise Texture Overlay */}
                                                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none z-10" />

                                                    {/* Gradient Glow */}
                                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 dark:to-black/80 z-20 opacity-40 dark:opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                                    {member.image ? (
                                                        <Image
                                                            src={member.image}
                                                            alt={member.name}
                                                            fill
                                                            sizes="(max-width: 768px) 256px, 320px"
                                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                            priority={isActive}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                                                            <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-[var(--electric-cyan)] to-[var(--neon-lime)]">
                                                                {initials}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Click hint overlay */}
                                                    <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                                        <span className="px-4 py-1.5 rounded-full bg-[var(--neon-lime)] text-black text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_var(--neon-lime)]">
                                                            View Profile
                                                        </span>
                                                    </div>
                                                </GradientBorder>
                                            </div>

                                            <div className={`text-center transition-all duration-300 ${isActive ? 'opacity-100 transform-none' : 'opacity-40 scale-90'}`}>
                                                <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2 tracking-tight group-hover:text-[var(--neon-lime)] transition-colors">
                                                    {member.name}
                                                </h3>
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-sm">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--electric-cyan)] animate-pulse" />
                                                    <span className="text-xs tracking-widest uppercase font-bold text-neutral-600 dark:text-neutral-300">
                                                        {member.role}
                                                    </span>
                                                </div>
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

            {/* Member Profile Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-md bg-neutral-900 rounded-3xl overflow-hidden border border-white/10"
                        >
                            {/* Header */}
                            <div className="relative h-32 bg-gradient-to-br from-[var(--electric-cyan)] to-[var(--neon-lime)]">
                                <button onClick={closeModal} className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Avatar */}
                            <div className="flex justify-center -mt-16 mb-4">
                                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[var(--electric-cyan)] to-[var(--neon-lime)] flex items-center justify-center text-black text-4xl font-bold border-4 border-neutral-900 shadow-xl overflow-hidden">
                                    {selectedMember.image ? (
                                        <Image src={selectedMember.image} alt={selectedMember.name} fill className="object-cover" />
                                    ) : (
                                        selectedMember.name.split(" ").map(n => n[0]).join("").slice(0, 2)
                                    )}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="px-6 pb-6 text-center">
                                <h3 className="text-2xl font-bold text-white mb-1">{selectedMember.name}</h3>
                                <p className="text-[var(--electric-cyan)] font-semibold mb-6">{selectedMember.role}</p>

                                {/* Info Cards */}
                                <div className="space-y-3 mb-6">
                                    {selectedMember.team && (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                                            <Users className="w-5 h-5 text-purple-400" />
                                            <div className="text-left">
                                                <p className="text-xs text-neutral-400">Team</p>
                                                <p className="text-white font-medium">{selectedMember.team}</p>
                                            </div>
                                        </div>
                                    )}
                                    {selectedMember.enrollmentNo && (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                                            <GraduationCap className="w-5 h-5 text-amber-400" />
                                            <div className="text-left">
                                                <p className="text-xs text-neutral-400">Enrollment</p>
                                                <p className="text-white font-medium font-mono">{selectedMember.enrollmentNo}</p>
                                            </div>
                                        </div>
                                    )}
                                    {selectedMember.email && (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                                            <Mail className="w-5 h-5 text-green-400" />
                                            <div className="text-left">
                                                <p className="text-xs text-neutral-400">Email</p>
                                                <a href={`mailto:${selectedMember.email}`} className="text-white font-medium hover:text-[var(--neon-lime)] transition-colors">
                                                    {selectedMember.email}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Social Links */}
                                {(selectedMember.linkedin || selectedMember.github || selectedMember.instagram) && (
                                    <div className="flex justify-center gap-3">
                                        {selectedMember.linkedin && (
                                            <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                        {selectedMember.github && (
                                            <a href={selectedMember.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-neutral-500/10 text-neutral-400 hover:bg-neutral-500 hover:text-white transition-colors">
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                        {selectedMember.instagram && (
                                            <a href={selectedMember.instagram} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-pink-500/10 text-pink-500 hover:bg-pink-500 hover:text-white transition-colors">
                                                <Instagram className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
