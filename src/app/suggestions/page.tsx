import { Metadata } from "next";
import SuggestionPageClient from "./SuggestionPageClient";

export const metadata: Metadata = {
    title: "Suggestion Box | AI & Machine Learning Club OCT",
    description: "Submit anonymous feedback, event ideas, or report issues to the AIML Club team. Help us improve the community experience.",
    alternates: {
        canonical: "https://aimlclub.tech/suggestions",
    },
};

export default function SuggestionPage() {
    return <SuggestionPageClient />;
}
