import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "./blogData";

export default function Blog() {
  return (
    <section id="blog" className="bg-[#08090B] px-6 py-20">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#FF1616]">Insights</p>
          <h2 className="mb-3 text-3xl font-black text-[#F7F8FD] sm:text-4xl md:text-5xl">
            From Our Blog
          </h2>
          <p className="mx-auto max-w-xl text-sm text-[#A5A8AE] sm:text-base">
            Car tips, upgrade guides, and expert advice from the JN Parts team.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              className="group overflow-hidden rounded-[1.5rem] border border-[#34373D] bg-[#15171B] shadow-[0_20px_60px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF1616]/40 hover:shadow-[0_22px_70px_rgba(255,22,22,0.12)]"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent" />
              </div>

              <div className="space-y-3 p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-[#A5A8AE]">{post.date}</p>
                <h3 className="text-xl font-bold leading-snug text-[#F7F8FD]">
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#A5A8AE]">
                  {post.summary}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-[#FF1616] transition-colors duration-200 hover:text-[#D90F0F]"
                >
                  Read more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block rounded-full border border-[#FF1616]/70 bg-[#FF1616]/5 px-6 py-3 text-sm font-semibold text-[#F7F8FD] transition-all duration-300 hover:bg-[#FF1616] hover:text-white"
          >
            View All Posts
          </Link>
        </div>

      </div>
    </section>
  );
}
