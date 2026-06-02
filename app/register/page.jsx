"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", marketingConsent: false });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { refreshUser } = useAuth();

  async function onSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = "Enter a valid email";
    if (!/^[0-9]{10}$/.test(form.phone)) nextErrors.phone = "Enter a valid 10-digit phone number";
    if (form.password.length < 6) nextErrors.password = "Minimum 6 characters";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return toast.error(data.message);
    await refreshUser();
    toast.success("Account created");
    router.push("/");
  }

  return (
    <div className="w-full pt-32 md:pt-40 pb-20 px-6">
      <div className="mx-auto max-w-md rounded-[2rem] border border-border bg-white/50 backdrop-blur-sm p-8 shadow-sm">
      <h1 className="mb-2 text-3xl font-semibold text-[#36532f]">Create Account</h1>
      <p className="mb-5 text-sm text-[#5f7456]">Join Fiveetatv and start your premium wellness journey.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input label="Full name" error={errors.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" error={errors.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Phone number" error={errors.phone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Input label="Password" error={errors.password} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <label className="flex items-start gap-2 text-sm text-[#5f7456]">
          <input
            type="checkbox"
            checked={form.marketingConsent}
            onChange={(e) => setForm({ ...form, marketingConsent: e.target.checked })}
            className="mt-1"
          />
          I agree to receive marketing emails
        </label>
        <Button className="w-full" size="lg" type="submit">Create Account</Button>
      </form>
      <p className="mt-4 text-sm text-[#5f7456]">
        Already registered? <Link href="/login" className="font-medium underline">Login</Link>
      </p>
      </div>
    </div>
  );
}
