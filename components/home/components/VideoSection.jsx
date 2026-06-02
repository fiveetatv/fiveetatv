"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";
import Image from "next/image";

const FALLBACK_VIDEO_ID = "rSHVqwhmN7h7TcJMz5sV4015UZ5KlXBtVBf6EQ1fs00uA";
const FALLBACK_IMAGE = "https://res.cloudinary.com/dqk8v040t/image/upload/v1777195353/1777193733492_toeqjr.png";

export default function VideoSection({ products = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const videoProduct = products.find(p => p.videoUrl) || { 
    videoUrl: FALLBACK_VIDEO_ID, 
    images: [FALLBACK_IMAGE], 
    name: "MadhuCurex Powder - 15 Herb Sugar Control" 
  };
  const videoId = videoProduct.videoUrl;
  const imageFallback = videoProduct.images?.[0] || FALLBACK_IMAGE;
  const productName = videoProduct.name || "MadhuCurex";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!videoId) return null;

  return (
    <>
      <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-[1px] w-12 bg-secondary"></span>
              <span className="text-xs uppercase tracking-normal text-secondary font-medium">Video Guide</span>
              <span className="h-[1px] w-12 bg-secondary"></span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display italic text-foreground tracking-[0.01em]">
              Watch How <span className="text-secondary">{productName.split(' ')[0]}</span> Works
            </h2>
            <p className="mt-4 text-foreground/60 max-w-2xl mx-auto font-light">
              Discover the power of 15 potent Ayurvedic herbs in controlling blood sugar naturally
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-4xl mx-auto"
          >
            <div 
              className="relative aspect-video rounded-[2rem] overflow-hidden cursor-pointer group shadow-2xl shadow-secondary/10"
              onClick={() => setIsOpen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent z-10" />
              
              <Image 
                src={imageFallback}
                alt={`${productName} Video`}
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-contain bg-gradient-to-br from-gray-100 to-gray-200"
              />
              
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/30">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary flex items-center justify-center shadow-lg shadow-secondary/30">
                    <Play className="text-white ml-1" size={28} fill="white" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-20">
                <p className="text-white font-medium text-lg">{productName}</p>
                <p className="text-white/70 text-sm">Ayurvedic Demonstration</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "15 Potent Herbs", desc: "Natural blend of powerful ingredients" },
                { title: "Easy to Use", desc: "Simply mix with warm water" },
                { title: "Proven Results", desc: "Thousands satisfied customers" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-foreground/5"
                >
                  <h3 className="font-display italic text-lg text-secondary mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/60 font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-foreground/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors text-xl font-bold"
            >
              ×
            </button>
            
            <MuxPlayer
              streamType="on-demand"
              playbackId={videoId}
              metadataVideoTitle={productName}
              autoPlay
              className="w-full h-full"
              style={{ aspectRatio: "16/9" }}
            />
          </motion.div>
        </div>
      )}
    </>
  );
}