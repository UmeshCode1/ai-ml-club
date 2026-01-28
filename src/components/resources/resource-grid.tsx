"use client";

import { Github, FileText, Database, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useHaptic } from "@/hooks/use-haptic";

export function ResourceGrid() {
    const { trigger } = useHaptic();

    const resources = [
        {
            title: "GitHub",
            icon: Github,
            href: "/resources/github",
            color: "text-white",
            bg: "bg-white/10"
        },
        {
            title: "Notion",
            icon: FileText,
            href: "/resources/notion",
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        {
            title: "Drive",
            icon: Database,
            href: "/resources/media-drive",
            color: "text-green-400",
            bg: "bg-green-500/10"
        },
        {
            title: "Channel",
            icon: MessageCircle,
            href: "/resources/whatsapp-channel",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10"
        }
    ];

    return (
        <div className="grid grid-cols-2 gap-4 mt-8">
            {resources.map((resource) => (
                <Link
                    key={resource.href}
                    href={resource.href}
                    onClick={trigger}
                    className="flex flex-col items-center justify-center p-6 rounded-3xl bg-neutral-900/50 border border-white/5 active:scale-95 transition-transform aspect-[1.1]"
                >
                    <div className={`p-4 rounded-2xl ${resource.bg} ${resource.color} mb-3`}>
                        <resource.icon className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-neutral-200">{resource.title}</span>
                </Link>
            ))}
        </div>
    );
}
