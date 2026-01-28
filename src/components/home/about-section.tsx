import { getAboutImages } from "@/lib/database";
import { AboutSectionClient } from "./about-section-client";
import { unstable_noStore as noStore } from "next/cache";

export async function AboutSection() {
    // Disable caching - always fetch fresh from Appwrite
    noStore();

    // Fetch images from Appwrite about bucket (server-side)
    const aboutImages = await getAboutImages();

    return (
        <div className="standalone:hidden">
            <AboutSectionClient images={aboutImages} />
        </div>
    );
}
