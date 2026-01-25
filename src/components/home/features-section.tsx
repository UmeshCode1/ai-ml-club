"use client";

import { Brain, Code, Users, Trophy } from "lucide-react";
import { FloatingCard } from "@/components/ui/floating-card";
import { GradientBorder } from "@/components/ui/gradient-border";

const features = [
    {
        title: "Master Cutting-Edge AI",
        description: "Deep dive into Neural Networks, LLMs, and Computer Vision. Our structured curriculum takes you from fundamentals to production-ready skills.",
        icon: Brain,
        color: "text-[var(--neon-lime-text)]",
        bg: "bg-[var(--neon-lime)]/10"
    },
    {
        title: "Build Real Products",
        description: "Ship chatbots, prediction engines, and automation tools. Every project solves a real problem and strengthens your portfolio.",
        icon: Code,
        color: "text-[var(--electric-cyan-text)]",
        bg: "bg-[var(--electric-cyan)]/10"
    },
    {
        title: "Join an Elite Network",
        description: "Connect with driven peers, alumni mentors, and industry leaders. Your network becomes your net worth.",
        icon: Users,
        color: "text-[var(--neon-lime-text)]",
        bg: "bg-[var(--neon-lime)]/10"
    },
    {
        title: "Compete & Win",
        description: "Participate in high-stakes hackathons, workshops, and tech summits. Gain recognition, win prizes, and accelerate your career.",
        icon: Trophy,
        color: "text-[var(--electric-cyan-text)]",
        bg: "bg-[var(--electric-cyan)]/10"
    }
];


export function FeaturesSection() {

    // Fallback or default color logic
    // const isDark = mounted && (theme === "dark" || theme === "system");

    return (
        <section className="py-16 md:py-24 bg-transparent relative z-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                        Why Join <span className="text-[var(--electric-cyan-text)]">OCT AIML Club?</span>
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Unlock your potential with a community that builds, innovates, and inspires.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <FloatingCard key={index} delay={index * 0.1}>
                            <GradientBorder
                                containerClassName="h-full rounded-3xl transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group"
                                className="bg-white/95 dark:bg-black/40 backdrop-blur-xl p-8 flex flex-col items-start text-left h-full border border-neutral-200 dark:border-white/5"
                                duration={index % 2 === 0 ? 8 : 10}
                            >
                                <div className={`relative w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    {/* GPU Optimized Glow */}
                                    <div className="absolute inset-0 rounded-2xl bg-current opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500 will-change-[filter,opacity]" />
                                    <feature.icon className="w-7 h-7 relative z-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </GradientBorder>
                        </FloatingCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
