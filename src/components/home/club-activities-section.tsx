"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GradientBorder } from "@/components/ui/gradient-border";
import { Calendar, Users, Lightbulb, LucideIcon } from "lucide-react";
import { Activity } from "@/lib/database";

const iconMap: Record<string, LucideIcon> = {
    "Lightbulb": Lightbulb,
    "Users": Users,
    "Calendar": Calendar,
};

export function ClubActivitiesSection({ activities }: { activities: Activity[] }) {
    return (
        <section className="py-24 md:py-32 relative z-10 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--electric-cyan)]/10 text-[var(--electric-cyan-text)] text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-[var(--electric-cyan)]/20 shadow-sm backdrop-blur-md">
                        <Lightbulb className="w-3 h-3" />
                        What We Do
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tighter">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-lime-text)] to-[var(--electric-cyan-text)]">Activities</span>
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        From workshops to hackathons, we create experiences that shape future AI leaders.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {activities.map((activity, index) => {
                        const Icon = iconMap[activity.icon] || Lightbulb;
                        return (
                            <motion.div
                                key={activity.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <GradientBorder
                                    containerClassName="rounded-[2rem] h-full group hover:shadow-2xl transition-shadow duration-500"
                                    className="bg-[var(--card-bg)] overflow-hidden h-full border border-neutral-200 dark:border-white/5"
                                    duration={10 + index}
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={activity.imageUrl}
                                            alt={activity.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                        {/* Stats Badge */}
                                        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-[var(--neon-lime)] text-black text-[10px] font-black uppercase tracking-wider shadow-lg">
                                            {activity.stats}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-7">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-2xl bg-[var(--neon-lime)]/10 flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-[var(--neon-lime-text)]" />
                                            </div>
                                            <h3 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                                                {activity.title}
                                            </h3>
                                        </div>
                                        <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed font-medium">
                                            {activity.description}
                                        </p>
                                    </div>
                                </GradientBorder>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
