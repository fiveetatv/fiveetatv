"use client";

import { motion } from "framer-motion";
import PolicyCTA from "@/components/policy/PolicyCTA";
import CouponSection from "@/components/policy/CouponSection";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center relative overflow-hidden">
        <motion.div {...fadeUp} className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-light italic font-display text-[#2F3E36]">Privacy Policy</h1>
          <p className="text-[#2F3E36]/60 font-light text-lg max-w-2xl mx-auto uppercase tracking-normal">
            Your trust is our most valued element.
          </p>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#7A9E7E]/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[2rem] shadow-sm border border-[#2F3E36]/5 text-[#2F3E36]/80 font-light leading-relaxed space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-3xl font-display text-[#2F3E36]">Privacy Policy</h2>
            <p className="font-medium">Effective Date: 17-April-2026</p>
            <p>At Fiveetatv, we value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit or make a purchase from our website.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Information We Collect</h3>
            <p>When you use our website, we may collect the following information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal details such as your name, email address, phone number, and shipping address</li>
              <li>Order details and purchase history</li>
              <li>Payment information (processed securely through third-party payment gateways)</li>
              <li>Technical data such as IP address, browser type, device information, and cookies</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">How We Use Your Information</h3>
            <p>We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and deliver your orders</li>
              <li>To communicate with you regarding orders, updates, and support</li>
              <li>To improve our website, products, and customer experience</li>
              <li>To send promotional offers and updates, where you have opted to receive them</li>
              <li>To prevent fraud and ensure secure transactions</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Sharing of Information</h3>
            <p>We do not sell, rent, or trade your personal information. However, we may share your data with trusted third parties, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment gateway providers for secure transactions</li>
              <li>Shipping and logistics partners for order delivery</li>
              <li>Service providers who assist in operating our website</li>
            </ul>
            <p>These third parties are expected to handle your data securely and only for the intended purpose.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Data Security</h3>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, misuse, or alteration.</p>
            <p>While we follow industry-standard security practices and work with trusted service providers, no method of transmission over the internet or electronic storage can be guaranteed to be completely secure.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Third-Party Services & Limitation of Liability</h3>
            <p>Our website may use third-party services such as payment gateways, hosting providers, and logistics partners. While we work with trusted providers, Fiveetatv shall not be held responsible for any data breaches, losses, or unauthorized access arising from third-party systems or factors beyond our reasonable control.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Cookies</h3>
            <p>Our website uses cookies to enhance your browsing experience and analyze website traffic. You can choose to disable cookies through your browser settings; however, this may affect certain functionalities of the website.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Your Rights</h3>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, update, or request deletion of your personal information</li>
              <li>Opt out of receiving promotional communications at any time</li>
            </ul>
            <p>To exercise these rights, please contact us using the details below.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Third-Party Links</h3>
            <p>Our website may contain links to external websites. We are not responsible for the privacy practices or content of such third-party websites.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Data Retention</h3>
            <p>We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy. After this period, your data will be securely deleted.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Children's Privacy</h3>
            <p>Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from individuals under 18.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Changes to This Policy</h3>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Contact Us</h3>
            <p>If you have any questions or concerns regarding this Privacy Policy, please contact us:</p>
            <p>
              <strong>Email:</strong> fiveetatv@gmail.com<br />
              <strong>Phone:</strong> +91-9318445297
            </p>
            <p>We will respond to your inquiry within 24-48 hours.</p>
          </div>

        </div>
      </section>

      <CouponSection />
      <PolicyCTA />
    </div>
  );
}

