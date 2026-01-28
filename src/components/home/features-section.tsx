"use client";

import { Brain, Code, Users, Trophy, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
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
    return (
        <section className="py-24 md:py-32 bg-transparent relative z-10 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--electric-cyan)]/10 text-[var(--electric-cyan-text)] text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-[var(--electric-cyan)]/20 shadow-sm backdrop-blur-md"
                    >
                        <Brain className="w-3 h-3" />
                        Platform Excellence
                    </motion.div>
                    <h2 className="text-4xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tighter">
                        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--electric-cyan-text)] to-[var(--neon-lime-text)]">AIML Club?</span>
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl font-medium leading-relaxed">
                        We bridge the gap between academic theory and industry reality through our specialized AI ecosystem.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
                    {features.map((feature, index) => {
                        const Icon = iconMap[feature.icon] || Brain;
                        const isLarge = index === 0;

                        return (
                            <FloatingCard
                                key={index}
                                delay={index * 0.1}
                                className={isLarge ? "md:col-span-2 md:row-span-2" : ""}
                            >
                                <GradientBorder
                                    containerClassName="h-full rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] group overflow-hidden"
                                    className="bg-[var(--card-bg)] backdrop-blur-3xl p-8 md:p-10 flex flex-col items-start text-left h-full border border-neutral-200/50 dark:border-white/5 relative"
                                    duration={index % 2 === 0 ? 8 : 12}
                                >
                                    {/* Cyber-Core Background Effects */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.005),rgba(0,0,0,0.01))] z-0 pointer-events-none opacity-20" style={{ backgroundSize: '100% 4px, 3px 100%' }} />
                                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" />

                                    {/* Icon Container */}
                                    <div className={`relative w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-700 z-10 shadow-2xl`}>
                                        <div className="absolute inset-0 rounded-2xl bg-current opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" style={{ color: `var(--${feature.color?.split('[')[1]?.split(']')[0] || 'electric-cyan-text'})` }} />
                                        <Icon className={`w-8 h-8 ${feature.color} relative z-10`} />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 mt-auto">
                                        <h3 className={`font-black text-neutral-900 dark:text-white mb-4 tracking-tight ${isLarge ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                                            {feature.title}
                                        </h3>
                                        <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium ${isLarge ? 'text-lg md:text-xl max-w-xl' : 'text-base md:text-lg'}`}>
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Interactive Glow Pad */}
                                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-current opacity-0 group-hover:opacity-10 blur-[100px] transition-opacity duration-1000 rounded-full pointer-events-none" style={{ color: `var(--${feature.color?.split('[')[1]?.split(']')[0] || 'electric-cyan-text'})` }} />
                                </GradientBorder>
                            </FloatingCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
