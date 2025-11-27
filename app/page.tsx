"use client";

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

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <Services />
        <About />
        <Products />
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
