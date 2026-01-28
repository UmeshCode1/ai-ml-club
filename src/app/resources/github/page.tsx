import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Github, Code2, Users, Star } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "GitHub Repositories & Open Source | AIML Club OCT",
    description: "Access the official open-source codebase of the AI & Machine Learning Club. Explore our projects, algorithms, and contribute to student-led innovations at Oriental College of Technology.",
    alternates: {
        canonical: "https://aimlclub.tech/resources/github",
    },
};

export default function GithubResourcePage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 text-white mb-6">
                        <Github className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">
                        Open Source <span className="text-[var(--electric-cyan)]">Initiatives</span>
                    </h1>
                </header>

                <article className="prose prose-invert prose-lg mx-auto bg-neutral-900/50 p-8 rounded-[2rem] border border-white/5">
                    <p className="lead text-xl text-neutral-300">
                        Welcome to the engineering backbone of the AI & Machine Learning Club. Our GitHub organization is the central repository for all student-led projects, workshop codebases, and the source code for this very platform.
                    </p>

                    <h2>Why We Build Open Source</h2>
                    <p>
                        At OCT Bhopal, we believe that code is meant to be shared. By maintaining an active open-source presence, we aim to:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-8">
                        <li className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                            <Code2 className="w-6 h-6 text-[var(--neon-lime)] shrink-0" />
                            <span className="text-sm">Provide real-world examples of Next.js, Python, and TensorFlow implementations.</span>
                        </li>
                        <li className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                            <Users className="w-6 h-6 text-[var(--electric-cyan)] shrink-0" />
                            <span className="text-sm">Foster collaboration through Pull Requests and code reviews.</span>
                        </li>
                        <li className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                            <Star className="w-6 h-6 text-yellow-400 shrink-0" />
                            <span className="text-sm">Showcase student talent to potential employers and the global developer community.</span>
                        </li>
                    </ul>

                    <h3>Available Repositories</h3>
                    <p>
                        Our organization hosts a variety of projects ranging from web applications to machine learning models:
                    </p>
                    <ul>
                        <li><strong>Official Website:</strong> The Next.js 14 codebase powering <code>aimlclub.tech</code>.</li>
                        <li><strong>Workshop Assets:</strong> Jupyter notebooks and datasets from our weekly hands-on sessions.</li>
                        <li><strong>Hackathon Templates:</strong> Starter kits for participants to hit the ground running.</li>
                        <li><strong>Club Algorithms:</strong> Custom implementations of classic ML algorithms in Python.</li>
                    </ul>

                    <div className="mt-12 text-center">
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
                        >
                            <Github className="w-5 h-5" />
                            Visit GitHub Organization
                        </Link>
                        <p className="text-sm text-neutral-500 mt-4">
                            Redirecting to github.com/aimlcluboct...
                        </p>
                    </div>
                </article>
            </div>
        </main>
    );
}
