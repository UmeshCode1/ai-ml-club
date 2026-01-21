"use client";

import React from "react";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { NeuralNetwork } from "@/components/ui/neural-network";

export function GlobalBackground() {
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
                <BackgroundBeams className="opacity-40" />
                <NeuralNetwork className="opacity-60" />
            </div>

            {/* Light Mode Background */}
            <div
                className="absolute inset-0 h-full w-full bg-neutral-50 opacity-100 dark:opacity-0 transition-opacity duration-0"
                aria-hidden="true"
            >
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                <NeuralNetwork className="opacity-50" />
            </div>
        </div>
    );
}
