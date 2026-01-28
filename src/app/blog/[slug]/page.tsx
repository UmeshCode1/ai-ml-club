import { getBlogPostBySlug } from "@/lib/database";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface Props {
    params: {
        slug: string;
    };
}

// Generate Dynamic Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getBlogPostBySlug(params.slug);

    if (!post) {
        return {
            title: "Post Not Found | AIML Club",
        };
    }

    return {
        title: `${post.title} | AIML Club Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            authors: [post.author],
            publishedTime: post.publishedAt,
            images: [
                {
                    url: post.imageUrl || "/aiml-club-logo-new.png",
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ]
        }
    };
}

export default async function BlogPostPage({ params }: Props) {
    const post = await getBlogPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const { title, content, author, publishedAt, category, tags, readTime, imageUrl } = post;
    const tagList = tags ? tags.split(',') : [];

    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <article className="max-w-4xl mx-auto">
                {/* Back Link */}
                <Link href="/blog" className="inline-flex items-center text-neutral-400 hover:text-[var(--electric-cyan)] transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-12 text-center md:text-left">
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                        <span className="px-3 py-1 rounded-full bg-[var(--electric-cyan)]/10 text-[var(--electric-cyan)] border border-[var(--electric-cyan)]/20 font-bold uppercase tracking-wider">
                            {category}
                        </span>
                        <div className="flex items-center text-neutral-400">
                            <Calendar className="w-4 h-4 mr-2" />
                            {publishedAt}
                        </div>
                        <div className="flex items-center text-neutral-400">
                            <Clock className="w-4 h-4 mr-2" />
                            {readTime} min read
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black mb-8 text-white leading-tight">
                        {title}
                    </h1>

                    <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--neon-lime)] to-[var(--electric-cyan)] flex items-center justify-center text-black font-bold">
                            {author[0]}
                        </div>
                        <div>
                            <div className="font-bold text-white flex items-center gap-2">
                                <User className="w-3 h-3 text-[var(--neon-lime)]" />
                                {author}
                            </div>
                            <div className="text-xs text-neutral-500 uppercase tracking-widest">
                                {post.authorRole || "Contributor"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Cover Image */}
                {imageUrl && (
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-neutral-300 prose-a:text-[var(--electric-cyan)] prose-img:rounded-2xl">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>

                {/* Tags */}
                {tagList.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-white/10">
                        <h4 className="flex items-center gap-2 font-bold mb-4 text-neutral-200">
                            <Tag className="w-4 h-4 text-[var(--neon-lime)]" />
                            Related Topics
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {tagList.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-neutral-400">
                                    #{tag.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </main>
    );
}
