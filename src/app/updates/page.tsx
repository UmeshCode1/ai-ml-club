import { Metadata } from "next";
import { Calendar, Megaphone, Trophy, Star } from "lucide-react";

export const metadata: Metadata = {
    title: "Latest Club Updates & News | AIML Club OCT",
    description: "Stay informed with the latest announcements, hackathon winners, workshop schedules, and community achievements from the AI & Machine Learning Club at Oriental College of Technology.",
    alternates: {
        canonical: "https://aimlclub.tech/updates",
    },
};

export default function UpdatesPage() {
    const updates = [
        {
            date: "October 15, 2025",
            type: "Announcement",
            icon: Megaphone,
            title: "Techno-Sagar 2025 Registration Open",
            content: "The biggest tech fest of Central India is back! AIML Club will be hosting two flagship events: 'Code-a-Thon' and 'AI Model Expo'. Register now to secure your spot.",
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        {
            date: "September 28, 2025",
            type: "Achievement",
            icon: Trophy,
            title: "Smart India Hackathon Finalists",
            content: "Congratulations to Team 'Neural Nexus' for securing a spot in the SIH 2025 Grand Finale. They will be representing OCT at the nodal center in Pune.",
            color: "text-yellow-400",
            bg: "bg-yellow-500/10"
        },
        {
            date: "September 10, 2025",
            type: "Workshop",
            icon: Calendar,
            title: "GenAI Workshop Success",
            content: "Over 150 students attended our hands-on session on Large Language Models. Special thanks to our speaker, Mr. Ankit Sharma from Google Developers Group.",
            color: "text-green-400",
            bg: "bg-green-500/10"
        },
        {
            date: "August 20, 2025",
            type: "Community",
            icon: Star,
            title: "Club Recruitment Drive Phase 1",
            content: "We are thrilled to welcome 45 new members to the AIML family! The induction ceremony will be held on August 25th at the Main Auditorium.",
            color: "text-purple-400",
            bg: "bg-purple-500/10"
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)]">
                            Club Updates
                        </span>
                    </h1>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        A chronological timeline of our latest activities, announcements, and milestones at Oriental College of Technology.
                    </p>
                </header>

                <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-12">
                    {updates.map((update, index) => (
                        <article key={index} className="relative pl-8 md:pl-12">
                            {/* Timeline Node */}
                            <div className={`absolute -left-3 top-0 p-2 rounded-full border border-neutral-900 ${update.bg} ${update.color}`}>
                                <update.icon className="w-4 h-4" />
                            </div>

                            <div className="flex flex-col gap-2 mb-2">
                                <span className={`text-xs font-bold uppercase tracking-wider ${update.color}`}>
                                    {update.type}
                                </span>
                                <time className="text-sm text-neutral-500">{update.date}</time>
                            </div>

                            <h2 className="text-2xl font-bold mb-3 text-white">
                                {update.title}
                            </h2>
                            <p className="text-neutral-400 leading-relaxed max-w-2xl">
                                {update.content}
                            </p>
                        </article>
                    ))}
                </div>

                <section className="mt-20 pt-10 border-t border-neutral-800 text-center">
                    <p className="text-neutral-500">
                        For real-time updates, follow our <a href="/resources/whatsapp-channel" className="text-[var(--electric-cyan)] hover:underline">WhatsApp Channel</a>.
                    </p>
                </section>
            </div>
        </main>
    );
}
