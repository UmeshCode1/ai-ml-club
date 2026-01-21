"use client";

import { motion, Variants } from "framer-motion";
import { useDeviceType } from "@/hooks/use-device-type";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
}

export function ScrollReveal({
    children,
    className,
    delay = 0,
    direction = "up",
}: ScrollRevealProps) {
    const { device, prefersReducedMotion } = useDeviceType();

    // Get initial offset based on direction
    const getOffset = () => {
        if (prefersReducedMotion) return { x: 0, y: 0 };

        // Reduce motion intensity based on device
        const intensity = device === "mobile" ? 15 : device === "tablet" ? 20 : 30;

        switch (direction) {
            case "up":
                return { x: 0, y: intensity };
            case "down":
                return { x: 0, y: -intensity };
            case "left":
                return { x: intensity, y: 0 };
            case "right":
                return { x: -intensity, y: 0 };
            case "none":
            default:
                return { x: 0, y: 0 };
        }
    };

    const offset = getOffset();

    // Device-specific animation variants
    const variants: Variants = {
        hidden: {
            opacity: prefersReducedMotion ? 1 : 0,
            x: offset.x,
            y: offset.y,
            filter: prefersReducedMotion ? "blur(0px)" : device === "mobile" ? "blur(0px)" : "blur(4px)",
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: device === "mobile" ? 0.4 : device === "tablet" ? 0.5 : 0.6,
                delay: delay,
                ease: [0.25, 0.4, 0.25, 1], // Custom easing for smooth animation
            },
        },
    };

    // Viewport configuration based on device
    const viewportConfig = {
        once: true,
        amount: device === "mobile" ? 0.1 : device === "tablet" ? 0.15 : 0.2,
        margin: device === "mobile" ? "-50px" : "-100px",
    };

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={variants}
        >
            {children}
        </motion.div>
    );
}

// Stagger container for animating children in sequence
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
}: StaggerContainerProps) {
    const { device, prefersReducedMotion } = useDeviceType();

    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : device === "mobile" ? staggerDelay * 0.5 : staggerDelay,
            },
        },
    };

    const viewportConfig = {
        once: true,
        amount: device === "mobile" ? 0.05 : 0.1,
    };

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={containerVariants}
        >
            {children}
        </motion.div>
    );
}

// Individual stagger item
export function StaggerItem({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    const { device, prefersReducedMotion } = useDeviceType();

    const itemVariants: Variants = {
        hidden: {
            opacity: prefersReducedMotion ? 1 : 0,
            y: prefersReducedMotion ? 0 : device === "mobile" ? 10 : 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: device === "mobile" ? 0.3 : 0.5,
                ease: [0.25, 0.4, 0.25, 1],
            },
        },
    };

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div className={className} variants={itemVariants}>
            {children}
        </motion.div>
    );
}
