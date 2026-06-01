import React, { useState } from "react";
import { Send, MapPin, Mail, Clock, Phone, ExternalLink, Sparkles } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "vessel-x1",
    location: "zurich",
    message: ""
  });

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const locations = [
    {
      id: "zurich",
      city: "Zurich Dynamics Lab",
      address: "Neumarkt 14, 8001 Zürich, Switzerland",
      phone: "+41 44 268 2800"
    },
    {
      id: "kyoto",
      city: "Kyoto Robotics Hangar",
      address: "Gojozaka 2-10, Higashiyama, Kyoto, Japan",
      phone: "+81 75 561 0110"
    },
    {
      id: "houston",
      city: "Houston Spaceport Wing",
      address: "Enterprise Blvd, Houston, TX 77058, US",
      phone: "+1 281 244 0100"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please complete all required fields correctly.");
      return;
    }

    setErrorMessage("");
    setIsSubmitSuccessful(true);
  };

  const selectedLocationDetail = locations.find(loc => loc.id === formData.location) || locations[0];

  return (
    <section id="contact" className="py-24 bg-brand-dark text-zinc-100 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,78,0,0.02),transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Information, Office targets and active telemetry details */}
          <div className="lg:col-span-5 space-y-8" id="contact-split-left">
            <div>
              <span className="text-xs font-mono text-brand-orange uppercase tracking-widest font-black">
                ACQUISITION AND INQUIRY // 07
              </span>
              <h3 className="text-4xl md:text-5xl font-sans font-black tracking-tighter text-zinc-100 uppercase mt-2 italic">
                LAUNCH INQUIRY
              </h3>
              <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold mt-4 leading-relaxed">
                Our custom building spaces are booking-only slots. Fill out your requirements, preferred launch coordinates, and target parameters of your build.
              </p>
            </div>

            {/* Quick specifications Info block */}
            <div className="space-y-3 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-3 p-4 rounded bg-zinc-950 border border-zinc-900">
                <Mail className="w-5 h-5 text-brand-orange flex-shrink-0" />
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase font-bold tracking-widest">EMAIL INQUIRIES</span>
                  <span className="text-zinc-300 font-bold">commissions@aerolab.dev</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded bg-zinc-950 border border-zinc-900">
                <Clock className="w-5 h-5 text-brand-orange flex-shrink-0" />
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase font-bold tracking-widest">LAB OFFICE HOURS</span>
                  <span className="text-zinc-300 font-bold">Mon - Fri // 08:00 - 18:00 CET</span>
                </div>
              </div>
            </div>

            {/* Selected Hangar coordinates detail card with sharp corners */}
            <div className="p-6 rounded bg-zinc-950 border border-zinc-900">
              <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold mb-3">
                Selected Hangar Target Address
              </span>
              <div className="space-y-3">
                <h4 className="text-sm font-black text-zinc-100 uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                  {selectedLocationDetail.city}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed pl-6 uppercase tracking-wider font-bold">
                  {selectedLocationDetail.address}
                </p>
                <p className="text-xs text-zinc-400 font-mono pl-6 font-bold tracking-widest">
                  TEL: {selectedLocationDetail.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Custom interactive form */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 p-8 rounded" id="contact-split-right">
            {isSubmitSuccessful ? (
              <div className="py-12 px-6 text-center space-y-5" id="contact-success-screen">
                <div className="w-14 h-14 rounded bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange mx-auto">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-zinc-100 uppercase tracking-tight">Commission Request Logged</h4>
                  <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto leading-relaxed font-bold uppercase tracking-wider">
                    Thank you, <strong className="text-zinc-200">{formData.name}</strong>. Your telemetry requirements have been logged to the <strong className="text-brand-orange capitalize">{formData.location}</strong> design hangar. A technician will evaluate the coordinates.
                  </p>
                </div>

                <div className="pt-4 font-mono text-[9px] text-zinc-600 font-bold tracking-widest">
                  TRANSMISSION ENCRYPTED // AES_B_S_256
                </div>

                <button
                  onClick={() => {
                    setIsSubmitSuccessful(false);
                    setFormData({ name: "", email: "", category: "vessel-x1", location: "zurich", message: "" });
                  }}
                  className="mt-4 px-5 py-2.5 rounded text-[10px] tracking-widest font-black uppercase bg-zinc-900 text-zinc-200 border border-zinc-850 hover:bg-white hover:text-black transition-all"
                >
                  Submit Another Commission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-mono text-[11px]" id="commission-contact-form">
                
                {errorMessage && (
                  <div className="p-3 bg-red-950/40 border border-red-800/40 text-red-400 rounded text-xs font-bold tracking-widest uppercase">
                    {errorMessage}
                  </div>
                )}

                {/* Grid inputs for credentials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                  <div className="space-y-2">
                    <label className="text-zinc-400 font-bold tracking-widest block uppercase">
                      Visitor Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-900/40 border border-zinc-900 text-xs text-zinc-200 focus:border-brand-orange hover:border-zinc-800 px-4 py-3 rounded transition-all outline-none font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-zinc-400 font-bold tracking-widest block uppercase">
                      Secure Email coordinates *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. elena@aerolabs.dev"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-900/40 border border-zinc-900 text-xs text-zinc-200 focus:border-brand-orange hover:border-zinc-800 px-4 py-3 rounded transition-all outline-none font-bold"
                    />
                  </div>
                </div>

                {/* Grid selectors for Build model and Hangar target */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                  <div className="space-y-2">
                    <label className="text-zinc-400 font-bold tracking-widest block uppercase">
                      Target Cruiser Build Type
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-zinc-900/40 border border-zinc-900 text-xs text-zinc-300 focus:border-brand-orange hover:border-zinc-800 px-3 py-3 rounded transition-all outline-none cursor-pointer font-bold"
                    >
                      <option value="vessel-x1">Bugatti Tourbillon (V16 Hybrid)</option>
                      <option value="aurora-stratos">Koenigsegg Jesko Absolut (Low-Drag V8)</option>
                      <option value="quantum-pod">Lamborghini Revuelto (V12 Plug-In)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-zinc-400 font-bold tracking-widest block uppercase">
                      Hangar Station Handoff
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-zinc-900/40 border border-zinc-900 text-xs text-zinc-300 focus:border-brand-orange hover:border-zinc-800 px-3 py-3 rounded transition-all outline-none cursor-pointer font-bold"
                    >
                      <option value="zurich">Zurich, Switzerland Labs</option>
                      <option value="kyoto">Kyoto, Japan Hangar</option>
                      <option value="houston">Houston, Texas Spaceport</option>
                    </select>
                  </div>
                </div>

                {/* Message input */}
                <div className="space-y-2 text-left">
                  <label className="text-zinc-400 font-bold tracking-widest block uppercase">
                    Bespoke Telemetry Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe custom carbon composite density, bypass motor parameters, aerodynamics, or delivery location parameters..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-900/40 border border-zinc-900 text-xs text-zinc-200 focus:border-brand-orange hover:border-zinc-800 px-4 py-3 rounded transition-all outline-none resize-none font-bold"
                  />
                </div>

                {/* Submit trigger button with sharp edges */}
                <div className="pt-2 text-right">
                  <button
                    type="submit"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-white text-white hover:text-black hover:scale-[1.01] text-[10px] tracking-widest font-black uppercase px-6 py-3.5 rounded transition-all select-none"
                  >
                    <span>TRANSMIT PARAMETERS</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
