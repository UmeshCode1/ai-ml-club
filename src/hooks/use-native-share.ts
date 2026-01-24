"use client";

import { useCallback } from "react";

export function useNativeShare() {
    const share = useCallback(async ({ title, text, url }: { title: string; text?: string; url?: string }) => {
        if (typeof navigator === "undefined" || !navigator.share) {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(url || window.location.href);
                alert("Link copied to clipboard!");
            } catch (err) {
                console.error("Share failed", err);
            }
            return;
        }

        try {
            await navigator.share({
                title,
                text: text || "Check this out from AIML Club OCT!",
                url: url || window.location.href,
            });
        } catch (err) {
            if ((err as Error).name !== "AbortError") {
                console.error("Native share failed", err);
            }
        }
    }, []);

    return { share, isSupported: typeof navigator !== "undefined" && !!navigator.share };
}
