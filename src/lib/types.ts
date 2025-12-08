export interface Member {
    id: string;
    name: string;
    role: string;
    image: string; // Changed from imageUrl to match legacy compatible
    bio?: string;
    techStack?: string[]; // Added
    socials?: {
        linkedin?: string;
        github?: string;
        twitter?: string;
    };
}

export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    tags?: string[]; // Added alias/support
    image: string; // Changed from imageUrl
    link?: string; // Added for generic link
    demoUrl?: string; // Kept for future
    repoUrl?: string; // Kept for future
    authorIds?: string[];
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string; // ISO String
    location: string;
    image: string; // Changed from imageUrl
    status?: "upcoming" | "past"; // Added
    registrationUrl?: string;
}

export interface Suggestion {
    id: string;
    text: string;
    createdAt: string;
    isAnonymous: boolean;
}
