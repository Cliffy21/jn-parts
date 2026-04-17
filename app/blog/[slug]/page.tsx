import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "../../components/blogData";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | JN Parts`,
    description: post.metaDescription,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-zinc-950 py-16 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-block mb-8 text-sm text-orange-400 hover:text-orange-300 transition-colors duration-200"
        >
          ← Back to Blog
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-3 leading-snug">
          {post.title}
        </h1>

        {/* Date */}
        <p className="text-xs text-zinc-500 mb-8">{post.date}</p>

        {/* Image */}
        <div className="relative h-72 w-full rounded-2xl overflow-hidden mb-10">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>

        {/* Intro */}
        <p className="text-zinc-300 text-base leading-relaxed mb-10">
          {post.body.intro}
        </p>

        {/* Body Sections */}
        <div className="space-y-8">
          {post.body.sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold text-white mb-3">
                {section.heading}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="mt-12 p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
          <h2 className="text-lg font-semibold text-white mb-3">
            Conclusion
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {post.conclusion}
          </p>
        </div>

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 rounded-full border border-orange-400 text-orange-400 text-sm font-medium hover:bg-orange-400 hover:text-black transition-all duration-200"
          >
            ← Back to All Posts
          </Link>
        </div>

      </div>
    </main>
  );
}
