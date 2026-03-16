import { Client, Account, Databases, Storage } from "appwrite";

/**
 * Validates required environment variables at runtime
 * Throws error if critical variables are missing in production
 */
function validateAppwriteConfig() {
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

    // In production, fail fast if environment variables are not configured
    if (process.env.NODE_ENV === 'production') {
        if (!endpoint) {
            throw new Error('NEXT_PUBLIC_APPWRITE_ENDPOINT is required in production');
        }
        if (!projectId) {
            throw new Error('NEXT_PUBLIC_APPWRITE_PROJECT_ID is required in production');
        }
        if (!databaseId) {
            throw new Error('NEXT_PUBLIC_APPWRITE_DATABASE_ID is required in production');
        }
    }

    // Development fallbacks (for local development only)
    return {
        endpoint: endpoint || "https://fra.cloud.appwrite.io/v1",
        projectId: projectId || "696f6e31002241c92438",
        databaseId: databaseId || "aiml-club-db",
    };
}

// Appwrite Configuration using Environment Variables
export const APPWRITE_CONFIG = {
    ...validateAppwriteConfig(),
    collections: {
        members: "members",
        projects: "projects",
        events: "events",
        suggestions: "suggestions",
        blog: "blog",
        gallery: "gallery",
        subscriptions: "subscriptions",
    },
    buckets: {
        images: "images",
        gallery: "gallery",
    },
};

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.projectId);

// Initialize Appwrite Services
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage };
