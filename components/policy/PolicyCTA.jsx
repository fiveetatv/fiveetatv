"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function PolicyCTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto rounded-[2rem] bg-[#2F3E36] text-white p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-light italic font-display">Still have questions?</h2>
            <p className="text-white/60 font-light max-w-lg mx-auto">
              Our Ayurvedic experts are here to help you with any queries regarding our policies or products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-[#7A9E7E]" />
              </div>
              <p className="text-sm font-medium">fiveetatv@gmail.com</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-[#7A9E7E]" />
              </div>
              <p className="text-sm font-medium">+91 9318445297</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-[#7A9E7E]" />
              </div>
              <p className="text-sm font-medium">Live Chat Support</p>
            </div>
          </div>

          <div className="pt-8">
            <Link href="/contact">
              <Button className="bg-[#7A9E7E] hover:bg-[#688a6c] text-white px-8 py-4 rounded-full text-sm uppercase tracking-normal font-medium transition-all duration-300">
                Contact Us Now
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7A9E7E]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
      </div>
    </section>
  );
}
