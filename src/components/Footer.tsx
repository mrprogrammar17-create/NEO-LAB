import React, { useState } from "react";
import { Shield, Sparkles, Send, ShieldAlert, ArrowUpCircle } from "lucide-react";

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setSubscribed(true);
  };

  const footerLinks = [
    {
      title: "Design Lab // 01",
      links: [
        { label: "Chassis customisation", href: "#hero" },
        { label: "Paint chemistry", href: "#hero" },
        { label: "Propulsion modes", href: "#hero" },
        { label: "Nuclear core toggle", href: "#hero" }
      ]
    },
    {
      title: "Solutions // 02",
      links: [
        { label: "Bespoke CAD Lab", href: "#services" },
        { label: "Virtual Wind tunnels", href: "#services" },
        { label: "Hangar Delivery", href: "#services" },
        { label: "Diagnostics", href: "#services" }
      ]
    },
    {
      title: "Aero Dynamics // 03",
      links: [
        { label: "Calibration Lab", href: "#gallery" },
        { label: "Stress analysis", href: "#gallery" },
        { label: "Turbine cores", href: "#gallery" },
        { label: "Telemetry capture", href: "#gallery" }
      ]
    }
  ];

  return (
    <footer id="footer" className="bg-brand-dark border-t border-zinc-900 py-16 text-zinc-100 relative font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Newsletter subscribe block side-by-side with brand summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-900 items-start">
          
          {/* Logo Brand information */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-black tracking-widest text-zinc-100 uppercase italic">NEO-AERO / LAB</h4>
                <p className="text-[9px] font-mono text-brand-orange tracking-widest uppercase font-bold">DYNAMIC VEHICLE FORMULATIONS</p>
              </div>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-bold uppercase tracking-wider">
              Designing high velocity localized aerodynamic structures using procedural models, materials testing benchmarks, and carbon casting monocoque methods.
            </p>
          </div>

          {/* Newsletter subscription form */}
          <div className="lg:col-span-7 space-y-3 md:text-right" id="footer-newsletter-box">
            <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">
              JOIN AEROSPACE UPDATE NEWSCASTS // 10
            </span>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 p-3 bg-brand-orange/10 border border-brand-orange/20 rounded text-xs text-brand-orange font-mono text-left font-bold tracking-widest">
                <Sparkles className="w-4 h-4 text-brand-orange animate-spin" />
                <span>SUBSCRIPTION LOGGED // TELEMETRY DIRECTIVE ACTIVE</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md md:ml-auto">
                <input
                  required
                  type="email"
                  placeholder="commissions@hangar.com"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="bg-zinc-900 border border-zinc-900 text-xs px-4 py-3 rounded outline-none focus:border-brand-orange hover:border-zinc-800 w-full font-mono font-bold"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-brand-orange text-white hover:bg-white hover:text-black text-xs font-black rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer select-none font-mono uppercase tracking-widest"
                >
                  <span>SUBSCRIBE</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Footer links taxonomy */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12 border-b border-zinc-900 text-left">
          {footerLinks.map((block, idx) => (
            <div key={idx} className="space-y-4">
              <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
                {block.title}
              </span>
              <ul className="space-y-2.5 text-xs text-zinc-400 font-bold uppercase tracking-wider">
                {block.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="hover:text-brand-orange transition-colors"
                      onClick={(e) => {
                        // Custom smooth anchor navigate
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          const element = document.getElementById(link.href.substring(1));
                          element?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Additional details column */}
          <div className="space-y-4">
            <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
              SECURITY PROTOCOLS // 04
            </span>
            <div className="p-4 rounded bg-zinc-950 border border-zinc-900 text-[10px] font-mono text-zinc-400 space-y-2">
              <span className="flex items-center gap-1.5 text-brand-orange font-black tracking-widest uppercase">
                <ShieldAlert className="w-3.5 h-3.5 text-brand-orange" />
                SSL ENCRYPTION ACTIVE
              </span>
              <p className="leading-relaxed font-bold tracking-wider uppercase">
                All communications and customizable CAD assets remain secured within client isolation networks.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright details and Scroll-to-top with sharp edges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-600 font-bold tracking-widest">
          <div>
            <span>© {new Date().getFullYear()} AERO LABS INC. ALL RIGHTS RESERVED.</span>
            <span className="mx-2.5">|</span>
            <span>SYSTEM REVISION PROTOCOL 14.5a</span>
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-brand-orange transition-colors bg-zinc-900 hover:bg-zinc-850 py-2 px-3.5 rounded border border-zinc-900 shadow-md scroll-smooth uppercase font-black"
          >
            <span>Back to top</span>
            <ArrowUpCircle className="w-4 h-4 text-brand-orange" />
          </button>
        </div>

      </div>
    </footer>
  );
}

