import React from "react";
import { motion } from "motion/react";
import { Award, Layers, Sparkles, Orbit, CheckCircle2 } from "lucide-react";

export default function About() {
  const stats = [
    { value: "0.14 Cx", name: "Aerodynamic Drag Coefficient Limit" },
    { value: "100%", name: "Additive Carbon Composite Shells" },
    { value: "12,400 h", name: "Superfluid Computational Hours Logged" },
    { value: "3.8 ms", name: "Real-time Vector suspension recalculation" },
  ];

  const milestones = [
    {
      year: "Phase I // Calibration",
      title: "Wind Tunnel Aerodynamics Model",
      desc: "Simulating fluid air flows at critical altitudes and Mach friction ceilings to formulate lightweight wings."
    },
    {
      year: "Phase II // Solidification",
      title: "Monocoque Laser Autoclave",
      desc: "Deploying high temperature baking chambers to unify graphene strands into an impact-safe survival structure."
    },
    {
      year: "Phase III // Propulsion",
      title: "Bypassed Electromagnetic Drive",
      desc: "Embedding spinning superconductor ring magnets directly within the carbon wheel rim pods."
    }
  ];

  return (
    <section id="about" className="py-24 bg-brand-dark text-zinc-100 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-brand-orange/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* About Editorial split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Visual specifications and stat layout */}
          <div className="lg:col-span-5 space-y-8" id="about-split-left">
            <div>
              <span className="text-xs font-mono text-brand-orange uppercase tracking-widest font-black">
                LAB SPECIFICATIONS & CEILING // 03
              </span>
              <h3 className="text-4xl md:text-5xl font-sans font-black tracking-tighter text-zinc-100 uppercase mt-2 italic">
                PARADIGM OF VELOCITY
              </h3>
              <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold mt-4 leading-relaxed">
                We believe that every high performance vehicle is an architectural sculpture. Our materials scientists and engineers work in absolute symmetry to eliminate drag coefficients completely.
              </p>
            </div>

            {/* Quick specifications grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded bg-zinc-950 border border-zinc-900">
                  <span className="block text-2xl font-black text-brand-orange">{stat.value}</span>
                  <span className="block text-[9px] font-mono text-zinc-500 mt-1 uppercase tracking-widest font-bold leading-tight">
                    {stat.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Aesthetic highlight quote */}
            <div className="p-5 border-l-2 border-brand-orange bg-zinc-900/10 rounded-r">
              <p className="text-xs italic text-zinc-400 leading-relaxed font-bold">
                "We do not design cars. We design localized gravitational anchors that sculpt structural pressure boundaries into carbonized kinetic motion."
              </p>
              <span className="block text-[8px] font-mono text-zinc-500 mt-2 uppercase tracking-widest font-bold">
                — Aris Thorne, Chief Materials Architect
              </span>
            </div>
          </div>

          {/* Right Column: Custom interactive timeline progression */}
          <div className="lg:col-span-7 space-y-8" id="about-split-right">
            <span className="block text-xs font-mono text-zinc-500 tracking-widest uppercase font-black">
              CHASSIS FORMULATION STAGES // THREE_CYCLE
            </span>

            <div className="relative border-l border-zinc-900 ml-3 pl-8 space-y-12">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Dot with pulsing feedback */}
                  <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-center group-hover:border-brand-orange transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 group-hover:text-brand-orange transition-colors" />
                  </div>

                  {/* Period label */}
                  <span className="inline-block text-[10px] font-mono text-brand-orange tracking-widest uppercase font-black mb-1">
                    {milestone.year}
                  </span>

                  {/* Title and details */}
                  <h4 className="text-lg font-black text-zinc-100 uppercase tracking-tight group-hover:text-brand-orange transition-colors">
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed max-w-xl">
                    {milestone.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
