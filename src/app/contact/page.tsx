import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
    title: "Contact Us & Leadership Directory | AI & Machine Learning Club OCT",
    description: "Get in touch with the core council of the AI & Machine Learning Club. Find contact details for the President, Tech Leads, and faculty coordinators at OCT Bhopal.",
    alternates: {
        canonical: "https://aimlclub.tech/contact",
    },
};

export default function ContactPage() {
    return <ContactPageClient />;
}
