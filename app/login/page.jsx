"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { refreshUser } = useAuth();

  async function onSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = "Enter a valid email";
    if (form.password.length < 6) nextErrors.password = "Minimum 6 characters";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.message || "Login failed");
        setLoading(false);
        return;
      }
      
      toast.success("Welcome back!");
      await refreshUser();
      router.replace("/");
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="w-full pt-32 md:pt-40 pb-20 px-6">
      <div className="mx-auto max-w-md rounded-[2rem] border border-border bg-white/50 backdrop-blur-sm p-8 shadow-sm">
      <h1 className="font-display mb-2 text-3xl text-[#3f2c22]">Welcome Back</h1>
      <p className="mb-5 text-sm text-[#6d5648]">Login to track orders and manage your account.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input 
          label="Email" 
          error={errors.email} 
          value={form.email} 
          onChange={(e) => setForm({ ...form, email: e.target.value })} 
        />
        <Input 
          label="Password" 
          error={errors.password} 
          type="password" 
          value={form.password} 
          onChange={(e) => setForm({ ...form, password: e.target.value })} 
        />
        <Button 
          className="w-full" 
          size="lg" 
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" /> Logging in...
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </form>
      <p className="mt-4 text-sm text-[#6d5648]">
        New customer? <Link href="/register" className="font-medium underline">Create account</Link>
      </p>
      <p className="mt-2 text-sm text-[#6d5648]">
        <Link href="/forgot-password" className="font-medium underline">Forgot password?</Link>
      </p>
      </div>
    </div>
  );
}