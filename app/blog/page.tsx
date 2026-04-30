import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "../components/blogData";

export const metadata: Metadata = {
  title: "Blog | JN Parts",
  description: "Car tips, upgrade guides, and expert advice from the JN Parts team in Kenya.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | JN Parts",
    description: "Car tips, upgrade guides, and expert advice from the JN Parts team in Kenya.",
    url: "https://jncaraccessories.com/blog",
    type: "website",
    images: [
      {
        url: "/blog/opengraph-image",
        width: 1200,
        height: 630,
        alt: "JN Parts Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | JN Parts",
    description: "Car tips, upgrade guides, and expert advice from the JN Parts team in Kenya.",
    images: ["/blog/opengraph-image"],
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-zinc-950 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-block mb-8 text-sm text-orange-400 hover:text-orange-300 transition-colors duration-200"
        >
          ← Back to Home
        </Link>

        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">
            Our Blog
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Car tips, upgrade guides, and expert advice from the JN Parts team in Kenya.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              className="group bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full bg-zinc-950/80">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <p className="text-xs text-zinc-500">{post.date}</p>
                <h2 className="text-xl font-semibold text-white leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {post.metaDescription}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {post.summary}
                </p>

                {/* Read More */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-2 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors duration-200"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}