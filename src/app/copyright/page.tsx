"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Shield, Copyright, FileText, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { GradientBorder } from "@/components/ui/gradient-border";

export default function CopyrightPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--neon-lime)]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--electric-cyan)]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-neutral-500 hover:text-[var(--neon-lime-text)] transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
                        Copyright <span className="text-[var(--neon-lime-text)]">&</span> Legal
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400">
                        Official legal statement and usage guidelines for {siteConfig.name}.
                    </p>
                </motion.div>

                <div className="grid gap-8">
                    {/* Copyright Statement */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <GradientBorder
                            containerClassName="rounded-2xl sm:rounded-3xl"
                            className="p-8 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl border border-neutral-200 dark:border-white/10"
                            duration={15}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-[var(--neon-lime)]/10 text-[var(--neon-lime-text)]">
                                    <Copyright className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Copyright Notice</h2>
                                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium text-lg">
                                        © {new Date().getFullYear()} {siteConfig.name} - Oriental College of Technology, Bhopal. All rights reserved.
                                    </p>
                                </div>
                            </div>
                        </GradientBorder>
                    </motion.div>

                    {/* Legal Sections */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            {
                                icon: Shield,
                                title: "Intellectual Property",
                                content: "All content on this website, including text, graphics, logos, images, and software, is the property of AIML Club OCT and is protected by international copyright laws."
                            },
                            {
                                icon: FileText,
                                title: "Usage Guidelines",
                                content: "Club members and students may use the learning materials for personal educational purposes. Commercial use or redistribution of any content is strictly prohibited without prior written consent."
                            },
                            {
                                icon: Copyright,
                                title: "Trademarks",
                                content: "The 'AIML Club' logo and the names of its initiatives (like Codify, DSPL) are trademarks of the club. They may not be used in connection with any product or service without permission."
                            },
                            {
                                icon: Mail,
                                title: "Contact Us",
                                content: `For permissions or legal inquiries, please contact us at ${siteConfig.links.email}. We typically respond within 3-5 business days.`
                            }
                        ].map((section, index) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                                className="p-6 rounded-2xl bg-neutral-100/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10"
                            >
                                <div className="p-2 w-max rounded-lg bg-[var(--electric-cyan)]/10 text-[var(--electric-cyan-text)] mb-4">
                                    <section.icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{section.title}</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Disclaimer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="p-8 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-800"
                    >
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[var(--neon-lime-text)]">
                            <Shield className="w-5 h-5" />
                            Disclaimer
                        </h2>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                            The information provided on this website is for general educational purposes only. While we strive for accuracy, AIML Club makes no warranties about the completeness or reliability of the information.
                        </p>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            This club is a student-driven initiative at Oriental College of Technology (OCT), Bhopal. All activities are conducted in accordance with college guidelines.
                        </p>
                    </motion.div>
                </div>

                {/* Footer Brand */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16 pt-8 border-t border-neutral-200 dark:border-white/10 text-center"
                >
                    <p className="text-neutral-500 text-sm font-mono">
                        {siteConfig.shortName} • Innovate • Implement • Inspire
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
