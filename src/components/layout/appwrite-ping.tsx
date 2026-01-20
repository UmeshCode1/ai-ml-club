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
                const response = await client.ping();
                console.log("✅ Appwrite connection successful!", response);
            } catch (error) {
                console.error("❌ Appwrite connection failed:", error);
            }
        };

        pingAppwrite();
    }, []);

    return null; // This component doesn't render anything
}
