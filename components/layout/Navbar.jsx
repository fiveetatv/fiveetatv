"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { Menu, ShoppingBag, UserRound, X, Search, LayoutDashboard, Heart, ChevronDown, LogOut, Leaf, Phone, Star } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { NAV_LINKS, PRODUCT_CATEGORIES } from "./nav-config";

const AnnouncementBar = () => (
  <div className="bg-[#658518] text-white py-1.5 px-4 sm:px-6 md:px-8 lg:px-12">
    <div className="max-w-[1440px] mx-auto flex items-center justify-between text-[10px] sm:text-xs font-medium tracking-wide">
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-1.5">
          <Leaf size={12} className="text-white/80" />
          <span>Free Shipping on Orders Above ₹499</span>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-1.5">
          <Phone size={12} className="text-white/80" />
          <span>Call Now: <a href="tel:+919318445297" className="hover:underline">+91 9318445297</a> / <a href="tel:+919220251059" className="hover:underline">+91 9220251059</a></span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <a href="https://www.facebook.com/share/18iTV2DwvQ/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
          <FaFacebookF size={12} />
        </a>
        <a href="https://www.instagram.com/fiveetatvofficial?igsh=cDhyOTBkYm1tcmR5" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
          <FaInstagram size={14} />
        </a>
        <a href="https://wa.me/919318445297" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
          <FaWhatsapp size={14} />
        </a>
      </div>
    </div>
  </div>
);

const NAV_LINKS_LIST = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Reviews", href: "/reviews" },
  { label: "Wishlist", href: "/wishlist" },
];

export default function Navbar() {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [diabetesDropdownOpen, setDiabetesDropdownOpen] = useState(false);
  const [mobileDiabetesOpen, setMobileDiabetesOpen] = useState(false);

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 20);

          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setVisible(false);
          } else {
            setVisible(true);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openMenu]);

  return (
    <>
      <div 
        className={`fixed top-0 left-0 right-0 z-[70] transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <AnnouncementBar />
        <div className="bg-white shadow-sm border-b border-black/5">
          <header className={`relative w-full ${scrolled ? "py-1" : "py-2.5"} transition-all duration-300`}>
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between gap-4 md:gap-8">
              <div className="flex items-center gap-4 md:gap-8">
                <button
                  onClick={() => setOpenMenu(true)}
                  className="lg:hidden p-2 -ml-2 rounded-full transition-all duration-500 hover:bg-black/5 text-slate-800"
                >
                  <Menu size={22} strokeWidth={1.5} />
                </button>

                <Link href="/">
                  <Image
                    src="/assets/logo.png"
                    alt="Fiveetatv"
                    width={90}
                    height={90}
                    className="h-9 md:h-12 w-auto object-contain cursor-pointer transition-all duration-300"
                  />
                </Link>
              </div>

              <nav className="hidden lg:flex items-center gap-8">
                {NAV_LINKS_LIST.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xs uppercase tracking-tight font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 text-slate-700">
                <form onSubmit={handleSearch} className="hidden md:flex items-center bg-black/5 rounded-full px-3 py-1.5 border border-black/5 hover:border-accent transition-all">
                  <Search size={14} strokeWidth={1.5} className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none text-sm ml-1.5 w-36 text-slate-900 placeholder:text-slate-400"
                  />
                </form>
                <Link href="/search" className="md:hidden p-2 rounded-full hover:bg-black/5">
                  <Search size={18} strokeWidth={1.5} />
                </Link>

                {mounted && user?.role === 'admin' && (
                  <Link href="/admin" className="hidden md:flex p-2 rounded-full hover:bg-black/5">
                    <LayoutDashboard size={18} strokeWidth={1.5} />
                  </Link>
                )}

                <Link href="/account" className="flex p-2 rounded-full hover:bg-black/5">
                  <UserRound size={18} strokeWidth={1.5} />
                </Link>

                <Link href="/cart" className="relative p-2 rounded-full hover:bg-black/5">
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {mounted && cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-light shadow-sm bg-accent text-white">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </header>

          <nav className="hidden lg:block w-full border-t border-black/5">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="flex items-center justify-center gap-12 py-2">
                {PRODUCT_CATEGORIES.map((category) => (
                  <div key={category.label} className="relative">
                    {category.hasDropdown ? (
                      <>
                        <button
                          onMouseEnter={() => setDiabetesDropdownOpen(true)}
                          onMouseLeave={() => setDiabetesDropdownOpen(false)}
                          className="text-xs uppercase tracking-tight font-medium text-slate-600 hover:text-slate-900 transition-all flex items-center gap-1.5"
                        >
                          {category.label}
                          <ChevronDown size={14} className={`transition-transform duration-300 ${diabetesDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {diabetesDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              onMouseEnter={() => setDiabetesDropdownOpen(true)}
                              onMouseLeave={() => setDiabetesDropdownOpen(false)}
                              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-black/5 rounded-2xl shadow-2xl py-4 min-w-[320px] overflow-hidden"
                            >
                              {category.subLinks.map((subLink) => (
                                <Link
                                  key={subLink.label}
                                  href={subLink.href}
                                  className="block px-6 py-3 hover:bg-slate-50 transition-colors group"
                                >
                                  <p className="text-sm font-medium text-slate-900 group-hover:text-accent">{subLink.label}</p>
                                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-normal">{subLink.description}</p>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={category.href}
                        className="text-xs uppercase tracking-tight font-medium text-slate-600 hover:text-slate-900 relative group"
                      >
                        {category.label}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
                      </Link>
                    )}
                  </div>
                ))}
                <Link href="/policy" className="text-xs uppercase tracking-tight font-medium text-slate-600 hover:text-slate-900 relative group">
                  Our Policies
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#2A3B32] flex flex-col text-white"
          >
            <div className="sticky top-0 flex items-center justify-between p-6 md:p-8 bg-[#2A3B32] border-b border-white/10 z-20">
              <Link href="/" onClick={() => setOpenMenu(false)}>
                <Image src="/assets/logo.png" alt="Fiveetatv" width={90} height={90} className="object-contain" />
              </Link>
              <button
                onClick={() => setOpenMenu(false)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/20 active:scale-90"
              >
                <X size={28} strokeWidth={2} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              <nav className="flex flex-col gap-8">
                <Link href="/" onClick={() => setOpenMenu(false)} className="text-xl font-display font-light italic text-white">
                  Home
                </Link>

                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-normal text-white/40 font-medium">Categories</p>
                  <div className="flex flex-col gap-4">
                    {PRODUCT_CATEGORIES.map((category) => (
                      <div key={category.label}>
                        {category.hasDropdown ? (
                          <div className="flex flex-col gap-3">
                            <button onClick={() => setMobileDiabetesOpen(!mobileDiabetesOpen)} className="text-lg font-display text-white/90 flex items-center justify-between w-full">
                              {category.label}
                              <ChevronDown size={16} className={mobileDiabetesOpen ? 'rotate-180' : ''} />
                            </button>
                            <AnimatePresence>
                              {mobileDiabetesOpen && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pl-4 flex flex-col gap-3 overflow-hidden">
                                  {category.subLinks.map((sub) => (
                                    <Link key={sub.label} href={sub.href} onClick={() => setOpenMenu(false)}>
                                      <p className="text-base text-white/70">{sub.label}</p>
                                      <p className="text-xs text-white/30 uppercase tracking-normal">{sub.description}</p>
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link href={category.href} onClick={() => setOpenMenu(false)} className="text-lg font-display text-white/90">
                            {category.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-normal text-white/40 font-medium">Pages</p>
                  <div className="flex flex-col gap-4">
                    {NAV_LINKS_LIST.filter(link => link.label !== "Home").map((link) => (
                      <Link 
                        key={link.label} 
                        href={link.href} 
                        onClick={() => setOpenMenu(false)}
                        className="text-lg font-display text-white/90 flex items-center gap-3"
                      >
                        {link.label === "Wishlist" && <Heart size={16} className="text-primary" />}
                        {link.label === "Reviews" && <Star size={16} className="text-primary" />}
                        {link.label}
                      </Link>
                    ))}
                    <Link href="/policy" onClick={() => setOpenMenu(false)} className="text-lg font-display text-white/90">
                      Our Policies
                    </Link>
                  </div>
                </div>
              </nav>
            </div>

            <div className="p-8 border-t border-white/10 flex flex-col gap-4 bg-[#24342C]">
              <div className="flex flex-col gap-3">
                <Link href={mounted && user ? "/account" : "/login"} onClick={() => setOpenMenu(false)} className="text-base flex items-center gap-3">
                  <UserRound size={18} /> {mounted && user ? "My Account" : "Login / Register"}
                </Link>
                <Link href="/cart" onClick={() => setOpenMenu(false)} className="text-base flex items-center gap-3">
                  <ShoppingBag size={18} /> My Cart ({mounted ? cartItems.length : 0})
                </Link>
                {mounted && user && (
                  <button 
                    onClick={async () => { 
                      setOpenMenu(false); 
                      await logout(); 
                      router.replace("/"); 
                    }} 
                    className="text-base flex items-center gap-3 text-red-400"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-6 pt-2">
                <a href="https://wa.me/919318445297" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <FaWhatsapp size={20} />
                </a>
                <a href="https://www.instagram.com/fiveetatvofficial?igsh=cDhyOTBkYm1tcmR5" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <FaInstagram size={20} />
                </a>
                <a href="https://www.facebook.com/share/18iTV2DwvQ/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <FaFacebookF size={20} />
                </a>
              </div>
              <p className="text-[10px] uppercase tracking-normal text-white/20">© {new Date().getFullYear()} Fiveetatv Ayurveda</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
