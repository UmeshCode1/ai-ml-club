import { Member, Project, Event } from "./types";

// Mock Data - In a real app, these would be API calls

export const MOCK_TEAM: Member[] = [
    {
        id: "1",
        name: "Umesh Patel",
        role: "Vice President",
        image: "/images/umesh.jpg",
        techStack: ["Next.js", "Python", "TensorFlow"],
        bio: "Passionate about AI and Web Dev.",
        socials: {
            linkedin: "https://linkedin.com/in/umesh",
        }
    },
    // Add other members if needed or keep minimal for now
];

export const MOCK_PROJECTS: Project[] = [
    {
        id: "p1",
        title: "Neural Nexus",
        description: "The official club website.",
        technologies: ["Next.js", "Three.js"],
        tags: ["Next.js", "Three.js", "Appwrite"],
        image: "/images/nexus.jpg",
        link: "https://github.com/aimlcluboct/website",
        authorIds: ["1"]
    }
];

export const MOCK_EVENTS: Event[] = [
    {
        id: "e1",
        title: "AI Hackathon 2024",
        description: "48-Hour non-stop innovation marathon.",
        date: "2024-10-15T09:00:00.000Z",
        location: "Auditorium",
        image: "/images/hackathon.jpg",
        status: "upcoming"
    },
    {
        id: "e2",
        title: "GenAI Workshop",
        description: "Hands-on session with LLMs.",
        date: "2024-09-20T14:00:00.000Z",
        location: "Lab 2",
        image: "/images/workshop.jpg",
        status: "past"
    }
];

export async function getMembers(): Promise<Member[]> {
    // Simulate API delay
    // await new Promise(resolve => setTimeout(resolve, 100));
    return MOCK_TEAM;
}

export async function getProjects(): Promise<Project[]> {
    return MOCK_PROJECTS;
}

export async function getEvents(): Promise<Event[]> {
    return MOCK_EVENTS;
}
