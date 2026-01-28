"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info, CheckCircle, AlertTriangle, Bell } from "lucide-react";
import { getNotifications, Notification } from "@/lib/database";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function GlobalNotification() {
    const [notification, setNotification] = useState<Notification | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Fetch notifications
        const fetchNotification = async () => {
            try {
                const notifications = await getNotifications();
                // Filter for 'web' or 'all' target
                const active = notifications.find(n =>
                    (n.target === "all" || n.target === "web") && n.isActive
                );

                if (active) {
                    // Check if dismissed in session
                    const dismissed = sessionStorage.getItem(`notification-dismissed-${active.$id}`);
                    if (!dismissed) {
                        setNotification(active);
                        setIsVisible(true);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            }
        };

        fetchNotification();
    }, []);

    // Don't show on AppHome (it has its own) or Admin pages if any
    const isAppPage = pathname === "/" && typeof window !== 'undefined' && window.innerWidth < 768; // Rough check, but AppHome usually handles its own. Actually let's just show it everywhere for consistency unless specific route.

    // Better logic: AppHome routes are controlled by logic, but for "Web", we usually mean the landing page.
    if (!notification || !isVisible) return null;

    const dismiss = () => {
        setIsVisible(false);
        if (notification.$id) {
            sessionStorage.setItem(`notification-dismissed-${notification.$id}`, "true");
        }
    };

    const icons = {
        info: Info,
        success: CheckCircle,
        warning: AlertTriangle,
        alert: Bell
    };

    const Icon = icons[notification.type] || Info;

    const colors = {
        info: "bg-blue-500/10 border-blue-500/20 text-blue-500",
        success: "bg-[var(--neon-lime)]/10 border-[var(--neon-lime)]/20 text-[var(--neon-lime-text)]",
        warning: "bg-orange-500/10 border-orange-500/20 text-orange-500",
        alert: "bg-red-500/10 border-red-500/20 text-red-500"
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="relative z-[100] bg-neutral-950 border-b border-white/5"
                >
                    <div className="max-w-7xl mx-auto px-4 py-3 flex items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start sm:items-center gap-3 flex-1">
                            <div className={cn("p-1.5 rounded-lg shrink-0", colors[notification.type])}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm">
                                <span className="font-bold text-white">{notification.title}</span>
                                {notification.message && (
                                    <span className="text-neutral-400 hidden sm:inline">•</span>
                                )}
                                {notification.message && (
                                    <span className="text-neutral-400">{notification.message}</span>
                                )}
                                {notification.link && (
                                    <Link
                                        href={notification.link}
                                        className="text-[var(--electric-cyan)] hover:underline font-bold whitespace-nowrap flex items-center gap-1"
                                    >
                                        Check it out &rarr;
                                    </Link>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={dismiss}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors shrink-0"
                            aria-label="Dismiss notification"
                        >
                            <X className="w-4 h-4 text-neutral-500 hover:text-white" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
