"use client";

import { motion } from "framer-motion";
import { Zap, Target, Users, Code, Trophy, Network, BookOpen } from "lucide-react";

export function SeoContentSection() {
    return (
        <section className="py-24 px-4 max-w-7xl mx-auto standalone:hidden relative">

            {/* Background Decor */}
            <div className="absolute top-1/2 left-0 w-full h-[500px] bg-[var(--neon-lime)]/5 blur-[120px] -z-10 rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left Column: Vision & Mission */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <header>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white">
                            Pioneering <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--electric-cyan)] to-[var(--neon-lime)]">AI Education</span>
                            <br /> at Oriental College
                        </h2>
                        <div className="h-1.5 w-32 bg-gradient-to-r from-[var(--neon-lime)] to-transparent rounded-full" />
                    </header>

                    <div className="text-lg text-neutral-400 font-medium leading-relaxed space-y-6">
                        <p>
                            The <strong className="text-white">AI & Machine Learning Club</strong> is the flagship technical student body of
                            <a href="https://titbhopal.net/" target="_blank" rel="noopener noreferrer" className="text-[var(--electric-cyan)] hover:text-[var(--neon-lime)] transition-colors ml-1 font-bold">
                                Oriental College of Technology (OCT), Bhopal
                            </a>.
                        </p>
                        <p>
                            Established to bridge the gap between academic curriculum and industry demands, we are a thriving ecosystem of innovators, developers, and researchers. In an era defined by Generative AI and Large Language Models, our mission is to democratize access to advanced technology.
                        </p>
                    </div>

                    <div className="space-y-4 pt-4">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-[var(--neon-lime)]" />
                            Our Core Mission
                        </h3>
                        <div className="grid gap-4">
                            {[
                                { icon: Code, title: "Innovate", desc: "Build real-world solutions solving local problems." },
                                { icon: Zap, title: "Implement", desc: "Deploy machine learning models to production." },
                                { icon: Users, title: "Inspire", desc: "Mentor the next generation of tech leaders." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[var(--neon-lime)]/30 hover:bg-white/10 transition-all duration-300 group"
                                >
                                    <div className="p-2.5 rounded-xl bg-[var(--neon-lime)]/10 text-[var(--neon-lime)] group-hover:scale-110 transition-transform">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <strong className="block text-white mb-1 group-hover:text-[var(--neon-lime)] transition-colors">{item.title}</strong>
                                        <span className="text-sm text-neutral-400">{item.desc}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Offerings Grid */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-[var(--electric-cyan)]/20 to-[var(--neon-lime)]/20 blur-3xl rounded-[3rem] -z-10 opacity-30" />

                    <div className="bg-neutral-900/80 border border-white/10 rounded-[3rem] p-8 md:p-10 backdrop-blur-xl shadow-2xl">
                        <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-6">
                            Why Join the <span className="text-[var(--electric-cyan)]">AIML Club?</span>
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "Weekly Workshops", icon: BookOpen, color: "text-[var(--electric-cyan)]", desc: "Hands-on sessions on Python, TensorFlow, and React." },
                                { title: "Hackathons", icon: Trophy, color: "text-[var(--neon-lime)]", desc: "24-hour coding marathons like \"Code-a-Thon\"." },
                                { title: "Research", icon: Target, color: "text-purple-400", desc: "Collaborative paper writing and algorithm development." },
                                { title: "Networking", icon: Network, color: "text-pink-400", desc: "Connect with alumni and industry experts." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.title}
                                    whileHover={{ y: -5 }}
                                    className="p-5 rounded-3xl bg-black/40 border border-white/5 hover:border-white/20 transition-all duration-300"
                                >
                                    <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                                    <h4 className={`font-bold ${item.color} mb-2`}>{item.title}</h4>
                                    <p className="text-xs text-neutral-400 leading-relaxed opacity-80">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 text-center">
                            <p className="text-sm text-neutral-400 leading-relaxed italic">
                                "Whether you are a fresher just starting with C++ or a senior exploring Transformer architectures, we provide the platform to accelerate your career."
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
