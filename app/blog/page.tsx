import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "../components/blogData";

export const metadata = {
  title: "Blog | JN Parts",
  description: "Car tips, upgrade guides, and expert advice from the JN Parts team in Kenya.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-zinc-950 py-16 px-6">
      <div className="max-w-6xl mx-auto">

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
              className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-64 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <p className="text-xs text-zinc-500">{post.date}</p>
                <h2 className="text-xl font-semibold text-white leading-snug">
                  {post.title}
                </h2>
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
