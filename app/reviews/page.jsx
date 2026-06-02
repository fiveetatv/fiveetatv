"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MessageSquare } from 'lucide-react';
import PageTransition from '@/components/ui/PageTransition';
import FloatingLeaf from '@/components/ui/FloatingLeaf';

const reviews = [
  {
    name: "Mr. Shivansh",
    role: "Verified Customer",
    text: "Maine 4 months se Fiveetatv products use kiye hain aur results bahut impressive hain. Mera overall health improve ho gaya hai aur energy level bhi stable hai. Natural formulation pe completely trust karta hoon.",
    img: "/review/16.jpeg"
  },
  {
    name: "Mr. Vijay Kumar",
    role: "Verified Customer",
    text: "Excellent products hain. Maine 2 months se use kar raha hoon aur digestion mein bahut improvement dekha. Pure ingredients hain aur koi side effects nahi. Highly recommend karta hoon.",
    img: "/review/1.jpeg"
  },
  {
    name: "Mrs Badama Devi",
    role: "Verified Customer",
    text: "Bahut acche results mile hain. Sugar control ke liye best hai. Doctor ne bhi recommend kiya tha. Regular use karne se bahut fayda hua hai. Quality outstanding hai.",
    img: "/review/2.jpeg"
  },
  {
    name: "Mr. Rajneesh",
    role: "Verified Customer",
    text: "Digestion ke liye excellent hai. Ab bloating nahi hoti! Digestive issues se years se struggle kar raha tha, aur ye products lifesaver nikle. Har meal ke baad lighter aur comfortable feel karta hoon.",
    img: "/review/4.jpeg"
  },
  { 
    name: "Mr. Birender Kumar", 
    role: "Verified Customer", 
    text: "Main 3 months se Fiveetatv products use kar raha hoon aur mera blood sugar level bahut improve ho gaya hai. Natural ingredients hain toh mind bhi peaceful rehta hai, aur ab mid-day mein energy crash nahi hota. Natural wellness ke liye highly recommend karta hoon.", 
    img: "/review/15.jpeg"
  },
  { 
    name: "Mr. Jamuna Bhardwaj", 
    role: "Verified Customer", 
    text: "2 weeks ke baad results bahut acche mil rahe hain. Mere sugar cravings kam ho gaye hain aur poora din energetic feel karta hoon. Products use karne mein easy hain aur koi bad taste nahi hai. Continue use karunga main.", 
    img: "/review/14.jpeg"
  },
  { 
    name: "Mrs. Indra Devi", 
    role: "Verified Customer", 
    text: "Bahut effective aur natural hai. Doctor ne Ayurvedic support try karne ko bola tha, aur ye products game-changer nikle. Made in India hai pure ingredients ke saath, bahut accha lagta hai. Quality mein results dikhte hain.", 
    img: "/review/13.jpeg"
  },
  { 
    name: "Mr. Amarnath", 
    role: "Verified Customer", 
    text: "Daily use ke liye great products hain. Consume karne mein easy hai aur 6 weeks use karne ke baad mera sugar level mein significant improvement dekha. Herbal blend comprehensive aur effective feel hota hai.", 
    img: "/review/12.jpeg"
  },
  { 
    name: "Mrs. Chanda Devi", 
    role: "Verified Customer", 
    text: "Good quality aur effective hai. Products ka natural taste pleasant hai. Isse use karne ke baad mere post-meal sugar spikes kam ho gaye hain. Ayurvedic formulation pe completely trust karta hoon.", 
    img: "/review/11.jpeg"
  },
  { 
    name: "Rakesh Divakar", 
    role: "Verified Customer", 
    text: "Best Ayurvedic products maine use kiye hain. Traditional herbs ka combination metabolic health ke liye kaam karta hai. Made in India authentic ingredients ke saath - ye mujhe convince kiya try karne ko, aur ye deliver bhi karta hai.", 
    img: "/review/10.jpeg"
  },
  { 
    name: "Mr. Surender Kumar", 
    role: "Verified Customer", 
    text: "Acidity relief ke liye very effective hai. Pehle antacids pe depend karta tha, lekin ye products start karne ke baad acidity bahut kam ho gayi. Traditional Ayurvedic herbs se bana hai - digestive concerns walo ke liye must-have hai.", 
    img: "/review/8.jpeg"
  },
  { 
    name: "Amarjit", 
    role: "Verified Customer", 
    text: "Best digestive products available hain. Taste mild aur pleasant hai, harsh nahi hai jaise kuch products. Herbal combination overall gut health ke liye perfect hai. Daily use ke liye highly recommend karta hoon.", 
    img: "/review/7.jpeg"
  },
  { 
    name: "Mrs. Sarita Devi", 
    role: "Verified Customer", 
    text: "Amazing results! Pehle bahut Ayurvedic products try kiye, lekin Fiveetatv standout hai. Quality exceptional hai aur results khud bolte hain. Meri family aur main ab regular customers hain.", 
    img: "/review/6.jpeg"
  },
  { 
    name: "Mr. Nand Kishor Poddar", 
    role: "Verified Customer", 
    text: "Truly authentic Ayurvedic formulation hai. Ingredients selection mein detail ka attention evident hai. Ye products ne mujhe naturally balanced health maintain karne mein help kiya hai. Genuine Ayurvedic solutions dhundhne walo ko highly recommend karta hoon.", 
    img: "/review/5.jpeg"
  },
  { 
    name: "Virender", 
    role: "Verified Customer", 
    text: "Outstanding quality aur effectiveness hai. Products exactly wahi hain jo main dhundh raha tha - natural, potent, aur care se bane. Delivery prompt tha aur packaging excellent hai. Definitely order karunga again.", 
    img: "/review/3.jpeg"
  },
  {
    name: "Mrs Jaykumari",
    role: "Verified Customer",
    text: "Fiveetatv products ne meri life badal di hai. Natural aur effective solution dhundhne walo ke liye ye best choice hai. Highly recommended!",
    img: "/review/17.jpeg"
  }
];

export default function ReviewsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background pt-24 pb-20 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50/50 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-50/50 rounded-full blur-[100px] -z-10" />
        
        <FloatingLeaf 
          type="branch" 
          className="w-32 h-32 md:w-48 md:h-48 top-10 -right-12 opacity-20 rotate-[120deg]" 
          delay={0.2} 
        />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900 leading-tight">
              What Our <span className="font-display italic text-accent">Community</span> Says
            </h1>
            <p className="text-lg text-slate-500 font-light">
              Real stories from real people who have transformed their wellness journey with Fiveetatv.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 flex flex-col h-full hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#658518" className="text-[#658518]" />
                  ))}
                </div>

                <p className="text-lg text-slate-600 leading-relaxed mb-8 flex-grow font-light italic">
                  "{rev.text}"
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <img 
                      src={rev.img} 
                      alt={rev.name} 
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{rev.name}</h4>
                    <p className="text-[10px] text-[#658518] font-black uppercase tracking-normal mt-0.5">
                      {rev.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-12 rounded-[3rem] bg-[#1b3a27] text-white text-center space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full" />
             <div className="relative z-10 space-y-6">
                <h2 className="text-3xl md:text-4xl font-light">Have a Story to <span className="italic font-display">Share?</span></h2>
                <p className="text-white/70 max-w-xl mx-auto font-light">
                  We love hearing from our community. Your feedback helps us grow and inspires others on their wellness journey.
                </p>
                <button className="bg-white text-[#1b3a27] px-10 py-4 rounded-full font-bold hover:bg-white/90 transition-all active:scale-95">
                  Write a Review
                </button>
             </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
