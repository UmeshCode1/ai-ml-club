"use client";

import { useCallback } from "react";

export function useSmoothScroll() {
    const scrollToId = useCallback((id: string, duration: number = 2000) => {
        const element = document.getElementById(id);
        if (!element) return;

        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime: number | null = null;

        function animation(currentTime: number) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Quadratic easing in/out
        function ease(t: number, b: number, c: number, d: number) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }, []);

    return { scrollToId };
}
