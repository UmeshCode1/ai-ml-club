"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, User, Send, Navigation } from "lucide-react";
import { GradientBorder } from "@/components/ui/gradient-border";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { NeuralNetwork } from "@/components/ui/neural-network";
import { useState, useEffect } from "react";
import { createContact } from "@/lib/database";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            await createContact({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                ...(formData.phone.trim() && { phone: formData.phone.trim() })
            });
            setSubmitStatus("success");
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        } catch {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none">
                <motion.div
                    className="h-full bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)]"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 flex flex-col items-center"
                >
                    <div className="flex flex-col gap-4 items-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--neon-lime)]/10 border border-[var(--neon-lime)]/20 w-fit">
                            <Navigation className="w-3.5 h-3.5 text-[var(--neon-lime-text)]" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--neon-lime-text)]">Active Directory</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter text-center">
                            Communication <br /> Directory
                        </h1>
                        <div className="max-w-2xl mx-auto">
                            <BlurReveal
                                text="Reach out for technical collaborations, membership inquiries, or student-led initiatives. Connect with the club's leadership team to facilitate effective project coordination and institutional partnerships."
                                className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed font-medium text-center"
                                delay={0.4}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Quick Contact Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {/* Email */}
                    <motion.a
                        href="mailto:aimlcluboct@gmail.com"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0 }}
                        className="group"
                    >
                        <div className="p-4 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-[var(--neon-lime)]/50 transition-all hover:shadow-lg hover:shadow-[var(--neon-lime)]/5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4FF00]/20 to-[#00F0FF]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Mail className="w-5 h-5 text-[var(--neon-lime-text)]" />
                            </div>
                            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">Email</h3>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">aimlcluboct@gmail.com</p>
                        </div>
                    </motion.a>

                    {/* President */}
                    <motion.a
                        href="tel:+916299200082"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="group"
                    >
                        <div className="p-4 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-[var(--neon-lime)]/50 transition-all hover:shadow-lg hover:shadow-[var(--neon-lime)]/5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4FF00]/20 to-[#00F0FF]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Phone className="w-5 h-5 text-[var(--neon-lime-text)]" />
                            </div>
                            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">President</h3>
                            <p className="text-xs text-neutral-400 flex items-center gap-1 mb-0.5">
                                <User className="w-3 h-3" /> Vishal Kumar
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">+91 6299200082</p>
                        </div>
                    </motion.a>

                    {/* Vice President */}
                    <motion.a
                        href="tel:+917974389476"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="group"
                    >
                        <div className="p-4 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-[var(--neon-lime)]/50 transition-all hover:shadow-lg hover:shadow-[var(--neon-lime)]/5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4FF00]/20 to-[#00F0FF]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Phone className="w-5 h-5 text-[var(--neon-lime-text)]" />
                            </div>
                            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">Vice President</h3>
                            <p className="text-xs text-neutral-400 flex items-center gap-1 mb-0.5">
                                <User className="w-3 h-3" /> Umesh Patel
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">+91 7974389476</p>
                        </div>
                    </motion.a>

                    {/* Address */}
                    <motion.a
                        href="https://maps.app.goo.gl/xbRP8VJEeKLRoJAP8"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="group"
                    >
                        <div className="p-4 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-[var(--neon-lime)]/50 transition-all hover:shadow-lg hover:shadow-[var(--neon-lime)]/5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4FF00]/20 to-[#00F0FF]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <MapPin className="w-5 h-5 text-[var(--neon-lime-text)]" />
                            </div>
                            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">Location</h3>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">Oriental College of Technology, Bhopal</p>
                        </div>
                    </motion.a>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Contact Form - 3 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-3"
                    >
                        <GradientBorder
                            containerClassName="rounded-3xl shadow-2xl relative overflow-hidden"
                            className="p-6 md:p-8 bg-[var(--card-bg)] backdrop-blur-xl relative z-10"
                            duration={10}
                        >
                            <NeuralNetwork className="opacity-20 pointer-events-none -z-10" />
                            <div className="flex items-center gap-3 mb-6 relative z-20">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4FF00] to-[#00F0FF] flex items-center justify-center">
                                    <Send className="w-6 h-6 text-black" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Send us a Message</h2>
                                    <p className="text-sm text-neutral-500">We&apos;ll get back to you within 24 hours</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5 relative z-20">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)] focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)] focus:border-transparent transition-all"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                                            WhatsApp No. (optional)
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)] focus:border-transparent transition-all"
                                            placeholder="+91 9876543210"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)] focus:border-transparent transition-all"
                                            placeholder="How can we help you?"
                                        />
                                    </div>
                                </div>



                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)] focus:border-transparent transition-all resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <div className="pt-2">
                                    <MagneticButton>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4FF00] to-[#00F0FF] text-black font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-[var(--neon-lime)]/20"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    </MagneticButton>
                                </div>

                                {submitStatus === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-center"
                                    >
                                        ✓ Message sent successfully! We&apos;ll get back to you soon.
                                    </motion.div>
                                )}
                                {submitStatus === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-center"
                                    >
                                        ✗ Failed to send message. Please try again or email us directly.
                                    </motion.div>
                                )}
                            </form>
                        </GradientBorder>
                    </motion.div>

                    {/* Map - 2 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <GradientBorder
                            containerClassName="rounded-3xl shadow-2xl h-full"
                            className="p-2 bg-[var(--card-bg)] backdrop-blur-xl h-full flex flex-col"
                            duration={12}
                        >
                            {/* Map Header */}
                            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4FF00]/20 to-[#00F0FF]/20 flex items-center justify-center">
                                            <Navigation className="w-5 h-5 text-[var(--neon-lime-text)]" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Oriental College of Technology</h3>
                                            <p className="text-xs text-neutral-500">Patel Nagar, Bhopal 462022</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map iframe */}
                            <div className="flex-1 min-h-[350px] rounded-b-2xl overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.548!2d77.4988!3d23.2463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c69b2d9c7d3c9%3A0x7c3e7a5e4c3b2a1d!2sOriental%20College%20of%20Technology!5e0!3m2!1sen!2sin!4v1705760000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: "350px" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Oriental College of Technology Location"
                                />
                            </div>

                            {/* Map Actions */}
                            <div className="p-4 flex flex-col sm:flex-row gap-3">
                                <a
                                    href="https://maps.app.goo.gl/xbRP8VJEeKLRoJAP8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium flex items-center justify-center gap-2 transition-colors text-sm"
                                >
                                    <MapPin className="w-4 h-4" />
                                    View on Maps
                                </a>
                                <a
                                    href="https://www.google.com/maps/dir//oriental+camps,+Patel+Nagar,+Bhopal,+Madhya+Pradesh+462022"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4FF00] to-[#00F0FF] text-black font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm"
                                >
                                    <Navigation className="w-4 h-4" />
                                    Get Directions
                                </a>
                            </div>
                        </GradientBorder>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
