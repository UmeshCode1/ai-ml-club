"use client";

import { ResourceGrid } from "@/components/resources/resource-grid";

export function AppLearn() {
    return (
        <div className="min-h-screen pb-24 pt-12 px-4">
            <header className="px-2 mb-6">
                <h1 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
                    Learning <span className="text-[var(--neon-lime)]">Hub</span>
                </h1>
                <p className="text-xs text-neutral-500 font-mono">Curated Resources & Tools</p>
            </header>

            <section>
                <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-4 mb-6">
                    <h3 className="text-sm font-bold text-white mb-2">Welcome to the Hub</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                        Access our complete repository of AI/ML learning materials, project templates, and community guidelines directly from here.
                    </p>
                </div>

                <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider px-2">Key Resources</h2>
                <ResourceGrid />
            </section>
        </div>
    );
}
