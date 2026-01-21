import { Variants } from "framer-motion";
import { DeviceType } from "@/hooks/use-device-type";

/**
 * Creates optimized animation variants based on device type and user preferences.
 * Desktop: Rich animations with parallax-like effects.
 * Mobile: Lightweight, performance-focused animations.
 * Tablet: Balanced hybrid approach.
 */
export function createScrollVariants(
    device: DeviceType,
    prefersReducedMotion: boolean
): {
    container: Variants;
    item: Variants;
    fadeIn: Variants;
    slideUp: Variants;
    scaleIn: Variants;
} {
    // Disable all animations if user prefers reduced motion
    if (prefersReducedMotion) {
        const noAnimation: Variants = {
            hidden: { opacity: 1 },
            visible: { opacity: 1 },
        };
        return {
            container: noAnimation,
            item: noAnimation,
            fadeIn: noAnimation,
            slideUp: noAnimation,
            scaleIn: noAnimation,
        };
    }

    // Device-specific animation parameters
    const config = {
        mobile: {
            duration: 0.3,
            stagger: 0.05,
            yOffset: 20,
            scaleOffset: 0.98,
        },
        tablet: {
            duration: 0.4,
            stagger: 0.08,
            yOffset: 30,
            scaleOffset: 0.96,
        },
        desktop: {
            duration: 0.5,
            stagger: 0.1,
            yOffset: 40,
            scaleOffset: 0.95,
        },
    }[device];

    return {
        container: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: config.stagger,
                    delayChildren: 0.1,
                },
            },
        },
        item: {
            hidden: { opacity: 0, y: config.yOffset },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring" as const,
                    stiffness: device === "mobile" ? 80 : 60,
                    damping: device === "mobile" ? 20 : 15,
                },
            },
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { duration: config.duration, ease: "easeOut" },
            },
        },
        slideUp: {
            hidden: { opacity: 0, y: config.yOffset },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring" as const,
                    stiffness: device === "mobile" ? 100 : 70,
                    damping: 25,
                },
            },
        },
        scaleIn: {
            hidden: { opacity: 0, scale: config.scaleOffset },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    type: "spring" as const,
                    stiffness: 80,
                    damping: 20,
                },
            },
        },
    };
}

/**
 * Returns viewport configuration for whileInView based on device.
 * Mobile: Trigger earlier for smoother scroll experience.
 * Desktop: Standard trigger point.
 */
export function getViewportConfig(device: DeviceType) {
    return {
        once: true,
        margin: device === "mobile" ? "-5%" : "-10%",
    };
}
