import Link from "next/link";
import { Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-white text-slate-900 overflow-hidden pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16 mt-16 md:mt-24 lg:mt-32 border-t border-slate-100">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-20 lg:mb-24">
          
          <div className="md:col-span-5 space-y-6 md:space-y-8">
            <div className="flex items-center justify-start">
              <Image src="/assets/logo.png" alt="Fiveetatv Logo" width={150} height={38} className={`w-[120px] md:w-[150px] lg:w-[192px] h-auto`} />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-md">
              Premium Ayurvedic wellness brand founded by Rahul Gour & Suresh Gaur. Inspired by the five natural elements, crafted with intention for balanced living.
            </p>
            <div className="flex gap-2 md:gap-3 pt-2">
              <a href="https://www.instagram.com/fiveetatvofficial?igsh=MTl4Y3p2MHJqZTRiOA==" target="_blank" rel="noopener noreferrer" className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-slate-200 flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all duration-500 group">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-slate-200 flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all duration-500 group">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-slate-200 flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all duration-500 group">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="mailto:fiveetatv@gmail.com" className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-slate-200 flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all duration-500 group">
                <Mail size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4 md:space-y-6">
            <p className="text-[10px] uppercase tracking-normal font-light text-slate-400">Explore</p>
            <ul className="flex flex-col gap-3 md:gap-4 text-xs sm:text-sm font-light text-slate-500">
              <li><Link href="/" className="hover:text-accent transition-colors duration-500 inline-flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300"></span>Home</Link></li>
              <li><Link href="/#products" className="hover:text-accent transition-colors duration-500 inline-flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300"></span>Collection</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors duration-500 inline-flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300"></span>Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors duration-500 inline-flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300"></span>Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4 md:space-y-6">
            <p className="text-[10px] uppercase tracking-normal font-light text-slate-400">Legal</p>
            <ul className="flex flex-col gap-3 md:gap-4 text-xs sm:text-sm font-light text-slate-500">
              <li><Link href="/terms" className="hover:text-accent transition-colors duration-500 inline-flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300"></span>Terms</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-accent transition-colors duration-500 inline-flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300"></span>Privacy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-accent transition-colors duration-500 inline-flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300"></span>Refund Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-accent transition-colors duration-500 inline-flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300"></span>Shipping</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4 md:space-y-6">
            <p className="text-[10px] uppercase tracking-normal font-light text-slate-400">Contact</p>
            <div className="space-y-3 md:space-y-4">
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-900 mb-1">Email</p>
                <a href="mailto:fiveetatv@gmail.com" className="text-xs sm:text-sm text-slate-500 font-light hover:text-accent transition-colors duration-500">fiveetatv@gmail.com</a>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-900 mb-1">Phone</p>
                <a href="tel:9318445297" className="text-xs sm:text-sm text-slate-500 font-light hover:text-accent transition-colors duration-500">9318445297</a>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-900 mb-1">Address</p>
                <p className="text-xs sm:text-sm text-slate-500 font-light">Fiveetatv</p>
                <p className="text-xs sm:text-sm text-slate-500 font-light">Delhi, India</p>
              </div>
              <div className="pt-2">
                <p className="text-xs sm:text-sm font-medium text-slate-900 mb-1">Timing</p>
                <p className="text-[10px] sm:text-xs text-slate-400 font-light uppercase tracking-normal">Monday - Saturday</p>
                <p className="text-[10px] sm:text-xs text-slate-400 font-light uppercase tracking-normal">10:00 AM - 06:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-light">
            © {new Date().getFullYear()} Fiveetatv Ayurveda. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-slate-100" />
            <p className="text-xs text-slate-400 font-light uppercase tracking-normal">
              Balanced Health, Limitless Living
            </p>
            <div className="h-[1px] w-8 bg-slate-100" />
          </div>
          <p className="text-xs text-slate-400 font-light">
            Designed by <a href="https://valtrixstudio.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent font-medium transition-colors">valtrixstudio</a>
          </p>
        </div>
        
      </div>
    </footer>
  );
}
