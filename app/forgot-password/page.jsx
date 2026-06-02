"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      setSent(true);
      toast.success("Password reset email sent successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
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
          {!sent ? (
            <>
              <div className="mb-8">
                <h1 className="font-display mb-2 text-3xl text-[#3f2c22]">Forgot Password</h1>
                <p className="text-sm text-[#6d5648]">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-foreground/10 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg" 
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-foreground/5 rounded-xl">
                <p className="text-xs text-foreground/60 leading-relaxed">
                  <strong className="text-foreground">Security Note:</strong> For your protection, the reset link will expire in 1 hour. If you don't receive the email, please check your spam folder or contact support.
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
                <h2 className="font-display text-2xl text-[#3f2c22] mb-2">Email Sent!</h2>
                <p className="text-sm text-[#6d5648]">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-xs text-foreground/50 mt-2">
                  Please check your inbox and follow the instructions.
                </p>
              </div>
              <Button 
                onClick={() => router.push("/login")}
                className="w-full" 
                size="lg"
              >
                Back to Login
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
