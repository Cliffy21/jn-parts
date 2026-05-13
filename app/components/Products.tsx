"use client";

import { useState, useEffect, useId } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

interface ProductFeature {
  title: string;
  description: string;
}

interface Product {
  id: string;
  name: string;
  category?: string;
  description?: string;
  price?: number;
  image_url?: string;
  installation_cost?: number;
  features?: ProductFeature[];
  cta?: string;
}

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export const categoryLabels: Record<string, string> = {
  engine: "Engine",
  exterior: "Exterior",
  interior: "Interior",
  electronics: "Electronics",
};

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Chameleon Window Tint",
    category: "exterior",
    description:
      "Driving under the Kenyan sun can turn your car into a furnace. Our chameleon window tint doesn't just enhance your car's look — it delivers powerful heat rejection, UV protection, and glare reduction, creating a cooler, more private driving experience in Nairobi and beyond.",
    price: 13000,
    image_url:
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770744115/chamelion_tints-13k_windscreen_ng0nwi.jpg",
    features: [
      { title: "Dynamic Color-Shift Finish", description: "Premium chameleon car tint with an iridescent look" },
      { title: "Advanced Heat Rejection", description: "Blocks infrared rays for cooler car interiors" },
      { title: "99% UV Protection", description: "Prevents dashboard fading and leather cracking" },
      { title: "Anti-Glare Technology", description: "Improves visibility during sunrise and sunset driving" },
      { title: "Maximum Privacy", description: "High-performance privacy window tint for cars" },
    ],
    cta: "Upgrade your car window tint in Kenya today for style, comfort, and protection.",
  },
  {
    id: "8",
    name: "Wraps + Material",
    category: "exterior",
    description:
      "Transform your car without repainting. Our premium car wrap vinyl gives you full creative control with a durable, paint-like finish perfect for DIY enthusiasts and professional installers in Kenya.",
    price: 50000,
    installation_cost: 90000,
    image_url:
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770744114/Wraps-material-50k_gyrmk5.jpg",
    features: [
      { title: "Air-Release Technology", description: "Bubble-free vinyl wrap installation" },
      { title: "High-Stretch Conformability", description: "Ideal for curves, bumpers, and edges" },
      { title: "Paint-Safe Adhesive", description: "Protects factory paint and allows clean removal" },
      { title: "Weather-Shield Coating", description: "Resists UV, rain, and dirt buildup" },
      { title: "Multiple Finishes", description: "Matte, gloss, satin, and metallic car wraps" },
    ],
    cta: "Start your car wrapping project in Nairobi with professional-grade vinyl.",
  },
  {
    id: "10",
    name: "Car Wraps",
    category: "exterior",
    description:
      "Upgrade your vehicle with our high-performance car wrap product — engineered to deliver a sleek, paint-like finish while protecting your original paintwork. Designed for durability and visual impact, it's the perfect solution for both personal styling and business branding in Kenya.",
    price: 45000,
    installation_cost: 20000,
    image_url:
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770748058/chameleon_v9o7gd.jpg",
    features: [
      { title: "Advanced Edge Technology", description: "Ensures smooth, seamless edges for a factory-quality look" },
      { title: "Flexible Coverage Options", description: "Available for full wraps or selected areas like roofs, mirrors, and bonnets" },
      { title: "Protective Film Layer", description: "Helps prevent scratches, fading, and minor abrasions" },
      { title: "Custom Design Compatibility", description: "Supports unique colors, textures, and branded graphics" },
      { title: "Safe Removal System", description: "Leaves no residue, keeping your original paint intact" },
    ],
    cta: "Get your premium car wrap product in Nairobi today and redefine your vehicle's style with confidence.",
  },
  {
    id: "2",
    name: "D-Series HID Bulbs",
    category: "exterior",
    description:
      "Upgrade your night driving with powerful HID headlight bulbs designed for maximum clarity and safety on Kenyan roads.",
    price: 5000,
    image_url:
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770744115/Dseries_bulbs-5k_u0egzk.jpg",
    features: [
      { title: "6000K Diamond White Light", description: "Modern bright white headlights" },
      { title: "Anti-UV Quartz Glass", description: "Prevents headlight fogging" },
      { title: "OEM Precision Beam", description: "Safe alignment without glare" },
      { title: "Long Lifespan", description: "3000+ hours durability" },
    ],
    cta: "Upgrade to D-Series HID bulbs in Kenya for brighter, safer night driving.",
  },
  {
    id: "3",
    name: "Engine Service Parts",
    category: "engine",
    description:
      "Keep your engine performing at its best with high-quality car service parts in Kenya designed for durability and efficiency.",
    price: 15000,
    image_url:
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770745107/Service_parts-15k_p9pydu.jpg",
    features: [
      { title: "OEM-Spec Fitment", description: "Perfect compatibility with your vehicle" },
      { title: "High-Efficiency Filters", description: "Protect engine from contaminants" },
      { title: "Heat-Resistant Materials", description: "Long-lasting performance under high temperatures" },
      { title: "Improved Fuel Efficiency", description: "Optimized engine operation" },
    ],
    cta: "Shop reliable auto parts in Nairobi and keep your engine running smoothly.",
  },
  {
    id: "4",
    name: "Headlight Projectors",
    category: "exterior",
    description:
      "Experience sharper visibility with projector headlights that focus light exactly where you need it for safer night driving.",
    price: 20000,
    image_url:
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770744120/projectors_bdh94o.jpg",
    features: [
      { title: "Sharp Cut-Off Line", description: "Prevents blinding other drivers" },
      { title: "Clear Glass Optics", description: "Maximum brightness output" },
      { title: "Bi-Xenon Function", description: "Dual low/high beam performance" },
      { title: "Universal Fit", description: "Compatible with most vehicles" },
    ],
    cta: "Upgrade to projector headlights at JN Car Accessories for superior visibility.",
  },
  {
    id: "5",
    name: "Car Emblems / Logos",
    category: "exterior",
    description:
      "Restore your vehicle's original look with high-quality car badges and emblems designed for a perfect fit and long-lasting shine.",
    price: 5000,
    image_url:
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770744114/car_logos-5000_znc3cz.jpg",
    features: [
      { title: "Durable Chrome Finish", description: "Resistant to fading and peeling" },
      { title: "Vehicle-Specific Design", description: "Perfect alignment for your make and model" },
      { title: "Strong Adhesive Backing", description: "Secure, long-lasting installation" },
      { title: "Instant Visual Upgrade", description: "Enhances exterior appearance immediately" },
    ],
    cta: "Replace your car logo and refresh your vehicle's look.",
  },
  {
    id: "6",
    name: "Colored PPF",
    category: "exterior",
    description:
      "Combine style and protection with colored PPF, offering the beauty of a wrap and the durability of protective film.",
    price: 80000,
    installation_cost: 200000,
    image_url:
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770744119/wraps_gf5tmc.jpg",
    features: [
      { title: "Self-Healing Technology", description: "Removes scratches with heat" },
      { title: "Impact Resistance", description: "Protects against stone chips" },
      { title: "High-Gloss Finish", description: "Deep, premium look" },
      { title: "Hydrophobic Coating", description: "Easy cleaning and maintenance" },
      { title: "Stain Resistance", description: "Protection from environmental contaminants" },
    ],
    cta: "Install colored PPF in Nairobi for ultimate style and protection.",
  },
  {
    id: "7",
    name: "Paint Protection Films",
    category: "exterior",
    description:
      "Protect your car's original paint with clear PPF — an invisible shield against scratches, chips, and environmental damage.",
    price: 60000,
    installation_cost: 180000,
    image_url:
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770745732/WhatsApp_Image_2026-02-10_at_17.22.17_l0yidr.jpg",
    features: [
      { title: "Invisible Finish", description: "Maintains your factory look" },
      { title: "Stone Chip Protection", description: "Prevents road damage" },
      { title: "UV Resistant", description: "Non-yellowing clarity over time" },
      { title: "Self-Healing Surface", description: "Fixes minor scratches automatically" },
      { title: "Boosts Resale Value", description: "Keeps paint in top condition" },
    ],
    cta: "Protect your car with clear PPF installation in Kenya today.",
  },
  {
    id: "9",
    name: "Car Bulbs",
    category: "exterior",
    description:
      "Restore your visibility with high-output car bulbs designed for reliability and improved night driving.",
    price: 6000,
    image_url:
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770744114/bulbs-6k_p5buev.jpg",
    features: [
      { title: "Bright Light Output", description: "Enhanced road visibility" },
      { title: "Durable Filament", description: "Vibration-resistant for long life" },
      { title: "Plug-and-Play Installation", description: "Easy drop-in replacement" },
      { title: "Error-Free Performance", description: "No dashboard warnings" },
    ],
    cta: "Buy car bulbs at JN Car Accessories for safer, clearer driving.",
  },
  {
    id: "11",
    name: "360° Camera System",
    category: "electronics",
    description:
      "Park with confidence using a 360-degree car camera system that gives you a full bird's-eye view of your surroundings.",
    price: 25000,
    image_url:
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1767652210/laser_jets_g3ug1t.jpg",
    features: [
      { title: "Full Surround View", description: "Eliminates blind spots entirely" },
      { title: "HD Night Vision", description: "Clear image in low light conditions" },
      { title: "Smart Activation", description: "Auto-on with reverse gear" },
      { title: "Universal Compatibility", description: "Works with most car models" },
    ],
    cta: "Install a 360° camera system and park stress-free.",
  },
  {
    id: "12",
    name: "ECU Performance Tune",
    category: "electronics",
    description:
      "Unlock hidden power with professional ECU tuning in Kenya, improving throttle response, torque, and efficiency.",
    price: 45000,
    image_url:
      "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&q=80",
    features: [
      { title: "Faster Throttle Response", description: "Immediate acceleration improvement" },
      { title: "Increased Horsepower", description: "More power across the RPM range" },
      { title: "Better Fuel Efficiency", description: "Optimized fuel mapping" },
      { title: "Safe Tuning", description: "Performed within engine limits" },
      { title: "Reversible Software", description: "Return to stock settings anytime" },
    ],
    cta: "Get your ECU remap and transform your driving experience.",
  },
];

export default function Products() {
  const [allProducts] = useState<Product[]>(mockProducts);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const id = useId();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    const section = document.getElementById("products");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProduct(null);
    };
    document.body.style.overflow = activeProduct ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [activeProduct]);

  const dynamicCategories = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean))
  ) as string[];

  const filters = [
    { id: "all", label: "All", count: allProducts.length },
    ...dynamicCategories.map((c) => ({
      id: c,
      label: categoryLabels[c] || c.charAt(0).toUpperCase() + c.slice(1),
      count: allProducts.filter((p) => p.category === c).length,
    })),
  ];

  const visibleProducts =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="products"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 bg-black overflow-x-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className={`text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight px-2">
            Our{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-md mx-auto px-4">
            Premium vehicle parts and accessories
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`mb-6 sm:mb-8 md:mb-10 lg:mb-12 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:justify-center gap-2 sm:gap-2.5 md:gap-3 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0 snap-x snap-mandatory">
            {filters.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full text-[11px] xs:text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap min-h-[36px] sm:min-h-[40px] flex items-center justify-center snap-start ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20"
                    : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
                <span className={`ml-1.5 sm:ml-2 text-[9px] xs:text-[10px] sm:text-xs px-1.5 py-0.5 rounded-md ${activeCategory === cat.id ? "bg-white/20" : "bg-gray-800"}`}>
                  {cat.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {activeProduct && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveProduct(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
              />

              {/* Close button */}
              <motion.button
                key={`close-${activeProduct.id}-${id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
                className="fixed top-4 right-4 z-[110] flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full h-10 w-10 cursor-pointer"
                onClick={() => setActiveProduct(null)}
              >
                <CloseIcon />
              </motion.button>

              {/* Card wrapper */}
              <div className="fixed inset-0 grid place-items-center z-[100] p-4 pointer-events-none">
                <motion.div
                  layoutId={`card-${activeProduct.id}-${id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-[640px] max-h-[90dvh] flex flex-col bg-gray-900 border border-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-auto cursor-default"
                >
                  {/* Image */}
                  <motion.div layoutId={`image-${activeProduct.id}-${id}`} className="relative h-52 sm:h-64 lg:h-72 flex-shrink-0">
                    {activeProduct.image_url ? (
                      <Image
                        src={activeProduct.image_url}
                        alt={activeProduct.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 640px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <div className="w-24 h-24 rounded-2xl bg-red-500/10 flex items-center justify-center">
                          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      </div>
                    )}
                    {/* Gradient overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  </motion.div>

                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto overscroll-contain">
                    {/* Title + price + actions */}
                    <div className="flex justify-between items-start p-5 sm:p-6 pb-4">
                      <div className="flex-1 min-w-0 pr-4">
                        <motion.h3
                          layoutId={`title-${activeProduct.id}-${id}`}
                          className="text-xl sm:text-2xl font-bold text-white mb-2"
                        >
                          {activeProduct.name}
                        </motion.h3>
                        {activeProduct.category && (
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full mb-3">
                            {categoryLabels[activeProduct.category] || activeProduct.category}
                          </span>
                        )}
                        <div className="flex flex-col gap-0.5">
                          {activeProduct.price && (
                            <motion.p
                              layoutId={`price-${activeProduct.id}-${id}`}
                              className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
                            >
                              KES {activeProduct.price.toLocaleString()}
                            </motion.p>
                          )}
                          {activeProduct.installation_cost && (
                            <p className="text-sm text-gray-400">
                              Installation: KES {activeProduct.installation_cost.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <motion.button
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={scrollToContact}
                        className="px-5 py-2.5 text-sm rounded-full font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg hover:shadow-red-500/25 transition-all flex-shrink-0"
                      >
                        Inquire
                      </motion.button>
                    </div>

                    {/* Description */}
                    <div className="px-5 sm:px-6">
                      <motion.p
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-gray-300 text-sm sm:text-base leading-relaxed"
                      >
                        {activeProduct.description || "No description available."}
                      </motion.p>
                    </div>

                    {/* Features */}
                    {activeProduct.features && activeProduct.features.length > 0 && (
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="px-5 sm:px-6 mt-5"
                      >
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                          Features &amp; Benefits
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {activeProduct.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 bg-gray-800/60 rounded-xl p-3 border border-gray-700/50"
                            >
                              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <div>
                                <p className="text-white text-xs sm:text-sm font-semibold leading-tight">{feature.title}</p>
                                <p className="text-gray-400 text-xs leading-snug mt-0.5">{feature.description}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {/* CTA banner */}
                    {activeProduct.cta && (
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mx-5 sm:mx-6 mt-5 mb-5 sm:mb-6 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20"
                      >
                        <p className="text-sm text-gray-300 leading-relaxed">
                          <span className="text-red-400 font-semibold">💡 </span>
                          {activeProduct.cta}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
              {visibleProducts.map((product, idx) => (
                <motion.div
                  layoutId={`card-${product.id}-${id}`}
                  key={product.id}
                  onClick={() => setActiveProduct(product)}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-800/50 overflow-hidden hover:border-red-500/30 transition-all duration-500 w-full cursor-pointer"
                >
                  {/* Image */}
                  <motion.div layoutId={`image-${product.id}-${id}`} className="relative aspect-square bg-gray-800 overflow-hidden">
                    {product.image_url ? (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full h-full"
                      >
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </motion.div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-red-500/10 flex items-center justify-center">
                          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {product.category && (
                      <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 md:top-3 md:left-3 z-10">
                        <span className="px-1.5 py-0.5 sm:px-2 md:px-2.5 sm:py-0.5 md:py-1 text-[9px] xs:text-[10px] sm:text-xs font-medium bg-black/80 backdrop-blur-sm rounded-full text-gray-300 border border-white/10">
                          {categoryLabels[product.category] || product.category}
                        </span>
                      </div>
                    )}

                    {/* Feature count badge */}
                    {product.features && product.features.length > 0 && (
                      <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium bg-red-500/80 backdrop-blur-sm rounded-full text-white">
                          {product.features.length} features
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="p-2 sm:p-3 md:p-4">
                    <motion.h3 layoutId={`title-${product.id}-${id}`} className="text-xs xs:text-sm sm:text-base font-semibold text-white mb-1 line-clamp-1 leading-tight">
                      {product.name}
                    </motion.h3>
                    <p className="hidden sm:block text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex flex-col gap-1">
                      {product.price ? (
                        <motion.p
                          layoutId={`price-${product.id}-${id}`}
                          className="text-sm xs:text-base sm:text-lg font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent truncate"
                        >
                          KES {product.price.toLocaleString()}
                        </motion.p>
                      ) : (
                        <p className="text-[10px] xs:text-xs sm:text-sm text-gray-400 truncate">Request price</p>
                      )}
                      {product.installation_cost && (
                        <p className="text-[10px] xs:text-xs sm:text-sm text-gray-400">
                          Installation: KES {product.installation_cost.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 sm:py-16 md:py-20 px-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">No products found</h3>
              <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-md mx-auto">
                {activeCategory === "all" ? "No products available yet." : "No products in this category."}
              </p>
              {activeCategory !== "all" && (
                <button
                  onClick={() => setActiveCategory("all")}
                  className="mt-4 sm:mt-5 md:mt-6 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gray-900 text-white text-xs sm:text-sm rounded-xl hover:bg-gray-800 transition-colors min-h-[40px] touch-manipulation"
                >
                  View All
                </button>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        {visibleProducts.length > 0 && (
          <div className={`text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center gap-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all min-h-[44px] touch-manipulation"
            >
              <span className="hidden sm:inline">Can&apos;t find what you need?</span>
              <span className="sm:hidden">Need something else?</span>
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .snap-x { scroll-snap-type: x mandatory; }
        .snap-start { scroll-snap-align: start; }
      `}</style>
    </section>
  );
}