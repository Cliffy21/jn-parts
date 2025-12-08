"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame to avoid synchronous state update
    const timer = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div
            className={`text-center lg:text-left space-y-8 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
                <span className="text-xs font-semibold text-red-400 tracking-wider uppercase">
                  Premium Quality Since 2010
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
              <span className="block text-white mb-2">
                Transform
              </span>
              <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient">
                Your Ride
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Premium vehicle parts & accessories with expert installation. 
              Quality guaranteed for every transformation.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {[
                { icon: Shield, text: "Quality Guaranteed" },
                { icon: Zap, text: "Expert Installation" },
                { icon: Sparkles, text: "Premium Parts" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                  }}
                >
                  <feature.icon className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => scrollToSection("products")}
                className="group relative px-8 py-4 rounded-xl font-bold text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-orange-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center justify-center gap-2 text-white">
                  Browse Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="group px-8 py-4 rounded-xl font-bold text-base border-2 border-red-500/50 text-white hover:border-red-500 hover:bg-red-500/10 transition-all duration-300"
              >
                Get Free Quote
              </button>
            </div>
          </div>

          {/* Right Column - Image/Visual */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {/* Main Image Container */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/50 via-orange-500/50 to-red-500/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Image */}
              <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80"
                  alt="Premium automotive parts and accessories"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                <div className="flex-1 px-4 py-3 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10">
                  <div className="text-2xl font-bold text-white">1000+</div>
                  <div className="text-xs text-gray-400">Happy Customers</div>
                </div>
                <div className="flex-1 px-4 py-3 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10">
                  <div className="text-2xl font-bold text-white">15+</div>
                  <div className="text-xs text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-red-500/30 rounded-xl rotate-12 hidden lg:block" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 border-2 border-orange-500/30 rounded-xl -rotate-12 hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 delay-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-wider text-gray-500 uppercase">
            Scroll
          </span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center items-start p-1.5">
            <div className="w-1.5 h-3 bg-gradient-to-b from-red-500 to-orange-500 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
