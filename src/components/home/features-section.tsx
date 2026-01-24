"use client";

import { useMemo } from "react";
import { Brain, Code, Users, Trophy } from "lucide-react";
import { FloatingCard } from "@/components/ui/floating-card";
import { GradientBorder } from "@/components/ui/gradient-border";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { HomeFeature } from "@/lib/database";
import * as LucideIcons from "lucide-react";

const DEFAULT_FEATURES = [
    {
        title: "Master AI/ML",
        description: "Deep dive into Neural Networks, LLMs, and Computer Vision under expert guidance.",
        icon: Brain,
        color: "text-[var(--neon-lime-text)]",
        bg: "bg-[var(--neon-lime)]/10",
        size: "large"
    },
    {
        title: "Real Projects",
        description: "Ship automation tools and portfolio-worthy prediction engines.",
        icon: Code,
        color: "text-[var(--electric-cyan-text)]",
        bg: "bg-[var(--electric-cyan)]/10",
        size: "medium"
    },
    {
        title: "Elite Network",
        description: "Connect with driven peers and industry mentors.",
        icon: Users,
        color: "text-[var(--electric-cyan-text)]",
        bg: "bg-[var(--electric-cyan)]/10",
        size: "medium"
    },
    {
        title: "Hackathons",
        description: "Compete in high-stakes summits.",
        icon: Trophy,
        color: "text-[var(--neon-lime-text)]",
        bg: "bg-[var(--neon-lime)]/10",
        size: "small"
    }
];

export function FeaturesSection({ features: dynamicFeatures }: { features?: HomeFeature[] }) {
    const displayFeatures = useMemo(() => {
        if (!dynamicFeatures || dynamicFeatures.length === 0) return DEFAULT_FEATURES;

        return dynamicFeatures.map((f) => {
            // Dynamically resolve lucide icon
            const IconName = f.icon as keyof typeof LucideIcons;
            const Icon = (LucideIcons[IconName] as any) || Brain;
            return {
                title: f.title,
                description: f.description,
                icon: Icon as React.FC<any>,
                color: f.color?.includes("lime") ? "text-[var(--neon-lime-text)]" : "text-[var(--electric-cyan-text)]",
                bg: f.color?.includes("lime") ? "bg-[var(--neon-lime)]/10" : "bg-[var(--electric-cyan)]/10",
                size: (f.size as "small" | "medium" | "large") || "medium"
            };
        });
    }, [dynamicFeatures]);

    return (
        <section className="py-20 md:py-32 bg-transparent relative z-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold bg-[var(--electric-cyan)]/10 text-[var(--electric-cyan)] rounded-full border border-[var(--electric-cyan)]/30 backdrop-blur-sm uppercase tracking-widest">
                        Excellence through Innovation
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white mb-6 tracking-tighter">
                        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-lime-text)] to-[var(--electric-cyan-text)]">OCT AIML Club?</span>
                    </h2>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto font-medium leading-relaxed">
                        We don&apos;t just study AI. We build it. Join a high-octane community specialized in practical innovation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {displayFeatures.map((feature, index) => {
                        const colSpan = feature.size === "large" ? "md:col-span-2" : "md:col-span-1";
                        const rowSpan = feature.size === "large" ? "md:row-span-2" : "md:row-span-1";

                        return (
                            <div key={index} className={`${colSpan} ${rowSpan}`}>
                                <FloatingCard delay={index * 0.1}>
                                    <CardSpotlight
                                        className="p-0 border-0"
                                        containerClassName="rounded-[40px] overflow-hidden group"
                                        color={feature.color.includes("lime") ? "rgba(163, 230, 53, 0.15)" : "rgba(34, 211, 238, 0.15)"}
                                    >
                                        <GradientBorder
                                            containerClassName="h-full w-full rounded-[40px] transition-all duration-500 overflow-hidden"
                                            className="bg-white/80 dark:bg-neutral-900/60 backdrop-blur-3xl p-8 md:p-10 flex flex-col items-start justify-between text-left h-full border-0 relative"
                                            duration={12}
                                        >
                                            {/* Noise & Mesh Gradient behind card */}
                                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />

                                            <div className="relative z-10 w-full">
                                                <div className={`relative w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-8 group-hover:rotate-[10deg] transition-transform duration-500`}>
                                                    <div className="absolute inset-0 rounded-2xl bg-current opacity-20 blur-xl animate-pulse" />
                                                    <feature.icon className="w-8 h-8 relative z-10" />
                                                </div>

                                                <h3 className="text-3xl font-black text-neutral-900 dark:text-white mb-4 tracking-tight">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                                                    {feature.description}
                                                </p>
                                            </div>

                                            <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-white/5 w-full flex justify-between items-center group/btn pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <span className={`text-sm font-bold uppercase tracking-widest ${feature.color}`}>Learn More</span>
                                                <div className={`w-8 h-8 rounded-full ${feature.bg} flex items-center justify-center ${feature.color}`}>
                                                    <LucideIcons.ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </GradientBorder>
                                    </CardSpotlight>
                                </FloatingCard>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
