import React from "react";
import { motion } from "motion/react";
import { Cpu, Wind, ShieldCheck, ArrowRight, Lightbulb, Compass, Dumbbell } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface ProductsProps {
  onSelectProduct: (product: Product) => void;
  selectedProductId: string;
}

export default function Products({ onSelectProduct, selectedProductId }: ProductsProps) {
  return (
    <section id="products" className="py-24 bg-brand-dark border-t border-b border-zinc-900 text-zinc-100 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,78,0,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-brand-orange uppercase tracking-widest font-black">
              MODEL FLEET PRESETS // 02
            </span>
            <h3 className="text-4xl md:text-5xl font-sans font-black tracking-tighter text-zinc-100 uppercase mt-2 italic">
              ENGINEERED FLEET
            </h3>
            <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold max-w-lg mt-3">
              Explore our core aerodynamic prototype fleet. Each unit features custom materials formulation, reactor vectors, and high dynamic physics.
            </p>
          </div>

          <div className="flex gap-2">
            <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 py-1.5 px-3 rounded border border-zinc-900 font-bold tracking-widest">
              UNITS LOADED // 0{PRODUCTS.length}
            </span>
          </div>
        </div>

        {/* Product Cards Grid with sharp corners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((prod, idx) => {
            const isSelected = selectedProductId === prod.id;
            
            return (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative group bg-zinc-950 border p-6 transition-all duration-300 flex flex-col justify-between rounded ${
                  isSelected
                    ? "border-brand-orange shadow-lg shadow-brand-orange/5"
                    : "border-zinc-900 hover:border-zinc-800"
                }`}
                id={`product-card-${prod.id}`}
              >
                {/* Glowing status badges */}
                <div className="flex items-center justify-between pointer-events-none mb-4">
                  <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-900 text-zinc-400 py-1 px-2.5 rounded font-black tracking-wider uppercase">
                    {prod.category}
                  </span>
                  
                  {isSelected && (
                    <span className="text-[9px] font-mono text-brand-orange bg-brand-orange/10 border border-brand-orange/20 py-1 px-2.5 rounded flex items-center gap-1 font-black tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
                      BUILD PLATFORM ACTIVE
                    </span>
                  )}
                </div>

                {/* Luxury Car Image Thumbnail */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900 border border-zinc-900/60 mb-5 rounded-sm group-hover:border-brand-orange/30 transition-colors duration-300">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent pointer-events-none" />
                </div>

                {/* Info and Taglines */}
                <div>
                  <h4 className="text-2xl font-black text-zinc-100 uppercase tracking-tight group-hover:text-brand-orange transition-colors">
                    {prod.name}
                  </h4>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase font-black tracking-widest mt-1">
                    {prod.tagline}
                  </p>
                  <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                {/* High tech stats block */}
                <div className="grid grid-cols-2 gap-3.5 my-6 pt-5 border-t border-zinc-900 font-mono text-zinc-100">
                  <div>
                    <span className="text-[9px] text-zinc-500 block uppercase font-bold tracking-wider">VELOCITY LIMIT</span>
                    <span className="text-xs font-black">{prod.specs.speed}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 block uppercase font-bold tracking-wider">PROPULSION RANGE</span>
                    <span className="text-xs font-black">{prod.specs.range}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 block uppercase font-bold tracking-wider">REACTOR POWER</span>
                    <span className="text-xs font-black">{prod.specs.power}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 block uppercase font-bold tracking-wider">AERO EFFICIENCY</span>
                    <span className="text-xs font-black text-brand-orange">{prod.specs.efficiency}</span>
                  </div>
                </div>

                {/* Specs and Interaction Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-900 mt-auto">
                  <div className="text-left">
                    <span className="text-[9px] font-mono text-zinc-500 block font-bold">EST_ESTIMATE</span>
                    <span className="text-base font-black text-zinc-200">{prod.price}</span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectProduct(prod);
                      // Scroll to hero section where customiser sits
                      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`py-2 px-4 rounded text-[10px] uppercase font-black tracking-widest transition-all duration-300 flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20"
                        : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 border border-zinc-800"
                    }`}
                  >
                    <span>{isSelected ? "Configure active" : "Load Model"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
