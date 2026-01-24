"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Linkedin, Github, Instagram, GraduationCap, Users } from "lucide-react";
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
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[61] flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-white/10"
                        >
                            {/* Decorative Background Glows */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--neon-lime)]/10 rounded-full blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/5 dark:bg-black/20 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-500 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white transition-all backdrop-blur-sm border border-black/5 dark:border-white/5"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col md:flex-row relative z-10">
                                {/* Left Side: Image & Socials */}
                                <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-white/[0.02]">
                                    {/* Avatar */}
                                    <div className="relative w-40 h-40 md:w-full md:aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-6 group">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--neon-lime)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                                        {hasImage ? (
                                            <Image
                                                src={member.imageUrl!}
                                                alt={member.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900">
                                                <span className="text-4xl font-bold text-neutral-400 dark:text-white/50">{initials}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Social Links (Desktop: Left Side, Mobile: Hidden here, shown below) */}
                                    <div className="hidden md:flex gap-3 justify-center w-full">
                                        {member.linkedin && <SocialButton href={member.linkedin} icon={Linkedin} color="text-[#0077B5]" hoverBg="hover:bg-[#0077B5]/20" />}
                                        {member.github && <SocialButton href={member.github} icon={Github} color="text-white" hoverBg="hover:bg-white/20" />}
                                        {member.instagram && <SocialButton href={member.instagram} icon={Instagram} color="text-[#E1306C]" hoverBg="hover:bg-[#E1306C]/20" />}
                                    </div>
                                </div>

                                {/* Right Side: Details */}
                                <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                                    <div className="mb-6">
                                        <div className="inline-block px-3 py-1 rounded-full bg-[var(--neon-lime)]/10 text-[var(--neon-lime)] text-xs font-bold uppercase tracking-wider mb-3 border border-[var(--neon-lime)]/20">
                                            {member.role}
                                        </div>
                                        <h2 className="text-3xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2 leading-tight">
                                            {member.name}
                                        </h2>
                                        <div className="h-1 w-20 bg-gradient-to-r from-[var(--electric-cyan)] to-transparent rounded-full" />
                                    </div>

                                    <div className="space-y-4">
                                        {member.team && (
                                            <DetailRow icon={Users} label="Team" value={member.team} color="text-purple-400" />
                                        )}
                                        {member.enrollmentNo && (
                                            <DetailRow icon={GraduationCap} label="Enrollment" value={member.enrollmentNo} color="text-amber-400" />
                                        )}
                                        {member.email && (
                                            <DetailRow icon={Mail} label="Email" value={member.email} color="text-[var(--electric-cyan)]" isLink />
                                        )}
                                    </div>

                                    {/* Mobile Socials */}
                                    <div className="flex md:hidden gap-3 mt-8 pt-6 border-t border-white/5 justify-center">
                                        {member.linkedin && <SocialButton href={member.linkedin} icon={Linkedin} color="text-[#0077B5]" hoverBg="hover:bg-[#0077B5]/20" />}
                                        {member.github && <SocialButton href={member.github} icon={Github} color="text-white" hoverBg="hover:bg-white/20" />}
                                        {member.instagram && <SocialButton href={member.instagram} icon={Instagram} color="text-[#E1306C]" hoverBg="hover:bg-[#E1306C]/20" />}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

function SocialButton({ href, icon: Icon, color, hoverBg }: { href: string; icon: React.ElementType; color: string; hoverBg: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-xl bg-neutral-100 dark:bg-white/5 flex items-center justify-center ${color} ${hoverBg} transition-all duration-300 border border-neutral-200 dark:border-white/5 hover:border-neutral-300 dark:hover:border-white/20`}
        >
            <Icon className="w-5 h-5" />
        </a>
    );
}

function DetailRow({ icon: Icon, label, value, color, isLink = false }: { icon: React.ElementType; label: string; value: string; color: string; isLink?: boolean }) {
    return (
        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors group">
            <div className={`w-10 h-10 rounded-lg bg-neutral-100 dark:bg-white/5 flex items-center justify-center ${color} border border-neutral-200 dark:border-white/5 group-hover:border-neutral-300 dark:group-hover:border-white/10 transition-colors`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">{label}</p>
                {isLink ? (
                    <a href={`mailto:${value}`} className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-[var(--neon-lime-text)] transition-colors truncate block">
                        {value}
                    </a>
                ) : (
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 truncate">{value}</p>
                )}
            </div>
        </div>
    );
}
