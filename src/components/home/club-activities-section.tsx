"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GradientBorder } from "@/components/ui/gradient-border";
import { Calendar, Users, Lightbulb } from "lucide-react";

const activities = [
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

export function ClubActivitiesSection() {
    return (
        <section className="py-16 md:py-24 relative z-10 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block px-3 py-1 rounded-full bg-[var(--electric-cyan)]/10 text-[var(--electric-cyan-text)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--electric-cyan)]/20">
                        What We Do
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                        Our <span className="text-[var(--neon-lime-text)]">Activities</span>
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        From workshops to hackathons, we create experiences that shape future AI leaders.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {activities.map((activity, index) => (
                        <motion.div
                            key={activity.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <GradientBorder
                                containerClassName="rounded-2xl h-full group hover:shadow-2xl transition-shadow duration-500"
                                className="bg-[var(--card-bg)] overflow-hidden h-full"
                                duration={10 + index}
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={activity.image}
                                        alt={activity.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Stats Badge */}
                                    <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[var(--neon-lime)]/90 text-black text-xs font-bold">
                                        {activity.stats}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-[var(--neon-lime)]/10 flex items-center justify-center">
                                            <activity.icon className="w-5 h-5 text-[var(--neon-lime-text)]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                                            {activity.title}
                                        </h3>
                                    </div>
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                        {activity.description}
                                    </p>
                                </div>
                            </GradientBorder>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
