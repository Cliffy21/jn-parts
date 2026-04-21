import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "./blogData";

export default function Blog() {
  return (
    <section id="blog" className="py-16 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            From Our Blog
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Car tips, upgrade guides, and expert advice from the JN Parts team.
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
              <div className="relative h-56 w-full">
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
                <h3 className="text-lg font-semibold text-white leading-snug">
                  {post.title}
                </h3>
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

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 rounded-full border border-orange-400 text-orange-400 text-sm font-medium hover:bg-orange-400 hover:text-black transition-all duration-200"
          >
            View All Posts
          </Link>
        </div>

      </div>
    </section>
  );
}
