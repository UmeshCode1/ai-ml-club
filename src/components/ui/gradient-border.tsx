"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GradientBorderProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    containerClassName?: string;
    colors?: string[];
    duration?: number;
    borderWidth?: number;
}

export function GradientBorder({
    children,
    className,
    containerClassName,
    colors,
    duration = 4,
    borderWidth = 2,
    ...props
}: GradientBorderProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={cn("relative", containerClassName)}>{children}</div>;
    }

    return (
        <motion.div
            className={cn("relative group/gradient flex rounded-[inherit] overflow-hidden transform-gpu", containerClassName)}
            style={{ padding: borderWidth }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            {...props}
        >
            {/* Rotating Gradient Border */}
            {/* Rotating Gradient Border - GPU Optimized */}
            <div
                className="absolute left-1/2 top-1/2 -z-10 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2"
                style={{
                    background: `conic-gradient(from 0deg, transparent 0 340deg, ${colors ? colors[1] : "var(--electric-cyan)"} 360deg)`,
                    animation: `spin ${duration}s linear infinite`,
                }}
            />

            {/* Masking Layer to create the border effect */}
            <div className="absolute inset-[2px] rounded-[inherit] bg-transparent z-0" />

            {/* Inner Content Background */}
            <div className={cn("relative z-10 rounded-[inherit] w-full h-full bg-[var(--card-bg)]", className)}>
                {children}
            </div>
        </motion.div>
    );
}
