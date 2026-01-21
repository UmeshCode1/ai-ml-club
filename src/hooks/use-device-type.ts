"use client";

import { useState, useEffect } from "react";

export type DeviceType = "mobile" | "tablet" | "desktop";

/**
 * Custom hook to detect device type based on viewport width.
 * Returns "mobile" for < 768px, "tablet" for 768-1024px, "desktop" for > 1024px.
 * Also respects prefers-reduced-motion for accessibility.
 */
export function useDeviceType(): {
    device: DeviceType;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    prefersReducedMotion: boolean;
} {
    const [device, setDevice] = useState<DeviceType>("desktop");
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setDevice("mobile");
            } else if (width < 1024) {
                setDevice("tablet");
            } else {
                setDevice("desktop");
            }
        };

        const checkReducedMotion = () => {
            setPrefersReducedMotion(
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
            );
        };

        checkDevice();
        checkReducedMotion();

        window.addEventListener("resize", checkDevice);
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        motionQuery.addEventListener("change", checkReducedMotion);

        return () => {
            window.removeEventListener("resize", checkDevice);
            motionQuery.removeEventListener("change", checkReducedMotion);
        };
    }, []);

    return {
        device,
        isMobile: device === "mobile",
        isTablet: device === "tablet",
        isDesktop: device === "desktop",
        prefersReducedMotion,
    };
}
