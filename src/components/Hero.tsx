import React from "react";
import { motion } from "motion/react";
import { Sliders, Eye, Zap, RefreshCw, Cpu, Activity, Compass, Hammer } from "lucide-react";
import ThreeCanvas from "./ThreeCanvas";
import { Product } from "../types";

interface HeroProps {
  selectedProduct: Product;
  bodyColor: string;
  setBodyColor: (color: string) => void;
  wireframeMode: boolean;
  setWireframeMode: (mode: boolean) => void;
  engineActive: boolean;
  setEngineActive: (active: boolean) => void;
  explodedView: boolean;
  setExplodedView: (exploded: boolean) => void;
  cameraAngle: "front" | "side" | "top" | "back";
  setCameraAngle: (angle: "front" | "side" | "top" | "back") => void;
  onCustomizeClick: () => void;
  onCommissionClick: () => void;
}

export default function Hero({
  selectedProduct,
  bodyColor,
  setBodyColor,
  wireframeMode,
  setWireframeMode,
  engineActive,
  setEngineActive,
  explodedView,
  setExplodedView,
  cameraAngle,
  setCameraAngle,
  onCustomizeClick,
  onCommissionClick,
}: HeroProps) {

  // Color selection callback helper
  const handleColorChange = (hex: string) => {
    setBodyColor(hex);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center bg-brand-dark text-zinc-100 overflow-hidden"
    >
      {/* Visual Ambient Grid Backdrops with Brand Orange accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,78,0,0.05),transparent_65%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10">
        
        {/* Left Column: Title Specifications & Interactivity Dashboard */}
        <div className="lg:col-span-5 flex flex-col justify-center" id="hero-left-editorial">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-brand-orange/10 border border-brand-orange/30 text-[10px] text-brand-orange font-mono tracking-widest uppercase mb-4 font-bold">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              INTEGRATIVE DESIGN NODE
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tighter text-zinc-100 uppercase leading-[0.95] mt-1 italic"
          >
            HYPER <br />
            <span className="text-white hover:text-brand-orange transition-colors duration-300">
              {selectedProduct.name.split(" ")[0]}
            </span>
            <br />
            <span className="text-brand-orange underline decoration-[6px] decoration-white underline-offset-8">
              {selectedProduct.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xs uppercase tracking-wider text-zinc-400 font-bold max-w-lg mt-6 leading-relaxed"
          >
            Configure carbon chassis layouts, high-performance hybrid setups, and active aerodynamics live in our 3D customizer.
          </motion.p>

          {/* Interactive Customizer controls sidebar block */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 space-y-5 bg-zinc-950 border border-zinc-900 p-5 rounded relative overflow-hidden"
          >
            {/* Color Coating formulation */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-zinc-400 tracking-widest font-bold uppercase">01 // COAT FORMULATION</span>
                <span className="text-[10px] font-mono font-bold text-brand-orange uppercase">{bodyColor}</span>
              </div>
              <div className="flex gap-2">
                {selectedProduct.colors.map((colorSpec) => (
                  <button
                    key={colorSpec.hex}
                    onClick={() => handleColorChange(colorSpec.hex)}
                    style={{ backgroundColor: colorSpec.hex }}
                    title={colorSpec.name}
                    className={`w-6 h-6 rounded transition-all duration-300 relative ${
                      bodyColor.toLowerCase() === colorSpec.hex.toLowerCase()
                        ? "ring-2 ring-brand-orange scale-115"
                        : "hover:scale-105"
                    }`}
                  >
                    {bodyColor.toLowerCase() === colorSpec.hex.toLowerCase() && (
                      <span className="absolute -inset-1 rounded border border-white/20 animate-ping pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Viewport Orthogonal camera angles */}
            <div>
              <span className="block text-[10px] font-mono text-zinc-400 tracking-widest font-bold uppercase mb-2">02 // CAMERA PORTALS</span>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: "FRONT VIEW", val: "front" },
                  { label: "PROFILE VIEW", val: "side" },
                  { label: "REAR TRACK", val: "back" },
                  { label: "ORTHOGONAL", val: "top" }
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setCameraAngle(item.val as any)}
                    className={`py-1 rounded text-[9px] font-mono text-center tracking-widest font-bold transition-all duration-200 ${
                      cameraAngle === item.val
                        ? "bg-brand-orange text-white"
                        : "bg-zinc-900 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature switches grid (Nuclear engine, Explode Chassis, Wireframe bone structures) */}
            <div>
              <span className="block text-[10px] font-mono text-zinc-400 tracking-widest font-bold uppercase mb-2">03 // CHASSIS CONTROL RIGS</span>
              <div className="grid grid-cols-3 gap-1.5">
                
                {/* Engine bypass toggle */}
                <button
                  onClick={() => setEngineActive(!engineActive)}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 rounded border text-center gap-1.5 group transition-all duration-200 ${
                    engineActive
                      ? "bg-zinc-900 border-brand-orange text-brand-orange"
                      : "bg-zinc-900/50 border-zinc-900 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Zap className={`w-3.5 h-3.5 ${engineActive ? 'animate-bounce text-brand-orange' : 'group-hover:scale-110'}`} />
                  <span className="text-[8px] font-mono uppercase tracking-widest font-bold">REACTOR</span>
                </button>

                {/* Exploded parts toggle */}
                <button
                  onClick={() => setExplodedView(!explodedView)}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 rounded border text-center gap-1.5 group transition-all duration-200 ${
                    explodedView
                      ? "bg-zinc-900 border-white text-white"
                      : "bg-zinc-900/50 border-zinc-900 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Cpu className={`w-3.5 h-3.5 ${explodedView ? 'rotate-12 scale-110' : 'group-hover:-rotate-12'}`} />
                  <span className="text-[8px] font-mono uppercase tracking-widest font-bold">EXPLODED</span>
                </button>

                {/* Skeleton mode toggle */}
                <button
                  onClick={() => setWireframeMode(!wireframeMode)}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 rounded border text-center gap-1.5 group transition-all duration-200 ${
                    wireframeMode
                      ? "bg-zinc-900 border-brand-orange text-brand-orange"
                      : "bg-zinc-900/50 border-zinc-900 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Sliders className={`w-3.5 h-3.5 ${wireframeMode ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="text-[8px] font-mono uppercase tracking-widest font-bold">WIREFRAME</span>
                </button>

              </div>
            </div>

            {/* Quick action build config */}
            <div className="pt-1 flex flex-col gap-2">
              <button
                onClick={onCommissionClick}
                className="w-full py-2.5 px-4 bg-brand-orange hover:bg-white text-white hover:text-zinc-950 rounded text-[10px] tracking-widest font-black uppercase transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                <Hammer className="w-3.5 h-3.5" />
                COMMISSION THIS BUILD
              </button>

              <div className="flex gap-2">
                <button
                  onClick={onCustomizeClick}
                  className="flex-1 py-2 px-4 bg-zinc-900 hover:bg-white border border-zinc-800 text-zinc-300 hover:text-zinc-950 rounded text-[9px] tracking-widest font-black uppercase transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  EXPLORE FLEET
                </button>
                
                <button
                  onClick={() => {
                    setBodyColor(selectedProduct.color);
                    setWireframeMode(false);
                    setEngineActive(false);
                    setExplodedView(false);
                    setCameraAngle("side");
                  }}
                  className="p-2 bg-zinc-900 border border-zinc-900 hover:border-zinc-805 rounded text-zinc-400 hover:text-white transition-colors"
                  title="Reset Viewport Config"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Embedded live-interactive WebGL Three.js view container */}
        <div className="lg:col-span-7 h-[380px] md:h-[450px] lg:h-[560px] w-full relative flex items-center justify-center" id="hero-right-studio">
          
          {/* Framer animated surrounding cybernetic frames */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute inset-0 z-0 p-3 rounded bg-zinc-950 border border-white/5 flex flex-col justify-between"
          >
            {/* Visual HUD Corner details */}
            <div className="flex justify-between items-start pointer-events-none select-none p-2 z-10">
              <div className="font-mono text-[8px] text-zinc-600 flex flex-col gap-0.5 font-bold tracking-wider">
                <span>CONFIG_ID // NEO_AERO_7.9</span>
                <span>STATUS // PERSISTENT CHECK OK</span>
              </div>
              <div className="font-mono text-[8px] text-brand-orange bg-brand-orange/5 py-1 px-2 border border-brand-orange/20 uppercase tracking-widest font-bold">
                GLOW_NODE ACTIVATE // FPS MAX
              </div>
            </div>
            
            <div className="flex justify-between items-end pointer-events-none select-none p-2 z-10">
              <div className="font-mono text-[8px] text-zinc-600 font-bold tracking-wider">
                AERO STUDIO INC. // HIGH-OCTANE SYSTEM
              </div>
              <div className="font-mono text-[8px] text-zinc-600 flex flex-col items-end font-bold tracking-wider">
                <span>RAILS MATRIX</span>
                <span className="text-zinc-500">BOUND_ONLINE</span>
              </div>
            </div>
          </motion.div>

          <div className="absolute inset-3 z-10">
            <ThreeCanvas
              bodyColor={bodyColor}
              wireframeMode={wireframeMode}
              engineActive={engineActive}
              glowColor={selectedProduct.color}
              selectedPreset={selectedProduct.id}
              explodedView={explodedView}
              cameraAngle={cameraAngle}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
