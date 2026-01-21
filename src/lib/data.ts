import { Member, Project, Event } from "./types";

// Complete Team Data - 43 Members organized by team
export const TEAM_DATA: Member[] = [
    // FACULTY COORDINATION
    {
        id: "fac-1",
        name: "Prof. Shamaila Khan",
        role: "Faculty Coordinator",
        team: "Faculty",
        image: "/images/team/placeholder.jpg",
        email: "shamailakhan@oriental.ac.in",
    },

    // CORE STUDENT LEADERSHIP
    {
        id: "core-1",
        name: "Vishal Kumar",
        role: "President",
        team: "Core Leadership",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231142",
        contactNo: "6299200082",
        email: "vg8904937@gmail.com",
    },
    {
        id: "core-2",
        name: "Umesh Patel",
        role: "Vice President",
        team: "Core Leadership",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231140",
        contactNo: "7974389476",
        email: "umesh.code1@gmail.com",
        techStack: ["Next.js", "Python", "AI/ML"],
        socials: { linkedin: "https://linkedin.com/in/umeshcode1", github: "https://github.com/UmeshCode1" }
    },

    // EVENT & OPERATIONS TEAM
    {
        id: "event-1",
        name: "Gourav Jain",
        role: "Event Head",
        team: "Event & Operations",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231055",
        email: "gjain9279@gmail.com",
    },
    {
        id: "event-2",
        name: "Aarchi Sharma",
        role: "Event Head",
        team: "Event & Operations",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231001",
        email: "aarchisharma320@gmail.com",
    },
    {
        id: "event-3",
        name: "Parul Ajit",
        role: "Event Head",
        team: "Event & Operations",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231092",
        email: "parulajit907@gmail.com",
    },
    {
        id: "event-4",
        name: "Anjali Sonare",
        role: "Event Team Member",
        team: "Event & Operations",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241015",
        email: "anjailsonare780@gmail.com",
    },
    {
        id: "event-5",
        name: "Aanya Tomar",
        role: "Event Team Member",
        team: "Event & Operations",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241023",
        email: "tomaraanya671@gmail.com",
    },
    {
        id: "event-6",
        name: "Bhavesh Singh",
        role: "Event Team Member",
        team: "Event & Operations",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231048",
        email: "bhaveshsinpanwar15@gmail.com",
    },
    {
        id: "event-7",
        name: "Tanu Jadon",
        role: "Event Team Member",
        team: "Event & Operations",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241132",
        email: "tanu05624@gmail.com",
    },
    {
        id: "event-8",
        name: "Sarvesh Sejwar",
        role: "Event Team Member",
        team: "Event & Operations",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL253D18",
        email: "sarveshsejwar441@gmail.com",
    },
    {
        id: "event-9",
        name: "Nasir Khan",
        role: "Event Team Member",
        team: "Event & Operations",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241068",
        email: "mdnasir078667@gmail.com",
    },
    {
        id: "event-10",
        name: "Rinki Pathak",
        role: "Event Team Member",
        team: "Event & Operations",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241096",
        email: "rinkipathak255@gmail.com",
    },

    // DISCIPLINE TEAM
    {
        id: "disc-1",
        name: "Prince Kumar",
        role: "Discipline Head",
        team: "Discipline",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231101",
        email: "princekumar2012010@gmail.com",
    },
    {
        id: "disc-2",
        name: "Nikhil Singh",
        role: "Discipline Team Member",
        team: "Discipline",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231088",
        email: "nikhilssingh22@gmail.com",
    },
    {
        id: "disc-3",
        name: "Himanshu Gour",
        role: "Discipline Team Member",
        team: "Discipline",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231062",
        email: "himanshugour7@gmail.com",
    },
    {
        id: "disc-4",
        name: "Sarthak Shrivastava",
        role: "Discipline Team Member",
        team: "Discipline",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231120",
        email: "shrivastavasarthak2006@gmail.com",
    },

    // TECHNICAL TEAM
    {
        id: "tech-1",
        name: "Kinshuk Verma",
        role: "Tech Lead",
        team: "Technical",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231076",
        email: "ver.kinshuk111@gmail.com",
        techStack: ["React", "Node.js"],
    },
    {
        id: "tech-2",
        name: "Nimisha Kumari",
        role: "Tech Team Member",
        team: "Technical",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231089",
        email: "nimishakum511@gmail.com",
    },
    {
        id: "tech-3",
        name: "Arnav Singh",
        role: "Tech Team Member",
        team: "Technical",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241026",
        email: "sigh67arnav@gmail.com",
    },
    {
        id: "tech-4",
        name: "Himanshu Singh",
        role: "Tech Team Member",
        team: "Technical",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241048",
        email: "singhhimmanshu9893@gmail.com",
    },
    {
        id: "tech-5",
        name: "Jitesh",
        role: "Tech Team Member",
        team: "Technical",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241051",
        email: "jiteshverma139@gmail.com",
    },

    // ANCHORS & STAGE MANAGEMENT TEAM
    {
        id: "anchor-1",
        name: "Heer",
        role: "Anchors Head",
        team: "Anchors & Stage",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231061",
        email: "heermurjani2004@gmail.com",
    },
    {
        id: "anchor-2",
        name: "Anshul Sharma",
        role: "Anchors Head",
        team: "Anchors & Stage",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231025",
        email: "anshulsharma008a@gmail.com",
    },
    {
        id: "anchor-3",
        name: "Ayush Tamrakar",
        role: "Anchor",
        team: "Anchors & Stage",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231045",
        email: "tamrakarsudha272@gmail.com",
    },
    {
        id: "anchor-4",
        name: "Avni Rawat",
        role: "Anchor",
        team: "Anchors & Stage",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241032",
        email: "avnir361@gmail.com",
    },
    {
        id: "anchor-5",
        name: "Ankit Sharma",
        role: "Anchor",
        team: "Anchors & Stage",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241016",
        email: "ankitsharma60784@gmail.com",
    },
    {
        id: "anchor-6",
        name: "Apurvi Aggarwal",
        role: "Anchor",
        team: "Anchors & Stage",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241024",
        email: "agrawalapurvi96@gmail.com",
    },
    {
        id: "anchor-7",
        name: "Shambhavi",
        role: "Anchor",
        team: "Anchors & Stage",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241111",
        email: "shambhavim57@gmail.com",
    },
    {
        id: "anchor-8",
        name: "Manish Mehra",
        role: "Anchor",
        team: "Anchors & Stage",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241059",
        email: "manishmehra8966@gmail.com",
    },

    // MEDIA DIVISION - PUBLIC RELATIONS
    {
        id: "pr-1",
        name: "Prakhar Sahu",
        role: "Public Relations",
        team: "Media - PR",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231098",
        email: "prakharsahu150@gmail.com",
    },
    {
        id: "pr-2",
        name: "Khushi Kumari",
        role: "Media Head",
        team: "Media - PR",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231075",
        email: "khushikumari89934@gmail.com",
    },
    {
        id: "pr-3",
        name: "Anushka Malviya",
        role: "Media Associate",
        team: "Media - PR",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241021",
        email: "anushkamalviya93@gmail.com",
    },
    {
        id: "pr-4",
        name: "Aashu Kumar",
        role: "Media Associate",
        team: "Media - PR",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241001",
        email: "kaviraj07310731@gmail.com",
    },

    // MEDIA DIVISION - DESIGN & GRAPHICS
    {
        id: "design-1",
        name: "Daksh Sahni",
        role: "Graphics Designer",
        team: "Media - Design",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241036",
        email: "dakshsahni2006@gmail.com",
    },
    {
        id: "design-2",
        name: "Pritish Mandal",
        role: "Graphics Designer",
        team: "Media - Design",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231102",
        email: "pritishkumar28@gmail.com",
    },
    {
        id: "design-3",
        name: "Abhijeet Sarkar",
        role: "Graphics Designer",
        team: "Media - Design",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL231004",
        email: "abhiztsarkar@gmail.com",
    },
    {
        id: "design-4",
        name: "Hana Nafees Abbasi",
        role: "Graphics Designer",
        team: "Media - Design",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241043",
        email: "hananafees16@gmail.com",
    },
    {
        id: "design-5",
        name: "Mohammed Arif Zaidi",
        role: "Graphics Designer",
        team: "Media - Design",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241062",
        email: "arifzaidi072@gmail.com",
    },

    // MEDIA DIVISION - EDITORS
    {
        id: "editor-1",
        name: "Rajeev Kumar",
        role: "Media Member",
        team: "Media - Editors",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241093",
        email: "raj1807600@gmail.com",
    },
    {
        id: "editor-2",
        name: "Aditya Rajput",
        role: "Media Member",
        team: "Media - Editors",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL241004",
        email: "adityacreative64@gmail.com",
    },
    {
        id: "editor-3",
        name: "Prince Khatik",
        role: "Media Member",
        team: "Media - Editors",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126AL251047",
        email: "princekhatik7612@gmail.com",
    },
    {
        id: "editor-4",
        name: "Teena Nandanwar",
        role: "Media Member",
        team: "Media - Editors",
        image: "/images/team/placeholder.jpg",
        enrollmentNo: "0126CS251346",
        email: "nandanwarteena@gmail.com",
    },
];

// Team categories for filtering
export const TEAM_CATEGORIES = [
    "All",
    "Faculty",
    "Core Leadership",
    "Event & Operations",
    "Discipline",
    "Technical",
    "Anchors & Stage",
    "Media - PR",
    "Media - Design",
    "Media - Editors",
];

// Legacy exports for backward compatibility
export const MOCK_TEAM = TEAM_DATA;

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
    // Successfully Conducted Events (2025)
    {
        id: "e1",
        title: "Expert Talk by Coding Thinker",
        description: "An insightful expert session on coding practices and tech industry insights by Coding Thinker. Learn from experienced professionals and enhance your programming skills.",
        date: "2025-08-26T10:00:00.000Z",
        location: "Oriental College of Technology, Bhopal",
        image: "/images/events/expert-talk.jpg",
        status: "completed",
        category: "Expert Talk",
        duration: "1.5 hours"
    },
    {
        id: "e2",
        title: "DSPL Session",
        description: "Data Structures and Programming Logic session - A comprehensive learning experience to strengthen your fundamentals in DSA and logical programming.",
        date: "2025-09-10T10:00:00.000Z",
        location: "Oriental College of Technology, Bhopal",
        image: "/images/events/dspl-session.jpg",
        status: "completed",
        category: "Session",
        duration: "2 hours",
        registrationLink: "https://drive.google.com/file/d/1xv3a9iCzqhP2mRNXrXFPtc2MdO4triam/view?usp=sharing"
    },
    {
        id: "e3",
        title: "DSPL Workshop",
        description: "Two-day intensive hands-on workshop on Data Structures and Programming Logic. Dive deep into algorithms, problem-solving techniques, and competitive programming.",
        date: "2025-09-11T09:00:00.000Z",
        location: "Oriental College of Technology, Bhopal",
        image: "/images/events/dspl-workshop.jpg",
        status: "completed",
        category: "Workshop",
        duration: "2 days",
        registrationLink: "https://drive.google.com/file/d/1xv3a9iCzqhP2mRNXrXFPtc2MdO4triam/view?usp=sharing"
    },
    {
        id: "e4",
        title: "Apfity Competition",
        description: "Apfity - The ultimate aptitude and coding competition to test your logical reasoning and programming skills. Compete with the best minds!",
        date: "2025-10-13T10:00:00.000Z",
        location: "Oriental College of Technology, Bhopal",
        image: "/images/events/apfity.jpg",
        status: "completed",
        category: "Competition",
        duration: "1 hour",
        registrationLink: "https://drive.google.com/file/d/1yEwEA1owqbw1So4HH01FjJaeSejo5XMo/view?usp=drive_link"
    },
    {
        id: "e5",
        title: "Codify - Coding Competition",
        description: "Codify - AIML Club's flagship coding competition. Test your programming prowess, solve challenging problems, and win exciting prizes!",
        date: "2025-11-10T10:00:00.000Z",
        location: "Oriental College of Technology, Bhopal",
        image: "/images/events/codify.jpg",
        status: "completed",
        category: "Competition",
        duration: "1 hour"
    },
    {
        id: "e6",
        title: "Expert Talk on Reinforcement Learning",
        description: "Deep dive into Reinforcement Learning with industry experts. Learn about RL algorithms, applications in robotics, gaming, and autonomous systems.",
        date: "2025-11-29T10:00:00.000Z",
        location: "Oriental College of Technology, Bhopal",
        image: "/images/events/rl-talk.jpg",
        status: "completed",
        category: "Expert Talk",
        duration: "1.5 hours"
    },
    {
        id: "e7",
        title: "WordPress Tour Workshop",
        description: "Complete WordPress workshop covering website creation, themes, plugins, and deployment. Build your own professional website from scratch!",
        date: "2025-12-13T10:00:00.000Z",
        location: "Oriental College of Technology, Bhopal",
        image: "/images/events/wordpress.jpg",
        status: "completed",
        category: "Workshop",
        duration: "3 hours"
    },
    {
        id: "e8",
        title: "New Core Team Member Orientation",
        description: "Official onboarding and orientation session for new AIML Club core team members. Learn about club culture, responsibilities, upcoming plans, and connect with the team!",
        date: "2025-12-30T10:00:00.000Z",
        location: "Oriental College of Technology, Bhopal",
        image: "/images/events/orientation.jpg",
        status: "completed",
        category: "Orientation",
        duration: "2 hours"
    }
];

// Helper functions
export function getMembersByTeam(team: string): Member[] {
    if (team === "All") return TEAM_DATA;
    return TEAM_DATA.filter(m => m.team === team);
}

export function getLeadership(): Member[] {
    return TEAM_DATA.filter(m =>
        m.team === "Faculty" ||
        m.team === "Core Leadership" ||
        m.role?.includes("Head") ||
        m.role?.includes("Lead")
    );
}

export async function getMembers(): Promise<Member[]> {
    return TEAM_DATA;
}

export async function getProjects(): Promise<Project[]> {
    return MOCK_PROJECTS;
}

export async function getEvents(): Promise<Event[]> {
    return MOCK_EVENTS;
}
