"use client";

import React from "react";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { NeuralNetwork } from "@/components/ui/neural-network";

export function GlobalBackground() {
    return (
        <div className="fixed inset-0 -z-50 pointer-events-none">
            {/* Dark Mode: Beams + Neural Network */}
            <div className="hidden dark:block h-full w-full relative">
                <BackgroundBeams className="opacity-40" />
                <NeuralNetwork className="opacity-60" />
            </div>

            {/* Light Mode: Dot Pattern + Neural Network (Darker nodes) */}
            <div className="block dark:hidden h-full w-full bg-neutral-50 relative">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                <NeuralNetwork className="opacity-50" />
            </div>
        </div>
    );
}
