import { Zap, Target, Users } from "lucide-react";

export function SeoContentSection() {
    return (
        <section className="py-20 px-4 max-w-7xl mx-auto standalone:hidden">
            <div className="bg-neutral-900/30 border border-white/5 rounded-[3rem] p-8 md:p-12 backdrop-blur-sm">
                <header className="mb-12 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-black mb-6">
                        Pioneering <span className="text-[var(--electric-cyan)]">AI Education</span> at Oriental College
                    </h2>
                    <div className="h-1 w-24 bg-[var(--neon-lime)] rounded-full mx-auto md:mx-0" />
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="lead text-xl text-neutral-300 font-medium">
                            The <strong>AI & Machine Learning Club</strong> is the flagship technical student body of
                            <a href="https://titbhopal.net/" target="_blank" rel="noopener noreferrer" className="text-[var(--electric-cyan)] hover:underline ml-1">
                                Oriental College of Technology (OCT), Bhopal
                            </a>. Established to bridge the gap between academic curriculum and industry demands, we are a thriving ecosystem of innovators, developers, and researchers.
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Our Vision & Mission</h3>
                        <p>
                            In an era defined by Generative AI and Large Language Models, our mission is to democratize access to advanced technology.
                            We believe that every student in Bhopal should have the resources to:
                        </p>
                        <ul className="list-none pl-0 space-y-4 my-6">
                            <li className="flex items-start gap-3">
                                <Target className="w-5 h-5 text-[var(--neon-lime)] shrink-0 mt-1" />
                                <span><strong>Innovate:</strong> Build real-world solutions solving local problems.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Zap className="w-5 h-5 text-[var(--neon-lime)] shrink-0 mt-1" />
                                <span><strong>Implement:</strong> Deploy machine learning models to production.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Users className="w-5 h-5 text-[var(--neon-lime)] shrink-0 mt-1" />
                                <span><strong>Inspire:</strong> Mentor the next generation of tech leaders.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <h3 className="text-2xl font-bold text-white mb-4">Why Join the AIML Club?</h3>
                        <p>
                            Located in the heart of Madhya Pradesh, the Oriental Group of Institutes has always been at the forefront of technical excellence.
                            The AIML Club extends this legacy by offering:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                <h4 className="font-bold text-[var(--electric-cyan)] mb-1">Weekly Workshops</h4>
                                <p className="text-sm text-neutral-400">Hands-on coding sessions on Python, TensorFlow, and React.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                <h4 className="font-bold text-[var(--neon-lime)] mb-1">Hackathons</h4>
                                <p className="text-sm text-neutral-400">24-hour coding marathons like &quot;Code-a-Thon&quot; and &quot;Techno-Sagar&quot;.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                <h4 className="font-bold text-purple-400 mb-1">Research</h4>
                                <p className="text-sm text-neutral-400">Collaborative paper writing and algorithm development.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                <h4 className="font-bold text-pink-400 mb-1">Networking</h4>
                                <p className="text-sm text-neutral-400">Connect with alumni and industry experts from top tech firms.</p>
                            </div>
                        </div>

                        <p>
                            Whether you are a fresher just starting with C++ or a senior exploring Transformer architectures, the AIML Club provides the platform, peer support, and resources to accelerate your career.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
