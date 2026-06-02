"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, RefreshCcw, Truck, ChevronRight } from "lucide-react";
import PolicyCTA from "@/components/policy/PolicyCTA";
import FloatingLeaf from "@/components/ui/FloatingLeaf";

const policies = [
  {
    title: "Terms & Conditions",
    description: "The ethical guidelines and legal framework for our trusted partnership.",
    href: "/terms",
    icon: FileText,
  },
  {
    title: "Privacy Policy",
    description: "How we collect, use, and protect your most valued personal elements.",
    href: "/privacy-policy",
    icon: ShieldCheck,
  },
  {
    title: "Refund Policy",
    description: "Our commitment to transparent and fair returns for your peace of mind.",
    href: "/refund-policy",
    icon: RefreshCcw,
  },
  {
    title: "Shipping Policy",
    description: "Reliable logistics and transparent delivery timelines across India.",
    href: "/shipping-policy",
    icon: Truck,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] pt-24 md:pt-32 relative overflow-hidden">
      {/* Decorative Leaves */}
      <FloatingLeaf 
        type="branch" 
        className="w-32 h-32 md:w-48 md:h-48 top-10 -right-12 opacity-20 rotate-[120deg]" 
        delay={0.2} 
      />
      <FloatingLeaf 
        type="single" 
        className="w-20 h-20 md:w-32 md:h-32 bottom-[30%] -left-8 opacity-15 -rotate-45" 
        delay={0.5} 
      />
      
      {/* Hero Section */}
      <section className="px-6 py-20 text-center relative overflow-hidden">
        <motion.div {...fadeUp} className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-light italic font-display text-[#2F3E36]">Our Policies</h1>
          <p className="text-[#2F3E36]/60 font-light text-lg max-w-2xl mx-auto uppercase tracking-normal">
            Clarity and transparency in every step of your journey.
          </p>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#7A9E7E]/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Policies Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {policies.map((policy, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={policy.href} className="group block h-full">
                <div className="p-10 rounded-[2.5rem] bg-white border border-[#2F3E36]/5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] h-full flex flex-col justify-between hover:-translate-y-2 transition-all duration-500 group-hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)]">
                  <div className="space-y-6">
                    <div className="h-16 w-16 rounded-3xl bg-[#7A9E7E]/10 flex items-center justify-center text-[#7A9E7E] group-hover:bg-[#7A9E7E] group-hover:text-white transition-colors duration-500">
                      <policy.icon size={32} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-light italic font-display text-[#2F3E36]">{policy.title}</h3>
                      <p className="text-[#2F3E36]/50 font-light leading-relaxed">{policy.description}</p>
                    </div>
                  </div>
                  <div className="pt-8 flex items-center gap-2 text-[#7A9E7E] font-medium text-sm uppercase tracking-normal overflow-hidden">
                    Read Policy 
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <PolicyCTA />
    </div>
  );
}
