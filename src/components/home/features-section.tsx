"use client";

import { Brain, Code, Users, Trophy } from "lucide-react";
import { FloatingCard } from "@/components/ui/floating-card";
import { GradientBorder } from "@/components/ui/gradient-border";

const features = [
    {
        title: "Master AI & ML",
        description: "Deep dive into Neural Networks, NLP, and Computer Vision. Our curriculum is designed to take you from basics to advanced implementation.",
        icon: Brain,
        color: "text-[var(--neon-lime-text)]", // Contrast Aware
        bg: "bg-[var(--neon-lime)]/10"
    },
    {
        title: "Real Projects",
        description: "Don't just learn theory. Build chatbots, prediction models, and automation tools that solve real problems.",
        icon: Code,
        color: "text-[var(--electric-cyan-text)]", // Contrast Aware
        bg: "bg-[var(--electric-cyan)]/10"
    },
    {
        title: "Elite Network",
        description: "Connect with like-minded peers, alumni mentors, and industry experts.",
        icon: Users,
        color: "text-[var(--neon-lime-text)]", // Contrast Aware
        bg: "bg-[var(--neon-lime)]/10"
    },
    {
        title: "Hackathons & Events",
        description: "Participate in high-energy hackathons, workshops, and tech talks. Win prizes, gain recognition, and level up your skills.",
        icon: Trophy,
        color: "text-[var(--electric-cyan-text)]", // Contrast Aware
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
                                containerClassName="h-full rounded-3xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                                className="bg-white/80 dark:bg-black/40 backdrop-blur-xl p-8 flex flex-col items-start text-left h-full"
                                duration={index % 2 === 0 ? 8 : 10} // Varied duration for organic feel
                            >
                                <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
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
