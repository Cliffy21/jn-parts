"use client";

// app/page.jsx
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
      // Don't cache, always get fresh in dev
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch products:", err);
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
        {/* pass products into Products component */}
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
