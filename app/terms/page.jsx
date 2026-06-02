"use client";

import { motion } from "framer-motion";
import { Scale, ShieldAlert, UserCheck, AlertCircle, HelpCircle, Landmark } from "lucide-react";
import PolicyCTA from "@/components/policy/PolicyCTA";
import CouponSection from "@/components/policy/CouponSection";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center relative overflow-hidden">
        <motion.div {...fadeUp} className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-light italic font-display text-[#2F3E36]">Terms & Conditions</h1>
          <p className="text-[#2F3E36]/60 font-light text-lg max-w-2xl mx-auto uppercase tracking-normal">
            Ethical guidelines for a trusted wellness partnership.
          </p>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#7A9E7E]/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Intro Section - (Light) */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-light italic font-display text-[#2F3E36]">Agreement to Terms</h2>
                <p className="text-[#2F3E36]/60 font-light leading-relaxed">
                  By accessing and using the Fiveetatv website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  { icon: UserCheck, title: "Eligibility", text: "You must be at least 18 years of age or using the site under the supervision of a parent or guardian." },
                  { icon: ShieldAlert, title: "Account Responsibility", text: "Users are responsible for maintaining the confidentiality of their account information and all activities under their account." }
                ].map((item, idx) => (
                  <div key={idx} className="p-8 rounded-3xl bg-white border border-[#2F3E36]/5 shadow-sm space-y-4">
                    <item.icon size={24} className="text-[#7A9E7E]" />
                    <h4 className="text-xl font-medium text-[#2F3E36]">{item.title}</h4>
                    <p className="text-sm text-[#2F3E36]/50 font-light leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-[#2F3E36] p-12 flex items-center justify-center text-center"
            >
              <div className="space-y-8">
                <Scale size={100} className="mx-auto text-[#7A9E7E]/30" />
                <div className="space-y-2">
                  <h3 className="text-3xl font-light italic text-white/90">Legal Framework</h3>
                  <p className="text-white/40 font-light text-sm max-w-xs mx-auto uppercase tracking-normal">Governed by the laws of India</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product & Pricing - Section (Dark) */}
      <section className="py-24 px-6 bg-[#2F3E36] text-white">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-light italic font-display">Product & Pricing</h2>
            <p className="text-white/40 font-light uppercase tracking-normal text-xs">Clarity in every transaction</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: AlertCircle,
                title: "Visual Accuracy",
                desc: "While we strive for accuracy, actual product colors and packaging may slightly vary depending on your device's display settings."
              },
              {
                icon: HelpCircle,
                title: "Availability",
                desc: "Prices and availability of products are subject to change without prior notice. We reserve the right to limit quantities."
              },
              {
                icon: ShieldAlert,
                title: "Pricing Errors",
                desc: "In the event of a pricing error, we reserve the right to cancel the order and provide a full refund to the customer."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 rounded-[2.5rem] border border-white/10 bg-white/5 space-y-6 hover:bg-white/10 transition-colors duration-500"
              >
                <item.icon size={28} className="text-[#7A9E7E]" />
                <h3 className="text-2xl font-light font-display">{item.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Liability & Law - Section (Light) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-[3rem] bg-[#F8F5EF] space-y-8"
          >
            <div className="h-16 w-16 rounded-3xl bg-[#7A9E7E]/10 flex items-center justify-center text-[#7A9E7E]">
              <Landmark size={32} />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-light italic font-display text-[#2F3E36]">Limitation of Liability</h3>
              <p className="text-sm text-[#2F3E36]/60 font-light leading-relaxed">
                Fiveetatv shall not be held liable for any indirect, incidental, or consequential damages resulting from the use or misuse of our products. Users are advised to follow usage guidelines strictly.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-12 rounded-[3rem] bg-[#2F3E36] text-white space-y-8"
          >
            <div className="h-16 w-16 rounded-3xl bg-white/10 flex items-center justify-center text-[#7A9E7E]">
              <Scale size={32} />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-light italic font-display">Governing Law</h3>
              <p className="text-sm text-white/50 font-light leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Delhi, India.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <CouponSection />
      <PolicyCTA />
    </div>
  );
}

