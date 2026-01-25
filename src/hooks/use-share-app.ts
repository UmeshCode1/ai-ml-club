"use client";

import { useCallback } from "react";
import { useHaptic } from "./use-haptic";
import { siteConfig } from "@/config/site";

export type ShareType = "apk" | "web";

export const useShareApp = () => {
    const { trigger } = useHaptic();

    const share = useCallback(async (type: ShareType = "web") => {
        trigger();

        const isApk = type === "apk";
        const shareData = {
            title: isApk ? "Download AIML CLUB APK" : "Visit AIML CLUB Website",
            text: isApk
                ? "Get the official AIML CLUB members app for Android! 🚀✨"
                : "Join the most innovative student tech community at Oriental College Of Technology, Bhopal! 🚀✨",
            url: isApk ? siteConfig.links.apk : siteConfig.links.website,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(shareData.url);
                alert(`${isApk ? "APK Link" : "Website Link"} copied to clipboard! 🚀 Share it with your friends.`);
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    }, [trigger]);

    return { share };
};
