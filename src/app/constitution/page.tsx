"use client";

import { motion } from "framer-motion";
import { Book, FileText, Scale, Shield, Users, LucideIcon } from "lucide-react";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { useState, useEffect } from "react";

interface ConstitutionSection {
    title: string;
    icon: LucideIcon;
    content: string;
    points: string[];
}

export default function ConstitutionPage() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const sections: ConstitutionSection[] = [
        {
            title: "Preamble",
            icon: Book,
            content: "We, the members of the AIML Club at Oriental College of Technology, in order to foster innovation, promote technical excellence, and build a community of future leaders.",
            points: [
                "Establishing a standard for technical integrity",
                "Fostering a culture of collaborative learning",
                "Promoting ethical AI development practices"
            ]
        },
        {
            title: "Mission",
            icon: Scale,
            content: "To democratize AI education, provide hands-on experience through projects, and create a collaborative environment where students can learn and grow.",
            points: [
                "Hands-on project-based learning modules",
                "Skill development for industry readiness",
                "Bridging the gap between theory and practice"
            ]
        },
        {
            title: "Membership",
            icon: Users,
            content: "Membership is open to all students of OCT who show a genuine interest in AI/ML. Members are expected to actively participate in club activities.",
            points: [
                "Open access to all technical workshops",
                "Priority registration for flagship hackathons",
                "Commitment to community growth and support"
            ]
        },
        {
            title: "Leadership",
            icon: Shield,
            content: "The club is led by a Core Council comprising the President, Vice President, Tech Lead, and Event Lead. Elections are held annually.",
            points: [
                "Merit-based selection for council positions",
                "Transparency in decision-making processes",
                "Dedicated mentorship for junior members"
            ]
        },
        {
            title: "Code of Conduct",
            icon: FileText,
            content: "All members must treat each other with respect. Harassment, discrimination, or unethical behavior of any kind will not be tolerated.",
            points: [
                "Zero-tolerance policy for harassment",
                "Respectful and constructive peer feedback",
                "Maintaining academic and technical honesty"
            ]
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none">
                <motion.div
                    className="h-full bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)]"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            <div className="max-w-4xl w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-left mb-16"
                >
                    <div className="flex flex-col gap-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--neon-lime)]/10 border border-[var(--neon-lime)]/20 w-fit">
                            <Shield className="w-3.5 h-3.5 text-[var(--neon-lime-text)]" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--neon-lime-text)]">Governing Charter</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">
                            Foundational <br /> Principles
                        </h1>
                        <div className="max-w-2xl">
                            <BlurReveal
                                text="The governing values and academic standards that define the AIML Club at Oriental College of Technology. Establishing a framework for innovation, integrity, and technical excellence."
                                className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed font-medium"
                                delay={0.4}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Content Grid */}
                <div className="relative pl-8 md:pl-12">
                    {/* Vertical Progress Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                            className="w-full bg-gradient-to-b from-[var(--neon-lime)] to-[var(--electric-cyan)] origin-top"
                            style={{ height: `${scrollProgress}%` }}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-12">
                        {sections.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                {/* Connector Dot */}
                                <div className="absolute -left-[33px] md:-left-[49px] top-10 w-4 h-4 rounded-full bg-white dark:bg-black border-2 border-[var(--neon-lime)] z-20" />

                                <CardSpotlight
                                    containerClassName="rounded-3xl shadow-xl overflow-hidden border border-[var(--card-border)] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md"
                                    className="p-0"
                                    color="rgba(212, 255, 0, 0.05)"
                                >
                                    <div className="p-8 md:p-10">
                                        <div className="flex flex-col md:flex-row gap-6 items-start">
                                            <div className="p-4 rounded-2xl bg-[var(--neon-lime)]/10 text-[var(--neon-lime-text)] shrink-0">
                                                <section.icon className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                                                    {section.title}
                                                </h2>
                                                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 font-medium">
                                                    {section.content}
                                                </p>
                                                <div className="h-px w-20 bg-gradient-to-r from-[var(--neon-lime)] to-transparent mb-6" />
                                                <ul className="space-y-4">
                                                    {section.points.map((point, pIndex) => (
                                                        <motion.li
                                                            key={pIndex}
                                                            className="flex items-start gap-3 group/point"
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon-lime)] mt-2 group-hover/point:scale-150 transition-transform" />
                                                            <span className="text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-300 transition-colors">
                                                                {point}
                                                            </span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </CardSpotlight>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer Signature */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block px-6 py-2 rounded-full bg-neutral-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-neutral-500 dark:text-neutral-400 font-mono text-sm">
                        Last Updated: December 2025
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
