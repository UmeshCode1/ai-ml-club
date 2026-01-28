"use client";

import { Brain, Code, Users, Trophy, LucideIcon } from "lucide-react";
import { FloatingCard } from "@/components/ui/floating-card";
import { GradientBorder } from "@/components/ui/gradient-border";
import { Feature } from "@/lib/database";

const iconMap: Record<string, LucideIcon> = {
    "Brain": Brain,
    "Code": Code,
    "Users": Users,
    "Trophy": Trophy,
};

export function FeaturesSection({ features }: { features: Feature[] }) {
    // Helper to parse **bold** text in descriptions
    const renderDescription = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <strong key={i} className="text-neutral-900 dark:text-white font-black group-hover:text-[var(--electric-cyan-text)] transition-colors duration-300">
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return part;
        });
    };

    return (
        <section className="py-24 bg-transparent relative z-10 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--electric-cyan)]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--neon-lime)]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 text-neutral-500 dark:text-neutral-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-black/10 dark:border-white/10 backdrop-blur-md"
                    >
                        Engineering Excellence
                    </motion.div>
                    <h2 className="text-4xl md:text-8xl font-black text-neutral-900 dark:text-white mb-6 tracking-tighter leading-[0.9]">
                        Why Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--electric-cyan-text)] to-[var(--neon-lime-text)]">OCT AIML Club?</span>
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto font-medium leading-relaxed">
                        Unlock your potential with a community that builds, innovates, and inspires.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                    {features.map((feature, index) => {
                        const Icon = iconMap[feature.icon] || Brain;
                        const isLarge = index === 0 || index === 3; // Bento logic: 1st and 4th items are wider

                        return (
                            <FloatingCard
                                key={index}
                                delay={index * 0.1}
                                className={isLarge ? "md:col-span-7" : "md:col-span-5"}
                            >
                                <GradientBorder
                                    containerClassName="h-full rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] group"
                                    className="bg-white/60 dark:bg-neutral-950/60 backdrop-blur-3xl p-8 md:p-12 flex flex-col items-start text-left h-full border border-neutral-200/50 dark:border-white/5 relative overflow-hidden"
                                    duration={index % 2 === 0 ? 8 : 10}
                                >
                                    {/* Cyber-Core Scanlines */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.005),rgba(0,0,255,0.01))] z-0 pointer-events-none opacity-20" style={{ backgroundSize: '100% 4px, 3px 100%' }} />

                                    {/* Holographic Shift Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-10 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none" />

                                    <div className={`relative w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 z-20`}>
                                        {/* Bioluminescent Glow */}
                                        <div className="absolute inset-0 rounded-2xl bg-current opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500" />
                                        <Icon className="w-8 h-8 relative z-20" />
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white mb-4 tracking-tight z-20">
                                        {feature.title}
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed font-medium z-20">
                                        {renderDescription(feature.description)}
                                    </p>

                                    {/* Interactive Arrow */}
                                    <div className="mt-8 flex items-center gap-2 text-sm font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[var(--electric-cyan-text)] z-20">
                                        Launch Potential <Code className="w-4 h-4" />
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
