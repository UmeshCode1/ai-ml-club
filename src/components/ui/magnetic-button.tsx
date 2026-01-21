"use client";

import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

export function MagneticButton({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Check if device supports hover (usually non-touch)
        const checkTouch = () => {
            return window.matchMedia("(hover: none)").matches;
        };
        setIsTouchDevice(checkTouch());
    }, []);

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice) return; // Disable magnetic effect on touch devices

        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || {
            height: 0,
            width: 0,
            left: 0,
            top: 0,
        };
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX, y: middleY });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            style={{ position: "relative" }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
