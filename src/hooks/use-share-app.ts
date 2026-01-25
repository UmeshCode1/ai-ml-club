"use client";

import { useCallback } from "react";
import { useHaptic } from "./use-haptic";

export const useShareApp = () => {
    const { trigger } = useHaptic();

    const share = useCallback(async () => {
        trigger();

        const shareData = {
            title: "AIML CLUB OCT",
            text: "Join the most innovative student tech community at Oriental College Of Technology, Bhopal! 🚀✨",
            url: window.location.origin,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(window.location.origin);
                alert("Link copied to clipboard! 🚀 Share it with your friends.");
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    }, [trigger]);

    return { share };
};
