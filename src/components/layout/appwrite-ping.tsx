"use client";

import { useEffect } from "react";
import { client } from "@/lib/appwrite";

/**
 * AppwritePing Component
 * 
 * This component automatically pings the Appwrite backend server when the app loads
 * to verify the SDK setup is working correctly. Check the browser console for the result.
 */
export function AppwritePing() {
    useEffect(() => {
        const pingAppwrite = async () => {
            try {
                await client.ping();
            } catch (/* error */) {
                // Silently fail as per design, no console logs needed.
                // The error is intentionally ignored here.
            }
        };

        pingAppwrite();
    }, []);

    return null; // This component doesn't render anything
}
