"use client";

import { Calendar, BookOpen, Users, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useHaptic } from "@/hooks/use-haptic";

export function QuickActions() {
    const { trigger } = useHaptic();

    const actions = [
        { name: "Events", icon: Calendar, href: "/events", color: "text-blue-500", bg: "bg-blue-500/10" },
        { name: "Resources", icon: BookOpen, href: "/resources", color: "text-purple-500", bg: "bg-purple-500/10" },
        { name: "Team", icon: Users, href: "/team", color: "text-green-500", bg: "bg-green-500/10" },
        { name: "Updates", icon: MessageSquare, href: "/updates", color: "text-orange-500", bg: "bg-orange-500/10" },
    ];

    return (
        <section className="hidden standalone:block px-4 py-8 max-w-7xl mx-auto">
            <h2 className="text-xl font-bold mb-6 px-2">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
                {actions.map((action) => (
                    <Link
                        key={action.name}
                        href={action.href}
                        onClick={trigger}
                        className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 border border-white/5 active:scale-95 transition-transform"
                    >
                        <div className={`p-4 rounded-full ${action.bg} ${action.color} mb-3`}>
                            <action.icon className="w-8 h-8" />
                        </div>
                        <span className="font-medium text-neutral-300">{action.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
