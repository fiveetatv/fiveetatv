"use client";

import { useState, useEffect } from "react";
import { WifiOff, RefreshCw } from "lucide-react";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    setIsOnline(navigator.onLine);
    if (!navigator.onLine) setShowBanner(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showBanner) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-amber-500 text-amber-900 py-3 px-4 flex items-center justify-center gap-3 shadow-lg">
      <WifiOff size={18} />
      <span className="text-sm font-medium">You&apos;re offline. Some features may not work.</span>
      <button 
        onClick={() => window.location.reload()}
        className="flex items-center gap-2 px-3 py-1 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
      >
        <RefreshCw size={14} />
        Retry
      </button>
    </div>
  );
}