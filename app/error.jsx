"use client";

import { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
            !
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-slate-800">
          Oops! Something went wrong
        </h2>
        
        <p className="text-slate-600 leading-relaxed">
          We apologize for the inconvenience. Our team has been notified and is working to fix the issue.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button 
            onClick={() => reset()} 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2A3B32] text-white rounded-full font-medium hover:bg-black transition-colors"
          >
            Try Again
          </button>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#2A3B32] text-[#2A3B32] rounded-full font-medium hover:bg-[#2A3B32] hover:text-white transition-colors"
          >
            Go to Home
          </Link>
        </div>

        <div className="pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-3">Need immediate help?</p>
          <a 
            href="https://wa.me/919318445297"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#25D366] font-medium hover:underline"
          >
            <FaWhatsapp size={20} />
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}