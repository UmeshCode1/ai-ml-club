"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, User, Send, Loader2 } from "lucide-react";
import { GradientBorder } from "@/components/ui/gradient-border";
import { useState } from "react";
import { createContact } from "@/lib/database";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            await createContact(formData);
            setSubmitStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 mb-6">
                        Contact Us
                    </h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Have questions? Want to collaborate? Reach out to us.
                    </p>
                </motion.div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Email Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0 }}
                    >
                        <GradientBorder
                            containerClassName="rounded-3xl hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-2xl h-full group"
                            className="p-6 bg-[var(--card-bg)] backdrop-blur-xl flex flex-col items-center justify-center text-center"
                            duration={6}
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:bg-[#D4FF00]/10">
                                <Mail className="w-7 h-7 text-neutral-600 dark:text-neutral-300 group-hover:text-[var(--neon-lime-text)] transition-colors duration-300" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Email</h3>
                            <a href="mailto:aimlcluboct@gmail.com" className="text-neutral-500 dark:text-neutral-400 hover:text-[var(--neon-lime-text)] transition-colors text-sm">
                                aimlcluboct@gmail.com
                            </a>
                        </GradientBorder>
                    </motion.div>

                    {/* President Phone Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <GradientBorder
                            containerClassName="rounded-3xl hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-2xl h-full group"
                            className="p-6 bg-[var(--card-bg)] backdrop-blur-xl flex flex-col items-center justify-center text-center"
                            duration={7}
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:bg-[#D4FF00]/10">
                                <Phone className="w-7 h-7 text-neutral-600 dark:text-neutral-300 group-hover:text-[var(--neon-lime-text)] transition-colors duration-300" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">President</h3>
                            <p className="text-sm text-neutral-400 mb-1 flex items-center gap-1 justify-center">
                                <User className="w-3 h-3" /> Vishal Kumar
                            </p>
                            <a href="tel:+916299200082" className="text-neutral-500 dark:text-neutral-400 hover:text-[var(--neon-lime-text)] transition-colors text-sm">
                                +91 6299200082
                            </a>
                        </GradientBorder>
                    </motion.div>

                    {/* Vice President Phone Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <GradientBorder
                            containerClassName="rounded-3xl hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-2xl h-full group"
                            className="p-6 bg-[var(--card-bg)] backdrop-blur-xl flex flex-col items-center justify-center text-center"
                            duration={8}
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:bg-[#D4FF00]/10">
                                <Phone className="w-7 h-7 text-neutral-600 dark:text-neutral-300 group-hover:text-[var(--neon-lime-text)] transition-colors duration-300" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Vice President</h3>
                            <p className="text-sm text-neutral-400 mb-1 flex items-center gap-1 justify-center">
                                <User className="w-3 h-3" /> Umesh Patle
                            </p>
                            <a href="tel:+917974389476" className="text-neutral-500 dark:text-neutral-400 hover:text-[var(--neon-lime-text)] transition-colors text-sm">
                                +91 7974389476
                            </a>
                        </GradientBorder>
                    </motion.div>

                    {/* Address Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <GradientBorder
                            containerClassName="rounded-3xl hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-2xl h-full group"
                            className="p-6 bg-[var(--card-bg)] backdrop-blur-xl flex flex-col items-center justify-center text-center"
                            duration={9}
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:bg-[#D4FF00]/10">
                                <MapPin className="w-7 h-7 text-neutral-600 dark:text-neutral-300 group-hover:text-[var(--neon-lime-text)] transition-colors duration-300" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Address</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                                Oriental College of Technology, Bhopal, MP
                            </p>
                        </GradientBorder>
                    </motion.div>
                </div>

                {/* Contact Form and Map Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <GradientBorder
                            containerClassName="rounded-3xl shadow-lg hover:shadow-2xl"
                            className="p-8 bg-[var(--card-bg)] backdrop-blur-xl"
                            duration={10}
                        >
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Send us a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)] focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)] focus:border-transparent transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)] focus:border-transparent transition-all"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)] focus:border-transparent transition-all resize-none"
                                        placeholder="Your message..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#D4FF00] to-[#00F0FF] text-black font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                {submitStatus === "success" && (
                                    <p className="text-green-500 text-center mt-4">Message sent successfully! We&apos;ll get back to you soon.</p>
                                )}
                                {submitStatus === "error" && (
                                    <p className="text-red-500 text-center mt-4">Failed to send message. Please try again.</p>
                                )}
                            </form>
                        </GradientBorder>
                    </motion.div>

                    {/* Embedded Google Map */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <GradientBorder
                            containerClassName="rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden h-full"
                            className="p-2 bg-[var(--card-bg)] backdrop-blur-xl h-full flex flex-col"
                            duration={12}
                        >
                            <div className="rounded-2xl overflow-hidden flex-1 min-h-[400px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.3358566477706!2d77.4369!3d23.2599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c69b2d24d3d3b%3A0x2c0ff9f5a5c3b8c!2sOriental%20College%20of%20Technology!5e0!3m2!1sen!2sin!4v1705760000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: "400px" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="rounded-2xl"
                                    title="AIML Club OCT Location"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <a
                                    href="https://maps.app.goo.gl/vffi3AvU2bzPHrSE9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[var(--neon-lime-text)] hover:underline font-medium"
                                >
                                    <MapPin className="w-4 h-4" />
                                    Open in Google Maps
                                </a>
                            </div>
                        </GradientBorder>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
