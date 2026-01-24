"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowLeft, ExternalLink, Code2, Rocket, Cloud, Cpu } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GradientBorder } from "@/components/ui/gradient-border";
import { NeuralNetwork } from "@/components/ui/neural-network";

export default function DeveloperPage() {
    const techStack = [
        { name: "Next.js", icon: Rocket, color: "text-blue-500" },
        { name: "TypeScript", icon: Code2, color: "text-blue-600" },
        { name: "Tailwind CSS", icon: Code2, color: "text-cyan-400" },
        { name: "Appwrite", icon: Cloud, color: "text-red-500" },
        { name: "Framer Motion", icon: Cpu, color: "text-purple-500" },
        { name: "Three.js", icon: Cpu, color: "text-neutral-200" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300
            }
        }
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[var(--neon-lime)]/30 overflow-hidden relative">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <NeuralNetwork className="opacity-30" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-black/90 to-black/80" />
                <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[var(--neon-lime)]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[var(--electric-cyan)]/10 rounded-full blur-[120px]" />
            </div>

            <div className="container relative z-10 max-w-5xl mx-auto px-4 pt-32 pb-20">
                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
                    {/* Left Column: Info */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants}>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                                The Mind Behind <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-lime-text)] to-[var(--electric-cyan-text)]">
                                    Neural Nexus
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
                                Umesh Patel is a Full-Stack Developer and Vice President of the AIML Club.
                                He&apos;s the architect of the club&apos;s digital ecosystem, merging AI aesthetics
                                with production-grade engineering.
                            </p>
                        </motion.div>

                        {/* Tech Stack Grid */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500">Mastered Arsenal</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {techStack.map((tech) => (
                                    <div
                                        key={tech.name}
                                        className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[var(--neon-lime)]/30 transition-all group"
                                    >
                                        <tech.icon className={`w-5 h-5 mb-3 ${tech.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                                        <span className="text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                            <MagneticButton>
                                <a
                                    href="https://www.linkedin.com/in/umesh-patel-5647b42a4/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
                                >
                                    <Linkedin className="w-5 h-5" />
                                    LinkedIn
                                </a>
                            </MagneticButton>
                            <MagneticButton>
                                <a
                                    href="https://github.com/UmeshCode1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 hover:border-white/20 transition-all"
                                >
                                    <Github className="w-5 h-5" />
                                    GitHub
                                </a>
                            </MagneticButton>
                            <MagneticButton>
                                <a
                                    href="mailto:umesh.code1@gmail.com"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 hover:border-white/20 transition-all"
                                >
                                    <Mail className="w-5 h-5" />
                                    Email
                                </a>
                            </MagneticButton>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Visual Credits Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                        className="relative w-full md:w-[400px]"
                    >
                        <GradientBorder
                            containerClassName="rounded-[32px] overflow-hidden shadow-2xl"
                            className="bg-neutral-900/80 backdrop-blur-3xl p-8"
                            duration={15}
                        >
                            <div className="relative aspect-square rounded-2xl overflow-hidden mb-8 group">
                                <Image
                                    src="/images/team/umesh_patel.jpg" // Assuming this exists or falls back
                                    alt="Umesh Patel"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="px-3 py-1 rounded-full bg-[var(--neon-lime)] text-black text-[10px] font-bold uppercase tracking-wider">
                                        Founding Member
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold">Umesh Patel</h2>
                                    <p className="text-[var(--electric-cyan-text)] font-mono text-sm tracking-widest uppercase">Vice President</p>
                                </div>
                                <div className="h-[1px] w-full bg-white/10" />
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-neutral-500 font-medium">Mission</span>
                                        <span className="text-neutral-300">Scalable AI Innovation</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-neutral-500 font-medium">Experience</span>
                                        <span className="text-neutral-300">Full Stack Engineering</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-neutral-500 font-medium">Location</span>
                                        <span className="text-neutral-300">Bhopal, India</span>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Link
                                        href="https://info.aimlclub.tech"
                                        target="_blank"
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--neon-lime)]/10 text-[var(--neon-lime-text)] font-bold text-sm border border-[var(--neon-lime)]/20 hover:bg-[var(--neon-lime)]/[0.15] transition-all"
                                    >
                                        Club Info Hub
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </GradientBorder>

                        {/* Floating elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 p-4 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10 z-20"
                        >
                            <span className="text-2xl">💻</span>
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10 z-20"
                        >
                            <span className="text-2xl">⚡</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Quote Section */}
            <section className="relative z-10 py-24 bg-white/[0.02] border-y border-white/5">
                <div className="container max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-5xl text-[var(--neon-lime-text)] font-serif block mb-6 italic">&quot;</span>
                        <h2 className="text-2xl md:text-4xl font-semibold text-neutral-200 mb-8 italic">
                            Building AIML Club wasn&apos;t just about code. It was about creating a space where
                            students can push the boundaries of what&apos;s possible with AI.
                        </h2>
                        <span className="text-sm font-bold tracking-widest text-neutral-500 uppercase">— Umesh Patel</span>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
