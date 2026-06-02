"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    async function handleLogout() {
      try {
        await logout();
        toast.success("Logged out successfully");
        router.replace("/");
      } catch (err) {
        console.error("Logout failed:", err);
        router.replace("/");
      }
    }
    
    handleLogout();
  }, [router, logout]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto"></div>
        <p className="text-foreground/60 font-light">Logging out...</p>
      </div>
    </div>
  );
}
