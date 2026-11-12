"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
    _id: "6",
    title: "Papaya Orange Wraps",
    color: "orange",
    images: [
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770744114/Wraps-material-50k_gyrmk5.jpg",
     
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
    
    ],
    description: "Classic British racing green restoration",
  },
  {
    _id: "9",
    title: "Crimson Red Wraps",
    color: "red",
    images: [
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896766/crimson_noidke.png",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770884909/marroon_bmibz0.jpg",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896751/crimson-red_hojumz.png",
    ],
    description: "Deep crimson gloss red performance wrap",
  },

  {
    _id: "10",
    title: "Jet Black Gloss Wraps",
    color: "black",
    images: [
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770884908/TX_cru83k.jpg",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896734/Jet_black_xmkeo9.png",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896725/J-Black_h9lvzg.png",
    ],
    description: "High-gloss jet black luxury finish",
  },

  {
    _id: "11",
    title: "Royal Blue Wraps",
    color: "blue",
    images: [
      
     
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770884910/Blue_qemjkq.jpg",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896773/royal_blue_cqzgcg.png",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896781/royal_-_blue_c2ngf3.png",
    ],
    description: "Rich royal blue metallic wrap",
  },
  {
    _id: "19",
    title: "Obsidian Black Wraps",
    color: "black",
    images: [
      
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896781/obsidian_black2_xo65v8.png",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896777/obsidian_black_yulggw.png",
    ],
    description: "Deep obsidian black gloss performance wrap",
  },
  
  {
    _id: "20",
    title: "Carbon Black Satin Wraps",
    color: "black",
    images: [
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896743/carbon_black_satin_v8ozbf.png",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896723/carbon_black_gzkbbf.png",
     
    ],
    description: "Satin carbon black street finish",
  },
  
  {
    _id: "21",
    title: "Candy Apple Red Wraps",
    color: "red",
    images: [
      
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896750/candy_apple_red_rzzn5c.png",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896736/candy_apple_nrgqdg.png",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896753/inferno_vwthdg.png",
    ],
    description: "High-gloss candy apple red finish",
  },
  
  {
    _id: "22",
    title: "Inferno Red Sport Wraps",
    color: "red",
    images: [
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896773/inferno-red_iwogkf.png",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896753/inferno_vwthdg.png",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770896766/crimson_noidke.png",
    ],
    description: "Aggressive inferno red sport wrap",
  },

  {
    _id: "13",
    title: "Silver Metallic Wraps",
    color: "gray",
    images: [
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770884909/Greeeys_ijjmvk.jpg",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770884908/Grey_pbri1r.jpg",
     
      
    ],
    description: "High-gloss silver metallic performance wrap",
  },
  
  {
    _id: "17",
    title: "Nardo Gray Wraps",
    color: "gray",
    images: [
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770884909/Gray_gbgvrw.jpg",      
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770744118/nardo_gray-porche_grhm0w.jpg",
      "https://res.cloudinary.com/das3x6ips/image/upload/v1770746211/Nardogray_wtqwh4.jpg",
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765666783/gray_mazda_qf5li6.jpg",
    ],
    description: "Modern Nardo gray satin sport finish",
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050607]/95 backdrop-blur-md p-4 sm:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#15171B] border border-white/10 shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-[#FF1616] hover:border-[#FF1616] transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Main image */}
        <div className="relative w-full aspect-[16/10] bg-[#08090B]">
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
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/65 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/90 hover:text-white hover:bg-[#FF1616] hover:border-[#FF1616] transition-all"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/65 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/90 hover:text-white hover:bg-[#FF1616] hover:border-[#FF1616] transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Info + thumbnails */}
        <div className="p-6 sm:p-8 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2.5 h-2.5 rounded-full ${colorStyle.bg}`} />
              <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
                {item.color}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F7F8FD]">{item.title}</h3>
            <p className="text-[#A5A8AE] text-sm mt-2 leading-6">{item.description}</p>
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
                      ? "border-[#FF1616] opacity-100 shadow-lg shadow-red-950/30"
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
      className="group relative w-full overflow-hidden rounded-[1.15rem] border border-white/[0.09] bg-[#191918] text-left transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-[#20201f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e34e3b]"
    >
      {/* Image */}
      <div className="relative w-full aspect-[5/4] overflow-hidden bg-[#242423]">
        <Image
          src={mainImage}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

        {/* Image count badge */}
        {validImages.length > 1 && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#08090B]/75 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-wider text-white/90 font-semibold">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 15l5-5 4 4 4-4 5 5" />
            </svg>
            {validImages.length}
          </div>
        )}

        {/* Bottom overlay text — always readable */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`w-2 h-2 rounded-full ${colorStyle.bg}`} />
            <span className="text-[10px] font-semibold text-white/65 uppercase tracking-[0.18em]">
              {item.color}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#F7F8FD] leading-tight">
            {item.title}
          </h3>
          <p className="text-[#C0C2C7] text-xs sm:text-sm mt-2 line-clamp-1">
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
        className="relative overflow-hidden bg-[#10100f] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12 lg:py-32"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF1616]/60 to-transparent" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[min(900px,90vw)] -translate-x-1/2 rounded-full bg-[#FF1616]/[0.045] blur-[120px]" />

        <div className="relative mx-auto max-w-[1440px]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10 flex flex-col items-start gap-5 border-b border-white/10 pb-8 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:pb-10"
          >
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e34e3b]">JN Parts · Wrap studio</p>
              <h2 className="max-w-3xl text-left text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#f2f0eb] sm:text-6xl lg:text-7xl">
                Made to be <span className="font-serif font-normal italic text-[#e34e3b]">noticed.</span>
              </h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="max-w-xs text-left text-sm leading-6 text-[#aaa8a2] sm:ml-auto sm:mr-0 sm:text-right"
            >
              A closer look at the finishes, details and vehicle transformations completed by our team.
            </motion.p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mb-8 flex flex-wrap justify-start gap-2 sm:mb-10 sm:gap-2.5"
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
                    "bg-[#FF1616] text-white border border-[#FF1616] shadow-lg shadow-red-950/30";
                } else {
                  bgClass = "bg-[#FF1616] text-white border border-[#FF1616] shadow-lg shadow-red-950/30";
                }
              } else {
                bgClass =
                  "bg-[#15171B] text-[#A5A8AE] hover:bg-[#22252A] hover:text-white border border-white/[0.09]";
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
                  className={`group flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-all duration-300 ${bgClass}`}
                  aria-label={`Filter by ${filterOption.label} (${filterOption.count} items)`}
                >
                  {filterOption.color && (
                    <span
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 ${
                        colorStyle?.bg || "bg-gray-600"
                      } transition-colors duration-300`}
                    />
                  )}
                  <span className="capitalize">{filterOption.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold flex-shrink-0 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-black/20 text-white/45"
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
              <p className="text-[#A5A8AE]">No projects found for this colour.</p>
            </div>
          )}

          {/* View all CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-14 sm:mt-20 border-t border-white/[0.08] pt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A5A8AE]">
              <span>SELECT A PROJECT TO EXPLORE THE GALLERY</span>
              <svg
                className="w-4 h-4 text-[#FF1616]"
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
            </div>
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
