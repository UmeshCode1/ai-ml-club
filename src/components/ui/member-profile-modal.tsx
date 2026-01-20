"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Linkedin, Github, Instagram, MapPin, GraduationCap, Users } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface MemberProfile {
    $id?: string;
    name: string;
    role: string;
    team?: string;
    email?: string;
    enrollmentNo?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    imageUrl?: string;
}

interface MemberProfileModalProps {
    member: MemberProfile | null;
    isOpen: boolean;
    onClose: () => void;
}

export function MemberProfileModal({ member, isOpen, onClose }: MemberProfileModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!member) return null;

    const initials = member.name.split(" ").map(n => n[0]).join("").slice(0, 2);
    const hasImage = member.imageUrl && member.imageUrl !== "/images/team/placeholder.jpg";
    const hasSocials = member.linkedin || member.github || member.instagram;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={(e) => e.target === e.currentTarget && onClose()}
                    >
                        <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-white/10">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/10 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-white/20 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header Background */}
                            <div className="relative h-32 bg-gradient-to-br from-[var(--electric-cyan)] via-[var(--neon-lime)] to-[var(--electric-cyan)]">
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-neutral-900" />
                            </div>

                            {/* Profile Content */}
                            <div className="relative px-6 pb-6 -mt-16">
                                {/* Avatar */}
                                <div className="relative w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden border-4 border-white dark:border-neutral-900 shadow-xl">
                                    {hasImage ? (
                                        <Image
                                            src={member.imageUrl!}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--electric-cyan)] to-[var(--neon-lime)] text-black font-bold text-3xl">
                                            {initials}
                                        </div>
                                    )}
                                </div>

                                {/* Name & Role */}
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
                                        {member.name}
                                    </h2>
                                    <p className="text-[var(--electric-cyan)] font-semibold">
                                        {member.role}
                                    </p>
                                </div>

                                {/* Info Cards */}
                                <div className="space-y-3 mb-6">
                                    {/* Team */}
                                    {member.team && (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
                                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                                <Users className="w-5 h-5 text-purple-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Team</p>
                                                <p className="text-sm font-medium text-neutral-900 dark:text-white">{member.team}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Enrollment */}
                                    {member.enrollmentNo && (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
                                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                                <GraduationCap className="w-5 h-5 text-amber-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Enrollment No.</p>
                                                <p className="text-sm font-medium text-neutral-900 dark:text-white font-mono">{member.enrollmentNo}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Email */}
                                    {member.email && (
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:border-[var(--electric-cyan)] transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                                                <Mail className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Email</p>
                                                <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{member.email}</p>
                                            </div>
                                        </a>
                                    )}
                                </div>

                                {/* Social Links */}
                                {hasSocials && (
                                    <div className="border-t border-neutral-200 dark:border-white/10 pt-4">
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center mb-3">Connect</p>
                                        <div className="flex justify-center gap-3">
                                            {member.linkedin && (
                                                <a
                                                    href={member.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-12 h-12 rounded-xl bg-[#0077B5]/10 flex items-center justify-center text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all hover:scale-110"
                                                >
                                                    <Linkedin className="w-6 h-6" />
                                                </a>
                                            )}
                                            {member.github && (
                                                <a
                                                    href={member.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-12 h-12 rounded-xl bg-neutral-800/10 dark:bg-white/10 flex items-center justify-center text-neutral-800 dark:text-white hover:bg-neutral-800 hover:text-white transition-all hover:scale-110"
                                                >
                                                    <Github className="w-6 h-6" />
                                                </a>
                                            )}
                                            {member.instagram && (
                                                <a
                                                    href={member.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 flex items-center justify-center text-pink-500 hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:text-white transition-all hover:scale-110"
                                                >
                                                    <Instagram className="w-6 h-6" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
