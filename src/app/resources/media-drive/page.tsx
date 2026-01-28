import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Database, Image as ImageIcon, Download, Share2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Media Assets & Brand Kit | AIML Club OCT",
    description: "Download high-resolution event photos, logos, and branding materials for the AI & Machine Learning Club. Official media drive for Oriental College of Technology students.",
    alternates: {
        canonical: "https://aimlclub.tech/resources/media-drive",
    },
};

export default function MediaResourcePage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-green-500/10 text-green-400 mb-6">
                        <Database className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">
                        Media <span className="text-green-400">Assets</span>
                    </h1>
                </header>

                <article className="prose prose-invert prose-lg mx-auto bg-neutral-900/50 p-8 rounded-[2rem] border border-white/5">
                    <p className="lead text-xl text-neutral-300">
                        The AIML Club Media Drive is a centralized repository for all visual content produced by our creative team. Whether you need assets for a presentation or memories from an event, you&apos;ll find them here.
                    </p>

                    <h2>Available Collections</h2>
                    <ul className="not-prose space-y-4 my-8">
                        <li className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-green-500/30 transition-colors">
                            <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Event Photography</h3>
                                <p className="text-sm text-neutral-400">High-res captures from workshops, hackathons, and seminars.</p>
                            </div>
                        </li>
                        <li className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-green-500/30 transition-colors">
                            <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                                <Share2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Brand Identity Kit</h3>
                                <p className="text-sm text-neutral-400">Official logos, color palettes, and typography guidelines.</p>
                            </div>
                        </li>
                        <li className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-green-500/30 transition-colors">
                            <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                                <Download className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Presentation Templates</h3>
                                <p className="text-sm text-neutral-400">Slide decks and poster templates for club members.</p>
                            </div>
                        </li>
                    </ul>

                    <h3>Usage Guidelines</h3>
                    <p>
                        All assets provided in this drive are property of the AI & Machine Learning Club, Oriental College of Technology.
                    </p>
                    <ul>
                        <li>Use these assets responsibly for club-related activities.</li>
                        <li>Do not alter the official logo without permission from the creative lead.</li>
                        <li>Respect the privacy of individuals in event photos.</li>
                    </ul>

                    <div className="mt-12 text-center">
                        <Link
                            href={siteConfig.links.drive}
                            target="_blank"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-500 transition-colors"
                        >
                            <Database className="w-5 h-5" />
                            Open Google Drive
                        </Link>
                        <p className="text-sm text-neutral-500 mt-4">
                            Redirecting to drive.google.com...
                        </p>
                    </div>
                </article>
            </div>
        </main>
    );
}
