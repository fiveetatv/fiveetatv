"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Leaf, Award, ArrowRight, CheckCircle2, Target, Eye, Globe } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/ui/PageTransition";
import Certificate from "@/components/home/components/Certificate";
import FloatingLeaf from "@/components/ui/FloatingLeaf";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="bg-background text-foreground w-full overflow-hidden relative pt-[83px] md:pt-[96px] lg:pt-0">
        {/* Decorative Leaves */}
        <FloatingLeaf 
          type="branch" 
          className="w-32 h-32 md:w-48 md:h-48 top-[20%] -left-12 opacity-30 -rotate-12" 
          delay={0.2} 
        />
        <FloatingLeaf 
          type="single" 
          className="w-20 h-20 md:w-32 md:h-32 top-[45%] -right-8 opacity-20 rotate-45" 
          delay={0.5} 
        />
        <FloatingLeaf 
          type="double" 
          className="w-24 h-24 md:w-40 md:h-40 bottom-[15%] -left-10 opacity-25 rotate-[15deg]" 
          delay={0.8} 
        />
        
        {/* --- HERO --- */}
        <section className="relative h-[70vh] w-full flex items-center justify-center bg-foreground overflow-hidden">
          <motion.div 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image 
              src="/assets/about.jpg" 
              alt="About Fiveetatv" 
              fill 
              className="object-cover opacity-60"
              priority
            />
          </motion.div>
          <div className="relative z-10 text-center space-y-6 px-6 max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary uppercase tracking-normal text-xs font-medium"
            >
              Rooted in Nature, Refined for Life
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-light text-background leading-tight"
            >
              Our <span className="font-display italic text-white/60">Journey</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-background/80 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
            >
              Bringing the profound wisdom of Ayurveda into the modern daily ritual through clinical precision and botanical excellence.
            </motion.p>
          </div>
        </section>
        

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-32 space-y-24">
          
          {/* --- ABOUT FIVEETATV --- */}
          <motion.section {...fadeUp} className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-light leading-tight">
                  About Fiveetatv
                </h2>
                <div className="flex items-center gap-2 text-sm text-foreground/50">
                  <Globe size={14} />
                  <span>Delhi, India</span>
                </div>
              </div>
              <div className="space-y-6 text-foreground/60 font-light text-base leading-relaxed">
                <p>
                  <span className="text-foreground font-medium">Fiveetatv</span> is an Ayurvedic wellness brand founded by <span className="text-foreground font-medium">Suraj Gaur & Rahul Gour</span> in Delhi, India. With a mission to provide natural and effective Ayurvedic products for a healthier lifestyle, we are committed to bringing the ancient wisdom of Ayurveda to modern wellness routines.
                </p>
                <p>
                  At Fiveetatv, we focus on quality, purity, and traditional Ayurvedic formulations to ensure the best results for our customers. Our journey is rooted in the principles of the five elements—Akasha, Vayu, Agni, Jala, and Prithvi—striving to harmonize these fundamental forces within the human body.
                </p>
                <p>
                  We bridge the gap between traditional Ayurvedic wisdom and modern health needs by combining authentic formulations with rigorous scientific standardization. Every product is crafted with intention, using ethically sourced botanicals and time-tested recipes from classical Ayurvedic texts.
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <Leaf size={16} className="text-accent" />
                  </div>
                  <span className="text-sm text-foreground/60">Natural Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <ShieldCheck size={16} className="text-accent" />
                  </div>
                  <span className="text-sm text-foreground/60">Quality Assured</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/assets/aboutus2.webp" 
                alt="Ayurvedic Wellness" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </motion.section>
 
          {/* --- FOUNDERS --- */}
          <motion.section {...fadeUp} className="space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light">Our Founders</h2>
              <p className="text-foreground/60 font-light text-base">
                The visionaries behind Fiveetatv's mission to bring authentic Ayurvedic wellness to the modern world.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { name: "Suraj Gaur", role: "Co-Founder", desc: "Dedicated to creating high-quality Ayurvedic formulations that bridge ancient knowledge with contemporary health needs." },
                { name: "Rahul Gour", role: "Co-Founder", desc: "Passionate about bringing traditional Ayurvedic wisdom to modern wellness solutions with a focus on purity and authenticity." },
              ].map((founder, i) => (
                <motion.div 
                  key={founder.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-muted/50 border border-border/50 rounded-3xl p-8 space-y-6 hover:shadow-lg transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center text-accent font-display font-light text-2xl">
                      {founder.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-medium text-foreground">{founder.name}</h3>
                      <p className="text-xs uppercase tracking-normal text-accent font-medium">{founder.role}</p>
                    </div>
                  </div>
                  <p className="text-foreground/60 font-light text-sm leading-relaxed">{founder.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* --- VISION & MISSION --- */}
          <motion.section {...fadeUp} className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-muted p-8 md:p-12 rounded-2xl space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-light">Our Vision</h3>
                <p className="text-foreground/60 font-light text-base leading-relaxed">
                  To be the global benchmark for premium Ayurvedic wellness, empowering individuals to reclaim their natural vitality through the intelligence of the five elements.
                </p>
              </div>
            </div>
            <div className="bg-primary p-8 md:p-12 rounded-2xl space-y-6 text-background">
              <div className="space-y-4">
                <h3 className="text-2xl font-light text-background">Our Mission</h3>
                <p className="text-background/80 font-light text-base leading-relaxed">
                  To provide meticulously standardized, high-potency Ayurvedic formulations that are ethically sourced, lab-verified, and accessible to the modern world.
                </p>
              </div>
            </div>
          </motion.section>

          

          {/* --- QUALITY & TRUST --- */}
          <motion.section {...fadeUp} className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2000&auto=format&fit=crop" 
                alt="Quality Standards" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-light">Quality & Trust</h2>
                <p className="text-foreground/60 text-base font-light max-w-md">We adhere to the highest standards of safety and efficacy.</p>
              </div>
              <div className="grid gap-4">
                {[
                  "100% Pure Botanical Extracts",
                  "Standardized for Bio-active Potency",
                  "Third-party Lab Tested",
                  "Ethically Sourced",
                  "No Synthetic Fillers",
                  "Manufactured in GMP Facilities"
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span className="text-foreground/70 font-light text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* --- CERTIFICATIONS --- */}
          <Certificate />
          {/* --- WHY CHOOSE US --- */}
          <motion.section {...fadeUp} className="bg-foreground rounded-2xl p-12 md:p-16 text-background relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-light">Why Choose Fiveetatv?</h2>
                <p className="text-background/70 text-base font-light leading-relaxed max-w-md">
                  In a world of generic supplements, we offer precision wellness rooted in authenticity.
                </p>
                <Link 
                  href="/#products" 
                  className="inline-flex items-center gap-3 bg-primary text-background px-8 py-4 rounded-full font-light uppercase tracking-normal text-xs hover:bg-background hover:text-foreground transition-all duration-300"
                >
                  Explore Rituals <ArrowRight size={16} strokeWidth={1} />
                </Link>
              </div>
              <div className="grid gap-6">
                {[
                  { title: "Personalized Balance", desc: "Formulations designed to balance specific doshas." },
                  { title: "Ancestral Wisdom", desc: "Authentic recipes from classical Ayurvedic texts." },
                  { title: "Modern Safety", desc: "Rigorous testing protocols for modern standards." },
                ].map((item, i) => (
                  <div key={i} className="bg-background/5 p-6 rounded-xl border border-background/10 space-y-2">
                    <h4 className="text-lg font-light text-primary">{item.title}</h4>
                    <p className="text-background/60 font-light text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </PageTransition>
  );
}
