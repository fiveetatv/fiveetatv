"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, CheckCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setValidToken(false);
      toast.error("Invalid or missing reset token");
    }
  }, [token]);

  async function onSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      setSuccess(true);
      toast.success("Password reset successfully!");
      
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  if (!validToken) {
    return (
      <div className="w-full pt-32 md:pt-40 pb-20 px-6">
        <div className="mx-auto max-w-md rounded-[2rem] border border-border bg-white/50 backdrop-blur-sm p-8 shadow-sm text-center">
          <p className="text-red-600">Invalid or expired reset link. Please request a new password reset.</p>
          <Link 
            href="/forgot-password"
            className="inline-block mt-4 text-accent underline"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-32 md:pt-40 pb-20 px-6">
      <div className="mx-auto max-w-md">
        <Link 
          href="/login" 
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Login
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] border border-border bg-white/50 backdrop-blur-sm p-8 shadow-sm"
        >
          {!success ? (
            <>
              <div className="mb-8">
                <h1 className="font-display mb-2 text-3xl text-[#3f2c22]">Reset Password</h1>
                <p className="text-sm text-[#6d5648]">
                  Enter your new password below.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-foreground/10 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    required
                    minLength={6}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-foreground/10 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    required
                    minLength={6}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg" 
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-foreground/5 rounded-xl">
                <p className="text-xs text-foreground/60 leading-relaxed">
                  <strong className="text-foreground">Security Tips:</strong> Use a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center"
              >
                <CheckCircle size={32} className="text-green-600" />
              </motion.div>
              <div>
                <h2 className="font-display text-2xl text-[#3f2c22] mb-2">Password Reset!</h2>
                <p className="text-sm text-[#6d5648]">
                  Your password has been successfully reset.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
