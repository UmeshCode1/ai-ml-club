"use client";

import { useState, useMemo } from "react";
import { Mail, Users, Crown, Sparkles, Mic, Shield, Calendar, Camera, Palette, Video, Linkedin, Github, Instagram, GraduationCap, ChevronRight, Award, Star, CalendarDays } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MemberProfileModal } from "@/components/ui/member-profile-modal";
import { BlurReveal } from "@/components/ui/blur-reveal";
import React, { memo, useCallback } from "react";

// Member type
interface AppwriteMember {
    $id?: string;
    name: string;
    role: string;
    team?: string;
    email?: string;
    enrollmentNo?: string;
    contactNo?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    imageUrl?: string;
    year?: string;
    status?: string;
}

// Team sections
const TEAM_SECTIONS = [
    { id: "faculty", title: "Faculty Coordination", filter: "Faculty", icon: GraduationCap, color: "from-amber-500 to-yellow-400", bgColor: "bg-gradient-to-br from-amber-500/10 to-yellow-500/5", borderColor: "border-amber-500/30", description: "Guiding our vision with wisdom and experience" },
    { id: "core", title: "Core Student Leadership", filter: "Core Leadership", icon: Crown, color: "from-purple-500 to-pink-500", bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/5", borderColor: "border-purple-500/30", description: "Leading the club towards innovation and excellence" },
    { id: "events", title: "Event & Operations Team", filter: "Event & Operations", icon: Calendar, color: "from-blue-500 to-cyan-500", bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/5", borderColor: "border-blue-500/30", description: "Organizing memorable events and experiences" },
    { id: "discipline", title: "Discipline Team", filter: "Discipline", icon: Shield, color: "from-red-500 to-orange-500", bgColor: "bg-gradient-to-br from-red-500/10 to-orange-500/5", borderColor: "border-red-500/30", description: "Maintaining order and excellence in all activities" },
    { id: "technical", title: "Technical Team", filter: "Technical", icon: Sparkles, color: "from-green-500 to-emerald-500", bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-500/5", borderColor: "border-green-500/30", description: "Building innovative solutions and digital experiences" },
    { id: "anchors", title: "Anchors & Stage Management", filter: "Anchors & Stage", icon: Mic, color: "from-violet-500 to-purple-500", bgColor: "bg-gradient-to-br from-violet-500/10 to-purple-500/5", borderColor: "border-violet-500/30", description: "Bringing energy and charisma to every event" },
];

const PHOTOPIA_TEAMS = [
    { id: "pr", title: "Public Relations", filter: "Media - PR", icon: Users, color: "from-pink-500 to-rose-500" },
    { id: "design", title: "Design & Graphics Team", filter: "Media - Design", icon: Palette, color: "from-orange-500 to-amber-500" },
    { id: "editors", title: "Media & Editors Team", filter: "Media - Editors", icon: Video, color: "from-teal-500 to-cyan-500" },
];

// Optimized animations for mobile performance
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 50,
            damping: 20
        }
    }
};

// Member Card Component
const MemberCard = memo(({ member, isLeadership = false, onClick }: { member: AppwriteMember; isLeadership?: boolean; onClick: (member: AppwriteMember) => void }) => {
    const initials = member.name.split(" ").map(n => n[0]).join("").slice(0, 2);
    const hasImage = member.imageUrl && member.imageUrl !== "/images/team/placeholder.jpg";
    const hasSocials = member.linkedin || member.github || member.instagram;
    const handleClick = () => onClick(member);

    if (isLeadership) {
        return (
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={cardVariants}
                onClick={handleClick}
                className="group relative cursor-pointer will-change-transform"
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-lime)]/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-6 bg-[var(--card-bg)] backdrop-blur-md rounded-3xl border border-neutral-200 dark:border-white/10 group-hover:border-[var(--neon-lime)]/50 transition-all duration-500 hover:-translate-y-1">
                    {/* Noise Texture */}
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none rounded-3xl" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-5 mb-5">
                            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 group-hover:border-[var(--electric-cyan)] transition-colors shadow-2xl">
                                {hasImage ? (
                                    <Image
                                        src={member.imageUrl!}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 768px) 20vw, 150px"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900">
                                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-[var(--electric-cyan)] to-[var(--neon-lime)]">
                                            {initials}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-[var(--neon-lime)] transition-colors truncate">
                                    {member.name}
                                </h3>
                                <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[var(--electric-cyan)]/10 border border-[var(--electric-cyan)]/20">
                                    <p className="text-xs font-semibold text-[var(--electric-cyan)] uppercase tracking-wide truncate">{member.role}</p>
                                </div>
                                {member.enrollmentNo && (
                                    <p className="text-[10px] text-neutral-500 font-mono mt-2">{member.enrollmentNo}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-white/5">
                            {member.email ? (
                                <span className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors truncate max-w-[65%]">
                                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span className="truncate">{member.email}</span>
                                </span>
                            ) : (<div></div>)}

                            {hasSocials && (
                                <div className="flex items-center gap-2">
                                    {member.linkedin && <Linkedin className="w-4 h-4 text-neutral-400 group-hover:text-[#0077b5] transition-colors" />}
                                    {member.github && <Github className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />}
                                    {member.instagram && <Instagram className="w-4 h-4 text-neutral-400 group-hover:text-[#E1306C] transition-colors" />}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Standard Member Card
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={cardVariants}
            onClick={handleClick}
            className="group cursor-pointer will-change-transform"
        >
            <div className="relative p-4 bg-[var(--card-bg)] hover:bg-black/[0.05] dark:hover:bg-white/5 backdrop-blur-sm rounded-2xl border border-black/5 dark:border-white/5 hover:border-[var(--neon-lime)]/30 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-black/10 dark:border-white/10 group-hover:border-[var(--neon-lime)]/50 transition-colors">
                        {hasImage ? (
                            <Image
                                src={member.imageUrl!}
                                alt={member.name}
                                fill
                                sizes="60px"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                                <span className="text-sm font-bold text-neutral-400">{initials}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-[var(--neon-lime-text)] transition-colors truncate">
                            {member.name}
                        </h3>
                        <p className="text-xs text-[var(--electric-cyan)] truncate font-semibold">{member.role}</p>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                        <div className="w-8 h-8 rounded-full bg-[var(--neon-lime)]/10 flex items-center justify-center text-[var(--neon-lime)]">
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

MemberCard.displayName = "MemberCard";

// Section Header
const SectionHeader = memo(({ title, description, memberCount, icon: Icon, color }: { title: string; description?: string; memberCount: number; icon: React.ElementType; color: string; }) => {
    return (
        <div className="flex items-start gap-4 mb-6">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{title}</h2>
                    <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 text-sm font-medium">
                        {memberCount} {memberCount === 1 ? 'member' : 'members'}
                    </span>
                </div>
                {description && <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">{description}</p>}
            </div>
        </div>
    );
});

SectionHeader.displayName = "SectionHeader";

// Year Tab Component
function YearTabs({ years, selectedYear, onYearChange }: { years: string[]; selectedYear: string; onYearChange: (year: string) => void }) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {years.map((year) => (
                <button
                    key={year}
                    onClick={() => onYearChange(year)}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${selectedYear === year
                        ? "bg-[var(--neon-lime)] text-black shadow-lg shadow-[var(--neon-lime)]/30"
                        : "bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-white/10"
                        }`}
                >
                    <span className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        {year}
                    </span>
                </button>
            ))}
        </div>
    );
}

export default function TeamPageClient({ members }: { members: AppwriteMember[] }) {
    const [selectedMember, setSelectedMember] = useState<AppwriteMember | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Get unique years from members, sorted descending (latest first)
    const availableYears = useMemo(() => {
        const years = new Set<string>();
        members.forEach(m => {
            if (m.year) years.add(m.year);
        });
        // Add current year if no years found
        if (years.size === 0) years.add("2024-25");
        return Array.from(years).sort().reverse();
    }, [members]);

    const [selectedYear, setSelectedYear] = useState(availableYears[0] || "2024-25");

    // Filter members by selected year
    const filteredMembers = useMemo(() => {
        const latestYear = availableYears[0];
        return members.filter(m => {
            if (m.year === selectedYear) return true;
            if (selectedYear === latestYear && m.status === "active") {
                return true;
            }
            return false;
        });
    }, [members, selectedYear, availableYears]);

    const handleMemberClick = useCallback((member: AppwriteMember) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const uniqueFilteredMembers = useMemo(() => {
        const seen = new Set<string>();
        return filteredMembers.filter(m => {
            const key = m.name.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }, [filteredMembers]);

    const totalMembers = uniqueFilteredMembers.length;
    const photopiaMembers = uniqueFilteredMembers.filter(m => m.team?.startsWith("Media"));
    const facultyCount = uniqueFilteredMembers.filter(m => m.team === "Faculty").length;
    const leaderCount = uniqueFilteredMembers.filter(m =>
        m.role.toLowerCase().includes("head") ||
        m.role.toLowerCase().includes("lead") ||
        m.role.toLowerCase().includes("president") ||
        m.role.toLowerCase().includes("coordinator")
    ).length;

    return (
        <div className="min-h-screen relative w-full flex flex-col items-center pt-24 px-4 bg-transparent">
            <MemberProfileModal member={selectedMember} isOpen={isModalOpen} onClose={handleCloseModal} />

            {/* Hero Section */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 max-w-5xl">
                {/* Club Logo */}
                <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[var(--neon-lime)]/30 rounded-full blur-3xl animate-pulse scale-150" />
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--neon-lime)]/50 shadow-xl shadow-[var(--neon-lime)]/20">
                            <Image src="/logo-club.png" alt="AIML Club Logo" fill className="object-contain p-1" />
                        </div>
                    </div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-[var(--electric-cyan)]/10 text-[var(--electric-cyan)] rounded-full border border-[var(--electric-cyan)]/30">
                        Oriental College of Technology, Bhopal
                    </span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-6xl font-bold mb-3">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-lime)] via-[var(--electric-cyan)] to-[var(--neon-lime)]">
                        AI & Machine Learning Club
                    </span>
                </motion.h1>

                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-2xl md:text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter mb-6">
                    Core Leadership
                </motion.h2>

                <div className="max-w-2xl mx-auto">
                    <BlurReveal
                        text="The student-led committee responsible for executing technical initiatives, coordinating academic workshops, and managing the club's institutional presence. Our leadership oversees project mentorship and the strategic direction of our technical community."
                        className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed font-medium text-center"
                        delay={0.4}
                    />
                </div>
            </motion.div>

            {/* Year Filter Tabs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <YearTabs years={availableYears} selectedYear={selectedYear} onYearChange={setSelectedYear} />
            </motion.div>

            {/* Stats Badges */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--neon-lime)]/10 border border-[var(--neon-lime)]/30 text-[var(--neon-lime-text)] font-medium">
                    <Users className="w-5 h-5" />
                    <span>{totalMembers} Members</span>
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-500 dark:text-purple-400 font-medium">
                    <Crown className="w-5 h-5" />
                    <span>{leaderCount} Leaders</span>
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--electric-cyan)]/10 border border-[var(--electric-cyan)]/30 text-[var(--electric-cyan)] font-medium">
                    <Award className="w-5 h-5" />
                    <span>9 Departments</span>
                </div>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-sm text-neutral-400 mb-12 flex items-center justify-center gap-2">
                <Star className="w-4 h-4" />
                Click on any member to view their complete profile
            </motion.p>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedYear}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full max-w-7xl space-y-12"
                >
                    {/* Team Sections */}
                    {TEAM_SECTIONS.map((section, sectionIndex) => {
                        const sectionMembers = uniqueFilteredMembers.filter(m => m.team === section.filter);
                        if (sectionMembers.length === 0) return null;
                        const isLeadershipSection = section.id === "faculty" || section.id === "core";

                        return (
                            <motion.section
                                key={section.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: sectionIndex * 0.05 }}
                                className={`relative p-6 md:p-8 rounded-3xl ${section.bgColor} border ${section.borderColor} transition-colors duration-500`}
                            >
                                <SectionHeader title={section.title} description={section.description} memberCount={sectionMembers.length} icon={section.icon} color={section.color} />
                                <div className={`grid gap-4 ${isLeadershipSection ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'}`}>
                                    {sectionMembers.map((member) => (
                                        <MemberCard key={member.$id || member.name} member={member} isLeadership={isLeadershipSection} onClick={handleMemberClick} />
                                    ))}
                                </div>
                            </motion.section>
                        );
                    })}

                    {/* PHOTOPIA Section */}
                    {photopiaMembers.length > 0 && (
                        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative">
                            <div className="relative mb-8 p-6 md:p-8 rounded-3xl bg-[var(--card-bg)] border border-white/10 overflow-hidden shadow-2xl">
                                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[var(--neon-lime)]/10 to-transparent blur-3xl" />
                                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[var(--electric-cyan)]/10 to-transparent blur-3xl" />

                                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[var(--neon-lime)] to-[var(--electric-cyan)] flex items-center justify-center shadow-2xl shadow-[var(--neon-lime)]/30">
                                        <Camera className="w-8 h-8 md:w-10 md:h-10 text-black" />
                                    </div>
                                    <div className="text-center md:text-left flex-1">
                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                                            MEDIA DIVISION – <span className="text-[var(--neon-lime)]">PHOTOPIA</span>
                                        </h2>
                                        <p className="text-neutral-400 italic">Official Media Wing of AI & Machine Learning Club</p>
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-white/10 text-white font-medium text-sm">
                                        {photopiaMembers.length} Members
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {PHOTOPIA_TEAMS.map((subTeam, idx) => {
                                    const subMembers = uniqueFilteredMembers.filter(m => m.team === subTeam.filter);
                                    if (subMembers.length === 0) return null;

                                    return (
                                        <motion.div key={subTeam.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="relative pl-6 border-l-2 border-[var(--neon-lime)]/30">
                                            <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-[var(--neon-lime)]" />

                                            <div className="flex items-center gap-3 mb-4">
                                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subTeam.color} flex items-center justify-center shadow-lg`}>
                                                    <subTeam.icon className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                                                        {subTeam.title}
                                                        <ChevronRight className="w-4 h-4 text-neutral-400" />
                                                    </h3>
                                                    <p className="text-sm text-neutral-500">{subMembers.length} members</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {subMembers.map((member) => (
                                                    <MemberCard key={member.$id || member.name} member={member} onClick={handleMemberClick} />
                                                ))}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.section>
                    )}

                    {/* Stats Footer */}
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16 py-10 px-6 md:px-8 bg-[var(--card-bg)] rounded-3xl border border-white/10 shadow-xl">
                        <h3 className="text-center text-neutral-400 uppercase tracking-wider text-sm font-medium mb-8">
                            {selectedYear} Team at a Glance
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 text-center">
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-[var(--neon-lime)]">{totalMembers}</div>
                                <div className="text-xs md:text-sm text-neutral-400 mt-1">Total Members</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-amber-500">{facultyCount}</div>
                                <div className="text-xs md:text-sm text-neutral-400 mt-1">Faculty</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-purple-500">{leaderCount}</div>
                                <div className="text-xs md:text-sm text-neutral-400 mt-1">Leaders</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-[var(--electric-cyan)]">9</div>
                                <div className="text-xs md:text-sm text-neutral-400 mt-1">Departments</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-pink-500">{photopiaMembers.length}</div>
                                <div className="text-xs md:text-sm text-neutral-400 mt-1">Media Team</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
