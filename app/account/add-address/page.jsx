"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";

export default function AddAddressPage() {
  const router = useRouter();
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  async function saveAddress(e) {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressForm),
      });
      const data = await res.json();
      
      if (!res.ok) {
        return toast.error(data.error || "Failed to add address");
      }
      
      toast.success("Address added successfully");
      router.push("/account");
    } catch (error) {
      toast.error("Failed to add address");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 md:pt-40 pb-12 md:pb-24">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/account" className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm">Back to Account</span>
          </Link>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">Add New Address</h1>
          <p className="text-foreground/50 font-light">Enter your delivery details below.</p>
        </div>

        <div className="bg-white rounded-[2rem] border border-border p-8 md:p-12 space-y-8 shadow-sm">
          <form onSubmit={saveAddress} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Input 
                label="Full Name" 
                value={addressForm.fullName} 
                onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                required
              />
              <Input 
                label="Phone Number" 
                value={addressForm.phone} 
                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                required
              />
            </div>
            <Input 
              label="Address Line" 
              value={addressForm.addressLine} 
              onChange={(e) => setAddressForm({ ...addressForm, addressLine: e.target.value })}
              required
            />
            <div className="grid gap-6 sm:grid-cols-3">
              <Input 
                label="City" 
                value={addressForm.city} 
                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                required
              />
              <Input 
                label="State" 
                value={addressForm.state} 
                onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                required
              />
              <Input 
                label="Pincode" 
                value={addressForm.pincode} 
                onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                required
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isDefault"
                checked={addressForm.isDefault}
                onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                className="w-5 h-5 rounded border-foreground/20"
              />
              <label htmlFor="isDefault" className="text-sm text-foreground/70">Set as default address</label>
            </div>
            <Button type="submit" className="w-full">Save Address</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
