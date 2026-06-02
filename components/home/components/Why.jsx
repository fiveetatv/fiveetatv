import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { Sparkles, Leaf, ShieldCheck } from "lucide-react";
import FloatingLeaf from '@/components/ui/FloatingLeaf';

function Why() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        "/why/IMG_7885.JPG.jpeg",
        "/why/IMG_7886.JPG.jpeg",
        "/why/IMG_7887.JPG.jpeg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto relative">
            {/* Decorative Leaves */}
            <FloatingLeaf 
                type="branch" 
                className="w-56 h-56 md:w-80 md:h-80 -bottom-20 -left-20 opacity-25 rotate-[60deg]" 
                delay={0.2} 
                parallaxSpeed={70} 
                blur
            />
            <FloatingLeaf 
                type="single" 
                className="w-16 h-16 md:w-20 md:h-20 top-20 right-10 opacity-45 rotate-[-15deg]" 
                delay={0.6} 
                parallaxSpeed={-40} 
            />

            <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">

                {/* Image Section with Modern Floating Card Effect */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-[4/5] w-full"
                >
                    <div className="absolute inset-0 bg-accent/20 rounded-[2rem] transform rotate-3" />
                    <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={images[currentImageIndex]}
                                    alt="Natural Ingredients"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 text-white">
                            <p className="text-xl font-light">Balanced Health, Limitless Living</p>
                        </div>
                    </div>
                </motion.div>

                {/* Content Section */}
                <div className="space-y-12">
                    <SectionHeader
                        label="Why Fiveetatv"
                        title="Crafted with Intention"
                        description="We believe in uncompromising quality. Our formulations are crafted with ethically sourced herbs, standardized for potency, and backed by ancient Ayurvedic wisdom."
                        align="left"
                    />

                    <div className="grid gap-6">
                        {[
                            { title: "Standardized Extracts", desc: "Clinically proven potency in every dose.", icon: <Sparkles size={22} /> },
                            { title: "Ethically Sourced", desc: "From sustainable farms directly to you.", icon: <Leaf size={22} /> },
                            { title: "Ayush Approved", desc: "Certified authentic formulations.", icon: <ShieldCheck size={22} /> },
                        ].map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="group p-6 rounded-2xl bg-white border border-slate-100 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 flex gap-5 items-center"
                            >
                                <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-inner">
                                    {benefit.icon}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold text-slate-900">{benefit.title}</h3>
                                    <p className="text-sm text-slate-500 font-light">{benefit.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Why