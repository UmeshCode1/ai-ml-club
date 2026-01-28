"use client";

import { Brain, Code, Users, Trophy, LucideIcon } from "lucide-react";
import { FloatingCard } from "@/components/ui/floating-card";
import { GradientBorder } from "@/components/ui/gradient-border";
import { Feature } from "@/lib/database";
import ReactMarkdown from "react-markdown";

const iconMap: Record<string, LucideIcon> = {
    "Brain": Brain,
    "Code": Code,
    "Users": Users,
    "Trophy": Trophy,
};

export function FeaturesSection({ features }: { features: Feature[] }) {
    return (
        <section className="py-16 md:py-24 bg-transparent relative z-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-5xl md:text-8xl font-black text-neutral-900 dark:text-white mb-6 tracking-tighter">
                        Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--electric-cyan-text)] to-[var(--neon-lime-text)]">Future</span>
                    </h2>
                    <p className="text-base sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto font-medium leading-relaxed italic">
                        &quot;Become a part of the technical elite. We don’t just discuss AI — we build, deploy, and dominate it.&quot;
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => {
                        const Icon = iconMap[feature.icon] || Brain;
                        return (
                            <FloatingCard key={index} delay={index * 0.1}>
                                <GradientBorder
                                    containerClassName="h-full rounded-3xl transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group"
                                    className="bg-[var(--card-bg)] backdrop-blur-3xl p-8 flex flex-col items-start text-left h-full border border-neutral-200 dark:border-white/5 relative overflow-hidden"
                                    duration={index % 2 === 0 ? 8 : 10}
                                >
                                    {/* Cyber-Core Scanline Effect */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_2px),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] z-10 pointer-events-none opacity-20" style={{ backgroundSize: '100% 4px, 3px 100%' }} />

                                    {/* Holographic Texture */}
                                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-0 group-hover:opacity-[0.05] pointer-events-none z-20 mix-blend-overlay transition-opacity duration-500" />

                                    <div className={`relative w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                        {/* GPU Optimized Glow */}
                                        <div className="absolute inset-0 rounded-2xl bg-current opacity-20 blur-xl group-hover:blur-2xl transition-all duration-500 will-change-[filter,opacity]" />
                                        <Icon className="w-8 h-8 relative z-10" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white mb-4 tracking-tight group-hover:text-[var(--neon-lime)] transition-colors relative z-30">
                                        {feature.title}
                                    </h3>

                                    <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium relative z-30 prose prose-neutral dark:prose-invert max-w-none">
                                        <ReactMarkdown>
                                            {feature.description}
                                        </ReactMarkdown>
                                    </div>
                                </GradientBorder>
                            </FloatingCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
