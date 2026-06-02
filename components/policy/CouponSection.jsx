"use client";

import { motion } from "framer-motion";
import { Ticket } from "lucide-react";

export default function CouponSection() {
  return (
    <section className="py-20 px-6 bg-[#F8F5EF]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7A9E7E]/10 text-[#7A9E7E] text-[10px] uppercase tracking-normal font-bold">
            <Ticket size={14} />
            Exclusive Offers
          </div>
          <h2 className="text-4xl md:text-5xl font-light italic font-display text-[#2F3E36]">Promo Code Terms</h2>
          <p className="text-[#2F3E36]/60 font-light leading-relaxed">
            Enhance your wellness journey with our special offers. Please note the following terms for coupon usage.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid gap-4"
        >
          {[
            "Only one coupon code can be applied per order.",
            "Coupons are valid for a limited time as specified.",
            "Offer is only valid for purchases made on our official website.",
            "Coupon value will be adjusted in case of returns or refunds.",
            "Valid till stocks last. Fiveetatv reserves the right to modify offers."
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-white border border-[#2F3E36]/5 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4"
            >
              <div className="h-6 w-6 rounded-full bg-[#7A9E7E]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-[#7A9E7E] text-xs font-bold">{idx + 1}</span>
              </div>
              <p className="text-sm text-[#2F3E36]/70 font-light">{item}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
