import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, CreditCard, Wallet, Landmark, RefreshCw, Send, CheckCircle2, Copy, Sparkles } from "lucide-react";
import { Product } from "../types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product;
  bodyColor: string;
  engineActive: boolean;
  wireframeMode: boolean;
}

type PaymentMethod = "card" | "crypto" | "wire";

export default function CheckoutModal({
  isOpen,
  onClose,
  selectedProduct,
  bodyColor,
  engineActive,
  wireframeMode,
}: CheckoutModalProps) {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  const [cryptoWallet, setCryptoWallet] = useState("0x7F98bC...A8291f");
  const [wireReceipt, setWireReceipt] = useState("");

  const [checkoutStep, setCheckoutStep] = useState<"form" | "processing" | "success">("form");
  const [statusLog, setStatusLog] = useState<string[]>([]);
  const [copiedText, setCopiedText] = useState(false);

  // Simulated live progress logs during processing
  useEffect(() => {
    if (checkoutStep !== "processing") return;

    const logs = [
      "Establishing secure SSL layer with Hangar Database...",
      "Encrypting hypercar paint formulation coordinates (" + bodyColor + ")...",
      "Validating " + (method === "card" ? "Credit Card Token" : method === "crypto" ? "Web3 Smart Contract" : "Bank Wire Protocol") + "...",
      "Registering monocoque chassis layout with Zurich laboratory robotics...",
      "Secure payment verified. Locking in production slot...",
    ];

    let currentLogIndex = 0;
    setStatusLog([logs[0]]);

    const timer = setInterval(() => {
      currentLogIndex++;
      if (currentLogIndex < logs.length) {
        setStatusLog(prev => [...prev, logs[currentLogIndex]]);
      } else {
        clearInterval(timer);
        setCheckoutStep("success");
      }
    }, 1200);

    return () => clearInterval(timer);
  }, [checkoutStep, bodyColor, method]);

  if (!isOpen) return null;

  const calculateFinalQuote = () => {
    // Base product price parsed to float then add configuration premiums
    const baseNum = parseInt(selectedProduct.price.replace(/[^0-9]/g, ""), 10);
    let premium = 0;
    if (engineActive) premium += 45000; // Reactor premium
    if (bodyColor !== selectedProduct.colors[0].hex) premium += 12500; // Custom coat premium
    return {
      total: baseNum + premium,
      deposit: Math.floor((baseNum + premium) * 0.05), // 5% deposit
      premium
    };
  };

  const { total, deposit, premium } = calculateFinalQuote();

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("processing");
  };

  const handleCopyCrypto = () => {
    navigator.clipboard.writeText("0x7F98bCe92ea466Cd91295eB9820f18EF86A8291f");
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
        
        {/* Outer Modal Wrapper */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-900 rounded-lg shadow-2xl p-6 overflow-hidden md:grid md:grid-cols-12 gap-6 text-left"
        >
          {/* Close trigger button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Panel: Build Summary Column (grid-span-5) */}
          <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-zinc-900 pb-6 md:pb-0 md:pr-6 flex flex-col justify-between font-sans">
            <div>
              <span className="text-[10px] uppercase font-mono text-brand-orange font-bold tracking-widest block mb-2">
                // SPEC SUMMARY
              </span>
              <h3 className="text-xl font-black uppercase text-zinc-100 tracking-tight italic">
                {selectedProduct.name}
              </h3>
              <p className="text-xs text-zinc-500 font-medium">
                {selectedProduct.tagline}
              </p>

              {/* Specs parameters lists */}
              <div className="mt-5 space-y-2.5 font-mono text-[10px] text-zinc-300">
                <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                  <span className="text-zinc-500">BASE PRICE:</span>
                  <span className="font-bold text-zinc-200">{selectedProduct.price}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                  <span className="text-zinc-500">FORMULA COAT:</span>
                  <span className="font-bold flex items-center gap-1">
                    <span 
                      className="w-2.5 h-2.5 rounded-xs inline-block border border-white/10" 
                      style={{ backgroundColor: bodyColor }} 
                    />
                    <span className="uppercase">{bodyColor}</span>
                  </span>
                </div>
                <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                  <span className="text-zinc-500">HYPER REACTOR:</span>
                  <span className={`font-bold ${engineActive ? 'text-brand-orange' : 'text-zinc-500'}`}>
                    {engineActive ? "ENGAGED (+$45K)" : "PASSIVE (+$0)"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                  <span className="text-zinc-500">WIREFRAME DIAG:</span>
                  <span className="font-bold text-zinc-400">
                    {wireframeMode ? "ENABLEDY" : "DISABLED"}
                  </span>
                </div>
                {premium > 0 && (
                  <div className="flex justify-between border-b border-zinc-900/60 pb-1.5 text-orange-400">
                    <span>CUSTOM OPTIONS:</span>
                    <span>+${premium.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price Quote Panel */}
            <div className="mt-6 bg-zinc-900/40 p-4 rounded border border-zinc-900 font-mono text-left">
              <span className="block text-[8px] text-zinc-500 uppercase font-black tracking-widest">
                COMMISSION PRICE SUMMARY
              </span>
              <div className="flex justify-between items-baseline mt-2 text-zinc-100">
                <span className="text-xs">TOTAL:</span>
                <span className="text-xl font-black text-white">${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-baseline mt-1 text-brand-orange border-t border-dashed border-zinc-800 pt-2">
                <span className="text-[10px] font-bold">5% SECURE DEPOSIT:</span>
                <span className="text-md font-black">${deposit.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Checkout / Processing Flow (grid-span-7) */}
          <div className="md:col-span-7 flex flex-col justify-between pt-6 md:pt-0">
            {checkoutStep === "form" && (
              <form onSubmit={handleProcessOrder} className="space-y-4 font-sans">
                <div>
                  <h4 className="text-sm font-black uppercase text-zinc-100 tracking-wider">
                    SECURE DEPOSIT METHOD
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-mono mt-1">
                    Select payment credentials to lock in your custom Monocoque build order reservation.
                  </p>
                </div>

                {/* Tabs to select payment category */}
                <div className="grid grid-cols-3 gap-1.5 font-mono">
                  <button
                    type="button"
                    onClick={() => setMethod("card")}
                    className={`py-2 px-1 text-[9px] rounded font-black tracking-widest uppercase flex flex-col items-center gap-1 border transition-all ${
                      method === "card"
                        ? "bg-brand-orange text-white border-brand-orange"
                        : "bg-zinc-900/40 border-zinc-900 text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>CREDIT CARD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod("crypto")}
                    className={`py-2 px-1 text-[9px] rounded font-black tracking-widest uppercase flex flex-col items-center gap-1 border transition-all ${
                      method === "crypto"
                        ? "bg-brand-orange text-white border-brand-orange"
                        : "bg-zinc-900/40 border-zinc-900 text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <Wallet className="w-4 h-4" />
                    <span>WEB3 ASSETS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod("wire")}
                    className={`py-2 px-1 text-[9px] rounded font-black tracking-widest uppercase flex flex-col items-center gap-1 border transition-all ${
                      method === "wire"
                        ? "bg-brand-orange text-white border-brand-orange"
                        : "bg-zinc-900/40 border-zinc-900 text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <Landmark className="w-4 h-4" />
                    <span>BANK COORDS</span>
                  </button>
                </div>

                {/* Method-specific inputs */}
                {method === "card" && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono font-bold tracking-wider uppercase text-zinc-400 block">
                        CARDHOLDER NAME
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Elena Rostova"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 px-3 py-2 text-xs text-zinc-200 outline-none focus:border-brand-orange rounded"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono font-bold tracking-wider uppercase text-zinc-400 block">
                        CARD NUMBER (MOCK)
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 16);
                          const formatted = val.replace(/(\d{4})/g, "$1 ").trim();
                          setCardNumber(formatted);
                        }}
                        className="w-full bg-zinc-950 border border-zinc-900 px-3 py-2 text-xs text-zinc-200 outline-none focus:border-brand-orange rounded font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold tracking-wider uppercase text-zinc-400 block">
                          EXPIRY
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "").slice(0, 4);
                            if (val.length >= 2) {
                              val = val.slice(0, 2) + "/" + val.slice(2);
                            }
                            setCardExpiry(val);
                          }}
                          className="w-full bg-zinc-950 border border-zinc-900 px-3 py-2 text-xs text-zinc-200 outline-none focus:border-brand-orange rounded font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold tracking-wider uppercase text-zinc-400 block">
                          CVV SECURITY CODE
                        </label>
                        <input
                          required
                          type="password"
                          placeholder="•••"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                          className="w-full bg-zinc-950 border border-zinc-900 px-3 py-2 text-xs text-zinc-200 outline-none focus:border-brand-orange rounded font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {method === "crypto" && (
                  <div className="space-y-3 font-mono bg-zinc-950 border border-zinc-900 p-4 rounded text-left">
                    <span className="block text-[8px] text-zinc-500 font-bold tracking-widest">
                      SECURE SMART CONTRACT ADDRESS // ERC-20 USDT
                    </span>
                    <div className="flex items-center justify-between gap-2 mt-2 bg-zinc-900 p-2.5 rounded border border-zinc-800 text-[10px] break-all">
                      <span className="text-zinc-300 select-all tracking-wider text-xs font-mono font-bold">
                        0x7F98bCe92ea466Cd91295eB9820f18EF86A8291f
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyCrypto}
                        className="flex items-center gap-1.5 text-brand-orange hover:text-white transition-colors bg-zinc-950 p-1.5 rounded font-black text-[9px] uppercase tracking-widest border border-zinc-900 select-none animate-pulse"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedText ? "COPIED" : "COPY"}</span>
                      </button>
                    </div>
                    <p className="text-[9px] text-zinc-500 leading-relaxed font-sans uppercase font-bold tracking-wider mt-2">
                       Transmit payment to the address above. The automated on-chain tracker will authorize your build once the block transactions clear.
                    </p>
                  </div>
                )}

                {method === "wire" && (
                  <div className="space-y-3 font-mono text-[9px]">
                    <div className="bg-zinc-950 border border-zinc-900 p-3.5 rounded space-y-2 text-left">
                      <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                        <span className="text-zinc-500">BENEFICIARY:</span>
                        <span className="text-zinc-300 font-bold">AERO VEHICLE RESEARCH LABS AG</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                        <span className="text-zinc-500">BANK PARTNER:</span>
                        <span className="text-zinc-300 font-bold">ZURCHER KANTONALBANK (ZKB)</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                        <span className="text-zinc-500">IBAN ROUTING:</span>
                        <span className="text-zinc-300 font-bold text-xs">CH93 0070 0000 8829 112A 9</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">BIC / SWIFT:</span>
                        <span className="text-zinc-300 font-bold">ZKBKCHZH88X</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono font-bold tracking-wider uppercase text-zinc-400 block font-sans">
                        WIRE REFERENCE / RECEIPT ID *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. WIRE-ZKB-87291A"
                        value={wireReceipt}
                        onChange={(e) => setWireReceipt(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 px-3 py-2 text-xs text-zinc-200 outline-none focus:border-brand-orange rounded"
                      />
                    </div>
                  </div>
                )}

                {/* Checkout security lock banner */}
                <div className="flex items-center gap-2 px-3 py-2.5 bg-zinc-950 border border-zinc-900 rounded font-mono text-[10px] text-zinc-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>SECURE 256-BIT ENCRYPTION ACTIVE // CLIENT DATA PRIVACY IS SECURED</span>
                </div>

                {/* Action button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-zinc-950 font-black text-xs uppercase tracking-widest rounded hover:bg-brand-orange hover:text-white transition-all cursor-pointer select-none flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT DEPOSIT RESERVATION</span>
                </button>
              </form>
            )}

            {/* Simulated Live Processing Terminal Overlay */}
            {checkoutStep === "processing" && (
              <div className="space-y-6 py-8 font-mono text-xs flex flex-col justify-center min-h-[300px]">
                <div className="flex flex-col items-center justify-center text-center gap-4">
                  <RefreshCw className="w-10 h-10 text-brand-orange animate-spin" />
                  <div>
                    <h4 className="text-sm font-black uppercase text-zinc-100 tracking-widest">
                      TRANSMITTING ORDER TELEMETRY
                    </h4>
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Please do not close this transaction window.
                    </p>
                  </div>
                </div>

                {/* Simulated Log Output Window */}
                <div className="bg-zinc-950 border border-zinc-900 p-4 rounded text-left space-y-1.5 max-h-[160px] overflow-y-auto text-[10px] text-zinc-400 select-none">
                  {statusLog.map((log, index) => (
                    <div key={index} className="flex items-start gap-1.5">
                      <span className="text-brand-orange">❯</span>
                      <span className="leading-relaxed">{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Success Digital Receipt Confirmation */}
            {checkoutStep === "success" && (
              <div className="space-y-6 py-6 font-mono text-left flex flex-col justify-center min-h-[300px]">
                <div className="text-center flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                    <CheckCircle2 className="w-8 h-8 animate-bounce text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="text-md font-black uppercase text-zinc-100 tracking-widest italic">
                      RESERVATION SECURED // 01
                    </h4>
                    <span className="text-[9px] text-brand-orange font-bold font-mono tracking-widest">
                      BUILD SLOT #A-{(Math.floor(Math.random() * 89999) + 10000)} IS LOCKED IN
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-900 p-4 rounded text-[10px] text-zinc-400 space-y-2 leading-relaxed">
                  <div className="flex justify-between items-center text-zinc-500 uppercase font-black border-b border-zinc-900 pb-1.5 pb-2">
                    <span>DIGITAL CONTRACT RECEIPT</span>
                    <span className="text-brand-orange">ORIGINAL COPY</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">ALLOCATED COMMISSION:</span> <span className="text-zinc-200 font-bold uppercase">{selectedProduct.name}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">CHASSIS PAINT FORMULA:</span> <span className="text-zinc-200 font-bold uppercase">{bodyColor}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">REACTOR HARDWARE CONFIG:</span> <span className="text-zinc-200 font-bold uppercase">{engineActive ? "ENGAGED CORE" : "PASSIVE"}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">DEPOSIT PROCESSED:</span> <span className="text-emerald-400 font-bold">${deposit.toLocaleString()} USD</span>
                  </div>
                  <p className="pt-2 text-[9px] text-zinc-400 border-t border-zinc-900 border-dashed font-sans leading-relaxed uppercase font-bold tracking-wider text-center">
                    Congratulations! Aero Labs engineering robotics will initiate construction of your high-velocity monocoque shell immediately in Zurich Hangar.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCheckoutStep("form");
                    onClose();
                  }}
                  className="w-full py-3 bg-brand-orange text-white font-black text-xs uppercase tracking-widest rounded hover:bg-white hover:text-black transition-colors cursor-pointer select-none font-mono text-center"
                >
                  RETURN TO SHOWROOM
                </button>
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
