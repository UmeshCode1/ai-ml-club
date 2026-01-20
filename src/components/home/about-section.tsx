import { getAboutImages } from "@/lib/database";
import { AboutSectionClient } from "./about-section-client";

export async function AboutSection() {
    // Fetch images from Appwrite about bucket (server-side)
    const aboutImages = await getAboutImages();

    return <AboutSectionClient images={aboutImages} />;
}
