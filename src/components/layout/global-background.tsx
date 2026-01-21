"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Lazy load heavy components
const BackgroundBeams = dynamic(
    () => import("@/components/aceternity/background-beams").then(mod => ({ default: mod.BackgroundBeams })),
    { ssr: false }
);

const NeuralNetwork = dynamic(
    () => import("@/components/ui/neural-network").then(mod => ({ default: mod.NeuralNetwork })),
    { ssr: false }
);

export function GlobalBackground() {
    const [isReady, setIsReady] = useState(false);

    // Delay heavy visual loading until after first paint
    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 -z-50 pointer-events-none">
            {/* 
              Both backgrounds render always - use opacity for visibility toggle.
              This prevents layout shift and flash during hydration.
            */}

            {/* Dark Mode Background */}
            <div
                className="absolute inset-0 h-full w-full opacity-0 dark:opacity-100 transition-opacity duration-0"
                aria-hidden="true"
            >
                {isReady && (
                    <>
                        <BackgroundBeams className="opacity-30" />
                        <NeuralNetwork className="opacity-40" />
                    </>
                )}
            </div>

            {/* Light Mode Background */}
            <div
                className="absolute inset-0 h-full w-full bg-neutral-50 opacity-100 dark:opacity-0 transition-opacity duration-0"
                aria-hidden="true"
            >
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                {isReady && <NeuralNetwork className="opacity-30" />}
            </div>
        </div>
    );
}

