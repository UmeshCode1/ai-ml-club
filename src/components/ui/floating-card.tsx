"use client";



import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const [floatDelay, setFloatDelay] = useState(0);

    useEffect(() => {
        // eslint-disable-next-line
        setFloatDelay(Math.random() * 2);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
        >
            <motion.div
                animate={{
                    y: [0, -12, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: floatDelay,
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};
