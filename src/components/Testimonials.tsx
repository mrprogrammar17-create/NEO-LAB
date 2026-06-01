import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquareCode } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-brand-dark border-t border-b border-zinc-900 text-zinc-100 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,78,0,0.02),transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 font-sans">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono text-brand-orange uppercase tracking-widest font-black flex items-center justify-center gap-1.5">
            <MessageSquareCode className="w-4 h-4 text-brand-orange" />
            COMMISSION REVIEWS // 06
          </span>
          <h3 className="text-4xl md:text-5xl font-sans font-black tracking-tighter text-zinc-100 uppercase mt-2 italic">
            CLIENT OPINIONS
          </h3>
          <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold mt-3 leading-relaxed">
            What materials scientists, private collectors, and aerospace operators claim post flight commissioning.
          </p>
        </div>

        {/* Testimonial Active Slider Slider Panel with sharp borders */}
        <div className="max-w-4xl mx-auto relative rounded bg-zinc-950 p-8 md:p-12 border border-zinc-900 shadow-xl overflow-hidden">
          
          {/* Subtle Quote asset in background */}
          <div className="absolute top-6 right-8 text-zinc-900/30 pointer-events-none select-none">
            <Quote className="w-24 h-24" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start" id="testimonial-slide-board">
            
            {/* User Avatar */}
            <div className="flex-shrink-0 w-20 h-20 md:w-28 md:h-28 rounded border border-zinc-900 overflow-hidden shadow-lg bg-zinc-900">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale"
              />
            </div>

            {/* Content info and message */}
            <div className="text-center md:text-left flex-1 space-y-4">
              {/* Stars representation */}
              <div className="flex justify-center md:justify-start gap-1">
                {Array.from({ length: currentTestimonial.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-brand-orange fill-brand-orange" />
                ))}
              </div>

              {/* Quote block */}
              <blockquote className="text-lg md:text-xl font-sans text-white leading-relaxed font-bold italic uppercase tracking-tight">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author Credentials */}
              <div className="pt-4 border-t border-zinc-900">
                <span className="block text-sm font-black text-zinc-100 uppercase tracking-widest">{currentTestimonial.name}</span>
                <span className="block text-xs font-mono text-zinc-500 mt-1 uppercase font-bold tracking-widest">
                  {currentTestimonial.role} — <span className="text-brand-orange">{currentTestimonial.company}</span>
                </span>
              </div>
            </div>

          </div>

          {/* Slider Slider navigation hooks with sharp corners */}
          <div className="absolute bottom-6 right-8 flex items-center gap-2 z-20">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel indicators with sharp rectangular shapes */}
        <div className="flex justify-center gap-1.5 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 transition-all duration-300 ${
                activeIndex === i ? "w-6 bg-brand-orange" : "w-1.5 bg-zinc-900"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
