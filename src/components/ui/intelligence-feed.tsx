"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const METADATA_POOL = [
    "LOG: EPOCH_{N} | LOSS: {LOSS} | ACC: {ACC}",
    "INFERENCE: VECTOR_RANK_{R}",
    "GRADIENT_UPDATE: STEP_{S} | STATUS: OPTIMIZED",
    "NODE_STATUS: ACTIVE | BHOPAL_CLUSTER_01",
    "LOAD_LATENT_SPACE: SUCCESS",
    "TENSOR_COMPUTE: GPU_ACCELERATED",
];

export function IntelligenceFeed() {
    const [logs, setLogs] = useState<string[]>([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(c => c + 1);
            const template = METADATA_POOL[Math.floor(Math.random() * METADATA_POOL.length)];
            const log = template
                .replace("{N}", Math.floor(counter / 10).toString())
                .replace("{LOSS}", (Math.random() * 0.5).toFixed(4))
                .replace("{ACC}", (0.85 + Math.random() * 0.14).toFixed(4))
                .replace("{R}", Math.floor(Math.random() * 512).toString())
                .replace("{S}", counter.toString());

            setLogs(prev => [log, ...prev].slice(0, 8));
        }, 1500);

        return () => clearInterval(interval);
    }, [counter]);

    return (
        <div className="font-mono text-[9px] text-neutral-500 dark:text-neutral-600 space-y-1">
            <AnimatePresence mode="popLayout">
                {logs.map((log, i) => (
                    <motion.div
                        key={log + i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
                    >

                        {log}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
