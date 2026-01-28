import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { FileText, BookOpen, Calendar, Map } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Notion Knowledge Base & Docs | AIML Club OCT",
    description: "Access the official documentation, meeting notes, and learning roadmaps of the AI & Machine Learning Club. Your guide to club activities at Oriental College of Technology.",
    alternates: {
        canonical: "https://aimlclub.tech/resources/notion",
    },
};

export default function NotionResourcePage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-blue-500/10 text-blue-400 mb-6">
                        <FileText className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">
                        Knowledge <span className="text-blue-400">Base</span>
                    </h1>
                </header>

                <article className="prose prose-invert prose-lg mx-auto bg-neutral-900/50 p-8 rounded-[2rem] border border-white/5">
                    <p className="lead text-xl text-neutral-300">
                        The AIML Club Notion workspace is our digital headquarters for documentation, planning, and educational resources. It serves as the single source of truth for all club operations.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-8">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <BookOpen className="w-8 h-8 text-blue-400 mb-4" />
                            <h3 className="text-lg font-bold mb-2">Learning Paths</h3>
                            <p className="text-sm text-neutral-400">Curated roadmaps for mastering Python, Data Science, and Deep Learning.</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <Calendar className="w-8 h-8 text-purple-400 mb-4" />
                            <h3 className="text-lg font-bold mb-2">Event Archives</h3>
                            <p className="text-sm text-neutral-400">Detailed notes, slides, and recordings from past workshops.</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <Map className="w-8 h-8 text-emerald-400 mb-4" />
                            <h3 className="text-lg font-bold mb-2">Strategic Plans</h3>
                            <p className="text-sm text-neutral-400">Meeting minutes and semester-long roadmaps for the club.</p>
                        </div>
                    </div>

                    <h3>For Core Members</h3>
                    <p>
                        If you are part of the club council or a dedicated volunteer, this workspace is where we collaborate on:
                    </p>
                    <ul>
                        <li>Event logistics and budgeting.</li>
                        <li>Social media content calendars.</li>
                        <li>Project tracking and task management.</li>
                    </ul>

                    <div className="mt-12 text-center">
                        <Link
                            href={siteConfig.links.notion}
                            target="_blank"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-colors"
                        >
                            <FileText className="w-5 h-5" />
                            Access Notion Workspace
                        </Link>
                        <p className="text-sm text-neutral-500 mt-4">
                            Redirecting to notion.site...
                        </p>
                    </div>
                </article>
            </div>
        </main>
    );
}
