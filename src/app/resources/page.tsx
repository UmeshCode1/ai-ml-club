import { Metadata } from "next";
import { Github, FileText, Database, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SeoOnly, AppOnly } from "@/components/layout/dual-view";
import { AppLearn } from "@/components/app/app-learn";

export const metadata: Metadata = {
    title: "Resources & Assets | AI & Machine Learning Club | OCT Bhopal",
    description: "Access official AIML Club resources including our GitHub repositories, Notion documentation, media assets, and community WhatsApp channels.",
    alternates: {
        canonical: "https://aimlclub.tech/resources",
    },
};

export default function ResourcesPage() {
    const resources = [
        {
            title: "GitHub Organization",
            description: "Explore our open-source projects, algorithms, and club codebase. Contribute to real-world AI applications.",
            icon: Github,
            href: "/resources/github",
            color: "text-white",
            bg: "bg-white/5",
            border: "border-white/10"
        },
        {
            title: "Notion Knowledge Base",
            description: "Comprehensive documentation, meeting notes, learning roadmaps, and event planning workspaces.",
            icon: FileText,
            href: "/resources/notion",
            color: "text-blue-400",
            bg: "bg-blue-500/5",
            border: "border-blue-500/20"
        },
        {
            title: "Media Assets Drive",
            description: "Download high-quality event photos, club branding kit, logos, and promotional materials.",
            icon: Database,
            href: "/resources/media-drive",
            color: "text-green-400",
            bg: "bg-green-500/5",
            border: "border-green-500/20"
        },
        {
            title: "WhatsApp Community",
            description: "Join our official announcement channel to stay updated on upcoming workshops and hackathons.",
            icon: MessageCircle,
            href: "/resources/whatsapp-channel",
            color: "text-emerald-400",
            bg: "bg-emerald-500/5",
            border: "border-emerald-500/20"
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <SeoOnly>
                    <header className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)]">
                                Club Resources
                            </span>
                        </h1>
                        <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                            A centralized hub for all digital assets, code repositories, and documentation maintained by the AI & Machine Learning Club at Oriental College of Technology.
                        </p>
                    </header>
                </SeoOnly>

                <AppOnly>
                    <AppLearn />
                </AppOnly>

                <SeoOnly>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {resources.map((resource) => (
                            <Link
                                key={resource.href}
                                href={resource.href}
                                className={`group relative p-8 rounded-[2rem] border ${resource.border} ${resource.bg} hover:bg-opacity-20 transition-all duration-300 overflow-hidden`}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`p-4 rounded-2xl bg-white/5 ${resource.color}`}>
                                        <resource.icon className="w-8 h-8" />
                                    </div>
                                    <div className="p-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                        <ArrowRight className="w-5 h-5 text-neutral-300" />
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold mb-3 group-hover:text-[var(--electric-cyan)] transition-colors">
                                    {resource.title}
                                </h2>
                                <p className="text-neutral-400 leading-relaxed">
                                    {resource.description}
                                </p>
                            </Link>
                        ))}
                    </div>

                    <section className="mt-20 pt-10 border-t border-neutral-800">
                        <div className="bg-neutral-900/50 rounded-3xl p-8 md:p-12 border border-neutral-800">
                            <h2 className="text-2xl font-bold mb-4">Academic & Professional Growth</h2>
                            <div className="prose prose-invert max-w-none text-neutral-400">
                                <p>
                                    The AI & Machine Learning Club provides these resources to foster continuous learning and professional development among students at Oriental College of Technology.
                                    By accessing our repositories and documentation, members can:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 mt-4">
                                    <li>Study production-grade code examples and system architectures.</li>
                                    <li>Access learning paths for Data Science, NLP, and Computer Vision.</li>
                                    <li>Utilize standardized brand assets for club-affiliated projects.</li>
                                    <li>Engage with the community through official communication channels.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </SeoOnly>
            </div>
        </main>
    );
}
