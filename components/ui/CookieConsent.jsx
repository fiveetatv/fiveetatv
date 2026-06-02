"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("fiveetatv-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("fiveetatv-cookie-consent", "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-[100] mx-auto max-w-2xl"
        >
          <div className="bg-secondary text-white p-6 md:p-8 rounded-[2rem] shadow-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="h-12 w-12 rounded-2xl bg-white/10 text-primary flex items-center justify-center shrink-0">
                <Cookie size={24} />
              </div>
              
              <div className="flex-1 space-y-2">
                <h4 className="text-lg font-medium">Cookie <span className="font-display italic text-primary">Preferences</span></h4>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  We use cookies to harmonize your experience, personalize rituals, and understand how you interact with our botanical wisdom. By continuing, you agree to our <Link href="/privacy-policy" className="underline hover:text-primary transition-colors">Privacy Policy</Link>.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={handleAccept}
                  className="flex-1 md:flex-none bg-primary text-secondary px-8 py-3 rounded-full font-bold uppercase tracking-normal text-[10px] hover:bg-white transition-all duration-300"
                >
                  Accept
                </button>
                <button
                  onClick={() => setVisible(false)}
                  className="p-3 text-white/40 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
