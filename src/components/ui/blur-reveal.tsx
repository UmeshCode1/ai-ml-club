"use client";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurRevealProps {
    text: string;
    className?: string;
    delay?: number;
    blurStrength?: number;
    duration?: number;
}

export const BlurReveal = ({
    text,
    className,
    delay = 0,
    blurStrength = 10,
    duration = 0.8,
}: BlurRevealProps) => {
    const words = text.split(" ");

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: delay },
        },
    };

    const child: Variants = {
        hidden: {
            opacity: 0,
            filter: `blur(${blurStrength}px)`,
            y: 20,
        },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
                duration: duration,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={cn("flex flex-wrap gap-2", className)}
        >
            {words.map((word, index) => (
                <motion.span key={index} variants={child} className="inline-block will-change-[filter,opacity,transform]">
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};
