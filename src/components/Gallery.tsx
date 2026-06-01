import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight, Filter, Eye } from "lucide-react";
import { GALLERY_ITEMS } from "../data";
import { GalleryItem } from "../types";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // Filter Categories
  const categories = ["ALL", "DEVELOPMENT", "AERODYNAMICS", "PROPULSION", "MATERIALS", "TESTING", "TELEMETRY"];

  // Filtered items based on choice
  const filteredItems = selectedCategory === "ALL"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category.toUpperCase() === selectedCategory);

  // Lightbox navigation helpers
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex === null) return;
    const nextIdx = activeItemIndex === 0 ? filteredItems.length - 1 : activeItemIndex - 1;
    setActiveItemIndex(nextIdx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex === null) return;
    const nextIdx = activeItemIndex === filteredItems.length - 1 ? 0 : activeItemIndex + 1;
    setActiveItemIndex(nextIdx);
  };

  const activeItem = activeItemIndex !== null ? filteredItems[activeItemIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-brand-dark text-zinc-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono text-brand-orange uppercase tracking-widest font-black">
              MEDIA JOURNAL & CHRONICLES // 05
            </span>
            <h3 className="text-4xl md:text-5xl font-sans font-black tracking-tighter text-zinc-100 uppercase mt-2 italic">
              ENGINEERED MEDIA
            </h3>
            <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold mt-3 max-w-lg">
              Check out raw high-fidelity captures inside our wind tunnels, material autoclaves, and closed-circuit testing tracks.
            </p>
          </div>
        </div>

        {/* Dynamic Categorization Selector with sharp corners */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-zinc-900 font-mono">
          <div className="flex items-center gap-2 text-[10px] text-zinc-500 pr-4 mr-2 border-r border-zinc-900 font-bold tracking-widest">
            <Filter className="w-3.5 h-3.5" />
            <span>FILTER // CATEGORY:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded border transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-brand-orange border-brand-orange text-white"
                  : "bg-transparent border-zinc-900 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Media Display with sharp square corners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              // Find index in global scope to hook lightbox perfectly
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActiveItemIndex(idx)}
                  className="group relative h-72 rounded overflow-hidden bg-zinc-900 border border-zinc-900 cursor-pointer shadow-lg hover:border-brand-orange"
                  id={`gallery-item-${item.id}`}
                >
                  {/* Real Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />

                  {/* Aesthetic Shadow Cover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/25 to-transparent opacity-85" />

                  {/* Quick Action Zoom icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded bg-zinc-900/80 border border-zinc-700/60 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 text-zinc-200 hover:bg-zinc-850 hover:text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Overlaid Data content */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 pointer-events-none font-sans">
                    <span className="text-[9px] font-mono text-brand-orange uppercase tracking-widest font-black bg-brand-orange/5 border border-brand-orange/20 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h4 className="text-xl font-black text-zinc-100 uppercase tracking-tight mt-2.5">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-zinc-400 font-mono mt-1 group-hover:text-zinc-300 transition-colors">
                      {item.meta}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* LIGHTBOX MODAL OVERLAY */}
      <AnimatePresence>
        {activeItem && activeItemIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItemIndex(null)}
            className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
            id="gallery-lightbox-modal"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-zinc-950 rounded overflow-hidden border border-zinc-900 flex flex-col md:flex-row shadow-2xl"
            >
              {/* Image side */}
              <div className="relative md:w-3/5 h-[320px] md:h-[480px] bg-black">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Left navigation arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded bg-zinc-950/80 border border-zinc-900 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900 transition-colors flex items-center justify-center"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right navigation arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded bg-zinc-950/80 border border-zinc-900 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900 transition-colors flex items-center justify-center"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Information Side */}
              <div className="p-8 md:w-2/5 flex flex-col justify-between bg-zinc-950 font-sans">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono text-brand-orange bg-brand-orange/5 border border-brand-orange/25 px-2.5 py-1 rounded font-bold tracking-widest uppercase">
                      {activeItem.category.toUpperCase()}
                    </span>
                    <button
                      onClick={() => setActiveItemIndex(null)}
                      className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded transition-all"
                      aria-label="Close modal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-snug">
                    {activeItem.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
                    This step visualizes critical structural stress testing or design formulation in progress. Our engineering suite guarantees structural stability under simulated high velocity pressure loads.
                  </p>

                  <div className="h-px bg-zinc-900 my-6" />

                  {/* High tech metadata bullet points */}
                  <div className="space-y-4 font-mono text-[10px] text-zinc-400">
                    <div>
                      <span className="text-zinc-500 block uppercase mb-1 font-bold">METADATA CAPTURE</span>
                      <span className="text-zinc-300 font-bold">{activeItem.meta}</span>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <span className="text-zinc-500 block uppercase font-bold">RESOLUTION</span>
                        <span className="text-zinc-300 font-bold">4310 x 2840 RAW</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block uppercase font-bold">FORMAT</span>
                        <span className="text-zinc-300 font-bold">EXR COMPRESS</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 font-mono text-[9px] text-zinc-600 font-bold tracking-widest">
                  REF NO: LAB_SEC_G-{activeItem.id} // STABLE PRINTED
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
