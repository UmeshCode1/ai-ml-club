"use client";

import Image from "next/image";
import { Github, Linkedin, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ClientMember } from "@/lib/types";

interface AppCommunityProps {
    members: ClientMember[];
}

export function AppCommunity({ members }: AppCommunityProps) {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter members based on search
    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group by team/role simplified for mobile
    const coreTeam = filteredMembers.filter(m => m.role.toLowerCase().includes("president") || m.role.toLowerCase().includes("lead"));
    const otherMembers = filteredMembers.filter(m => !m.role.toLowerCase().includes("president") && !m.role.toLowerCase().includes("lead"));

    return (
        <div className="min-h-screen pb-24 pt-12 px-4">
            <header className="px-2 mb-6">
                <h1 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
                    Our <span className="text-[var(--neon-lime)]">Community</span>
                </h1>
                <p className="text-xs text-neutral-500 font-mono">Meet the Core Team & Innovators</p>
            </header>

            {/* Search Bar */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-neutral-500" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-neutral-800 rounded-xl leading-5 bg-neutral-900 text-neutral-300 placeholder-neutral-500 focus:outline-none focus:border-[var(--electric-cyan)] focus:ring-1 focus:ring-[var(--electric-cyan)] sm:text-sm transition-colors"
                    placeholder="Search member or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Core Team Section */}
            {!searchTerm && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider px-2 mb-4">Leadership</h2>
                    <div className="flex overflow-x-auto pb-4 gap-4 -mx-4 px-4 scrollbar-hide">
                        {coreTeam.map(member => (
                            <div key={member.$id} className="flex-shrink-0 w-32 relative group">
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative mb-2 border border-white/10">
                                    <Image
                                        src={member.imageUrl || "/placeholder-user.jpg"}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                        sizes="128px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                                        <p className="text-[10px] font-bold text-[var(--neon-lime)] truncate">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                                <h3 className="text-xs font-bold text-white text-center truncate">{member.name}</h3>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* All Members List */}
            <section>
                <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider px-2 mb-4">
                    {searchTerm ? "Search Results" : "All Members"}
                </h2>
                <div className="space-y-3">
                    {(searchTerm ? filteredMembers : otherMembers).map(member => (
                        <div key={member.$id} className="flex items-center gap-4 p-3 rounded-2xl bg-neutral-900/50 border border-white/5">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                                <Image
                                    src={member.imageUrl || "/placeholder-user.jpg"}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold text-white truncate">{member.name}</h3>
                                <p className="text-xs text-neutral-500 truncate">{member.role}</p>
                            </div>
                            <div className="flex gap-2">
                                {member.linkedin && (
                                    <Link href={member.linkedin} target="_blank" className="p-1.5 rounded-full bg-blue-500/10 text-blue-500">
                                        <Linkedin className="w-3.5 h-3.5" />
                                    </Link>
                                )}
                                {member.github && (
                                    <Link href={member.github} target="_blank" className="p-1.5 rounded-full bg-white/10 text-white">
                                        <Github className="w-3.5 h-3.5" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                    {(searchTerm ? filteredMembers : otherMembers).length === 0 && (
                        <p className="text-center text-neutral-500 text-xs py-8">No members found.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
