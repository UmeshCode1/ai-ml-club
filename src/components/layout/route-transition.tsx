"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function RouteTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
