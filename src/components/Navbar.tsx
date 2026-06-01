import React, { useState, useEffect } from "react";
import { Ship, Menu, X, ArrowUpRight, Shield } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onCustomiseClick: () => void;
}

export default function Navbar({ activeSection, onNavigate, onCustomiseClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Design Lab", id: "hero" },
    { label: "Products", id: "products" },
    { label: "About Labs", id: "about" },
    { label: "Core Services", id: "services" },
    { label: "Media Gallery", id: "gallery" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Inquire Now", id: "contact" }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-zinc-950/95 border-b border-zinc-900/90 backdrop-blur-xl py-3"
          : "bg-transparent py-5"
      }`}
      id="main-navigation-bar"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo and Bold Brand italic layout */}
        <div 
          onClick={() => handleItemClick("hero")}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="nav-logo-branding"
        >
          <div className="w-8 h-8 rounded bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange font-bold group-hover:bg-brand-orange/25 transition-all duration-300">
            A
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter italic text-zinc-100 uppercase">
              NEO-AERO <span className="text-brand-orange">/ LAB</span>
            </h1>
          </div>
        </div>

        {/* Desktop Navigation with custom tracking from reference design */}
        <div className="hidden lg:flex items-center gap-1.5 bg-zinc-950/40 border border-white/5 px-1 py-1 rounded backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`px-3.5 py-1 text-[11px] uppercase tracking-[0.16em] font-bold transition-all duration-300 ${
                  isActive
                    ? "text-brand-orange underline underline-offset-4 decoration-2"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Button: Custom High contrast Border border style with White hover state */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onCustomiseClick}
            className="group flex items-center gap-2 border border-white/20 bg-zinc-950 hover:bg-white hover:text-black hover:scale-[1.02] text-white text-[10px] uppercase tracking-widest font-black px-6 py-2.5 rounded-full transition-all duration-300"
          >
            Launch Builder
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-300 hover:text-zinc-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-900 p-6 flex flex-col gap-4 shadow-xl lg:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full text-left py-2.5 px-4 rounded text-xs uppercase tracking-widest transition-all ${
                  activeSection === item.id
                    ? "bg-zinc-900 text-brand-orange font-bold"
                    : "text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="h-px bg-zinc-900 my-2" />

          <button
            onClick={() => {
              onCustomiseClick();
              setMobileMenuOpen(false);
            }}
            className="w-full text-center bg-brand-orange border border-brand-orange text-white hover:bg-white hover:text-black font-black py-3 rounded text-[10px] tracking-widest uppercase transition-all duration-300"
          >
            LAUNCH CUSTOMIZER
          </button>
        </div>
      )}
    </nav>
  );
}
