import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { MessageCircle, Bell, Users, Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Join WhatsApp Community | AIML Club OCT",
    description: "Connect with the AI & Machine Learning Club community on WhatsApp. Get instant updates on workshops, hackathons, and tech news at Oriental College of Technology.",
    alternates: {
        canonical: "https://aimlclub.tech/resources/whatsapp-channel",
    },
};

export default function WhatsAppResourcePage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-6">
                        <MessageCircle className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">
                        Community <span className="text-emerald-400">Channel</span>
                    </h1>
                </header>

                <article className="prose prose-invert prose-lg mx-auto bg-neutral-900/50 p-8 rounded-[2rem] border border-white/5">
                    <p className="lead text-xl text-neutral-300">
                        Stay connected with the heartbeat of the AIML Club. Our WhatsApp Channel is the fastest way to receive official announcements, event reminders, and tech opportunities directly on your phone.
                    </p>

                    <h2>Why Should You Join?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-8">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                            <Bell className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
                            <h3 className="text-lg font-bold mb-2">Instant Alerts</h3>
                            <p className="text-sm text-neutral-400">Never miss a workshop registration or hackathon deadline.</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                            <h3 className="text-lg font-bold mb-2">Tech News</h3>
                            <p className="text-sm text-neutral-400">Curated updates on the latest breakthroughs in AI and ML.</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                            <Users className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                            <h3 className="text-lg font-bold mb-2">Network</h3>
                            <p className="text-sm text-neutral-400">Connect with hundreds of like-minded tech enthusiasts.</p>
                        </div>
                    </div>

                    <h3>Respect & Guidelines</h3>
                    <p>
                        To maintain a professional and helpful environment for all students at Oriental College of Technology:
                    </p>
                    <ul>
                        <li>This channel is for official club communication only.</li>
                        <li>Respect the community guidelines regarding spam and promotional content.</li>
                        <li>Feel free to reach out to admins for queries, but keep general discussions to the discussion group.</li>
                    </ul>

                    <div className="mt-12 text-center">
                        <Link
                            href={siteConfig.links.whatsappChannel}
                            target="_blank"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-500 transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Join WhatsApp Channel
                        </Link>
                        <p className="text-sm text-neutral-500 mt-4">
                            Redirecting to whatsapp.com...
                        </p>
                    </div>
                </article>
            </div>
        </main>
    );
}
