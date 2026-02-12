"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface PortfolioItem {
  _id: string;
  title: string;
  color: string;
  images: string[];
  description: string;
}

// Portfolio data organized by color
const portfolioData: PortfolioItem[] = [
  {
    _id: "1",
    title: "Matte Black Wraps",
    color: "black",
    images: [
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765322264/mazda_xehbwl.jpg",
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765666781/matte_balack_mazda_rze14w.jpg",
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765666800/matte_black_grku0w.jpg",
    ],
    description: "Full matte black wrap with gloss black accents",
  },
  {
    _id: "2",
    title: "Racing Red Wraps",
    color: "red",
    images: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80",
    ],
    description: "Gloss racing red with carbon fiber details",
  },
  {
    _id: "3",
    title: "Midnight Blue Wraps",
    color: "blue",
    images: [
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765666747/midnight_nn0hf6.jpg",
      "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=800&q=80",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770748057/midnight_blue_nitkvm.jpg",
    ],
    description: "Deep midnight blue metallic finish",
  },
  {
    _id: "4",
    title: "Pearl White Wraps",
    color: "white",
    images: [
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765322264/mazda2_gdtq4p.jpg",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770884912/white_qusazx.jpg",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    ],
    description: "Satin pearl white with chrome delete",
  },
  {
    _id: "5",
    title: "Nardo Gray Wraps",
    color: "gray",
    images: [
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770744118/nardo_gray-porche_grhm0w.jpg",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770746211/Nardogray_wtqwh4.jpg",
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765666783/gray_mazda_qf5li6.jpg",
    ],
    description: "Iconic Nardo gray with matte finish",
  },
  {
    _id: "6",
    title: "Papaya Orange Wraps",
    color: "orange",
    images: [
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770744114/Wraps-material-50k_gyrmk5.jpg",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&q=80",
      "https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800&q=80",
    ],
    description: "Papaya orange Ford Mustang GT with racing stripes",
  },
  {
    _id: "7",
    title: "Chameleon Green Wraps",
    color: "green",
    images: [
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770744115/chamelionwrap_d3wxka.jpg",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770744115/chamelion_tints-13k_windscreen_ng0nwi.jpg",
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=800&q=80",
    ],
    description: "Classic British racing green restoration",
  },
  {
    _id: "9",
    title: "Crimson Red Wraps",
    color: "red",
    images: [
      
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770884909/marroon_bmibz0.jpg",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80",
    ],
    description: "Deep crimson gloss red performance wrap",
  },

  {
    _id: "10",
    title: "Jet Black Gloss Wraps",
    color: "black",
    images: [
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770884908/TX_cru83k.jpg",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    ],
    description: "High-gloss jet black luxury finish",
  },

  {
    _id: "11",
    title: "Royal Blue Wraps",
    color: "blue",
    images: [
      
     
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770884910/Blue_qemjkq.jpg",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&q=80",
    ],
    description: "Rich royal blue metallic wrap",
  },
  {
    _id: "19",
    title: "Obsidian Black Wraps",
    color: "black",
    images: [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    ],
    description: "Deep obsidian black gloss performance wrap",
  },
  
  {
    _id: "20",
    title: "Carbon Black Satin Wraps",
    color: "black",
    images: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
      "https://images.unsplash.com/photo-1603386329225-868f9b1ee6b9?w=800&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    ],
    description: "Satin carbon black street finish",
  },
  
  {
    _id: "21",
    title: "Candy Apple Red Wraps",
    color: "red",
    images: [
      
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    ],
    description: "High-gloss candy apple red finish",
  },
  
  {
    _id: "22",
    title: "Inferno Red Sport Wraps",
    color: "red",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    ],
    description: "Aggressive inferno red sport wrap",
  },
  
  {
    _id: "23",
    title: "Electric Blue Wraps",
    color: "blue",
    images: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&q=80",
    ],
    description: "Bright electric blue metallic finish",
  },
  
  {
    _id: "24",
    title: "Deep Ocean Blue Wraps",
    color: "blue",
    images: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&q=80",
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&q=80",
    ],
    description: "Deep ocean blue gloss wrap",
  },
  
  {
    _id: "25",
    title: "Arctic White Wraps",
    color: "white",
    images: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
      "https://images.unsplash.com/photo-1549921296-3c3b4b7d8b55?w=800&q=80",
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=800&q=80",
    ],
    description: "Clean arctic white gloss finish",
  },
  
  {
    _id: "26",
    title: "Pearl White Luxe Wraps",
    color: "white",
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    ],
    description: "Premium pearl white luxury wrap",
  },
  
  {
    _id: "27",
    title: "Emerald Green Sport Wraps",
    color: "green",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
    ],
    description: "Gloss emerald green performance wrap",
  },
  
  {
    _id: "28",
    title: "Racing Green Classic Wraps",
    color: "green",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
    ],
    description: "Classic British racing green finish",
  },
  
  {
    _id: "29",
    title: "Sunburst Yellow Wraps",
    color: "yellow",
    images: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
    ],
    description: "Bright sunburst yellow high-impact wrap",
  },
  

  {
    _id: "12",
    title: "Gloss White Sport Wraps",
    color: "white",
    images: [
     
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=800&q=80",
    ],
    description: "Gloss white sport wrap with black accents",
  },

  {
    _id: "13",
    title: "Silver Metallic Wraps",
    color: "gray",
    images: [
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770884909/Greeeys_ijjmvk.jpg",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770884908/Grey_pbri1r.jpg",
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&q=80",
      
    ],
    description: "High-gloss silver metallic performance wrap",
  },
  
  {
    _id: "17",
    title: "Nardo Gray Wraps",
    color: "gray",
    images: [
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770884909/Gray_gbgvrw.jpg",      
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&q=80",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80",
    ],
    description: "Modern Nardo gray satin sport finish",
  },
  
  {
    _id: "18",
    title: "Gunmetal Gray Wraps",
    color: "gray",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      "https://images.unsplash.com/photo-1603386329225-868f9b1ee6b9?w=800&q=80",
      "https://images.unsplash.com/photo-1597007066704-67bf2068d5b2?w=800&q=80",
    ],
    description: "Aggressive gunmetal gray street wrap",
  },
  

  {
    _id: "14",
    title: "Burnt Orange Wraps",
    color: "orange",
    images: [
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&q=80",
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&q=80",
    ],
    description: "Burnt orange satin performance wrap",
  },

  {
    _id: "15",
    title: "Emerald Green Wraps",
    color: "green",
    images: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    ],
    description: "Emerald green gloss wrap with black trims",
  },

  {
    _id: "16",
    title: "Lime Yellow Wraps",
    color: "yellow",
    images: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80",
    ],
    description: "High-impact lime yellow street wrap",
  },

  {
    _id: "8",
    title: "Velocity Yellow Wraps",
    color: "yellow",
    images: [
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765666783/yellow_mazda_kqxayy.jpg",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    ],
    description: "Vibrant velocity yellow with racing stripes",
  },
];

const colorStyles: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  red: { bg: "bg-red-500", border: "border-red-500", text: "text-red-400", glow: "shadow-red-500/20" },
  blue: { bg: "bg-blue-500", border: "border-blue-500", text: "text-blue-400", glow: "shadow-blue-500/20" },
  green: { bg: "bg-emerald-500", border: "border-emerald-500", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
  gray: { bg: "bg-gray-400", border: "border-gray-400", text: "text-gray-400", glow: "shadow-gray-400/20" },
  black: { bg: "bg-neutral-500", border: "border-neutral-500", text: "text-neutral-400", glow: "shadow-neutral-500/20" },
  white: { bg: "bg-slate-200", border: "border-slate-200", text: "text-slate-300", glow: "shadow-slate-200/20" },
  orange: { bg: "bg-orange-500", border: "border-orange-500", text: "text-orange-400", glow: "shadow-orange-500/20" },
  yellow: { bg: "bg-yellow-400", border: "border-yellow-400", text: "text-yellow-400", glow: "shadow-yellow-400/20" },
};

const getColorStyle = (color: string) => {
  return colorStyles[color.toLowerCase()] || colorStyles.red;
};

/* ─────────────────────────────────────────────
   Image Gallery Lightbox — opened when a card
   is tapped/clicked
   ───────────────────────────────────────────── */
function ImageLightbox({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const validImages = item.images.filter((img) => img?.trim() !== "");
  const colorStyle = getColorStyle(item.color);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-neutral-950 border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Main image */}
        <div className="relative w-full aspect-[16/10] bg-neutral-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Image
                src={validImages[currentImage]?.trim()}
                alt={`${item.title} - View ${currentImage + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {validImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Info + thumbnails */}
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2.5 h-2.5 rounded-full ${colorStyle.bg}`} />
              <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
                {item.color}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">{item.title}</h3>
            <p className="text-white/50 text-sm mt-1">{item.description}</p>
          </div>

          {/* Thumbnail strip */}
          {validImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {validImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImage
                      ? `${colorStyle.border} opacity-100`
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={img.trim()}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Portfolio Card — fully visible on all screens
   ───────────────────────────────────────────── */
function PortfolioCard({
  item,
  index,
  onClick,
}: {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
}) {
  const validImages = item.images.filter((img) => img?.trim() !== "");
  const mainImage = validImages[0]?.trim() || "";
  const colorStyle = getColorStyle(item.color);

  if (!mainImage) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      }}
      onClick={onClick}
      className="group relative w-full text-left rounded-2xl overflow-hidden bg-neutral-950 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900">
        <Image
          src={mainImage}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Image count badge */}
        {validImages.length > 1 && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[11px] text-white/80 font-medium">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 15l5-5 4 4 4-4 5 5" />
            </svg>
            {validImages.length}
          </div>
        )}

        {/* Bottom overlay text — always readable */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`w-2 h-2 rounded-full ${colorStyle.bg}`} />
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-wider">
              {item.color}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
            {item.title}
          </h3>
          <p className="text-white/40 text-xs sm:text-sm mt-1 line-clamp-1">
            {item.description}
          </p>
        </div>
      </div>

      {/* Hover indicator */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-1 ring-inset ring-white/[0.08]" />
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   Main Portfolio Section
   ───────────────────────────────────────────── */
export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Group items by color
  const itemsByColor = portfolioData.reduce((acc, item) => {
    const color = item.color.toLowerCase().trim();
    if (!acc[color]) acc[color] = [];
    acc[color].push(item);
    return acc;
  }, {} as Record<string, PortfolioItem[]>);

  const availableColors = Object.keys(itemsByColor).filter(
    (color) => itemsByColor[color]?.length > 0
  );

  const colorOrder = ["black", "red", "blue", "white", "gray", "orange", "green", "yellow"];
  const orderedColors = colorOrder.filter((color) => availableColors.includes(color));

  const filters = [
    { id: "all", label: "All", count: portfolioData.length, color: null },
    ...orderedColors.map((color) => ({
      id: color,
      label: color.charAt(0).toUpperCase() + color.slice(1),
      count: itemsByColor[color].length,
      color: color,
    })),
  ];

  const filteredItems =
    filter === "all"
      ? portfolioData
      : portfolioData.filter(
          (item) => item.color.toLowerCase().trim() === filter.toLowerCase().trim()
        );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="portfolio"
        className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 bg-black overflow-hidden"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
              Recent{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Transformations
              </span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto"
            >
              Showcasing our premium wrap and customization projects
            </motion.p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-14"
          >
            {filters.map((filterOption, idx) => {
              const isActive = filter === filterOption.id;
              const colorStyle = filterOption.color
                ? getColorStyle(filterOption.color)
                : null;

              let bgClass = "";
              if (isActive) {
                if (filterOption.id === "all") {
                  bgClass =
                    "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20";
                } else {
                  bgClass = `${colorStyle?.bg || "bg-gray-600"} text-white shadow-lg ${colorStyle?.glow || ""}`;
                }
              } else {
                bgClass =
                  "bg-neutral-900 text-gray-400 hover:bg-neutral-800 hover:text-white border border-white/[0.06]";
              }

              return (
                <motion.button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + idx * 0.04 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${bgClass}`}
                  aria-label={`Filter by ${filterOption.label} (${filterOption.count} items)`}
                >
                  {filterOption.color && (
                    <span
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 ${
                        isActive ? "bg-white" : colorStyle?.bg || "bg-gray-600"
                      } transition-colors duration-300`}
                    />
                  )}
                  <span className="capitalize">{filterOption.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold flex-shrink-0 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-white/[0.04] text-gray-600"
                    }`}
                  >
                    {filterOption.count}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* ── Card Grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
            >
              {filteredItems
                .filter(
                  (item) =>
                    item.images.length > 0 && item.images[0]?.trim() !== ""
                )
                .map((item, index) => (
                  <PortfolioCard
                    key={item._id}
                    item={item}
                    index={index}
                    onClick={() => setSelectedItem(item)}
                  />
                ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.filter(
            (item) => item.images.length > 0 && item.images[0]?.trim() !== ""
          ).length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">No projects found for this color.</p>
            </div>
          )}

          {/* View all CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <button className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-400 transition-colors duration-300">
              <span>View all projects</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <ImageLightbox
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}