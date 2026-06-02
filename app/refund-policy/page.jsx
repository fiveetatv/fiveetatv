"use client";

import { motion } from "framer-motion";
import PolicyCTA from "@/components/policy/PolicyCTA";
import CouponSection from "@/components/policy/CouponSection";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center relative overflow-hidden">
        <motion.div {...fadeUp} className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-light italic font-display text-[#2F3E36]">Refund Policy</h1>
          <p className="text-[#2F3E36]/60 font-light text-lg max-w-2xl mx-auto uppercase tracking-normal">
            Transparent and fair returns for your peace of mind.
          </p>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#7A9E7E]/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[2rem] shadow-sm border border-[#2F3E36]/5 text-[#2F3E36]/80 font-light leading-relaxed space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-3xl font-display text-[#2F3E36]">Refund Policy</h2>
            <p>At Fiveetatv, your trust, wellness, and satisfaction are our top priorities. We are committed to providing high-quality Ayurvedic products and ensuring a smooth and reliable shopping experience.</p>
            <p>If something isn’t right, we are here to assist you.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Return & Refund Eligibility</h3>
            <p>We accept return or replacement requests within 7 days of delivery under the following conditions:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You received a damaged, defective, or incorrect product</li>
              <li>The product delivered is expired (although this is highly unlikely)</li>
              <li>You were charged more than the listed MRP</li>
            </ul>
            <p>To be eligible for a return:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The product must be unused and in its original condition</li>
              <li>It should be returned with original packaging, labels, and invoice</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Non-Returnable Items</h3>
            <p>Due to the nature of our products, the following items are not eligible for return:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Opened or used products</li>
              <li>Temperature-sensitive or perishable items</li>
              <li>Products damaged due to misuse or improper handling.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Orders Not Yet Shipped</h3>
            <p>If you wish to cancel your order, you may do so within 24 hours of placing it by emailing us at xxxxxxx.com.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>If the order has not been shipped, a full refund will be processed</li>
              <li>If already shipped, the return policy mentioned above will apply</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Damaged During Transit</h3>
            <p>We take utmost care in packaging our products to ensure they reach you in perfect condition. However, in the rare event that damage occurs during transit, we are here to assist you.</p>
            <p>If you notice any damage at the time of delivery, we request you to kindly refuse acceptance of the package and return it to the delivery agent.</p>
            <p>Please email us at xxxxxxxxxxx.com, and we will arrange a replacement at the earliest.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Contact Us</h3>
            <p>For any queries or support, please reach out to us:</p>
            <p>
              <strong>Email:</strong> xxxxxxxxxxx.com<br />
              <strong>Phone:</strong> +91-XXXXXXXXXX
            </p>
            <p>We are always here to help you on your journey towards natural wellness.</p>
          </div>

        </div>
      </section>

      <CouponSection />
      <PolicyCTA />
    </div>
  );
}

