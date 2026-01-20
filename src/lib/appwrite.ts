import { Client, Account, Databases, Storage } from "appwrite";

// Appwrite Configuration using Environment Variables
export const APPWRITE_CONFIG = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1",
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "696f6e31002241c92438",
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "aiml-club-db",
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
