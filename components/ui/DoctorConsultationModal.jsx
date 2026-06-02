"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function DoctorConsultationModal({ isOpen, onClose, productSlug }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "consultation",
          productSlug,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        toast.success("Application submitted successfully!");
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({ name: "", phone: "" });
        }, 3000);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to submit. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-10"
            >
              <X size={20} className="text-slate-600" />
            </button>

            <div className="p-8 sm:p-10">
              {success ? (
                <div className="py-12 flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900">Application Received!</h3>
                    <p className="text-slate-500">Our doctor will contact you on your mobile number shortly.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center space-y-4 mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                      Congratulations! You have been selected for <span className="text-[#658518]">FREE DOCTOR CONSULTATION</span>
                    </h2>
                    <p className="text-sm text-slate-500">
                      Submit your mobile number. Doctor will contact you shortly.
                    </p>
                  </div>

                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 border border-slate-100 shadow-inner bg-slate-50">
                    {/* Placeholder for the image in user's screenshot */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="bg-[#658518] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-normal mb-3">
                            Special Offer
                        </div>
                        <p className="text-lg font-bold text-slate-800 mb-1">Apply for Free Doctor Consultancy</p>
                        <p className="text-2xl font-black text-[#658518]">Get 10% Extra Discount</p>
                        <p className="text-xs text-slate-400 mt-2 font-medium italic">On your first personalized treatment</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        required
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#658518] focus:bg-white transition-all outline-none text-slate-900"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        required
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#658518] focus:bg-white transition-all outline-none text-slate-900"
                      />
                    </div>

                    <button
                      disabled={loading}
                      type="submit"
                      className="w-full bg-[#1b3a27] hover:bg-[#254d35] text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-green-900/20 active:scale-95 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        "Apply for Personal Discount"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
