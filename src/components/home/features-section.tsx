import { Brain, Code, Users, Trophy } from "lucide-react";
import { FloatingCard } from "@/components/ui/floating-card";
import { GradientBorder } from "@/components/ui/gradient-border";
import { TextDecode } from "@/components/ui/text-decode";
import { motion } from "framer-motion";

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
    return (
        <section className="py-24 md:py-32 bg-transparent relative z-10 overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--electric-cyan)]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--neon-lime)]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tighter">
                            Why Join <span className="text-[var(--neon-lime-text)]">
                                <TextDecode text="OCT AIML Club?" />
                            </span>
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium"
                    >
                        Unlocking potential through a decentralized community of builders and innovators.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {features.map((feature, index) => (
                        <FloatingCard
                            key={index}
                            delay={index * 0.1}
                            variant={index % 2 === 0 ? "glitch" : "default"}
                        >
                            <GradientBorder
                                containerClassName="h-full rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_0_60px_rgba(212,255,0,0.1)] dark:hover:shadow-[0_0_60px_rgba(212,255,0,0.05)] group perspective-1000"
                                className="bg-white/80 dark:bg-neutral-900/40 backdrop-blur-2xl p-10 flex flex-col items-start text-left h-full border border-white/10"
                                duration={index % 2 === 0 ? 10 : 12}
                            >
                                <div className={`relative w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-8 group-hover:scale-125 group-hover:rotate-[10deg] transition-all duration-500`}>
                                    <div className="absolute inset-0 rounded-2xl bg-current opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
                                    <feature.icon className="w-8 h-8 relative z-10" />

                                    {/* Small floating bits around icon */}
                                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-60 transition-all duration-700 delay-100 translate-y-0 group-hover:-translate-y-4" />
                                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-current opacity-0 group-hover:opacity-40 transition-all duration-700 delay-200 translate-y-0 group-hover:translate-y-4" />
                                </div>
                                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight group-hover:text-[var(--neon-lime-text)] transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                    {feature.description}
                                </p>

                                {/* Bottom tactical accent */}
                                <div className="mt-8 w-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="h-[2px] w-12 bg-[var(--neon-lime)]" />
                                    <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--neon-lime)] uppercase">Initialize_Protocol</span>
                                </div>
                            </GradientBorder>
                        </FloatingCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
