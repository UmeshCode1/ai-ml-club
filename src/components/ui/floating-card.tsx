"use client";

import React from "react";
import { motion } from "framer-motion";

export const FloatingCard = ({
    children,
    delay = 0,
    duration = 4,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}) => {
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
