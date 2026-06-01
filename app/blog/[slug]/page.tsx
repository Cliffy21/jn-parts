import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "../../components/blogData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const HOME_CAR_WRAPS = "/#product-car-wraps";
const HOME_PPF = "/#product-ppf";
const NTSA_URL = "https://www.ntsa.go.ke/";

const blogLinkClass =
  "text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | JN Parts`,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | JN Parts`,
      description: post.metaDescription,
      url: `https://jncaraccessories.com/blog/${post.slug}`,
      type: "article",
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | JN Parts`,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const isCarWrapKenyaPost =
    slug === "how-much-does-it-cost-to-wrap-a-car-in-kenya";
  const is360CameraKenyaPost = slug === "360-degree-car-camera-Kenya";

  if (!post) return notFound();

  const publishedDateIso = new Date(post.date).toISOString();

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: [post.image],
    datePublished: publishedDateIso,
    dateModified: publishedDateIso,
    mainEntityOfPage: `https://jncaraccessories.com/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: "JN Parts & Accessories",
    },
    publisher: {
      "@type": "Organization",
      name: "JN Parts & Accessories",
    },
  };

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
        <p className="text-zinc-300 text-base leading-relaxed mb-4">
          {isCarWrapKenyaPost ? (
            <>
              Looking for{" "}
              <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                car wrap prices in Kenya
              </Link>
              ? Learn full wrap and{" "}
              <Link href={HOME_PPF} className={blogLinkClass}>
                PPF costs
              </Link>
              , key pricing factors, and where to get professional services in
              Nairobi.
            </>
          ) : (
            post.metaDescription
          )}
        </p>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
        />

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

        {isCarWrapKenyaPost ? (
          <div className="space-y-8">
            <p className="text-zinc-300 text-base leading-relaxed">
              Over the past few years, the car industry in Kenya has experienced
              a shift, with many car owners moving from traditional paint jobs
              to modern{" "}
              <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                vinyl wraps
              </Link>
              . These wraps come in a variety of finishes
              whether you prefer a sleek gloss or a matte look making them a
              flexible option for personalizing your vehicle.
            </p>
            <p className="text-zinc-300 text-base leading-relaxed">
              So, how much does{" "}
              <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                car wrapping
              </Link>{" "}
              cost in Kenya?
            </p>
            <p className="text-zinc-300 text-base leading-relaxed">
              On average, a full{" "}
              <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                car wrap
              </Link>{" "}
              in Kenya costs between KES 75,000 and KES 95,000, depending on the
              size of the vehicle, type of vinyl and installer expertise.
            </p>
            <p className="text-zinc-300 text-base leading-relaxed">
              This guide breaks down the cost of car wrapping in Kenya, compares
              it with painting, and helps you choose the right service provider.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Estimated Car Wrapping Cost in Kenya
              </h2>
              <h3 className="text-base font-medium text-orange-400 mb-3">
                Quick Price Summary:
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-zinc-300 text-sm leading-relaxed mb-5">
                <li>
                  <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                    Full wrap (cars)
                  </Link>
                  : KES 85,000
                </li>
                <li>
                  <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                    Full wrap (SUVs)
                  </Link>
                  : KES 95,000
                </li>
                <li>
                  <Link href={HOME_PPF} className={blogLinkClass}>
                    Paint Protection Film (PPF)
                  </Link>
                  : KES 150,000 - 180,000
                </li>
                <li>Partial wrap: KES 5,000 - 25,000</li>
                <li>Small accents: KES 1,500 - 4,000</li>
              </ul>
              <div className="overflow-x-auto rounded-xl border border-zinc-800">
                <table className="min-w-full text-sm text-left text-zinc-300">
                  <thead className="bg-zinc-900 text-zinc-100">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Service Type</th>
                      <th className="px-4 py-3 font-semibold">Vehicle Category</th>
                      <th className="px-4 py-3 font-semibold">
                        Estimated Cost (KES)
                      </th>
                      <th className="px-4 py-3 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    <tr>
                      <td className="px-4 py-3">Full Body Wrap</td>
                      <td className="px-4 py-3">
                        All Cars (Hatchbacks &amp; Sedans)
                      </td>
                      <td className="px-4 py-3">85,000</td>
                      <td className="px-4 py-3">3-6 Days</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Full Body Wrap</td>
                      <td className="px-4 py-3">SUVs</td>
                      <td className="px-4 py-3">95,000</td>
                      <td className="px-4 py-3">5-7+ Days</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <Link href={HOME_PPF} className={blogLinkClass}>
                          Paint Protection Film (PPF)
                        </Link>
                      </td>
                      <td className="px-4 py-3">All Cars</td>
                      <td className="px-4 py-3">150,000</td>
                      <td className="px-4 py-3">5-7 Days</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <Link href={HOME_PPF} className={blogLinkClass}>
                          Paint Protection Film (PPF)
                        </Link>
                      </td>
                      <td className="px-4 py-3">SUVs</td>
                      <td className="px-4 py-3">180,000</td>
                      <td className="px-4 py-3">7+ Days</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Partial Wrap</td>
                      <td className="px-4 py-3">Roof or Bonnet Only</td>
                      <td className="px-4 py-3">5,000 - 12,000</td>
                      <td className="px-4 py-3">1 Day</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Accents</td>
                      <td className="px-4 py-3">Side Mirrors / Door Handles</td>
                      <td className="px-4 py-3">1,500 - 4,000</td>
                      <td className="px-4 py-3">2-4 Hours</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">De-chroming</td>
                      <td className="px-4 py-3">Window Trims / Grills</td>
                      <td className="px-4 py-3">10,000 - 25,000</td>
                      <td className="px-4 py-3">1-2 Days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mt-4">
                <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                  Car wrap prices
                </Link>{" "}
                in Nairobi and nearby areas like Kiambu may vary slightly
                depending on the installer and materials used.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Factors Affecting Car Wrapping Cost in Kenya
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                The most common factors influencing car wrapping cost include:
              </p>
              <ol className="list-decimal pl-5 space-y-3 text-zinc-400 text-sm leading-relaxed">
                <li>
                  <span className="text-zinc-200 font-medium">
                    Type of Vinyl Wrap:
                  </span>{" "}
                  Standard{" "}
                  <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                    vinyl wraps
                  </Link>{" "}
                  are more affordable, while premium wraps
                  cost more due to better durability and resistance to harsh
                  weather conditions. Cheaper vinyl may fade or peel faster,
                  leading to replacement costs sooner than expected.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">Vehicle Size:</span>{" "}
                  Larger vehicles such as SUVs and trucks require more material
                  and labour, making them more expensive to wrap than smaller
                  cars. Vehicles with complex curves and designs may also
                  increase installation time and cost.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Partial vs Full Wrap:
                  </span>{" "}
                  A full wrap costs more because it covers the entire vehicle,
                  requiring more vinyl and labour. Partial wraps such as the
                  roof, bonnet, or side panels are more budget-friendly and
                  commonly used for branding.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Design Complexity:
                  </span>{" "}
                  Simple designs with minimal colours are more affordable.
                  Custom wraps with multiple colours, patterns, or logos require
                  more time and expertise, increasing the overall cost.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Installer Experience:
                  </span>{" "}
                  Professional installers charge more but deliver better results
                  with smooth finishes and no bubbles or wrinkles. Poor
                  installation can damage your car&apos;s paint or lead to early
                  peeling, costing more in the long run.
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                What are the benefits of Car Wrapping?
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                Some of the key benefits of wrapping your vehicle in Kenya are:
              </p>
              <ol className="list-decimal pl-5 space-y-3 text-zinc-400 text-sm leading-relaxed">
                <li>
                  <span className="text-zinc-200 font-medium">
                    Paint Protection:
                  </span>{" "}
                  <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                    Car wraps
                  </Link>{" "}
                  act as a protective layer, shielding your vehicle from UV rays,
                  fading, and minor scratches commonly experienced on Kenyan
                  roads. For invisible paint protection, see our{" "}
                  <Link href={HOME_PPF} className={blogLinkClass}>
                    PPF options
                  </Link>
                  .
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Cost-Effective Customization:
                  </span>{" "}
                  Compared to repainting, wrapping is a more affordable way to
                  change your car&apos;s appearance especially if you like
                  switching styles frequently.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Faster Application:
                  </span>{" "}
                  Most wraps take 3-5 days, which is much faster than a
                  high-quality paint job that can take up to 3 weeks.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Easy Maintenance:
                  </span>{" "}
                  Wrapped cars are easier to maintain. Regular washing is enough,
                  no need for polishing or waxing like traditional paint.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">Reversible:</span>{" "}
                  Wraps can be removed without damaging the original paint,
                  allowing you to return to the original look anytime.
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Disadvantages of Car Wrapping
              </h2>
              <ol className="list-decimal pl-5 space-y-3 text-zinc-400 text-sm leading-relaxed">
                <li>
                  <span className="text-zinc-200 font-medium">
                    Shorter Lifespan:
                  </span>{" "}
                  <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                    Car wraps
                  </Link>{" "}
                  typically last 5-7 years, which is shorter compared
                  to paint. Poor maintenance or high-pressure washing can reduce
                  their lifespan.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Cost of Professional Installation:
                  </span>{" "}
                  High-quality wrapping requires skilled labour, which can be
                  costly. Cheap installation often leads to peeling or poor
                  finish.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Resale Concerns:
                  </span>{" "}
                  Some buyers may worry about the condition of the paint
                  underneath, especially if the wrap was poorly installed or
                  removed.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Not Ideal for Damaged Paint:
                  </span>{" "}
                  If your car has dents or chipped paint, a wrap may not stick
                  properly. It&apos;s best to repair the surface first.
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Where to Get Car Wrapping Services in Kenya
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                  Car wrapping services
                </Link>{" "}
                are widely available in major towns like
                Nairobi, Kiambu, and Mombasa. When choosing a provider, focus on:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400 text-sm leading-relaxed mb-3">
                <li>Quality of past work</li>
                <li>Type of vinyl used</li>
                <li>Installation expertise</li>
                <li>Customer reviews</li>
              </ul>
              <p className="text-zinc-400 text-sm leading-relaxed">
                For reliable automotive products and styling accessories, JN
                Parts and Accessories offers a range of{" "}
                <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                  car wraps
                </Link>{" "}
                and{" "}
                <Link href={HOME_PPF} className={blogLinkClass}>
                  PPF
                </Link>{" "}
                to enhance both the look and performance of your car.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">FAQs</h2>
              <ol className="list-decimal pl-5 space-y-3 text-zinc-400 text-sm leading-relaxed">
                <li>
                  <span className="text-zinc-200 font-medium">
                    Is car wrapping legal in Kenya?
                  </span>{" "}
                  Yes, car wrapping is legal, but you must comply with
                  regulations set by the{" "}
                  <a
                    href={NTSA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={blogLinkClass}
                  >
                    National Transport and Safety Authority (NTSA)
                  </a>
                  .
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Can I wash a wrapped car?
                  </span>{" "}
                  Yes. Hand washing is recommended, as high-pressure washing can
                  damage the wrap.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Is it cheaper to paint or wrap a car in Kenya?
                  </span>{" "}
                  <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                    Wrapping
                  </Link>{" "}
                  is generally more affordable than painting, especially for
                  temporary or customizable designs.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    How long does a car wrap last?
                  </span>{" "}
                  A high-quality{" "}
                  <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                    car wrap
                  </Link>{" "}
                  lasts between 5-7 years with proper care.
                </li>
              </ol>
            </div>
          </div>
        ) : is360CameraKenyaPost ? (
          <div className="space-y-8">
            <p className="text-zinc-300 text-base leading-relaxed">
              Driving in busy Kenyan towns and cities like Nairobi can be
              stressful, especially when parking in tight spaces or navigating
              crowded roads. One small mistake while reversing or turning can
              lead to scratches, dents or costly repairs. Protection options like{" "}
              <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                car wraps
              </Link>{" "}
              and{" "}
              <Link href={HOME_PPF} className={blogLinkClass}>
                PPF
              </Link>{" "}
              can help guard your paintwork.
            </p>
            <p className="text-zinc-300 text-base leading-relaxed">
              This is where a 360-degree car camera system comes in. It is
              designed to give drivers a complete view of their surroundings,
              making driving and parking much safer and easier.
            </p>
            <p className="text-zinc-300 text-base leading-relaxed">
              But is it really worth it in Kenya? Let&apos;s break it down.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                What Is a 360° Car Camera?
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                A 360-degree car camera system, also known as a bird&apos;s-eye
                view camera system, is a setup that gives a full panoramic view
                around your car. It uses four cameras placed around the vehicle
                to create a real-time overhead view, helping drivers see
                everything happening around them.This makes parking, reversing,
                and maneuvering in tight spaces much easier and safer.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                How Does a 360° Car Camera Work?
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                The system combines images from four different cameras to create
                one complete surround view on your dashboard screen.
              </p>
              <ol className="list-decimal pl-5 space-y-3 text-zinc-400 text-sm leading-relaxed">
                <li>
                  <span className="text-zinc-200 font-medium">
                    Front camera:
                  </span>{" "}
                  Installed on the front bumper or grille, it shows what is
                  directly in front of the car.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Rear camera:
                  </span>{" "}
                  Mounted near the number plate or trunk, it helps when
                  reversing and parking.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Left side camera:
                  </span>{" "}
                  Installed under the left side mirror, it helps detect blind
                  spots and nearby obstacles when turning or changing lanes.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Right side camera:
                  </span>{" "}
                  Placed under the right side mirror, it performs the same
                  function as the left camera for full side visibility.
                </li>
              </ol>
              <p className="text-zinc-400 text-sm leading-relaxed mt-4">
                <span className="text-zinc-200 font-medium">
                  How the system works together:
                </span>{" "}
                All four cameras send live footage to a control unit, which
                stitches the images into a single 360° top-down view of the
                vehicle.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Benefits of a 360° Car Camera in Kenya
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                The benefits of using a 360 degree for your car include:
              </p>
              <ol className="list-decimal pl-5 space-y-3 text-zinc-400 text-sm leading-relaxed">
                <li>
                  <span className="text-zinc-200 font-medium">
                    Easier and safer parking:
                  </span>{" "}
                  Parking in tight spaces like malls, estates and city centres
                  becomes much easier. You can clearly see obstacles and avoid
                  scratching your car — pair visibility with{" "}
                  <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                    car wraps
                  </Link>{" "}
                  or{" "}
                  <Link href={HOME_PPF} className={blogLinkClass}>
                    PPF
                  </Link>{" "}
                  for added paint protection.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Better visibility of blind spots:
                  </span>{" "}
                  Blind spots are one of the main causes of minor accidents. A
                  360° camera helps you detect vehicles, pedestrians, and
                  objects you might not normally see.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Increased confidence for new drivers:
                  </span>{" "}
                  New or inexperienced drivers can drive more confidently,
                  especially in heavy traffic or narrow streets.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Reduced risk of accidents:
                  </span>{" "}
                  By showing real-time surroundings, the system helps prevent
                  collisions when reversing, changing lanes, or driving in busy
                  traffic.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Improved driving in low visibility:
                  </span>{" "}
                  At night, in fog, or during heavy rain, visibility is reduced.
                  A 360° camera improves awareness and helps reduce risk in such
                  conditions.
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Downsides of a 360° Car Camera
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                Even though the system is very helpful, there are a few
                limitations:
              </p>
              <ol className="list-decimal pl-5 space-y-3 text-zinc-400 text-sm leading-relaxed">
                <li>
                  <span className="text-zinc-200 font-medium">
                    Possible distraction:
                  </span>{" "}
                  Some drivers may focus too much on the screen instead of the
                  road, which can be risky if not used correctly.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Requires maintenance:
                  </span>{" "}
                  The cameras can collect dust, mud or water spots, which
                  affects visibility. Regular cleaning is necessary.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Over-reliance on technology:
                  </span>{" "}
                  Drivers may become too dependent on the system and reduce their
                  natural driving and reversing skills over time.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Installation cost:
                  </span>{" "}
                  High-quality systems can be expensive, especially when you
                  include professional installation and calibration.
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                How Much Does a 360° Car Camera Cost in Kenya?
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                Prices vary depending on quality, features, and installation.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400 text-sm leading-relaxed">
                <li>Basic systems: KES 25,000 - 40,000</li>
                <li>Mid-range systems: KES 40,000 - 70,000</li>
                <li>High-end systems: Above KES 70,000</li>
              </ul>
              <p className="text-zinc-400 text-sm leading-relaxed mt-4">
                Higher-priced systems usually offer better image quality, night
                vision, durability, and smoother integration with your car.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Where to Install a 360° Car Camera in Kenya
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                Proper installation is very important for the system to work
                correctly. Poor installation can lead to blind spots, poor image
                stitching, or system failure.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                For the best results, it is recommended to have your system
                installed by professionals who understand proper calibration and
                wiring.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                At JN Parts and Accessories, you can get professional installation
                services that ensure:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400 text-sm leading-relaxed">
                <li>Correct camera positioning for full coverage</li>
                <li>Clean and safe wiring installation</li>
                <li>Accurate system calibration for a smooth 360° view</li>
              </ul>
              <p className="text-zinc-400 text-sm leading-relaxed mt-4">
                This ensures your system works efficiently and lasts longer.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Frequently Asked Questions (FAQs)
              </h2>
              <ol className="list-decimal pl-5 space-y-3 text-zinc-400 text-sm leading-relaxed">
                <li>
                  <span className="text-zinc-200 font-medium">
                    Is a 360° car camera worth it in Kenya?
                  </span>{" "}
                  Yes. It is especially useful in busy towns, tight parking
                  areas, and heavy traffic. It helps reduce scratches,
                  accidents, and parking stress —{" "}
                  <Link href={HOME_PPF} className={blogLinkClass}>
                    PPF
                  </Link>{" "}
                  and{" "}
                  <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                    car wraps
                  </Link>{" "}
                  add extra protection for your paint.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    Can it be installed in any car?
                  </span>{" "}
                  Most cars can support a 360° camera system. A professional
                  installer can advise on compatibility for your specific vehicle.
                </li>
                <li>
                  <span className="text-zinc-200 font-medium">
                    How long does installation take?
                  </span>{" "}
                  Installation usually takes 2 to 4 hours, depending on the
                  vehicle and system complexity.
                </li>
              </ol>
            </div>
          </div>
        ) : (
          <>
            {/* Intro */}
            <p className="text-zinc-300 text-base leading-relaxed mb-10">
              {post.body.intro}
            </p>

            {/* Body Sections */}
            <div className="space-y-8">
              {post.body.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {section.heading}
                  </h2>
                  <h3 className="text-base font-medium text-orange-400 mb-3">
                    {section.subheading}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Conclusion */}
        <div className="mt-12 p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
          <h2 className="text-lg font-semibold text-white mb-3">
            Conclusion
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {isCarWrapKenyaPost ? (
              <>
                Car wrapping in Kenya is a smart and flexible way to upgrade your
                vehicle&apos;s appearance without committing to permanent paint
                changes. While prices vary depending on several factors, investing
                in quality materials and skilled installation will save you money
                over time. If you&apos;re planning to wrap your car, start by
                choosing a trusted provider and high-quality vinyl. Explore our{" "}
                <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                  car wraps
                </Link>{" "}
                and{" "}
                <Link href={HOME_PPF} className={blogLinkClass}>
                  PPF
                </Link>{" "}
                to complement your upgrade and enhance your overall driving
                experience.
              </>
            )
              : is360CameraKenyaPost ? (
                <>
                  Driving in Kenya doesn&apos;t have to be stressful or risky. A
                  360-degree car camera system significantly improves visibility,
                  safety, and confidence on the road. While it may require some
                  investment, the benefits in terms of accident prevention and
                  convenience make it a worthwhile upgrade for many drivers. To
                  protect your paint from everyday damage, explore our{" "}
                  <Link href={HOME_CAR_WRAPS} className={blogLinkClass}>
                    car wraps
                  </Link>{" "}
                  and{" "}
                  <Link href={HOME_PPF} className={blogLinkClass}>
                    PPF
                  </Link>
                  . Upgrading your car with a 360° camera is not just about
                  convenience—it&apos;s about safer and smarter driving.
                </>
              ) : (
                post.conclusion
              )}
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