import { Metadata } from "next";
import { Globe, Zap, Smartphone, Check } from "lucide-react";

export const metadata: Metadata = {
    title: "Web App & PWA Guide | AIML Club OCT",
    description: "Experience the AIML Club app directly in your browser. Install as a Progressive Web App (PWA) on iOS, Windows, and MacOS for a native-like experience without downloads.",
    alternates: {
        canonical: "https://aimlclub.tech/download/web-app",
    },
};

export default function WebAppPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-[var(--electric-cyan)]/10 text-[var(--electric-cyan)] mb-6">
                        <Globe className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">
                        Progressive <span className="text-[var(--electric-cyan)]">Web App</span>
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <article className="prose prose-invert prose-lg bg-neutral-900/50 p-8 rounded-[2rem] border border-white/5 order-2 md:order-1">
                        <p className="lead text-xl text-neutral-300">
                            Don&apos;t want to install an APK? No problem. Our platform is a fully certified Progressive Web App (PWA), offering a native app-like experience directly from your browser.
                        </p>

                        <h3>Why Choose PWA?</h3>
                        <ul className="not-prose space-y-3 my-6">
                            <li className="flex items-start gap-3">
                                <Zap className="w-5 h-5 text-[var(--electric-cyan)] shrink-0 mt-1" />
                                <span className="text-neutral-300 text-sm">Zero storage footprint. No large downloads.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Smartphone className="w-5 h-5 text-[var(--electric-cyan)] shrink-0 mt-1" />
                                <span className="text-neutral-300 text-sm">Works on iOS (iPhone/iPad), Windows, and Mac.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-[var(--electric-cyan)] shrink-0 mt-1" />
                                <span className="text-neutral-300 text-sm">Always up-to-date. No manual updates required.</span>
                            </li>
                        </ul>

                        <h3>How to Install</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/5 rounded-xl">
                                <h4 className="font-bold text-white mb-1">On iOS (Safari)</h4>
                                <p className="text-xs text-neutral-400">Tap the Share button → Scroll down → Tap &quot;Add to Home Screen&quot;.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl">
                                <h4 className="font-bold text-white mb-1">On Android (Chrome)</h4>
                                <p className="text-xs text-neutral-400">Tap the three dots menu → Tap &quot;Install App&quot; or &quot;Add to Home Screen&quot;.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl">
                                <h4 className="font-bold text-white mb-1">On Desktop (Chrome/Edge)</h4>
                                <p className="text-xs text-neutral-400">Click the install icon in the address bar (right side).</p>
                            </div>
                        </div>
                    </article>

                    <div className="order-1 md:order-2 flex justify-center">
                        <div className="relative w-64 h-[500px] border-8 border-neutral-800 rounded-[3rem] bg-black overflow-hidden shadow-2xl">
                            <div className="absolute top-0 left-0 right-0 h-6 bg-neutral-800 rounded-b-xl mx-auto w-32 z-10" />
                            <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-6 text-center">
                                <div className="w-16 h-16 bg-[var(--electric-cyan)]/20 rounded-2xl flex items-center justify-center mb-4">
                                    <Globe className="w-8 h-8 text-[var(--electric-cyan)]" />
                                </div>
                                <h3 className="text-white font-bold">AIML Club</h3>
                                <p className="text-xs text-neutral-500 mt-2">Add to Home Screen</p>
                                <div className="mt-8 w-full h-1 bg-white/10 rounded-full" />
                                <div className="mt-2 w-2/3 h-1 bg-white/10 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
