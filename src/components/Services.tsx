import React from "react";
import { motion } from "motion/react";
import { Layers, Wind, PlaneTakeoff, Cpu, Zap, ArrowUpRight } from "lucide-react";
import { SERVICES } from "../data";

export default function Services() {
  // Mapping lookup table for dynamic Lucide Icons
  const iconMap: Record<string, any> = {
    Layers: Layers,
    Wind: Wind,
    PlaneTakeoff: PlaneTakeoff,
    Cpu: Cpu
  };

  return (
    <section id="services" className="py-24 bg-brand-dark border-t border-b border-zinc-900 text-zinc-100 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,78,0,0.02),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="max-w-xl mb-16">
          <span className="text-xs font-mono text-brand-orange uppercase tracking-widest font-black">
            SERVICES & OPERATIONS // 04
          </span>
          <h3 className="text-4xl md:text-5xl font-sans font-black tracking-tighter text-zinc-100 uppercase mt-2 italic">
            CORE SERVICES
          </h3>
          <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold mt-3.5 leading-relaxed">
            Every catalog partner works with a dedicated lab engineer. From computational bypass models to flight hangar telemetry, we provide constant oversight.
          </p>
        </div>

        {/* Bento Grid layout with sharp layout items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((serv, idx) => {
            const IconComponent = iconMap[serv.icon] || Cpu;

            return (
              <motion.div
                key={serv.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group p-6 rounded bg-zinc-950 hover:bg-zinc-950 border border-zinc-900 hover:border-brand-orange/50 transition-all duration-300 flex flex-col justify-between"
                id={`service-bento-${serv.id}`}
              >
                <div>
                  {/* Icon box */}
                  <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-900 text-brand-orange flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 group-hover:border-brand-orange/40 transition-all duration-300">
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>

                  <h4 className="text-lg font-black text-zinc-100 uppercase tracking-tight group-hover:text-brand-orange transition-colors">
                    {serv.title}
                  </h4>
                  <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                    {serv.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-900 mt-6 flex items-center justify-between text-[10px] font-mono text-zinc-500 group-hover:text-brand-orange transition-colors font-bold tracking-widest">
                  <span>CAPABILITY ACTIVE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
