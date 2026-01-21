"use server";

import { Client, Databases, Storage, ID, Query } from "node-appwrite";

// Get Appwrite config
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "696f6e31002241c92438";
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1";
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "aiml-club-db";

// Server-side Appwrite client with API key
const getClient = () => {
    return new Client()
        .setEndpoint(ENDPOINT)
        .setProject(PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY || "");
};

const getDatabases = () => new Databases(getClient());
const getStorage = () => new Storage(getClient());

// Storage Bucket IDs
const BUCKETS = {
    TEAM_MEMBERS: "team-members",
    ABOUT: "about",
};

// Collection IDs
const COLLECTIONS = {
    SUGGESTIONS: "suggestions",
    MEMBERS: "members",
    EVENTS: "events",
    BLOG: "blog",
    GALLERY: "gallery",
    SUBSCRIPTIONS: "subscriptions",
    CONTACTS: "contacts",
};

// ==================== STORAGE ====================
export interface StorageFile {
    $id: string;
    name: string;
    url: string;
}

export async function getAboutImages(): Promise<StorageFile[]> {
    const storage = getStorage();
    try {
        const response = await storage.listFiles(BUCKETS.ABOUT);
        return response.files.map(file => ({
            $id: file.$id,
            name: file.name,
            url: `${ENDPOINT}/storage/buckets/${BUCKETS.ABOUT}/files/${file.$id}/view?project=${PROJECT_ID}`,
        }));
    } catch {
        return [];
    }
}

export async function getTeamMemberImages(): Promise<StorageFile[]> {
    const storage = getStorage();
    try {
        const response = await storage.listFiles(BUCKETS.TEAM_MEMBERS);
        return response.files.map(file => ({
            $id: file.$id,
            name: file.name,
            url: `${ENDPOINT}/storage/buckets/${BUCKETS.TEAM_MEMBERS}/files/${file.$id}/view?project=${PROJECT_ID}`,
        }));
    } catch {
        return [];
    }
}

// ==================== SUGGESTIONS ====================
export interface Suggestion {
    $id?: string;
    name?: string;
    email?: string;
    category: string;
    text: string;
    isAnonymous: boolean;
    $createdAt?: string;
}

export async function createSuggestion(data: Omit<Suggestion, "$id" | "$createdAt">) {
    const databases = getDatabases();
    return await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.SUGGESTIONS,
        ID.unique(),
        data
    );
}

export async function getSuggestions() {
    const databases = getDatabases();
    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.SUGGESTIONS,
        [Query.orderDesc("$createdAt")]
    );
    return response.documents as unknown as Suggestion[];
}

// ==================== SUBSCRIPTIONS ====================
export interface Subscription {
    $id?: string;
    name: string;
    email: string;
    $createdAt?: string;
}

export async function createSubscription(data: Omit<Subscription, "$id" | "$createdAt">) {
    const databases = getDatabases();
    return await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.SUBSCRIPTIONS,
        ID.unique(),
        data
    );
}

export async function getSubscriptions() {
    const databases = getDatabases();
    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.SUBSCRIPTIONS,
        [Query.orderDesc("$createdAt")]
    );
    return response.documents as unknown as Subscription[];
}

// ==================== MEMBERS ====================
export interface Member {
    $id?: string;
    name: string;
    enrollmentNo?: string;
    role: string;
    team: string;
    contactNo?: string;
    email: string;
    imageId?: string;
    imageUrl?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    year?: string;
    status?: string;
    $createdAt?: string;
}

export async function getMembers() {
    const databases = getDatabases();
    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.MEMBERS,
        [Query.limit(200)]
    );
    return response.documents as unknown as Member[];
}

export async function getMembersByTeam(team: string) {
    const databases = getDatabases();
    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.MEMBERS,
        [Query.equal("team", team), Query.limit(50)]
    );
    return response.documents as unknown as Member[];
}

// ==================== EVENTS ====================
export interface Event {
    $id?: string;
    title: string;
    description: string;
    date: string;
    time?: string;
    venue?: string;
    location?: string; // alias for venue
    imageUrl?: string;
    registrationLink?: string;
    isUpcoming: boolean;
    category?: string;
    duration?: string;
    status?: "upcoming" | "ongoing" | "past" | "completed";
    $createdAt?: string;
}

export async function getEvents() {
    const databases = getDatabases();
    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.EVENTS,
        [Query.orderDesc("date"), Query.limit(50)]
    );
    return response.documents as unknown as Event[];
}

export async function getUpcomingEvents() {
    const databases = getDatabases();
    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.EVENTS,
        [Query.equal("isUpcoming", true), Query.orderAsc("date"), Query.limit(10)]
    );
    return response.documents as unknown as Event[];
}

// ==================== BLOG ====================
export interface BlogPost {
    $id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    authorRole?: string;
    authorAvatar?: string;
    coverImageUrl?: string;
    category?: string;
    tags?: string;
    readTime?: number;
    isPublished: boolean;
    isFeatured?: boolean;
    publishedAt?: string;
    $createdAt?: string;
}

export async function getBlogPosts() {
    const databases = getDatabases();
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.BLOG,
            [Query.equal("isPublished", true), Query.orderDesc("$createdAt"), Query.limit(20)]
        );
        return response.documents as unknown as BlogPost[];
    } catch {
        return [];
    }
}

export async function getFeaturedBlogPosts() {
    const databases = getDatabases();
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.BLOG,
            [Query.equal("isPublished", true), Query.equal("isFeatured", true), Query.orderDesc("$createdAt"), Query.limit(3)]
        );
        return response.documents as unknown as BlogPost[];
    } catch {
        return [];
    }
}

export async function getBlogPostBySlug(slug: string) {
    const databases = getDatabases();
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.BLOG,
            [Query.equal("slug", slug), Query.limit(1)]
        );
        return response.documents[0] as unknown as BlogPost | undefined;
    } catch {
        return undefined;
    }
}

export async function getBlogPostsByCategory(category: string) {
    const databases = getDatabases();
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.BLOG,
            [Query.equal("isPublished", true), Query.equal("category", category), Query.limit(20)]
        );
        return response.documents as unknown as BlogPost[];
    } catch {
        return [];
    }
}



// ==================== GALLERY ALBUMS ====================
export interface GalleryAlbum {
    $id?: string;
    eventName: string;
    description?: string;
    posterUrl: string;
    driveLink: string;
    eventDate: string;
    category?: string;
    photoCount?: number;
    isVisible?: boolean;
    $createdAt?: string;
}

export async function getGalleryAlbums() {
    const databases = getDatabases();
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.GALLERY,
            [Query.equal("isVisible", true), Query.orderDesc("eventDate"), Query.limit(50)]
        );
        return response.documents as unknown as GalleryAlbum[];
    } catch {
        return [];
    }
}

export async function getGalleryAlbumById(id: string) {
    const databases = getDatabases();
    try {
        const response = await databases.getDocument(
            DATABASE_ID,
            COLLECTIONS.GALLERY,
            id
        );
        return response as unknown as GalleryAlbum;
    } catch {
        return null;
    }
}

// ==================== CONTACTS ====================
export interface Contact {
    $id?: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    $createdAt?: string;
}

export async function createContact(data: Omit<Contact, "$id" | "$createdAt">) {
    const databases = getDatabases();
    try {
        return await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.CONTACTS,
            ID.unique(),
            data
        );
    } catch (error) {
        console.error("Failed to create contact:", error);
        throw error;
    }
}

export async function getContacts() {
    const databases = getDatabases();
    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.CONTACTS,
        [Query.orderDesc("$createdAt"), Query.limit(100)]
    );
    return response.documents as unknown as Contact[];
}
