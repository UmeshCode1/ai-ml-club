"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GradientBorder } from "@/components/ui/gradient-border";
import { Calendar, Users, Lightbulb, Sparkles } from "lucide-react";
import { HomeActivity } from "@/lib/database";
import * as LucideIcons from "lucide-react";
import { useMemo } from "react";

const DEFAULT_ACTIVITIES = [
    {
        title: "AI Workshops",
        description: "Hands-on sessions on TensorFlow, PyTorch & more",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800",
        icon: Lightbulb,
        stats: "20+ Sessions"
    },
    {
        title: "Hackathons",
        description: "48-hour coding marathons solving real problems",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800",
        icon: Users,
        stats: "10+ Events"
    },
    {
        title: "Tech Talks",
        description: "Industry experts sharing insights & trends",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
        icon: Calendar,
        stats: "15+ Talks"
    }
];

export function ClubActivitiesSection({ activities: dynamicActivities }: { activities?: HomeActivity[] }) {
    const internalActivities = useMemo(() => {
        if (!dynamicActivities || dynamicActivities.length === 0) return DEFAULT_ACTIVITIES;
        return dynamicActivities.map(a => {
            // Dynamically resolve lucide icon
            const IconName = a.icon as keyof typeof LucideIcons;
            const Icon = (LucideIcons[IconName] as any) || Sparkles;

            return {
                title: a.title,
                description: a.description,
                image: a.image || DEFAULT_ACTIVITIES[0].image,
                icon: Icon as LucideIcons.LucideIcon,
                stats: a.stats || ""
            };
        });
    }, [dynamicActivities]);

    return (
        <section className="py-24 md:py-32 relative z-10 overflow-hidden bg-transparent">
            {/* Background spatial elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--electric-cyan)]/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--neon-lime)]/10 text-[var(--neon-lime-text)] text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-[var(--neon-lime)]/20">
                        <Calendar className="w-3 h-3" />
                        WHAT WE DO
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white mb-6 tracking-tighter">
                        Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-lime-text)] to-[var(--electric-cyan-text)]">Initiatives</span>
                    </h2>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium">
                        Crafting experiences that bridge the gap between classroom theory and real-world technology.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {internalActivities.map((activity, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <GradientBorder
                                containerClassName="rounded-[32px] h-full group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)]"
                                className="bg-white/80 dark:bg-neutral-900/40 backdrop-blur-xl overflow-hidden h-full flex flex-col border border-neutral-200 dark:border-white/5"
                                duration={12}
                            >
                                {/* Image Overlay */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={activity.image}
                                        alt={activity.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out opacity-60 dark:opacity-40"
                                    />

                                    {/* Data Packet Animation Overlay */}
                                    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                                        <motion.div
                                            animate={{ x: ["-100%", "200%"] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="absolute top-1/4 w-32 h-[1px] bg-gradient-to-r from-transparent via-[var(--neon-lime)] to-transparent opacity-40"
                                        />
                                        <motion.div
                                            animate={{ x: ["200%", "-100%"] }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                            className="absolute bottom-1/4 w-48 h-[1px] bg-gradient-to-r from-transparent via-[var(--electric-cyan)] to-transparent opacity-40"
                                        />
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

                                    {/* Stats Badge */}
                                    <div className="absolute top-4 right-4 px-4 py-1.5 rounded-sm bg-black text-white text-[9px] font-mono uppercase tracking-[0.2em] border border-white/10">
                                        DATA_SET: {activity.stats.replace(' ', '_')}
                                    </div>

                                    <div className="absolute bottom-6 left-6 flex items-center gap-4">
                                        <div className="relative w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center shadow-2xl">
                                            <div className="absolute inset-0 rounded-xl bg-[var(--neon-lime)]/10 animate-pulse" />
                                            <activity.icon className="w-7 h-7 text-[var(--neon-lime-text)] relative z-10" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-mono text-[var(--neon-lime-text)] opacity-60 mb-0.5 tracking-widest">INGESTION_NODE_{index + 1}</div>
                                            <h3 className="text-2xl font-black text-white tracking-tight">
                                                {activity.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <p className="text-neutral-600 dark:text-neutral-400 text-lg font-medium leading-relaxed mb-6">
                                        {activity.description}
                                    </p>

                                    <div className="mt-auto flex items-center text-[var(--neon-lime-text)] font-bold text-xs uppercase tracking-widest group/link cursor-pointer">
                                        View Highlights
                                        <LucideIcons.ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </GradientBorder>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
