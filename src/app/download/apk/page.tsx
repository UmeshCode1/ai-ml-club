import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Smartphone, Download, ShieldCheck, Cpu } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
    title: "Download Android APK | AIML Club OCT",
    description: "Get the official AI & Machine Learning Club Android application. Features offline access, event notifications, and exclusive resources for Oriental College students.",
    alternates: {
        canonical: "https://aimlclub.tech/download/apk",
    },
};

export default function ApkDownloadPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-[var(--neon-lime)]/10 text-[var(--neon-lime)] mb-6">
                        <Smartphone className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">
                        Android <span className="text-[var(--neon-lime)]">Installer</span>
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <article className="prose prose-invert prose-lg bg-neutral-900/50 p-8 rounded-[2rem] border border-white/5">
                        <p className="lead text-xl text-neutral-300">
                            The AIML Club APK provides the most robust and performant experience for Android users. It is built to run smoothly on all devices, ensuring connection to the club lifestyle 24/7.
                        </p>

                        <h3>Key Features</h3>
                        <ul className="not-prose space-y-3 my-6">
                            <li className="flex items-start gap-3">
                                <Cpu className="w-5 h-5 text-[var(--neon-lime)] shrink-0 mt-1" />
                                <span className="text-neutral-300 text-sm">Hardware-accelerated animations for 60fps performance.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 text-[var(--neon-lime)] shrink-0 mt-1" />
                                <span className="text-neutral-300 text-sm">Secure login via Appwrite backend.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Download className="w-5 h-5 text-[var(--neon-lime)] shrink-0 mt-1" />
                                <span className="text-neutral-300 text-sm">Offline caching for event schedules and resources.</span>
                            </li>
                        </ul>

                        <h3>Installation Guide</h3>
                        <ol className="text-sm text-neutral-400 space-y-2">
                            <li>Download the <code>.apk</code> file using the button below.</li>
                            <li>Open the file and allow &quot;Install from Unknown Sources&quot; if prompted.</li>
                            <li>Follow the on-screen instructions to complete setup.</li>
                        </ol>
                    </article>

                    <div className="space-y-6">
                        <div className="bg-[var(--card-bg)] p-8 rounded-[2.5rem] border border-white/10 text-center">
                            <h2 className="text-2xl font-bold mb-2">Direct Download</h2>
                            <p className="text-sm text-neutral-400 mb-8">Version 1.2.0 • 15 MB • Android 8.0+</p>

                            <a href={siteConfig.links.apk} download="aiml-club.apk" className="block w-full">
                                <MagneticButton>
                                    <div className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-[var(--neon-lime)] text-black font-black rounded-3xl group hover:scale-[1.03] transition-all cursor-pointer">
                                        <Download className="w-6 h-6" />
                                        <span>Download APK</span>
                                    </div>
                                </MagneticButton>
                            </a>
                            <p className="text-[10px] text-neutral-500 mt-4 uppercase tracking-wider">
                                Verified Secure • Virus Free
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                            <h3 className="font-bold mb-2 text-white">Developer Note</h3>
                            <p className="text-xs text-neutral-400 leading-relaxed">
                                This app is signed with the official key of the Oriental College of Technology AIML Club. Always download from this official website to ensure security.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
