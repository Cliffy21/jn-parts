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
import BackToTop from "./components/BackToTop";
import WhatsAppButton from "./components/WhatsAppButton";

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

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <Services />
        <About />

        {/* 🔥 FIX: pass products here */}
        <Products initialProducts={products} />

        <Process />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <Benefits />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
