import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Products from "./components/Products";
import Process from "./components/Process";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Benefits from "./components/Benefits";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollProgressBeam from "./components/ScrollProgressBeam";
import Blog from "./components/Blog";

// ============================================
// COMMENTED OUT: Backend fetch for products
// ============================================
/*
async function fetchProducts() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  try {
    const res = await fetch(`${base}/api/products`, {
      cache: "no-store", // always fetch fresh data
    });

    if (!res.ok) {
      console.error("Failed to fetch products");
      return [];
    }

    return await res.json();
  } catch (e) {
    console.error("Network error fetching products:", e);
    return [];
  }
}
*/
// ============================================

// CHANGED: Removed async since we're no longer fetching data
export default function HomePage() {
  // COMMENTED OUT: Was fetching products from backend
  // const products = await fetchProducts();
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: "JN Parts & Accessories",
    url: "https://jncaraccessories.com",
    email: "jncarparts301@gmail.com",
    telephone: "+254741509156",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kirinyaga Road",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-17:00"],
    areaServed: "Kenya",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Header />
      <ScrollProgressBeam />
      <main className="pt-20">
        <Hero />
        <Services />
        <About />

        {/* CHANGED: Products now uses internal mock data, no props needed */}
        <Products />

        <Process />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <Benefits />
        <Blog />
        <Contact />
        
      </main>

      <Footer />
     
      <WhatsAppButton />
    </>
  );
}
