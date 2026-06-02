"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import { Badge } from "@/components/ui/Badge";
import FloatingLeaf from "@/components/ui/FloatingLeaf";
import { useState } from "react";
import DoctorConsultationModal from "@/components/ui/DoctorConsultationModal";

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 2, 0]
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function ContactPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <PageTransition>
      <div className="bg-background text-foreground w-full overflow-hidden relative">
        {/* Decorative Leaves */}
        <FloatingLeaf 
          type="single" 
          className="w-20 h-20 md:w-32 md:h-32 top-10 left-10 opacity-20 -rotate-12" 
          delay={0.1} 
        />
        <FloatingLeaf 
          type="double" 
          className="w-24 h-24 md:w-40 md:h-40 bottom-20 right-10 opacity-25 rotate-[30deg]" 
          delay={0.4} 
        />
        
        {/* --- HERO --- */}
        <section className="relative pt-20 pb-12 md:pt-24 md:pb-16 px-6">
          <motion.div 
            {...floatAnimation}
            className="absolute top-20 right-20 hidden lg:block"
          >
            <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles size={24} className="text-accent" />
            </div>
          </motion.div>

          <div className="max-w-[1440px] mx-auto">
            <motion.div {...cardVariants} className="max-w-4xl mx-auto space-y-8 text-center">
              <Badge variant="luxury">Get in Touch</Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight">
                We'd Love to <span className="font-display italic text-accent">Hear</span> From You
              </h1>
              <p className="text-foreground/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                Have questions about our wellness rituals or formulations? Our Ayurvedic practitioners are here to guide you on your journey to balance and vitality.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
          
          {/* --- CONTACT INFO CARDS --- */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { 
                icon: Phone, 
                label: "Call Us", 
                value: "9318445297", 
                sub: "Mon-Sat, 10am - 6pm IST",
                action: "tel:9318445297",
                delay: 0.1,
                color: "from-accent/20 to-accent/5",
                iconColor: "text-accent",
                iconBg: "bg-accent/10 hover:bg-accent"
              },
              { 
                icon: Mail, 
                label: "Email Us", 
                value: "fiveetatv@gmail.com", 
                sub: "Response within 24 hours",
                action: "mailto:fiveetatv@gmail.com",
                delay: 0.2,
                color: "from-highlight/30 to-highlight/10",
                iconColor: "text-foreground/70",
                iconBg: "bg-highlight/20 hover:bg-highlight"
              },
              { 
                icon: MessageSquare, 
                label: "WhatsApp", 
                value: "9318445297", 
                sub: "Chat with us instantly",
                action: "https://wa.me/919318445297",
                delay: 0.3,
                color: "from-foreground/10 to-foreground/5",
                iconColor: "text-foreground/70",
                iconBg: "bg-foreground/10 hover:bg-foreground hover:text-background"
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.action}
                {...cardVariants}
                transition={{ delay: item.delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br bg-white/30 backdrop-blur-sm p-6 md:p-8 border border-border/50 space-y-4 hover:shadow-xl hover:shadow-accent/10 transition-all duration-700"
              >
                {/* Animated gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10">
                  <motion.div 
                    className={`h-16 w-16 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                    whileHover={{ rotate: 5 }}
                  >
                    <item.icon size={28} strokeWidth={1.5} />
                  </motion.div>
                  <div className="space-y-3 mt-6">
                    <p className="text-[10px] uppercase tracking-normal font-light text-foreground/40">{item.label}</p>
                    <h3 className="text-xl md:text-2xl font-light text-foreground leading-tight group-hover:text-accent transition-colors duration-500">{item.value}</h3>
                    <p className="text-sm text-foreground/50 font-light">{item.sub}</p>
                  </div>
                  <motion.div 
                    className="flex items-center gap-2 text-accent text-xs font-light tracking-[0.05em] mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    Connect <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* --- CONSULTATION CARD --- */}
          <motion.div
            {...cardVariants}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-accent/10 to-highlight/10 border border-accent/30"
          >
            {/* Floating decorative elements */}
            <motion.div 
              className="absolute top-0 right-0 w-96 h-96 bg-accent/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-64 h-64 bg-highlight/30 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:w-1/3 text-center lg:text-left">
                  <motion.div 
                    className="h-16 w-16 rounded-full bg-accent text-background flex items-center justify-center mx-auto lg:mx-0 mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.4 }}
                  >
                    <MessageSquare size={32} strokeWidth={1.5} />
                  </motion.div>
                  <Badge variant="luxury" className="mb-4">Premium Service</Badge>
                  <h3 className="text-3xl md:text-4xl font-light text-foreground leading-tight">
                    Consult with an <span className="font-display italic text-accent">Expert</span>
                  </h3>
                </div>
                
                <div className="lg:w-1/3 text-center">
                  <p className="text-foreground/70 text-base font-light leading-relaxed">
                    Book a private consultation with our certified Ayurvedic practitioners for personalized wellness rituals tailored to your unique constitution.
                  </p>
                </div>
                
                <div className="lg:w-1/3 text-center lg:text-right">
                  <motion.button 
                    onClick={() => setConsultationOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 bg-accent text-background px-8 py-4 rounded-full text-xs font-light tracking-normal uppercase hover:bg-accent/90 transition-all duration-500 shadow-lg shadow-accent/20"
                  >
                    Book Consultation
                    <ArrowRight size={16} />
                  </motion.button>
                  <p className="mt-4 text-sm text-foreground/50 font-light">
                    Free initial assessment
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <DoctorConsultationModal 
          isOpen={consultationOpen} 
          onClose={() => setConsultationOpen(false)} 
        />
      </div>
    </PageTransition>
  );
}
