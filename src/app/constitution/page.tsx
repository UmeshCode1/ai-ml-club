"use client";

import { motion } from "framer-motion";
import { Book, FileText, Scale, Shield, Users } from "lucide-react";
import { GradientBorder } from "@/components/ui/gradient-border";

export default function ConstitutionPage() {
    const sections = [
        {
            title: "Preamble",
            icon: Book,
            content: "We, the members of the AIML Club at Oriental College of Technology, in order to foster innovation, promote technical excellence, and build a community of future leaders in Artificial Intelligence and Machine Learning, do hereby establish this Constitution."
        },
        {
            title: "Mission",
            icon: Scale,
            content: "To democratize AI education, provide hands-on experience through projects, and create a collaborative environment where students can learn, build, and grow together."
        },
        {
            title: "Membership",
            icon: Users,
            content: "Membership is open to all students of OCT who show a genuine interest in AI/ML. Members are expected to actively participate in club activities, maintain academic integrity, and contribute to the community."
        },
        {
            title: "Leadership",
            icon: Shield,
            content: "The club is led by a Core Council comprising the President, Vice President, Tech Lead, and Event Lead. Elections are held annually, and leaders are chosen based on merit, dedication, and vision."
        },
        {
            title: "Code of Conduct",
            icon: FileText,
            content: "All members must treat each other with respect. Harassment, discrimination, or unethical behavior of any kind will not be tolerated and may result in immediate revocation of membership."
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
            <div className="max-w-4xl w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 mb-6">
                            Club Constitution
                        </h1>
                        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            The governing principles and core values that define our community.
                        </p>
                    </motion.div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 gap-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <GradientBorder
                                containerClassName="rounded-3xl shadow-lg relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
                                className="bg-[var(--card-bg)] backdrop-blur-xl p-8 border border-[var(--card-border)]"
                                duration={10 + index}
                            >
                                <div className="flex items-start gap-6">
                                    <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--neon-lime)]/10 to-[var(--electric-cyan)]/10 border border-[var(--neon-lime)]/20 items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <section.icon className="w-6 h-6 text-[var(--neon-lime-text)]" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <section.icon className="w-6 h-6 text-[var(--neon-lime-text)] md:hidden" />
                                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                                                {section.title}
                                            </h2>
                                        </div>
                                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </GradientBorder>
                        </motion.div>
                    ))}
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
