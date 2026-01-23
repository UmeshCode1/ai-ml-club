import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export const FloatingCard = ({
    children,
    delay = 0,
    variant = "default"
}: {
    children: React.ReactNode;
    delay?: number;
    variant?: "default" | "glitch"
}) => {
    const [floatDelay, setFloatDelay] = useState(0);

    useEffect(() => {
        const d = Math.random() * 2;
        const timer = setTimeout(() => setFloatDelay(d), 0);
        return () => clearTimeout(timer);
    }, []);

    const glitchVariants: Variants = {
        animate: {
            x: variant === "glitch" ? [0, -2, 2, -1, 0] : 0,
            y: variant === "glitch" ? [-12, -14, -10, -13, -12] : [0, -12, 0],
            scale: variant === "glitch" ? [1, 1.01, 0.99, 1.005, 1] : 1,
            transition: {
                duration: variant === "glitch" ? 4 : 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay,
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
        >
            <motion.div
                variants={glitchVariants}
                animate="animate"
            >
                {children}
            </motion.div>
        </motion.div>
    );
};
