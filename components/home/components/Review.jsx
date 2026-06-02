'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import FloatingLeaf from '@/components/ui/FloatingLeaf';

const reviews = [
  {
    name: "Mr. Shivansh",
    role: "Verified Customer",
    text: "Maine 4 months se Fiveetatv products use kiye hain aur results bahut impressive hain. Mera overall health improve ho gaya hai aur energy level bhi stable hai. Natural formulation pe completely trust karta hoon.",
    img: "/review/16.jpeg",
    initials: "S"
  },
  {
    name: "Mr. Vijay Kumar",
    role: "Verified Customer",
    text: "Excellent products hain. Maine 2 months se use kar raha hoon aur digestion mein bahut improvement dekha. Pure ingredients hain aur koi side effects nahi. Highly recommend karta hoon.",
    img: "/review/1.jpeg",
    initials: "VK"
  },
  {
    name: "Mrs Badama Devi",
    role: "Verified Customer",
    text: "Bahut acche results mile hain. Sugar control ke liye best hai. Doctor ne bhi recommend kiya tha. Regular use karne se bahut fayda hua hai. Quality outstanding hai.",
    img: "/review/2.jpeg",
    initials: "BD"
  },
  {
    name: "Mr. Rajneesh",
    role: "Verified Customer",
    text: "Digestion ke liye excellent hai. Ab bloating nahi hoti! Digestive issues se years se struggle kar raha tha, aur ye products lifesaver nikle. Har meal ke baad lighter aur comfortable feel karta hoon.",
    img: "/review/4.jpeg",
    initials: "R"
  },
  { 
    name: "Mr. Birender Kumar", 
    role: "Verified Customer", 
    text: "Main 3 months se Fiveetatv products use kar raha hoon aur mera blood sugar level bahut improve ho gaya hai. Natural ingredients hain toh mind bhi peaceful rehta hai, aur ab mid-day mein energy crash nahi hota. Natural wellness ke liye highly recommend karta hoon.", 
    img: "/review/15.jpeg",
    initials: "BK"
  },
  { 
    name: "Mr. Jamuna Bhardwaj", 
    role: "Verified Customer", 
    text: "2 weeks ke baad results bahut acche mil rahe hain. Mere sugar cravings kam ho gaye hain aur poora din energetic feel karta hoon. Products use karne mein easy hain aur koi bad taste nahi hai. Continue use karunga main.", 
    img: "/review/14.jpeg",
    initials: "JB" 
  },
];

const Review = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentPage((prev) => (prev + newDirection + totalPages) % totalPages);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    })
  };

  return (
    <section className="py-6 px-6 overflow-hidden relative">
      {/* Subtle Light Blue/Purple background accents */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -z-10" />
      <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-purple-50/50 rounded-full blur-[120px] -z-10" />

      {/* Decorative Leaves */}
      <FloatingLeaf 
        type="single" 
        className="w-16 h-16 md:w-24 md:h-24 top-20 left-[8%] opacity-45 rotate-[-25deg]" 
        delay={0.2} 
        parallaxSpeed={40} 
      />
      <FloatingLeaf 
        type="branch" 
        className="w-48 h-48 md:w-64 md:h-64 bottom-10 -right-16 opacity-25 rotate-[100deg]" 
        delay={0.5} 
        parallaxSpeed={-50} 
        blur
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-6xl uppercase font-bold tracking-tighter text-slate-900 leading-[0.85]">
              Trusted by <br /> <span className="text-black">Visionary Leaders.</span>
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button onClick={() => paginate(-1)} className="group w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center bg-white transition-all duration-300">
              <ChevronLeft size={20} className="text-slate-400  transition-colors" />
            </button>
            <button onClick={() => paginate(1)} className="group w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center bg-white transition-all duration-300">
              <ChevronRight size={20} className="text-slate-400   transition-colors" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {reviews.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((rev, index) => (
                <div
                  key={index}
                  className="group relative p-10 rounded-[2rem] bg-white border border-slate-100 flex flex-col h-full transition-all duration-500 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-2"
                >

                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" className="text-amber-500" />
                    ))}
                  </div>

                  <p className="text-lg text-slate-600 leading-relaxed mb-12 flex-grow font-medium">
                    "{rev.text}"
                  </p>

                  <div className="flex items-center gap-4 pt-8 border-t border-slate-50">
                    <div className="relative flex-shrink-0">
                        {rev.img ? (
                          <img 
                            src={rev.img} 
                            alt={rev.name} 
                            className="w-14 h-14 rounded-full object-cover object-top shadow-lg border-2 border-white"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br  flex items-center justify-center text-white font-bold text-sm shadow-md">
                            {rev.initials}
                          </div>
                        )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-md">{rev.name}</h4>
                      <p className="text-[10px] text-slate-900 font-black uppercase tracking-normal mt-0.5">
                        {rev.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Review;