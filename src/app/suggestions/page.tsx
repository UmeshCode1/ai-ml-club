"use client";

import React, { useState } from "react";
//
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, MessageSquare, Lock, Globe, Sparkles } from "lucide-react";
import { GradientBorder } from "@/components/ui/gradient-border";
import { MagneticButton } from "@/components/ui/magnetic-button";
import confetti from "canvas-confetti";

export default function SuggestionPage() {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: NodeJS.Timeout = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSubmitted(true);
        triggerConfetti();
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
            <div className="max-w-3xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block mb-4"
                    >
                        <div className="p-3 rounded-2xl bg-gradient-to-tr from-[var(--neon-lime)]/20 to-[var(--electric-cyan)]/20 backdrop-blur-xl border border-[var(--neon-lime)]/30 shadow-[0_0_30px_rgba(32,125,255,0.2)]">
                            <MessageSquare className="w-8 h-8 text-[var(--neon-lime-text)]" />
                        </div>
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 mb-4">
                        Suggestion Box
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                        Help us improve. Your voice shapes our future.
                    </p>
                </div>

                {/* Main Form Card */}
                <GradientBorder
                    containerClassName="rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                    className="bg-[var(--card-bg)] backdrop-blur-xl p-6 md:p-10 border border-[var(--card-border)] min-h-[600px] flex items-center justify-center transition-all duration-500"
                    duration={8}
                >
                    <div className="absolute top-0 right-0 p-6 md:p-10 opacity-10 pointer-events-none">
                        <Sparkles className="w-32 h-32 text-[var(--electric-cyan)]" />
                    </div>

                    <div className="relative z-10 w-full">
                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-8"
                                >
                                    {/* Mode Toggle */}
                                    <div className="bg-neutral-100 dark:bg-white/5 rounded-2xl p-4 flex items-center justify-between border border-black/5 dark:border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${isAnonymous ? 'bg-neutral-800 text-white' : 'bg-[#D4FF00] text-black'}`}>
                                                {isAnonymous ? <Lock className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-neutral-900 dark:text-white text-lg">
                                                    {isAnonymous ? "Anonymous Mode" : "Public Mode"}
                                                </h3>
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                                    {isAnonymous ? "Your identity will be hidden." : "We can contact you for follow-up."}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setIsAnonymous(!isAnonymous)}
                                            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center ${isAnonymous ? 'bg-neutral-800' : 'bg-[var(--neon-lime)]'}`}
                                        >
                                            <motion.div
                                                layout
                                                className="w-6 h-6 rounded-full bg-white shadow-md"
                                            />
                                        </button>
                                    </div>

                                    {/* Public Fields (Collapsible) */}
                                    <AnimatePresence>
                                        {!isAnonymous && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300 ml-1">Name <span className="text-red-500">*</span></label>
                                                        <div className="relative group">
                                                            <User className="absolute left-4 top-3.5 w-5 h-5 text-neutral-400 group-focus-within:text-[var(--neon-lime)] transition-colors" />
                                                            <input
                                                                type="text"
                                                                placeholder="Your Name"
                                                                required={!isAnonymous}
                                                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-neutral-200 dark:border-white/10 focus:border-[var(--neon-lime)] focus:ring-2 focus:ring-[var(--neon-lime)]/20 outline-none transition-all placeholder:text-neutral-400 text-neutral-900 dark:text-white"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300 ml-1">Email <span className="text-red-500">*</span></label>
                                                        <div className="relative group">
                                                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-neutral-400 group-focus-within:text-[var(--neon-lime)] transition-colors" />
                                                            <input
                                                                type="email"
                                                                placeholder="your@email.com"
                                                                required={!isAnonymous}
                                                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-neutral-200 dark:border-white/10 focus:border-[var(--neon-lime)] focus:ring-2 focus:ring-[var(--neon-lime)]/20 outline-none transition-all placeholder:text-neutral-400 text-neutral-900 dark:text-white"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Category Select */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300 ml-1">Category</label>
                                        <div className="relative">
                                            <select className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-neutral-200 dark:border-white/10 focus:border-[var(--electric-cyan)] focus:ring-2 focus:ring-[var(--electric-cyan)]/20 outline-none transition-all text-neutral-900 dark:text-white appearance-none cursor-pointer">
                                                <option>General Feedback</option>
                                                <option>Event Idea</option>
                                                <option>Website Issue</option>
                                                <option>Collaboration</option>
                                                <option>Other</option>
                                            </select>
                                            <div className="absolute right-4 top-3.5 pointer-events-none text-neutral-500">
                                                ▼
                                            </div>
                                        </div>
                                    </div>

                                    {/* Suggestion Textarea */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300 ml-1">Your Suggestion <span className="text-red-500">*</span></label>
                                        <textarea
                                            rows={6}
                                            placeholder="I think it would be great if..."
                                            required
                                            className="w-full p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-neutral-200 dark:border-white/10 focus:border-[var(--electric-cyan)] focus:ring-2 focus:ring-[var(--electric-cyan)]/20 outline-none transition-all placeholder:text-neutral-400 text-neutral-900 dark:text-white resize-none"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <MagneticButton>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)] text-[var(--background)] font-bold text-lg shadow-lg hover:shadow-[0_0_20px_var(--neon-lime)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                                            >
                                                {loading ? (
                                                    "Submitting..."
                                                ) : (
                                                    <>
                                                        Submit Idea <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </MagneticButton>
                                    </div>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[var(--neon-lime)] to-[var(--electric-cyan)] flex items-center justify-center mb-8 shadow-[0_0_40px_var(--electric-cyan)]">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring" }}
                                        >
                                            <Send className="w-10 h-10 text-[var(--background)]" />
                                        </motion.div>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                                        Thank You!
                                    </h2>
                                    <p className="text-neutral-600 dark:text-neutral-400 max-w-md mb-8 text-lg">
                                        Your suggestion has been securely transmitted to our neural network. We appreciate your input!
                                    </p>
                                    <MagneticButton>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="px-8 py-3 rounded-xl border border-neutral-200 dark:border-white/10 font-bold text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-all text-sm uppercase tracking-wide"
                                        >
                                            Submit Another
                                        </button>
                                    </MagneticButton>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </GradientBorder>
            </div>
        </div>
    );
}
