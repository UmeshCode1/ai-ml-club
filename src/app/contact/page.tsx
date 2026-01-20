"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { GradientBorder } from "@/components/ui/gradient-border";

export default function ContactPage() {
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Mail, title: "Email", info: "aimlcluboct@gmail.com" },
                        { icon: Phone, title: "Phone", info: "+91 6299200082, +91 7974389476" },
                        { icon: MapPin, title: "Address", info: "Oriental College of Technology, Bhopal" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <GradientBorder
                                containerClassName="rounded-3xl hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-2xl h-full group"
                                className="p-8 bg-[var(--card-bg)] backdrop-blur-xl flex flex-col items-center justify-center text-center"
                                duration={6 + i}
                            >
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:bg-[#D4FF00]/10">
                                    <item.icon className="w-8 h-8 text-neutral-600 dark:text-neutral-300 group-hover:text-[var(--neon-lime-text)] transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-neutral-500 dark:text-neutral-400">{item.info}</p>
                            </GradientBorder>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
