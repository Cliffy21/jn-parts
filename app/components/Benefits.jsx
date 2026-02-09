"use client";

import Image from "next/image";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";
import { Shield, Target, Zap, Award, Settings, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
  { title: "Premium Materials", icon: Shield, desc: "3M & Avery Dennison vinyls." },
  { title: "Durability", icon: Target, desc: "5-7 year genuine guarantee." },
  { title: "Certified Team", icon: Award, desc: "Professional expert installers." },
  { title: "Value Shield", icon: Crown, desc: "Protect paint & resale value." },
  { title: "Infinite Styles", icon: Zap, desc: "Unlimited color & finishes." },
  { title: "Full Warranty", icon: Settings, desc: "Complete coverage on all work." },
];

export default function Benefits() {
  const titleRef = useInViewAnimation({ animation: "animate-fadeInLeft" });
  const contentRef = useInViewAnimation({ animation: "animate-fadeInUp" });

  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden min-h-screen flex items-center">
      {/* Background Red Glow (Top Left) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* --- LEFT COLUMN: CONTENT --- */}
          <div ref={titleRef} className="flex flex-col space-y-10 opacity-0">
            <div>
              
              <h2 className="text-5xl md:text-6xl font-black text-white leading-none">
                WHY CHOOSE <br />
                <span className="text-red-500">JN PARTS & ACCESSORIES?</span>
              </h2>
              <p className="text-gray-400 mt-6 text-lg max-w-lg leading-relaxed">
                We combine high-performance engineering with aesthetic excellence 
                to give your vehicle a world-class finish.
              </p>
            </div>

            {/* Benefit HUD Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-red-500/30 transition-all group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.title}</h4>
                    <p className="text-gray-500 text-[11px]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT COLUMN: THE HUD IMAGES --- */}
          <div ref={contentRef} className="relative flex flex-col gap-8 opacity-0">
            
            {/* Image Card 1 */}
            <div className="relative group">
              {/* Futuristic Red Corner Accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-red-500 rounded-tl-xl" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-red-500 rounded-br-xl" />
              
              <div className="relative h-[300px] w-full rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
                  alt="Red Mercedes HUD"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                   <span className="text-red-500 text-[10px] font-bold tracking-widest uppercase">Premium Finish</span>
                   <button className="mt-2 w-fit px-4 py-1.5 bg-red-600 text-white text-[10px] font-bold rounded-full">BOOK NOW</button>
                </div>
              </div>
            </div>

            {/* Image Card 2 (With Stat) */}
            <div className="relative group lg:translate-x-12">
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-red-500 rounded-tl-xl" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-red-500 rounded-br-xl" />
              
              <div className="relative h-[300px] w-full rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="https://res.cloudinary.com/dgumz7yur/image/upload/v1765666747/midnight_nn0hf6.jpg"
                  alt="Black Porsche HUD"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Floating Stat Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <Award className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">1,000+</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Projects Completed</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}