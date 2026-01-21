"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
    children,
    className,
    containerClassName,
    color = "rgba(133, 239, 71, 0.2)", // electric-cyan/greenish default
}: {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    color?: string;
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice(window.matchMedia("(hover: none)").matches);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isTouchDevice) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsTouchDevice(false); // Enable for keyboard focus
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        if (!isTouchDevice) setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-neutral-200 dark:border-white/10 bg-[var(--card-bg)] text-neutral-900 dark:text-white shadow-sm",
                containerClassName
            )}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`,
                }}
            />
            <div className={cn("relative z-10 w-full p-8", className)}>
                {children}
            </div>
        </div>
    );
};
