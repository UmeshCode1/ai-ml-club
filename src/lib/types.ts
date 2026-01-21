export interface Member {
    id: string;
    name: string;
    role: string;
    team?: string;
    image: string;
    enrollmentNo?: string;
    contactNo?: string;
    email?: string;
    bio?: string;
    techStack?: string[];
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
    tags?: string[];
    image: string;
    link?: string;
    demoUrl?: string;
    repoUrl?: string;
    authorIds?: string[];
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    venue?: string;
    image: string;
    imageId?: string;
    status?: "upcoming" | "ongoing" | "past" | "completed";
    category?: string;
    duration?: string;
    registrationUrl?: string;
    registrationLink?: string;
}

export interface Suggestion {
    id: string;
    name?: string;
    email?: string;
    category: string;
    text: string;
    isAnonymous: boolean;
    createdAt: string;
}

export interface Subscription {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    image?: string;
    imageId?: string;
    tags?: string[];
    published: boolean;
    createdAt: string;
}

export interface GalleryImage {
    id: string;
    title: string;
    description?: string;
    imageId: string;
    imageUrl?: string;
    eventName?: string;
    category?: string;
    createdAt: string;
}
