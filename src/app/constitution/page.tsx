import { Metadata } from "next";
import ConstitutionPageClient from "./ConstitutionPageClient";

export const metadata: Metadata = {
    title: "Club Constitution & Bylaws | AI & Machine Learning Club OCT",
    description: "The governing charter and code of conduct for the AI & Machine Learning Club at Oriental College of Technology. Read our mission, membership guidelines, and ethical standards.",
    alternates: {
        canonical: "https://aimlclub.tech/constitution",
    },
};

export default function ConstitutionPage() {
    return <ConstitutionPageClient />;
}
