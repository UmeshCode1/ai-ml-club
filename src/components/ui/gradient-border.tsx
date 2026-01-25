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
            <div
                className="absolute inset-0 z-0 rounded-[inherit]"
                style={{
                    padding: borderWidth,
                    background: `conic-gradient(from var(--angle) at 50% 50%, transparent 75%, ${colors ? colors[0] : "var(--neon-lime)"} 90%, ${colors ? colors[1] : "var(--electric-cyan)"} 100%)`,
                    animation: `rotate ${duration}s linear infinite`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                }}
            />

            {/* Inner Content Background */}
            <div className={cn("relative z-10 rounded-[inherit] w-full h-full", className)}>
                {children}
            </div>
        </motion.div>
    );
}
