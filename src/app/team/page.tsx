"use client";

import { MOCK_TEAM } from "@/lib/data";
import { FloatingCard } from "@/components/ui/floating-card";
import { Linkedin, Github } from "lucide-react";
import Image from "next/image";

export default function TeamPage() {
    return (
        <div className="min-h-screen relative w-full flex flex-col items-center pt-24 px-4 bg-transparent">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 mb-6">
                    The Neural Network
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                    Meet the minds behind the machines. A collective of developers, designers, and innovators.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full z-10 pb-20">
                {MOCK_TEAM.map((member, index) => (
                    <FloatingCard key={member.id} delay={index * 0.1}>
                        <div className="relative group">
                            {/* Image wrapper */}
                            <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Socials overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex justify-center gap-4">
                                        {member.socials?.linkedin && (
                                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-[var(--electric-cyan)] hover:text-black transition-colors">
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                        {member.socials?.github && (
                                            <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-[var(--neon-lime)] hover:text-black transition-colors">
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 mb-1 group-hover:text-[var(--electric-cyan)] transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-[var(--neon-lime-text)] font-medium text-sm mb-3">{member.role}</p>

                                {/* Tech Stack Pills */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    {(member.techStack || []).slice(0, 3).map((tech, i) => (
                                        <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FloatingCard>
                ))}
            </div>
        </div>
    );
}
