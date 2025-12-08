"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute inset-0 w-full h-full bg-white dark:bg-neutral-950 flex flex-col items-center justify-center overflow-hidden",
                className
            )}
        >
            <div className="absolute inset-0 w-full h-full bg-white dark:bg-neutral-950 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

            {/* Grid Pattern */}
            <svg
                className="absolute inset-x-0 w-full h-full text-neutral-200 dark:text-neutral-900/50"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="hero-grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>

            {/* Radial Gradient */}
            <div className="absolute inset-0 w-full h-full bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
    );
};
