"use client";

import { MOCK_PROJECTS } from "@/lib/data";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { GradientBorder } from "@/components/ui/gradient-border";
import { FloatingCard } from "@/components/ui/floating-card";
import Image from "next/image";

export default function ProjectsPage() {
    return (
        <div className="min-h-screen relative w-full flex flex-col items-center pt-24 px-4 bg-transparent">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 mb-6">
                    Deployments
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                    Real-world applications built by our specialized teams. From Computer Vision to Generative AI agents.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full z-10 pb-20">
                {MOCK_PROJECTS.map((project, index) => (
                    <FloatingCard key={project.id} delay={index * 0.1}>
                        <GradientBorder
                            containerClassName="h-full rounded-3xl"
                            className="bg-[var(--card-bg)] backdrop-blur-xl h-full flex flex-col"
                            duration={4 + index}
                        >
                            <div className="p-6 flex flex-col h-full">
                                <div className="relative h-48 rounded-xl overflow-hidden mb-6 group">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                                        {project.link && (
                                            <Link href={project.link} target="_blank" className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-[var(--electric-cyan)] hover:text-black transition-colors">
                                                <Github className="w-4 h-4" />
                                            </Link>
                                        )}
                                        {project.link && (
                                            <Link href={project.link} target="_blank" className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-[var(--neon-lime)] hover:text-black transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-[var(--electric-cyan)] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 mb-6 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {(project.tags || []).map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </GradientBorder>
                    </FloatingCard>
                ))}
            </div>
        </div>
    );
}
