import Link from "next/link";
import { Home, ArrowRight, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-12 bg-background flex items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-lg mx-auto">
        <div className="space-y-4">
          <div className="relative inline-block">
            <h1 className="text-8xl md:text-9xl font-display text-accent">404</h1>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-white text-xl font-bold animate-bounce">
              ?
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-foreground">
            Oops! Page Not Found
          </h2>
          <p className="text-foreground/60 font-light">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-3 h-12 px-6 rounded-full bg-[#2A3B32] text-white hover:bg-black transition-colors duration-300 font-medium text-sm"
          >
            <Home size={18} />
            Return Home
          </Link>
          
          <Link 
            href="/collection"
            className="inline-flex items-center gap-3 h-12 px-6 rounded-full border-2 border-[#2A3B32] text-[#2A3B32] hover:bg-[#2A3B32] hover:text-white transition-colors duration-300 font-medium text-sm"
          >
            <Search size={18} />
            Browse Products
          </Link>
        </div>

        <div className="pt-8">
          <p className="text-sm text-foreground/50 mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/collection" className="text-sm text-accent hover:underline">All Products</Link>
            <span className="text-foreground/30">•</span>
            <Link href="/collections/diabetes" className="text-sm text-accent hover:underline">Diabetes Care</Link>
            <span className="text-foreground/30">•</span>
            <Link href="/collections/digestion" className="text-sm text-accent hover:underline">Digestive Health</Link>
            <span className="text-foreground/30">•</span>
            <Link href="/about" className="text-sm text-accent hover:underline">About Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}