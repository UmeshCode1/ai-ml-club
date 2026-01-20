// JSON-LD Organization Schema for AIML Club OCT
// This provides structured data for Google Knowledge Graph

export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://aimlclub.tech/#organization",
    "name": "AI & Machine Learning Club - OCT",
    "alternateName": ["AIML Club", "AIML Club OCT", "AI ML Club", "AIML Club Bhopal"],
    "url": "https://aimlclub.tech",
    "logo": {
        "@type": "ImageObject",
        "url": "https://aimlclub.tech/aiml-club-logo-new.png",
        "width": 512,
        "height": 512
    },
    "image": "https://aimlclub.tech/og.jpg",
    "description": "AIML Club OCT (AI & Machine Learning Club) at Oriental College of Technology, Bhopal. India's leading student-driven AI ecosystem for workshops, hackathons, and real-world AI/ML projects.",
    "foundingDate": "2025",
    "founder": {
        "@type": "Person",
        "name": "AIML Club Founders"
    },
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Oriental College of Technology",
        "addressLocality": "Bhopal",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "462021",
        "addressCountry": "IN"
    },
    "contactPoint": [
        {
            "@type": "ContactPoint",
            "contactType": "General Inquiry",
            "email": "aimlcluboct@gmail.com",
            "telephone": "+91-6299200082",
            "availableLanguage": ["English", "Hindi"]
        },
        {
            "@type": "ContactPoint",
            "contactType": "President",
            "telephone": "+91-6299200082",
            "name": "Vishal Kumar"
        },
        {
            "@type": "ContactPoint",
            "contactType": "Vice President",
            "telephone": "+91-7974389476",
            "name": "Umesh Patle"
        }
    ],
    "sameAs": [
        // Professional & Developer Platforms (High Authority)
        "https://www.linkedin.com/company/aimlcluboct",
        "https://github.com/aimlcluboct",

        // Social & Community Platforms
        "https://www.instagram.com/aimlcluboct",
        "https://www.instagram.com/photopia_",
        "https://www.commudle.com/communities/ai-ml-club",
        "https://linktr.ee/aimlcluboct",

        // WhatsApp (Community)
        "https://whatsapp.com/channel/0029VbAthv38V0tfulumuV1D",

        // Subdomains (Same Entity)
        "https://info.aimlclub.tech",
        "https://codify.aimlclub.tech",
        "https://social.aimlclub.tech"
    ],
    "parentOrganization": {
        "@type": "EducationalOrganization",
        "name": "Oriental College of Technology",
        "url": "https://oriental.ac.in",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "addressCountry": "IN"
        }
    },
    "memberOf": {
        "@type": "Organization",
        "name": "Oriental College of Technology",
        "url": "https://oriental.ac.in"
    },
    "areaServed": {
        "@type": "Place",
        "name": "Bhopal, Madhya Pradesh, India"
    },
    "keywords": "AIML Club, AI ML Club, AIML Club OCT, AI Club Bhopal, Machine Learning Club, Artificial Intelligence, OCT Bhopal, Student Tech Club"
};

export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://aimlclub.tech/#website",
    "url": "https://aimlclub.tech",
    "name": "AIML Club OCT - AI & Machine Learning Club",
    "description": "Official website of AIML Club at Oriental College of Technology, Bhopal",
    "publisher": {
        "@id": "https://aimlclub.tech/#organization"
    },
    "potentialAction": {
        "@type": "SearchAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://aimlclub.tech/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
    }
};

export const collegeTechClubSchema = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": "https://aimlclub.tech/#club",
    "name": "AI & Machine Learning Club",
    "alternateName": "AIML Club OCT",
    "url": "https://aimlclub.tech",
    "parentOrganization": {
        "@type": "EducationalOrganization",
        "name": "Oriental College of Technology",
        "url": "https://oriental.ac.in"
    },
    "department": {
        "@type": "Organization",
        "name": "AI & Machine Learning Club",
        "url": "https://aimlclub.tech"
    }
};

// Combined schema for injection
export const combinedSchema = [organizationSchema, websiteSchema];

// Helper function to generate JSON-LD script tag content
export function getSchemaScript(): string {
    return JSON.stringify(combinedSchema);
}
