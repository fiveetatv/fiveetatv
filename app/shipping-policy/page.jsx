"use client";

import { motion } from "framer-motion";
import PolicyCTA from "@/components/policy/PolicyCTA";
import CouponSection from "@/components/policy/CouponSection";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center relative overflow-hidden">
        <motion.div {...fadeUp} className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-light italic font-display text-[#2F3E36]">Shipping & Cancellation Policy</h1>
          <p className="text-[#2F3E36]/60 font-light text-lg max-w-2xl mx-auto uppercase tracking-normal">
            Delivering wellness with care and precision.
          </p>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#7A9E7E]/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[2rem] shadow-sm border border-[#2F3E36]/5 text-[#2F3E36]/80 font-light leading-relaxed space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-3xl font-display text-[#2F3E36]">Shipping & Cancellation Policy</h2>
            <p>At Fiveetatv, we are committed to providing a smooth, reliable, and hassle-free shopping experience. This policy outlines our shipping process, delivery timelines, cancellations, and related terms.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Shipping Policy</h3>
            <p>We strive to ensure that your orders are processed efficiently and delivered in a timely manner.</p>
            
            <h4 className="text-lg font-medium text-[#2F3E36] mt-4">1. Shipping Charges</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Free shipping is available across India for orders above ₹600.</li>
              <li>For orders below ₹600, a nominal shipping fee will be applied based on the delivery location.</li>
            </ul>

            <h4 className="text-lg font-medium text-[#2F3E36] mt-4">2. Order Processing</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Orders are typically processed and dispatched within 1–3 working days.</li>
              <li>Orders placed on Sundays or public holidays will be processed on the next working day.</li>
              <li>During peak periods or promotional events, processing and dispatch timelines may be slightly extended.</li>
            </ul>

            <h4 className="text-lg font-medium text-[#2F3E36] mt-4">3. Delivery Timelines</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Orders are generally delivered within 2–7 working days, depending on the delivery location.</li>
              <li>Deliveries to remote or rural areas may require additional time.</li>
              <li>Customers are responsible for providing accurate and complete delivery details at the time of placing the order.</li>
            </ul>

            <h4 className="text-lg font-medium text-[#2F3E36] mt-4">4. Non-Delivery or Failed Delivery</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>If delivery fails due to incorrect or incomplete information provided by the customer (such as incorrect address or recipient unavailability), additional re-delivery charges may apply.</li>
            </ul>

            <h4 className="text-lg font-medium text-[#2F3E36] mt-4">5. Delays Beyond Our Control</h4>
            <p>Delivery timelines may be affected due to circumstances beyond our control, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Logistics disruptions</li>
              <li>Weather conditions</li>
              <li>Natural disasters, strikes, or other unforeseen events</li>
            </ul>
            <p>In such situations, we will make reasonable efforts to keep you informed about any delays.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Cancellation Policy</h3>
            <p>We understand that you may need to cancel an order under certain circumstances. Please review the following guidelines:</p>
            
            <h4 className="text-lg font-medium text-[#2F3E36] mt-4">1. Order Cancellation by Customer</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>If you wish to cancel your order, please contact us immediately via email.</li>
              <li>Orders that have already been processed or dispatched cannot be canceled.</li>
              <li>For perishable or temperature-sensitive products, cancellation may be allowed; however, applicable costs may be borne by the customer.</li>
            </ul>

            <h4 className="text-lg font-medium text-[#2F3E36] mt-4">2. Order Cancellation by Fiveetatv</h4>
            <p>Fiveetatv reserves the right to cancel any order under the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Incorrect pricing or product information listed on the website</li>
              <li>Product unavailability</li>
              <li>Unforeseen issues affecting order fulfillment</li>
            </ul>
            <p>In such cases, customers will be informed, and a full refund will be processed.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">General Cancellation Guidelines</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Orders that have already been dispatched are not eligible for cancellation.</li>
              <li>Discount vouchers are intended for one-time use and will be considered utilized even if the order is canceled.</li>
              <li>If loyalty points were used for the purchase, they will be credited back to your account in case of cancellation.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Refunds for Cancellations</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Refunds for eligible cancellations will be processed only after verification, as per our Refund Policy.</li>
              <li>Once approved, refunds will be processed within 5–7 business days.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Replacement & Refund Conditions</h3>
            <p>We take utmost care to ensure that products reach you in perfect condition. However, in rare cases, the following issues may occur:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Product damaged during transit</li>
              <li>Manufacturing defects</li>
              <li>Incorrect product delivered</li>
            </ul>
            <p>Eligibility for replacement/refund:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request must be raised within 7 days of delivery</li>
              <li>If the package appears damaged, please refuse delivery at the time of receipt</li>
            </ul>
            <p>Note: Products once accepted cannot be returned unless they meet the above conditions.</p>
            <p>For detailed return and refund conditions, please refer to our Refund Policy.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Replacement / Refund Process</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Please email us with your Order ID and reason for replacement or refund</li>
              <li>Do not send any product back without prior confirmation from our team</li>
            </ul>
            
            <h4 className="text-lg font-medium text-[#2F3E36] mt-4">If Replacement is Unavailable</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>In case a replacement product is not available, suitable alternatives may be offered</li>
              <li>If you choose not to proceed, a full refund will be issued</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display text-[#2F3E36]">Contact Us</h3>
            <p>For any queries related to shipping, cancellations, or refunds, please contact us:</p>
            <p>
              <strong>Email:</strong> xxxxxxx@com<br />
              <strong>Phone:</strong> +91-XXXXXXXXXX
            </p>
          </div>

        </div>
      </section>

      <CouponSection />
      <PolicyCTA />
    </div>
  );
}

